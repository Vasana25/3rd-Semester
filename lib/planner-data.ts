export type Course = {
  id: string;
  code: string;
  name: string;
  short: string;
  credits: number;
  track: "Structures" | "Geotechnics" | "Methods" | "Project";
  color: string;
  day?: number;
  start?: string;
  end?: string;
  room?: string;
  active: boolean;
  note?: string;
  source: string;
  examDate?: string;
};

export type PlannerItem = {
  id: string;
  title: string;
  courseId: string;
  kind: "assignment" | "exam" | "quiz" | "presentation" | "milestone" | "study" | "personal";
  date: string;
  time?: string;
  endTime?: string;
  status: "todo" | "doing" | "done";
  priority: "high" | "normal" | "low";
  estimate: number;
  notes?: string;
  source?: string;
  confidence: "confirmed" | "check";
  updatedAt: string;
};

export type PlannerState = { version: 2; courses: Course[]; items: PlannerItem[]; updatedAt: string; focusMinutes?: number };
export type SavedPlannerState = Omit<PlannerState,"version"> & {version:1|2};
const deregisteredCourseIds=new Set(["sciml","csi","fibre"]);

export const SOURCE = {
  registrations: "ETH course registrations screenshot, 26 Sep 2026",
  seismic: "Seismic Design of Structures II — Syllabus / Lecture and Quiz Plan, 2026",
  sciml: "SciML_01_Introduction.pdf, 2026",
  nde: "NDE_HS2026_Program.pdf",
  bim: "Lesson 1 - Course (1).pdf, 2026",
  srra: "SRRA-01-handout.pdf, 2026",
  underground: "UC_I_HS2026_Course_Information.pdf",
  fem: "Method of Finite Elements II — Introduction, 2026",
  getpd: "GETPD_Syllabus_2026.pdf",
  dcge: "Schedule-DCGE-HS 2026.pdf",
  eg: "00 Semesterplan EG 2026.pdf",
  csi: "lec00_course_intro_2025.pdf (previous year's handout)",
  pm: "Week 01 - Lecture - Introduction.pdf, 2026",
};

export const courses: Course[] = [
  { id:"pm", code:"101-0007-00", name:"Project Management for Construction Projects", short:"Project Management", credits:4, track:"Methods", color:"#6c83a5", day:5,start:"12:45",end:"15:30",room:"HIL E 7",active:true,source:SOURCE.registrations, note:"Examination date is not given in the supplied introduction." },
  { id:"nde", code:"101-0129-00", name:"Non Destructive Evaluation & Rehabilitation of Existing Structures", short:"NDE & Rehabilitation", credits:3, track:"Structures", color:"#675acb", day:1,start:"09:45",end:"11:30",room:"HIL F 10.3",active:true,source:SOURCE.nde, note:"Projects 1 and 2 are done in groups of 3–4." },
  { id:"sciml", code:"101-0139-00", name:"Scientific Machine and Deep Learning for Design and Construction", short:"Scientific ML", credits:3, track:"Methods", color:"#24879a", day:1,start:"13:45",end:"17:30",room:"HCI E 8",active:false,source:SOURCE.sciml,examDate:"2026-12-14",note:"Deregistered on 27 September 2026. Dates are retained for reference and excluded from your active plan." },
  { id:"fem", code:"101-0159-00", name:"Method of Finite Elements II", short:"Finite Elements II", credits:4, track:"Structures", color:"#426bc1", day:4,start:"13:45",end:"15:30",room:"HCI D 2",active:true,source:SOURCE.fem,note:"Final project accounts for 100%; presentation planned in December or January, exact date not supplied." },
  { id:"fibre", code:"101-0167-01", name:"Fibre Composite Materials in Structural Engineering", short:"Fibre Composites", credits:3, track:"Structures", color:"#875cb3", day:3,start:"15:45",end:"17:30",room:"HIL E 10.1",active:false,source:SOURCE.registrations,note:"Deregistered on 27 September 2026. No 2026 assessment schedule was supplied." },
  { id:"bim", code:"101-0186-01", name:"BIM, Parametric Modeling and Digital Construction for Civil Engineers", short:"BIM & Digital Construction", credits:2, track:"Methods", color:"#a46940", day:1,start:"13:45",end:"15:30",room:"HIL B 18.1",active:true,source:SOURCE.bim,examDate:"2026-12-14",note:"Two project submissions and two written examinations each count 25%." },
  { id:"srra", code:"101-0187-00", name:"Structural Reliability and Risk Analysis", short:"Structural Reliability", credits:3, track:"Structures", color:"#b25973", day:5,start:"09:45",end:"11:30",room:"HCI J 6",active:true,source:SOURCE.srra,examDate:"2026-12-18",note:"Clashes with Transportation Geotechnics. Optional homework has no due dates given in the supplied handout." },
  { id:"seismic", code:"101-0189-00", name:"Seismic Design of Structures II", short:"Seismic Design II", credits:4, track:"Structures", color:"#3f63ad", day:3,start:"09:45",end:"11:30",room:"HCI E 8",active:true,source:SOURCE.seismic,note:"Limited places; registration depends on application letter. Quizzes offer a grade bonus; project presentations and report are required." },
  { id:"project", code:"101-0198-10", name:"Project on Structural Engineering", short:"Structural project", credits:11, track:"Project", color:"#114f61",active:true,source:SOURCE.registrations,note:"Structural health monitoring project with Prof. Chatzi's group; meetings by appointment. Add your own milestones." },
  { id:"dcge", code:"101-0307-00", name:"Design and Construction in Geotechnical Engineering", short:"Geotechnical Design", credits:4, track:"Geotechnics", color:"#aa704e", day:3,start:"12:45",end:"15:30",room:"HCI J 7",active:true,source:SOURCE.dcge,note:"The schedule shows HW1/HW2 tutorial sessions, not submission deadlines; check Moodle before adding due dates." },
  { id:"underground", code:"101-0317-00", name:"Underground Construction I", short:"Underground Construction", credits:3, track:"Geotechnics", color:"#9b6a39", day:2,start:"09:45",end:"11:30",room:"HIL E 7",active:true,source:SOURCE.underground,note:"Numerical tunnel analysis is a compulsory assessment for exam admission." },
  { id:"environment", code:"101-0339-00", name:"Environmental Geotechnics – Polluted Sites and Waste Disposal", short:"Environmental Geotechnics", credits:3, track:"Geotechnics", color:"#4b8a65", day:2,start:"08:00",end:"09:35",room:"HIL E 9",active:true,source:SOURCE.eg,note:"No examination date is given in the semester plan." },
  { id:"transport", code:"101-0367-00", name:"Geotechnical Engineering in Transportation and Pavement Design", short:"Transportation Geotechnics", credits:3, track:"Geotechnics", color:"#9b7f3b", day:5,start:"09:45",end:"11:30",room:"HCP E 47.3",active:true,source:SOURCE.getpd,note:"Assignment numbers in the syllabus are listed with lecture dates; submission deadlines are not specified." },
  { id:"csi", code:"101-0617-02", name:"Computational Science Investigation for Material Mechanics", short:"Material Mechanics CSI", credits:4, track:"Methods", color:"#528398", day:3,start:"07:45",end:"09:30",room:"HCI E 8",active:false,source:SOURCE.registrations,note:"Deregistered on 27 September 2026. The supplied slides are from 2025; no 2026 deadlines were assumed." },
];

