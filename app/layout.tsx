import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"Semester Studio · Amalia’s study plan",description:"A personal course, deadline and study planner for ETH Zürich Autumn 2026.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
