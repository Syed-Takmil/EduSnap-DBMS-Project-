import React from 'react';
import Link from 'next/link';
import { ChevronRight } from '@gravity-ui/icons';

export default function HeroBanner() {
  return (
    <section className="relative bg-white  overflow-hidden py-20 lg:py-32 border-b border-slate-100 ">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30 dark:opacity-20" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-400 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-sky-400 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Micro-badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
          ✨ Next-Gen Course Management System
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900  max-w-4xl mx-auto leading-[1.15]">
          Learn without limits. Teach without boundaries with{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            EduSnap
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600  max-w-2xl mx-auto leading-relaxed">
          The ultimate platform for seamless learning. Track course requirements, manage routines, schedule classes, and conquer exams all in one unified digital space.
        </p>

        {/* Action Call-to-Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/courses" 
            className="group w-full sm:w-auto inline-flex justify-center items-center h-12 px-6 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none transition-all duration-200"
          >
            Explore Courses
            <ChevronRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
          
          <Link 
            href="/apply" 
            className="w-full sm:w-auto inline-flex justify-center items-center h-12 px-6 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all duration-200"
          >
            Apply as an Instructor
          </Link>
        </div>

        {/* Mini Platform Stats / Proof points */}
        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-900/60 max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">50+</div>
            <div className="text-xs sm:text-sm text-slate-500">Expert Courses</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">10k+</div>
            <div className="text-xs sm:text-sm text-slate-500">Active Students</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">99%</div>
            <div className="text-xs sm:text-sm text-slate-500">Exam Pass Rate</div>
          </div>
        </div>

      </div>
    </section>
  );
}