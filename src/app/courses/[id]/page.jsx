import React from 'react';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Calendar, Time, CircleCheck, Play, ArrowRight } from '@gravity-ui/icons';

// 1. Read data securely on the server
function getCourseById(id) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const courses = JSON.parse(fileData);
    return courses.find((c) => c.id === id) || null;
  } catch (error) {
    console.error("Failed to read course data:", error);
    return null;
  }
}

export default async function CourseDetailPage({ params }) {
  // Await params in Next.js dynamic routing
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    // Triggers standard Next.js 404 page
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      
      {/* Top Navigation Hub */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Academic Programs
        </Link>
      </div>

      {/* Hero Header Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Description & Curriculum Details (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-[11px] font-bold tracking-wider uppercase bg-sky-50 text-indigo-600 px-3 py-1.5 rounded-full border border-sky-100">
                {course.name.includes("Model Test") ? "🏆 Evaluation Series" : "📖 Full Academic Course"}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {course.name}
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Highlights Bullet List */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">What You Will Gain</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-slate-600 leading-normal">
                    <CircleCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Program Curriculum</h3>
              <div className="space-y-3">
                {course.curriculum.map((module, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 bg-white hover:bg-indigo-50/20 border border-slate-100 p-4 rounded-xl transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{module}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Image, Quick Stats & Purchase Box (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-indigo-100/30 overflow-hidden">
            
            {/* Aspect Video Card Image */}
            <div className="relative aspect-video w-full bg-slate-100 border-b border-slate-100">
              <Image 
                src={course.image} 
                alt={course.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Info Metrics Table */}
            <div className="p-6 space-y-6">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <span className="text-sm text-slate-500 font-medium">Program Fee</span>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  ৳{course.price.toLocaleString()} <span className="text-xs text-slate-400 font-normal">BDT</span>
                </span>
              </div>

              {/* Course Meta Data */}
              <div className="grid grid-cols-2 gap-4 text-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Duration</p>
                    <p className="text-xs font-bold">{course.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600">
                    <Play className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lessons</p>
                    <p className="text-xs font-bold">{course.lessons} Lectures</p>
                  </div>
                </div>
              </div>

              {/* Checkout Action */}
              <button className="w-full flex items-center justify-center gap-1.5 h-12 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all duration-200">
                Enroll In Course
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}