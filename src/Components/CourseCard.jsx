// components/CourseCard.jsx
import React from 'react';
import { ArrowRight, LayoutHeader } from '@gravity-ui/icons';
import Link from 'next/link';

export default function CourseCard({ course }) {
  const formattedPrice = course?.price
    ? Number(course.price).toLocaleString('en-US')
    : 'N/A';

  const isAssessment = course?.title?.includes('Model Test');

  return (
    <div className="group bg-[#FBF9F4] rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:shadow-slate-900/10 hover:border-amber-300/60 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full">
      {/* Decorative Header Banner */}
      <div className="relative h-28 bg-linear-to-br from-[#0B1524] via-[#122036] to-[#1B2A44] p-5 flex flex-col justify-between overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-amber-400/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:16px_16px] pointer-events-none" />

        {/* Category Badge & Price */}
        <div className="flex items-center justify-between relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md text-amber-200 px-2.5 py-1 rounded-lg border border-white/10">
            {isAssessment ? '🏆 Assessment' : '📖 Program'}
          </span>
          <span className="text-sm font-black text-amber-50 bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg border border-amber-400/20">
            ৳{formattedPrice}
          </span>
        </div>

        <div className="relative z-10 self-start text-amber-200/80">
          <LayoutHeader className="w-6 h-6" />
        </div>
      </div>

      {/* Course Details Text Section */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#122036] transition-colors line-clamp-2">
            {course?.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
            {course?.description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="grid gap-2 pt-4 border-t border-stone-200">
          <Link
            href={`/courses/${course?.courseId}`}
            className="w-full flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:text-slate-900 hover:bg-stone-100 border border-stone-200 transition-all duration-200"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href={{
              pathname: '/confirm-payment',
              query: { courseId: course?.courseId },
            }}
            className="w-full flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-[#0B1524] transition-all duration-200 shadow-sm shadow-amber-400/30"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}