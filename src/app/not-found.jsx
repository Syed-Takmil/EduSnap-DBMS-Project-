import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from '@gravity-ui/icons';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Graphic / Icon Container */}
        <div className="relative flex justify-center">
          {/* Soft blue glowing background circle */}
          <div className="absolute inset-0 m-auto w-32 h-32 bg-sky-100 rounded-full blur-xl opacity-70" />
          
          <div className="relative w-24 h-24 bg-white rounded-2xl shadow-xl shadow-sky-100 border border-sky-100 flex items-center justify-center text-indigo-600">
            <Compass className="w-12 h-12 animate-spin-slow" style={{ animationDuration: '8s' }} />
          </div>
          
          {/* 404 Badge Floating */}
          <span className="absolute bottom-0 right-1/3 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            Error 404
          </span>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight sm:text-4xl">
            Classroom Not Found
          </h1>
          <p className="text-base text-slate-600 max-w-xs mx-auto leading-relaxed">
            Oops! It looks like this course route doesn't exist, or the lesson has been archived by the administrator.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          <Link
            href="/"
            className="group w-full sm:w-auto inline-flex justify-center items-center h-11 px-5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>
          
          <Link
            href="/support"
            className="w-full sm:w-auto inline-flex justify-center items-center h-11 px-5 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all duration-200"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}