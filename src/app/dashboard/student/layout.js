"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutCellsLarge,   // Overview
  BookOpen,      // Enrolled Courses
  FileText,      // Exams
  Clock,         // Upcoming Classes
  CreditCard,    // Transaction History
  Medal,        // Certificates
  Persons,       // Community
   ArrowLeft, 
  Bell 
} from '@gravity-ui/icons';

const NAV_ITEMS = [
  { label: "Overview Metrics", href: "/dashboard/student", icon: <LayoutCellsLarge className="w-4 h-4" /> },
  { label: "Enrolled Courses", href: "/dashboard/student/courses", icon: <BookOpen className="w-4 h-4" /> },
  { label: "Exams & Mock Tests", href: "/dashboard/student/exams", icon: <FileText className="w-4 h-4" /> },
  { label: "Upcoming Classes", href: "/dashboard/student/classes", icon: <Clock className="w-4 h-4" /> },
  { label: "Transaction History", href: "/dashboard/student/transactions", icon: <CreditCard className="w-4 h-4" /> },
  { label: "Certificates", href: "/dashboard/student/certificates", icon: <Medal className="w-4 h-4" /> },
  { label: "Community Forum", href: "/dashboard/student/community", icon: <Persons className="w-4 h-4" /> },
];

export default function StudentDashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      
      {/* RESPONSIVE FLUID SIDEBAR */}
      {/* Mobile/Tablet: Shrinks to width-16 (Icon Only) | Desktop: Scales up to width-64 (Full Text labels) */}
      <aside className="w-16 md:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between fixed inset-y-0 left-0 z-20 transition-all duration-300">
        <div className="p-4 md:p-6 space-y-7">
          
          {/* Platform Identity */}
          <div className="flex items-center justify-center md:justify-between h-8">
            {/* Full text branding hides on tiny screen spaces */}
            <Link href="/" className="text-lg font-black tracking-tight text-slate-900 hidden md:block">
              Edu<span className="text-indigo-600">Snap</span>
            </Link>
            {/* Micro compact indicator emblem shows on mobile spaces */}
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs md:hidden shadow-md shadow-indigo-100">
              ES
            </div>
            <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wide hidden md:block">
              Student
            </span>
          </div>

          {/* Navigation Items Deck Grid */}
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  title={item.label} /* Tooltip popup reminder when labels hide on mobile */
                  className={`w-full flex items-center justify-center md:justify-start gap-3 h-10 px-0 md:px-3.5 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  {/* Text label element completely collapses out of view automatically beneath the md break parameter */}
                  <span className="hidden md:block truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* System Session Kill Switch block */}
        <div className="p-3 md:p-4 border-t border-slate-100">
          <Link 
            href="/login"
            title="Sign Out Session"
            className="w-full flex items-center justify-center md:justify-start gap-3 h-10 px-0 md:px-3.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            <span className="hidden md:block">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* RIGHT-SIDE CONTENT WINDOW GRID WINDOW */}
      {/* Offset changes responsively: pl-16 on mobile viewports to prevent clipping, scales to pl-64 on desktops */}
      <div className="flex-1 pl-16 md:pl-64 flex flex-col min-h-screen transition-all duration-300">
        
        {/* Top Operations Panel */}
        <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-800">Academic Portal</h2>
            <span className="text-[9px] sm:text-[10px] bg-slate-100 font-bold text-slate-500 px-2 py-0.5 rounded-md whitespace-nowrap">
              Class 12 / HSC
            </span>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notification Bell toggle */}
            <button className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>
            
            {/* User Profile avatar info snippet */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white text-xs font-bold flex items-center justify-center shadow-sm flex-shrink-0">
                TR
              </div>
              <span className="text-xs font-bold text-slate-700 hidden sm:inline max-w-[120px] truncate">
                Tahmid Rahman
              </span>
            </div>
          </div>
        </header>

        {/* Active Route Screen Outlet Content */}
        <main className="p-4 sm:p-6 flex-1 max-w-7xl w-full mx-auto animate-[fadeIn_0.4s_ease-out]">
          {children}
        </main>
      </div>

    </div>
  );
}