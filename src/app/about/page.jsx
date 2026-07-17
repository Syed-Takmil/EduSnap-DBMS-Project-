


import React from 'react';
import Image from 'next/image';
import { Shield, BookOpen, Persons, Medal } from '@gravity-ui/icons';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-block text-[11px] font-bold tracking-wider uppercase bg-sky-50 text-indigo-600 px-3 py-1.5 rounded-full border border-sky-100">
            Our Story & Vision
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            Redefining Academic Preparation for the Next Generation
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            EduSnap bridges the gap between traditional board examinations and high-stakes university admission standards with precise, structured, and accessible learning modules.
          </p>
        </div>
      </section>

      {/* Narrative Section with Image */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-200">
            <Image 
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" 
              alt="Students collaborating" 
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Why We Started EduSnap
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              In secondary and higher-secondary education levels, students often struggle to reconcile their regular school curriculum with the rapid execution speeds required by elite engineering, medical, and public university admission tests. 
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              We founded EduSnap to deliver a balanced academic ecosystem. Here, class 8 to 12 students are not just taught formulas to memorize; they learn the underlying physical, mathematical, and chemical structures. This process transforms stressful test-prep into a rewarding analytical journey.
            </p>
            
            {/* Direct Quote Block */}
            <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 italic text-slate-700 font-medium text-sm">
              "We believe true conceptual learning is achieved when simulation, rigorous continuous evaluation, and high-quality teaching combine."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="bg-white border-y border-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Our Core Pillars</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">The foundations that drive every curriculum, model test design, and resource we create.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Concept-First Curriculum</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                We design learning schedules starting with root conceptual theories before moving on to shortcuts and final exams.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Medal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Rigorous Evaluation</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Model tests are developed based on actual board exam frameworks to give students a realistic practice environment.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Persons className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Expert Mentorship</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Learn from top university graduates and board examiners who understand exactly what it takes to perform under pressure.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Uncompromising Integrity</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Transparent marking, genuine parent tracking progress reports, and reliable question bank standards.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}