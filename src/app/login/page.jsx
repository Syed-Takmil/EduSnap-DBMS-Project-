"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { Person, Lock, Eye, EyeSlash, ChevronRight, ChartBar, Star } from '@gravity-ui/icons';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mimic standard server processing buffer
    setTimeout(() => {
      setLoading(false);
      alert(`Logged in successfully as ${formData.role}!`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex border-b border-slate-100">
      
      {/* LEFT COLUMN: Clean, high-contrast entry engine */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-white relative z-10 shadow-xl shadow-slate-200/50">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          {/* Logo & Anchor headers */}
          <div className="space-y-2">
            <Link href="/" className="inline-flex text-xl font-black text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
              Edu<span className="text-indigo-600">Snap</span>
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-3">Welcome Back</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Access your personalized learning ecosystem and model tests.
            </p>
          </div>

          {/* Core Interface Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Interactive Custom Segmented Tab for Roles */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Portal Profile</label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/40">
                {['student', 'teacher', 'admin'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role })}
                    className={`h-8 rounded-lg text-xs font-semibold capitalize transition-all ${
                      formData.role === role 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Compartment */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Person className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
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

            {/* Password Compartment */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-semibold text-indigo-600 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-11 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Action Trigger Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full h-11 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100 transition-all pt-0.5"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Enter Dashboard 
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Alternate Routing paths */}
          <p className="text-center text-xs text-slate-500 pt-2">
            Don't have an EduSnap account?{' '}
            <Link href="/signup" className="font-bold text-indigo-600 hover:underline">
              Create an account
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT COLUMN: Catchy, beautifully animated dashboard layout visualization */}
      <div className="hidden lg:flex lg:w-[55%] bg-slate-900 relative items-center justify-center overflow-hidden p-12">
        
        {/* Floating Glowing Aura Nodes */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-indigo-500/30 blur-[140px] animate-pulse duration-10000" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-sky-500/20 blur-[100px] animate-pulse duration-7000" />
        </div>

        {/* Dashboard Frame Wrapper Mock */}
        <div className="w-full max-w-lg bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl relative z-10 space-y-6 animate-[fadeIn_0.6s_ease-out]">
          
          {/* Mock Top bar header layout */}
          <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase ml-2">Live Live Analytics Deck</span>
            </div>
            <div className="px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/30 text-[10px] font-bold text-indigo-400">
              SYS ACTIVE
            </div>
          </div>

          {/* Interactive Floating Card Matrix 1: Profile rank metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 border border-slate-700/40 rounded-xl p-4 space-y-2 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">National Percentile</span>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
              </div>
              <div className="text-2xl font-black text-white">99.42%</div>
              <div className="text-[10px] text-emerald-400 font-semibold">Rank: 14th (BUET Track)</div>
            </div>

            <div className="bg-slate-800 border border-slate-700/40 rounded-xl p-4 space-y-2 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Scripts Checked</span>
                <ChartBar className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <div className="text-2xl font-black text-white">42 / 45</div>
              <div className="text-[10px] text-slate-400 font-medium">3 Pending Evaluation</div>
            </div>
          </div>

          {/* Animated Component Mock 2: Core Matrix bars loops */}
          <div className="bg-slate-800/80 border border-slate-700/40 rounded-xl p-5 space-y-4">
            <div className="text-xs font-bold text-white tracking-tight">Weakness Diagnostic Evaluation Index</div>
            <div className="space-y-2.5">
              {[
                { name: 'Physics (Mechanics & Waves)', val: 'w-[92%]', color: 'bg-indigo-500', pct: '92%' },
                { name: 'Chemistry (Organic Structures)', val: 'w-[64%]', color: 'bg-amber-500', pct: '64%' },
                { name: 'Mathematics (Calculus Core)', val: 'w-[88%]', color: 'bg-sky-500', pct: '88%' }
              ].map((bar, bIdx) => (
                <div key={bIdx} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium text-slate-400">
                    <span>{bar.name}</span>
                    <span className="text-white font-bold">{bar.pct}</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className={`${bar.color} h-full rounded-full ${bar.val} transition-all duration-1000 origin-left animate-[scaleX_1s_ease-out]`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Informational Subtext */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              "Concept-driven evaluations mapping textbook modules directly to high-tier engineering standards."
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}