"use client";

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  FileText, 
  Clock, 
  CreditCard, 
   Medal, 
  Persons, 
  ChevronRight, 
  CircleCheck, 
  ArrowRight 
} from '@gravity-ui/icons';

export default function StudentDashboardHome() {
  return (
    <div className="space-y-6">
      
      {/* 1. TOP WELCOME GREETING & ANNOUNCEMENT */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-xl font-black tracking-tight text-slate-900">Welcome Back, Tahmid! 👋</h1>
          <p className="text-xs text-slate-500">
            Your attendance record is at <span className="text-indigo-600 font-bold">94%</span> this week. Keep it up to stay eligible for the final merit round scholarships!
          </p>
        </div>
        <Link 
          href="/dashboard/student/classes"
          className="group h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-100 transition-all pt-0.5 whitespace-nowrap"
        >
          Join Live Classroom
          <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 2. OVERVIEW CARD GRID FOR THE 6 MAIN PORTAL MODULES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Enrolled Courses Status Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex gap-4 items-start shadow-sm hover:border-indigo-100 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Enrolled Programs</span>
            <div className="text-lg font-black text-slate-900">2 Active Programs</div>
            <span className="text-[10px] font-medium text-slate-500 block">HSC Math Core + Admissions</span>
          </div>
        </div>

        {/* Exams / Mocks Status Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex gap-4 items-start shadow-sm hover:border-indigo-100 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Exams & Mock Tests</span>
            <div className="text-lg font-black text-slate-900">99.42 Percentile</div>
            <span className="text-[10px] font-medium text-emerald-600 font-semibold block">Rank #14 Nationally</span>
          </div>
        </div>

        {/* Upcoming Classes Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex gap-4 items-start shadow-sm hover:border-indigo-100 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Classes This Week</span>
            <div className="text-lg font-black text-slate-900">3 Sessions Pending</div>
            <span className="text-[10px] font-medium text-rose-500 font-semibold block">Next: Today at 8:00 PM</span>
          </div>
        </div>

        {/* Transaction History Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex gap-4 items-start shadow-sm hover:border-indigo-100 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Fees & Payments</span>
            <div className="text-lg font-black text-slate-900">৳9,500 Paid</div>
            <span className="text-[10px] font-medium text-slate-400 block">All invoice balances clear ✓</span>
          </div>
        </div>

        {/* Certificates Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex gap-4 items-start shadow-sm hover:border-indigo-100 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Medal className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Earned Certificates</span>
            <div className="text-lg font-black text-slate-900">1 Completed Track</div>
            <span className="text-[10px] font-medium text-indigo-600 font-semibold block">Class 11 Physics Mastery</span>
          </div>
        </div>

        {/* Community Forum Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex gap-4 items-start shadow-sm hover:border-indigo-100 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <Persons className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Community Activities</span>
            <div className="text-lg font-black text-slate-900">12 Active Threads</div>
            <span className="text-[10px] font-medium text-slate-400 block">4 answers marked as helpful</span>
          </div>
        </div>

      </div>

      {/* 3. CORE TWO-COLUMN ACTIONABLE BLOCKS (Classes & Ledger Updates) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: UPCOMING CLASSES LISTING (7 Units) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">Today's Class Schedule</h3>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Live Stream Deck</span>
          </div>

          <div className="space-y-3">
            {[
              { subject: "Higher Mathematics Paper II", topic: "Integral Calculus Area Formations", time: "08:00 PM - 09:30 PM", instructor: "Anisur Rahman (BUET)", live: true },
              { subject: "Physics Paper II", topic: "Thermodynamics Revision Loop", time: "Completed", instructor: "Tahmid Elahi (DU)", live: false }
            ].map((cls, idx) => (
              <div key={idx} className={`p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${cls.live ? 'bg-indigo-50/20 border-indigo-100' : 'bg-slate-50/40 opacity-70'}`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">{cls.subject}</span>
                    {cls.live && <span className="text-[9px] font-black bg-rose-500 text-white px-1.5 py-0.5 rounded animate-pulse">LIVE NOW</span>}
                  </div>
                  <p className="text-[11px] text-slate-500">{cls.topic} • <span className="font-semibold text-slate-700">{cls.instructor}</span></p>
                  <p className="text-[10px] text-slate-400 font-medium pt-1 flex items-center gap-1">⏰ {cls.time}</p>
                </div>
                {cls.live ? (
                  <button className="h-8 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm pt-0.5 w-full sm:w-auto justify-center">
                    Enter Stream <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button disabled className="h-8 px-3 rounded-lg bg-slate-100 text-slate-400 text-[11px] font-bold w-full sm:w-auto justify-center cursor-not-allowed">
                    Recorded Available
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: RECENT TRANSACTION HISTORY INDEX (5 Units) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">Recent Payments Ledger</h3>
            <Link href="/dashboard/student/transactions" className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors">View All</Link>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              { id: "TXN-98231", title: "Data Science Core Package", amount: "৳9,500", date: "July 12, 2026" },
              { id: "TXN-94112", title: "SSC Model Test Pack", amount: "৳2,500", date: "June 04, 2026" }
            ].map((txn, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center first:pt-0 last:pb-0">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">{txn.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{txn.id} • {txn.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-slate-900">{txn.amount}</p>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 inline-block mt-0.5">Success</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. LOWER REGION: CURRENT CERTIFICATE TRACKS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Medal className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">Academic Certifications Status</h3>
        </div>

        <div className="p-4 bg-slate-50 border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 border">
              🎖️
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-900">Class 11 Physics Conceptual Core Completion Award</h4>
              <p className="text-[10px] text-slate-500">Issued upon verifying 24 mandatory written sheets • Verified by Academic Board</p>
            </div>
          </div>
          <button className="h-8 px-3 rounded-lg border bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold flex items-center gap-1 transition-all shadow-sm w-full sm:w-auto justify-center">
            Download PDF Credential
          </button>
        </div>
      </div>

    </div>
  );
}