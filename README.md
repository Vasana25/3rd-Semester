# Semester Studio

A personal study planner for Amalia Vasilikou's ETH Zürich Autumn Semester 2026. It starts with the 14 registered course units (54 ECTS, including the 11 ECTS structural engineering project) and dates verified from the supplied course schedules.

## What you can do

- See a dashboard with upcoming deadlines, credit totals, exam countdowns, study cues and timetable clashes.
- Use a month calendar and a weekly timetable. Add, edit, complete, filter and delete tasks, study blocks, exams and other milestones.
- Hide courses you are not taking without deleting their details.
- Use the 25/45/60 minute focus timer, with saved cumulative focus time.
- Export your plan as JSON or an `.ics` calendar, and merge a JSON backup later.
- Save a copy to a GitHub repository and pull it back. GitHub backup is manual; local changes save automatically.
- Receive browser reminders one day before dated items and one week before exams while the page is open. The `.ics` export includes calendar alarms for reminders after closing the page, depending on your calendar application.

## Dates and accuracy

The app preloads dates explicitly given in the 2026 PDFs, including Scientific ML, Seismic Design II, BIM, NDE, Underground Construction and Structural Reliability. The 2025 Material Mechanics CSI slides do **not** provide 2026 deadlines. Other courses without published exam dates show “to confirm.” Assignment numbers next to lecture dates in GETPD and HW tutorials in DCGE are **not** assumed to be submission deadlines.

The standard timetable comes from the registration screenshot and the schedules; special sessions, holidays and individual presentation slots can differ. Check ETH Moodle and your email for updates. The calendar uses Europe/Zurich date labels and exports timezone-aware timed entries.

## Run locally

Requires Node.js 22 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Next.js. To make the static build:

```sh
pnpm build
```

The website is generated in `out/`.

## Publish with Netlify

1. Upload this project to a GitHub repository. Keep any planner backup file private.
2. Connect the repository in Netlify. The included `netlify.toml` runs `pnpm build`, publishes `out/`, and skips Netlify’s dynamic Next.js runtime for this static export.
3. Set the site to use Node.js 22 if Netlify does not pick up the included setting.

No server, database, API key or GitHub account is needed just to use the site.

## Save your plan to GitHub

In **Data & settings**, enter a private repository as `owner/name`. Create a fine-grained personal access token limited to that repository with **Contents: read and write**. The app reads and writes `semester-studio-data.json` using GitHub's repository contents API. The token is used in this tab only; it is not stored in localStorage, exported backups or the repository. Click **Save to GitHub** whenever you want a cloud copy. On another device, click **Pull & merge** first. If a remote file already exists, the app requires a pull before the first overwrite; later changes are guarded by the remote file SHA.

GitHub API details: https://docs.github.com/en/rest/repos/contents

## Privacy and storage

Plans and task edits are saved in this browser's localStorage for this site origin. A new device, browser profile or domain has a separate local store. Export a JSON backup or use the GitHub backup before moving to a new domain. Do not put tokens into the site's source code or a public repository. The app makes no GitHub request until you choose a GitHub action.
