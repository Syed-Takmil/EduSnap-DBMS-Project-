


"use client";

import React, { useState } from 'react';
import { ChevronRight,  TriangleExclamationFill, ArrowLeft } from '@gravity-ui/icons';
import Link from 'next/link';

export default function ApplyAsTeacher() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume_link: '',
    demo_link: '',
    subject: 'Physics' // Default choice
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [youtubeError, setYoutubeError] = useState(false);

  // Helper function to validate standard YouTube formats
  const validateYouTubeUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    return regExp.test(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'demo_link') {
      if (value && !validateYouTubeUrl(value)) {
        setYoutubeError(true);
      } else {
        setYoutubeError(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (youtubeError || !formData.demo_link) {
      alert("Please provide a valid YouTube video link for your demo class.");
      return;
    }

    console.log("Submitting applicant payload to backend schema:", formData);
    // Future API link: await fetch('/api/applicants', { method: 'POST', body: JSON.stringify(formData) })
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-100 p-8 text-center shadow-xl shadow-indigo-100/40 space-y-5">
          <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto border border-sky-100">
            🎉
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Application Received!</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. Your details and demo lesson for <span className="font-semibold text-slate-800">{formData.subject}</span> have been routed to the administration review dashboard.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100">
            <ArrowLeft className="w-3.5 h-3.5" /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-slate-100 p-8 md:p-10 shadow-xl shadow-indigo-100/30 space-y-8">
        
        {/* Header Text */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Join the <span className="text-indigo-600">EduSnap</span> Faculty
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Submit your application details below. Our academic monitoring board reviews entries daily.
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Anisur Rahman"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50/50 text-sm transition-colors text-slate-900"
            />
          </div>

          {/* Applicant Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50/50 text-sm transition-colors text-slate-900"
            />
          </div>

          {/* Subject Selection (Udvash Styled Options) */}
          <div>
            <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Primary Subject of Interest
            </label>
            <select
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50/50 text-sm transition-colors text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
            >
              <option value="Physics">Physics (SSC / HSC)</option>
              <option value="Chemistry">Chemistry (SSC / HSC)</option>
              <option value="Higher Mathematics">Higher Mathematics (HSC)</option>
              <option value="General Science">General Science (Class 8-10)</option>
              <option value="English & ICT">English & ICT Core</option>
            </select>
          </div>

          {/* Resume Link */}
          <div>
            <label htmlFor="resume_link" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Resume Link (Google Drive / Dropbox)
            </label>
            <input
              type="url"
              name="resume_link"
              id="resume_link"
              required
              value={formData.resume_link}
              onChange={handleChange}
              placeholder="https://drive.google.com/.../view"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50/50 text-sm transition-colors text-slate-900"
            />
          </div>

          {/* Demo Video Link */}
          <div>
            <label htmlFor="demo_link" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              YouTube Demo Lecture Link
            </label>
            <input
              type="url"
              name="demo_link"
              id="demo_link"
              required
              value={formData.demo_link}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className={`w-full h-11 px-4 rounded-xl border focus:outline-none bg-slate-50/50 text-sm transition-colors text-slate-900 ${
                youtubeError ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
              }`}
            />
            {youtubeError && (
              <p className="mt-2 text-xs text-red-500 flex items-center gap-1 animate-fadeIn">
                <TriangleExclamationFill className="w-3.5 h-3.5" /> Please enter a valid YouTube video address.
              </p>
            )}
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            disabled={youtubeError}
            className="w-full flex items-center justify-center gap-1.5 h-12 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 pt-1"
          >
            Submit Application Profile
            <ChevronRight className="w-4 h-4" />
          </button>

        </form>
      </div>
    </div>
  );
}