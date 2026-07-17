"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from '@gravity-ui/icons';

const SLIDES = [
  {
    badge: "✨ Next-Gen Student Learning Hub",
    title: "Learn without limits. Track your growth with ",
    accent: "EduSnap Students",
    desc: "The ultimate platform for seamless learning. Access live lectures, download professional model test scripts, view national merit rankings, and master board exam routines.",
    primaryBtn: "Explore Courses",
    primaryHref: "/courses",
    secondaryBtn: "Student Portal",
    secondaryHref: "/dashboard/student",
    stats: [
      { val: "10k+", label: "Active Students" },
      { val: "150+", label: "Model Tests Solved" },
      { val: "99%", label: "Exam Success Rate" }
    ]
  },
  {
    badge: "👨‍🏫 Faculty & Pedagogy Workspace",
    title: "Teach without boundaries. Empower the future via ",
    accent: "EduSnap Faculty",
    desc: "Evaluate scripts with our custom grading interface, manage online schedules, distribute lecture slides, and mentor thousands of students across Bangladesh.",
    primaryBtn: "Apply as Instructor",
    primaryHref: "/apply",
    secondaryBtn: "Teacher Login",
    secondaryHref: "/login",
    stats: [
      { val: "50+", label: "Expert Instructors" },
      { val: "24/7", label: "Mentor Standby" },
      { val: "1-on-1", label: "Script Reviews" }
    ]
  },
  {
    badge: "⚡ Complete Operational Oversight",
    title: "Manage robust institutional scales securely on ",
    accent: "EduSnap Central",
    desc: "An all-in-one administrator monitoring suite. Oversee live enrollment data, manage course dynamic fees, review onboarding video applications, and track support desks.",
    primaryBtn: "View Open Careers",
    primaryHref: "/about",
    secondaryBtn: "Admin Panel Access",
    secondaryHref: "/login",
    stats: [
      { val: "100%", label: "Automated Grading" },
      { val: "Farmgate", label: "Central Branch" },
      { val: "৳1,000+", label: "Flexible Packages" }
    ]
  }
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  // Auto-play interval mechanics
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); // Transitions to next user segment slide every 6 seconds
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  return (
    <section className="relative bg-white overflow-hidden py-16 lg:py-24 border-b border-slate-100 min-h-[680px] flex items-center">
      
      {/* Background Decorative Dynamic Ambient Glow Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-400 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-sky-400 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Manual Arrow Controllers */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex justify-between max-w-7xl mx-auto pointer-events-none">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm pointer-events-auto transition-transform hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-sm pointer-events-auto transition-transform hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Container Area */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* We slice and loop slides using transparent visual classes to handle snappy transitions */}
        {SLIDES.map((slide, idx) => {
          if (idx !== current) return null;
          
          return (
            <div key={idx} className="animate-[fadeIn_0.5s_ease-out] space-y-6">
              
              {/* Micro-badge */}
              <div className="inline-flex items-center text-white gap-2 px-3 py-1 rounded-full bg-indigo-500 border border-indigo-200 text-xs font-semibold uppercase tracking-wider">
                {slide.badge}
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15] pt-2">
                {slide.title}{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  {slide.accent}
                </span>
              </h1>

              {/* Subtitle / Description */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed pt-2">
                {slide.desc}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link 
                  href={slide.primaryHref} 
                  className="group w-full sm:w-auto inline-flex justify-center items-center h-12 px-6 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all duration-200"
                >
                  {slide.primaryBtn}
                  <ChevronRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
                
                <Link 
                  href={slide.secondaryHref} 
                  className="w-full sm:w-auto inline-flex justify-center items-center h-12 px-6 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all duration-200"
                >
                  {slide.secondaryBtn}
                </Link>
              </div>

              {/* Dynamic Stats Section mapping layout items */}
              <div className="pt-10">
                <div className="border-t border-slate-200 grid grid-cols-3 gap-4 pt-10 text-center max-w-3xl mx-auto">
                  {slide.stats.map((stat, sIdx) => (
                    <div key={sIdx}>
                      <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 tracking-tight">{stat.val}</div>
                      <div className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}

        {/* Carousel Bottom Pagination Indicator Dots/Pips */}
        <div className="mt-8 flex justify-center items-center gap-2.5 z-20 relative">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}