const seed = (id:string,title:string,courseId:string,kind:PlannerItem["kind"],date:string,time:string,source:string,notes="",estimate=90):PlannerItem => ({id,title,courseId,kind,date,time,status:"todo",priority:kind==="exam"||kind==="assignment"?"high":"normal",estimate,notes,source,confidence:"confirmed",updatedAt:"2026-09-26T18:00:00.000Z"});

export const items: PlannerItem[] = [
  seed("sciml-pitch","Project concept and short pitch","sciml","assignment","2026-09-28","",SOURCE.sciml,"One-page concept, research questions, data, work packages, group details and a 3–5 sentence spoken pitch. Exact submission cutoff not stated.",180),
  seed("seismic-q1","Quiz 1 — hazard, risk and objectives","seismic","quiz","2026-09-30","10:00",SOURCE.seismic,"Optional grade bonus; quiz closes at 10:00 Europe/Zurich.",45),
  seed("seismic-q2","Quiz 2 — MDOF and SDOF response","seismic","quiz","2026-10-14","10:00",SOURCE.seismic,"Optional grade bonus; closes at 10:00.",45),
  seed("seismic-q3","Quiz 3 — preliminary design","seismic","quiz","2026-10-21","10:00",SOURCE.seismic,"Optional grade bonus; closes at 10:00.",45),
  seed("nde-project1","Submit NDE Project 1","nde","assignment","2026-10-26","",SOURCE.nde,"Submission shown on the 26 October lecture date; time not stated.",240),
  seed("bim-stage1","BIM project — first stage","bim","assignment","2026-11-02","",SOURCE.bim,"Online hand-in; no cutoff time stated.",180),
  seed("seismic-interim","Seismic II interim presentation","seismic","presentation","2026-11-04","",SOURCE.seismic,"Project Task 3 and interim presentation during the scheduled course; worth 20%. Exact slot not stated.",180),
  seed("bim-midterm","BIM written midterm","bim","exam","2026-11-09","",SOURCE.bim,"In-class, open book. Exact exam start within class not stated.",120),
  seed("seismic-q4","Quiz 4 — performance verification","seismic","quiz","2026-11-18","10:00",SOURCE.seismic,"Optional grade bonus; closes at 10:00.",45),
  seed("seismic-q5","Quiz 5 — braced frames","seismic","quiz","2026-11-25","10:00",SOURCE.seismic,"Optional grade bonus; closes at 10:00.",45),
  seed("underground-cpa","Submit numerical tunnel analysis","underground","assignment","2026-11-24","",SOURCE.underground,"Compulsory assessment. Late or insufficient work can affect admission to the session examination.",300),
  seed("seismic-q6","Quiz 6 — masonry structures","seismic","quiz","2026-12-02","10:00",SOURCE.seismic,"Optional grade bonus; closes at 10:00.",45),
  seed("nde-project2","Submit NDE Project 2","nde","assignment","2026-12-07","",SOURCE.nde,"Presentations are on 7 and 14 December; verify your group's assigned slot.",240),
  seed("sciml-final","Scientific ML final presentation","sciml","presentation","2026-12-07","",SOURCE.sciml,"15-minute presentation and 5-minute Q&A; individual slot not stated.",240),
  seed("seismic-final","Seismic II final presentation","seismic","presentation","2026-12-09","",SOURCE.seismic,"Project Task 5 and final presentation; worth 30%. Individual slot not stated.",240),
  seed("seismic-q7","Quiz 7 — response modification","seismic","quiz","2026-12-09","10:00",SOURCE.seismic,"Optional grade bonus; closes at 10:00.",45),
  seed("sciml-oral","Scientific ML oral examination","sciml","exam","2026-12-14","",SOURCE.sciml,"10-minute oral exam, 50% of course grade; individual slot not specified.",180),
  seed("bim-final","BIM written final examination","bim","exam","2026-12-14","",SOURCE.bim,"Closed book; exact exam start within class not stated.",120),
  seed("bim-project-final","BIM final project submission","bim","assignment","2026-12-14","",SOURCE.bim,"Online hand-in on the last course day; cutoff time not stated.",180),
  seed("underground-corrections","Tunnel analysis corrections, if requested","underground","milestone","2026-12-15","",SOURCE.underground,"Only applies if corrections/additions are required. End of semester deadline.",90),
  seed("seismic-report","Submit Seismic II project report","seismic","assignment","2026-12-16","11:30",SOURCE.seismic,"Due at the end of the last lecture; worth 50%.",300),
  seed("srra-exam","Structural Reliability final examination","srra","exam","2026-12-18","10:00",SOURCE.srra,"Open-book written exam, 10:00–12:00; grade depends entirely on exam.",240),
];
items.find(x=>x.id==="srra-exam")!.endTime="12:00";

