




import React from 'react';
import { ArrowRight } from '@gravity-ui/icons';
import Image from 'next/image';

export default function CourseCard({ course }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-300 flex flex-col overflow-hidden h-full">
      
      {/* Course Image Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
        width={100}
        height={100}
          src={course.image} 
          alt={course.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          priority={true} /* 🚀 THIS FIXES THE LCP WARNING */
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
      </div>

      {/* Course Details Text Section */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          {/* Dynamic Academic Tag Generation */}
          <div className="inline-block text-[11px] font-bold tracking-wider uppercase bg-sky-50 text-indigo-600 px-2.5 py-1 rounded-md border border-sky-100">
            {course.name.includes("Model Test") ? "🏆 Assessment" : "📖 Academic Program"}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
            {course.name}
          </h3>

          {/* Large Description block with strict multi-line truncation */}
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
            {course.description}
          </p>
        </div>

        {/* CTA Button at the bottom */}
    <div className='grid gap-2'>
          <button className="w-full flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl text-xs font-semibold bg-slate-50  text-slate-700 hover:text-black border border-slate-200 hover:border-indigo-600 transition-all duration-200">
          View Details
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </button>
         <button className="w-full flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-600  hover:text-white border text-white border-slate-200 hover:border-indigo-600 transition-all duration-200">
          Enroll Now
        </button>
    </div>
      </div>

    </div>
  );
}