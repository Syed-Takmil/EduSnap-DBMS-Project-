"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Clock, 
  GraduationCap, 
  ChevronRight,
  LayoutHeader
} from '@gravity-ui/icons';
import CustomLoading from '@/Components/shared/CustomLoading';

export default function CourseDetailsPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const courseId = params?.id;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    fetch(`https://edu-snap-dbms-api.vercel.app/api/courses/${courseId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch course details");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          setCourse(data.data);
        } else {
          setError("Course details not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course details:", err);
        setError("Unable to load course details. Please try again later.");
        setLoading(false);
      });
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-slate-500">
        <CustomLoading />
        <span className="text-sm font-medium">Loading course information...</span>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Course Not Found</h2>
        <p className="text-slate-500">{error || "The requested course does not exist."}</p>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
      </div>
    );
  }

  const formattedPrice = Number(course.price || 0).toLocaleString('en-US');

  return (
    <div className="bg-[#fcfbf7] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/courses" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Courses
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 truncate max-w-xs md:max-w-md">{course.title}</span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Block */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase bg-[#111827] text-amber-400 px-3 py-1.5 rounded-lg">
                <LayoutHeader className="w-4 h-4" />
                {course.title.includes("Model Test") ? "Assessment Program" : "Academic Program"}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2 border-t border-slate-100">
                {course.description}
              </p>
            </div>

            {/* What You Gain */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">What You'll Gain from This Course</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Comprehensive step-by-step curriculum",
                  "Hands-on real-world industry projects",
                  "Direct instructor support & code reviews",
                  "Lifetime access to learning resources",
                  "Verified completion certificate",
                  "Interactive assessments & quizzes"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#faf9f5] border border-slate-200/60">
                    <div className="p-1 rounded-md bg-amber-400 text-slate-950 shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Details (Admin ID is completely removed here) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Program Information</h3>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#faf9f5] border border-slate-200/60">
                  <span className="text-xs text-slate-400 font-medium block mb-1">Course Code</span>
                  <span className="text-base font-bold text-slate-800">#CRS-{course.courseId}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#faf9f5] border border-slate-200/60">
                  <span className="text-xs text-slate-400 font-medium block mb-1">Access Level</span>
                  <span className="text-base font-bold text-slate-800">Full Lifetime Access</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sticky Checkout Box) */}
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-8 space-y-6">
              
              {/* Price Banner */}
              <div className="bg-[#111827] rounded-2xl p-6 text-white space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tuition Fee
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-amber-400">৳{formattedPrice}</span>
                  <span className="text-xs text-slate-400">BDT</span>
                </div>
                <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  One-time payment for complete course access
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href={{
                    pathname: '/confirm-payment',
                    query: { courseId: course.courseId }
                  }}
                  className="w-full flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-[#ffb703] hover:bg-[#f5a623] text-slate-950 font-black text-sm transition-all duration-200 shadow-md active:scale-[0.98]"
                >
                  Enroll Now
                </Link>

                <Link
                  href="/courses"
                  className="w-full flex items-center justify-center gap-2 h-11 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all duration-200"
                >
                  Explore Other Programs
                </Link>
              </div>

              {/* Security & Support Guarantees */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Verified & Instant Access</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Self-Paced Flexible Learning</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}