export function initialState():PlannerState { return {version:2,courses:courses.map(c=>({...c})),items:items.map(x=>({...x})),updatedAt:new Date().toISOString(),focusMinutes:0}; }
export function migrateState(saved:SavedPlannerState):PlannerState {
  if(saved.version===2)return saved as PlannerState;
  return {...saved,version:2,courses:saved.courses.map(c=>deregisteredCourseIds.has(c.id)?{
    ...c,active:false,note:`Deregistered on 27 September 2026. ${c.note||""}`.trim()
  }:c.id==="bim"&&c.note?.startsWith("Clashes with Scientific ML. ")?{
    ...c,note:c.note.slice("Clashes with Scientific ML. ".length)
  }:c),updatedAt:new Date().toISOString()};
}
export const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export const classStart:Record<string,string>={pm:"2026-09-18",nde:"2026-09-21",sciml:"2026-09-14",fem:"2026-09-17",fibre:"2026-09-16",bim:"2026-09-21",srra:"2026-09-18",seismic:"2026-09-16",dcge:"2026-09-16",underground:"2026-09-15",environment:"2026-09-15",transport:"2026-09-18",csi:"2026-09-16"};
export const classEnd:Record<string,string>={srra:"2026-12-11",bim:"2026-12-14",nde:"2026-12-14",seismic:"2026-12-16",environment:"2026-12-15",underground:"2026-12-15",dcge:"2026-12-16",sciml:"2026-12-14",fem:"2026-12-17",csi:"2026-12-16",fibre:"2026-12-16",pm:"2026-12-18",transport:"2026-12-18"};
export function dayDiff(a:string,b:string){return Math.round((Date.parse(a+"T12:00:00Z")-Date.parse(b+"T12:00:00Z"))/86400000)};
export function addDays(s:string,n:number){ const d=new Date(s+"T12:00:00Z"); d.setUTCDate(d.getUTCDate()+n); return d.toISOString().slice(0,10); }
export function zurichToday(){const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Zurich",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());const m=Object.fromEntries(parts.map(p=>[p.type,p.value]));return `${m.year}-${m.month}-${m.day}`}
export function formatDate(date:string,options:Intl.DateTimeFormatOptions={day:"numeric",month:"short"}){if(!date)return "Date to confirm";return new Intl.DateTimeFormat("en-GB",{timeZone:"UTC",...options}).format(new Date(date+"T12:00:00Z"))}
export function dateWeekday(date:string){return new Date(date+"T12:00:00Z").getUTCDay()}
export function uid(){return globalThis.crypto?.randomUUID?.()??`id-${Date.now()}-${Math.random().toString(36).slice(2)}`}
export function validState(value:unknown):value is SavedPlannerState {if(!value||typeof value!=="object")return false;const s=value as Partial<SavedPlannerState>;return (s.version===1||s.version===2)&&Array.isArray(s.courses)&&Array.isArray(s.items)&&s.courses.every(c=>typeof c.id==="string"&&typeof c.name==="string"&&typeof c.credits==="number")&&s.items.every(x=>typeof x.id==="string"&&typeof x.title==="string"&&typeof x.date==="string"&&["todo","doing","done"].includes(x.status));}
