"use client";

import React, { useState } from 'react';
import { Envelope,  Handset, Pin, CircleCheck } from '@gravity-ui/icons';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact submission sent:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xl shadow-indigo-100/30 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Info Column (Left 5 Units) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 md:p-12 text-white flex flex-col justify-between space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Get in Touch</h2>
            <p className="text-indigo-100/80 text-sm leading-relaxed">
              Have questions about registration details, batch schedules, or academic syllabi? Our support team is here to assist.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Handset className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Call Support Desk</p>
                <p className="text-sm font-semibold">+880 1700-000000</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Envelope className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Email Admissions</p>
                <p className="text-sm font-semibold">support@edusnap.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Pin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Central Academic Branch</p>
                <p className="text-sm font-semibold">Farmgate, Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="border-t border-indigo-500/50 pt-6">
            <p className="text-xs text-indigo-200">
              Office Hours: Daily 9:00 AM – 8:00 PM (Except national holidays)
            </p>
          </div>
        </div>

        {/* Form Column (Right 7 Units) */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CircleCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Dispatched!</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                Your message has been logged under our support queue. A representative will contact you via email or phone within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Send an Inquiry</h3>
                <p className="text-xs text-slate-500">Fill out this quick form and we'll route you to the correct department.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Anisur Rahman"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50/50 text-sm text-slate-900 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="017xxxxxxxx"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50/50 text-sm text-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="anis@example.com"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50/50 text-sm text-slate-900 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Detailed Message</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the courses or batch options you're looking for..."
                  className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 bg-slate-50/50 text-sm text-slate-900 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all duration-200 pt-1"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}