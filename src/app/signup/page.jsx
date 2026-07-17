"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Person,  Envelope, Lock, ChevronRight,  Medal, GraduationCap, ShieldCheck } from '@gravity-ui/icons';

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', terms: false });
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.terms) return alert("Please approve the terms of service agreement.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Registration completed successfully!");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex border-b border-slate-100">
      
      {/* LEFT COLUMN: Catchy visual branding pillar */}
      <div className="hidden lg:flex lg:w-[55%] bg-indigo-600 relative items-center justify-center overflow-hidden p-12">
        
        {/* Dynamic Deep Ambient Mesh Lights */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sky-300 blur-[120px] animate-pulse duration-8000" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-white blur-[100px] animate-pulse duration-6000" />
        </div>

        {/* Feature Highlights Core Container */}
        <div className="w-full max-w-lg space-y-8 text-white relative z-10 animate-[fadeIn_0.6s_ease-out]">
          <div className="space-y-2">
            <div className="h-9 px-3 rounded-lg bg-white/10 border border-white/20 inline-flex items-center text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              🚀 Join Bangladesh's Premier Academy Ecosystem
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-[1.15] pt-2">
              Transform conceptual clarity into flawless grades.
            </h2>
          </div>

          {/* Bullet Feature Lists */}
          <div className="space-y-5">
            {[
              { icon: <GraduationCap className="w-5 h-5 text-sky-300" />, title: "Custom Diagnostic Matrices", text: "Automated analysis vectors tracking script mistakes down to specific formulas." },
              { icon: <Medal className="w-5 h-5 text-amber-300" />, title: "National Merit Pool Comparisons", text: "Compare live test score averages against thousands of active peers nationwide." },
              { icon: <ShieldCheck className="w-5 h-5 text-emerald-300" />, title: "Manual Verification Checks", text: "Written exams double-graded manually by verified BUET, DMC, and DU alumni." }
            ].map((feat, fIdx) => (
              <div key={fIdx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold">{feat.title}</h4>
                  <p className="text-xs text-indigo-100 mt-1 leading-relaxed">{feat.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Clean registration interface form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-white relative z-10 shadow-2xl shadow-slate-900/5">
        <div className="max-w-md w-full mx-auto space-y-7">
          
          {/* Identification labels */}
          <div className="space-y-2">
            <Link href="/" className="inline-flex text-xl font-black text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
              Edu<span className="text-indigo-600">Snap</span>
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-3">Create Student Account</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Get immediate enrollment mapping to dynamic mock schedules.
            </p>
          </div>

          {/* Form Processing System */}
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Full Name Element */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <Person className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Tahmid Rahman"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Email Address Element */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Envelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password Element */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Checkbox confirmation parameters */}
            <div className="flex items-start gap-2.5 pt-1">
              <input 
                type="checkbox" 
                id="terms"
                required
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-tight cursor-pointer selection:bg-transparent">
                I agree to the institutional <a href="#" className="font-semibold text-indigo-600 hover:underline">Terms of Service</a> and privacy mandates.
              </label>
            </div>

            {/* Execute Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full h-11 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100 transition-all pt-0.5"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Register Student Profile 
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Alternative path redirect links */}
          <p className="text-center text-xs text-slate-500 pt-1">
            Already have an EduSnap account?{' '}
            <Link href="/login" className="font-bold text-indigo-600 hover:underline">
              Log in here
            </Link>
          </p>

        </div>
      </div>

    </main>
  );
}