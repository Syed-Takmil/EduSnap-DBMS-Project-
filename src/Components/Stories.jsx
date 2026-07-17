

import React from 'react';
import { Medal, Star, CircleCheck } from '@gravity-ui/icons';

const ALUMNI = [
  {
    name: "Tahmid Rahman",
    achievement: "BUET Merit Position: 14th",
    program: "HSC Model Test Pack",
    quote: "EduSnap's mock tests mirrored the actual engineering written pattern perfectly. The diagnostic dashboards pinpointed exactly where my calculation speeds lagged.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Fariha Sultana",
    achievement: "Dhaka Medical College (DMC) Selected",
    program: "Class 11-12 Complete Core",
    quote: "The chemistry conceptual modules cleared up my organic compound tracking bugs. I didn't have to memorize random exceptions blindly anymore.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Asif Elahi",
    achievement: "Dhaka University 'A' Unit Merit: 42nd",
    program: "HSC University Admission Program",
    quote: "The high-velocity shortcut tricks in the physics lectures completely saved my time during the rapid MCQ rounds. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export default function SuccessStories() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Content */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-3 py-1 rounded-md border border-emerald-100">
            <Medal className="w-3.5 h-3.5" /> Wall of Fame
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Real Stories, Exceptional Results
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            See how our concept-first methodology translates into top merit ranks across national examinations.
          </p>
        </div>

        {/* Profile Grid Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALUMNI.map((student, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50/50 rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between space-y-6 hover:shadow-lg hover:shadow-indigo-50/40 transition-shadow duration-300"
            >
              <div className="space-y-4">
                {/* Visual 5-Star Rating block */}
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{student.quote}"
                </p>
              </div>

              {/* Bio Footnotes block */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                  <img 
                    src={student.image} 
                    alt={student.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-none">{student.name}</h4>
                  <p className="text-[11px] font-semibold text-indigo-600 mt-1 flex items-center gap-1">
                    <CircleCheck className="w-3 h-3 text-emerald-500" /> {student.achievement}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{student.program}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}