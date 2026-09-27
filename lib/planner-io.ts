import {addDays, classEnd, classStart, dateWeekday, migrateState, type PlannerState, type SavedPlannerState, validState} from "./planner-data";

function download(name:string, content:string, type:string){ const blob=new Blob([content],{type});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000); }
export function downloadBackup(state:PlannerState){download(`semester-studio-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(state,null,2),"application/json");}
function icsEscape(s:string){return s.replaceAll("\\","\\\\").replaceAll("\n","\\n").replaceAll(",","\\,").replaceAll(";","\\;");}
function foldLine(line:string){const parts:string[]=[];let current="";let length=0;for(const char of line){const bytes=new TextEncoder().encode(char).length;if(length+bytes>73){parts.push(current);current=" "+char;length=1+bytes}else{current+=char;length+=bytes}}parts.push(current);return parts;}
function compact(d:string){return d.replaceAll("-","");}
function timePart(t:string){return (t||"12:00").replace(":","")+"00";}
export function downloadCalendar(state:PlannerState){
  const active=new Set(state.courses.filter(c=>c.active).map(c=>c.id));
  const lines=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Semester Studio//Study Planner//EN","CALSCALE:GREGORIAN","X-WR-CALNAME:Amalia’s study plan","X-WR-TIMEZONE:Europe/Zurich"];
  const addEvent=(id:string,title:string,date:string,time:string|undefined,endTime:string|undefined,description:string,alarmDays:number[]=[])=>{
    lines.push("BEGIN:VEVENT",`UID:${id}@semester-studio`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}`,`SUMMARY:${icsEscape(title)}`);
    if(time){lines.push(`DTSTART;TZID=Europe/Zurich:${compact(date)}T${timePart(time)}`,`DTEND;TZID=Europe/Zurich:${compact(date)}T${timePart(endTime||addMinutes(time,60))}`);}
    else {lines.push(`DTSTART;VALUE=DATE:${compact(date)}`,`DTEND;VALUE=DATE:${compact(addDays(date,1))}`);}
    lines.push(`DESCRIPTION:${icsEscape(description)}`);
    for(const lead of alarmDays)lines.push("BEGIN:VALARM","ACTION:DISPLAY",`TRIGGER:-P${lead}D`,`DESCRIPTION:${icsEscape(title)} is coming up`,"END:VALARM");
    lines.push("END:VEVENT");
  };
  for(const item of state.items.filter(x=>x.date&&x.status!=="done"&&(x.courseId==="personal"||active.has(x.courseId)))){
    const course=state.courses.find(c=>c.id===item.courseId);addEvent(item.id,item.title,item.date,item.time,item.endTime,`${course?.name||"Personal"}. ${item.notes||""} ${item.source?`Source: ${item.source}`:""}`,item.kind==="exam"?[7,1]:[1]);
  }
  // Semester lecture pattern. An edited course's day and times are respected.
  for(const c of state.courses.filter(c=>c.active&&c.day&&c.start&&c.end)){
    for(let d=classStart[c.id]||"2026-09-14";d<=(classEnd[c.id]||"2026-12-18");d=addDays(d,1)){
      if(dateWeekday(d)!==c.day)continue;
      if(c.id==="srra"&&d==="2026-12-18")continue;
      addEvent(`class-${c.id}-${d}`,`${c.short} · class`,d,c.start,c.end,`${c.room||"Location to confirm"}. Weekly pattern; verify any changed sessions.`);
    }
  }
  lines.push("END:VCALENDAR");download("semester-studio-calendar.ics",lines.flatMap(foldLine).join("\r\n")+"\r\n","text/calendar;charset=utf-8");
}
function addMinutes(t:string,n:number){const [h,m]=t.split(":").map(Number);const v=h*60+m+n;return `${String(Math.floor(v/60)%24).padStart(2,"0")}:${String(v%60).padStart(2,"0")}`}
const FILE="semester-studio-data.json";
function githubURL(repo:string){if(!/^[\w.-]+\/[\w.-]+$/.test(repo))throw new Error("Enter a repository as owner/name.");return `https://api.github.com/repos/${repo}/contents/${FILE}`;}
function headers(token:string){if(!token.trim())throw new Error("Enter a GitHub token for this session.");return {"Accept":"application/vnd.github+json","Authorization":`Bearer ${token.trim()}`,"Content-Type":"application/json","X-GitHub-Api-Version":"2022-11-28"};}
function encode(s:string){const bytes=new TextEncoder().encode(s);let b="";for(let i=0;i<bytes.length;i+=8192)b+=String.fromCharCode(...bytes.slice(i,i+8192));return btoa(b);}
function decode(s:string){const chars=atob(s.replace(/\s/g,""));const b=Uint8Array.from(chars,c=>c.charCodeAt(0));return new TextDecoder().decode(b);}
async function requestInfo(repo:string,token:string){const response=await fetch(githubURL(repo),{headers:headers(token)});if(response.status===404)return null;if(!response.ok)throw new Error(`GitHub returned ${response.status}. Check the repository and token permissions.`);return response.json() as Promise<{sha:string;content:string;encoding:string;type:string}>;}
export async function pushToGithub(repo:string,token:string,state:PlannerState,lastSha:string|null){
  const existing=await requestInfo(repo,token);
  if(existing&&(!lastSha||lastSha!==existing.sha))throw new Error("GitHub has a version you have not loaded. Pull and merge it first, then save again.");
  const response=await fetch(githubURL(repo),{method:"PUT",headers:headers(token),body:JSON.stringify({message:"Update Semester Studio plan",content:encode(JSON.stringify(state,null,2)),...(existing?{sha:existing.sha}:{})})});
  if(!response.ok)throw new Error(`Save failed (${response.status}). Your local plan is safe; load the GitHub copy if it changed.`);
  const result=await response.json() as {content?:{sha?:string}};if(!result.content?.sha)throw new Error("GitHub did not confirm the saved file.");return result.content.sha;
}
export async function pullFromGithub(repo:string,token:string){const info=await requestInfo(repo,token);if(!info)throw new Error("No planner file exists in this repository yet. Save to GitHub first.");if(info.type!=="file"||info.encoding!=="base64")throw new Error("The GitHub file is not a readable planner backup.");const value=JSON.parse(decode(info.content));if(!validState(value))throw new Error("The GitHub file is not a compatible planner backup.");return {state:migrateState(value),sha:info.sha};}
export function mergeState(local:PlannerState,backup:SavedPlannerState):PlannerState {
  const remote=migrateState(backup);
  const c=new Map(local.courses.map(x=>[x.id,x]));for(const x of remote.courses)c.set(x.id,{...c.get(x.id),...x});
  const i=new Map(local.items.map(x=>[x.id,x]));for(const x of remote.items){const prev=i.get(x.id);if(!prev||(!prev.updatedAt||x.updatedAt>=prev.updatedAt))i.set(x.id,x);}
  return {version:2,courses:[...c.values()],items:[...i.values()],focusMinutes:Math.max(local.focusMinutes||0,remote.focusMinutes||0),updatedAt:new Date().toISOString()};
}
