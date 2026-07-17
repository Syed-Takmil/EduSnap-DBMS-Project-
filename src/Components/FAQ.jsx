
"use client";

import React, { useState } from 'react';
import {  LifeRing, ChevronDown } from '@gravity-ui/icons';

const FAQS = [
  {
    q: "How do online model tests run on EduSnap?",
    a: "Our model tests are divided into MCQ and Written scripts. MCQs are solved directly via our online exam interface with a strict ticking timer countdown. For written portions, you view the question script, write solutions on physical papers, snap photos, and upload them directly via your student panel dashboard within the deadline."
  },
  {
    q: "Are the evaluation scripts marked by actual examiners?",
    a: "Yes. All scripts uploaded to our engine are routed directly to our verified teacher panel consisting of BUET, Medical, and Public University graduates. They check scripts manually, submit custom inline review markers, and allocate marks based on standard board criteria."
  },
  {
    q: "What is the minimum fee tier structure for packages?",
    a: "As defined within our academic catalog schema boundaries, individual primary courses and short review assessment test packs begin at a baseline minimum threshold of ৳1,000 BDT. No core program is listed below this price point."
  },
  {
    q: "Can parents view performance data updates?",
    a: "Absolutely. The student dashboard tracks diagnostic analytics, exam metrics, and national ranks. Parents receive SMS performance reports after major model tests and can review mistake histories at any time through the student monitoring portal link."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id='faq' className="py-16 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Copy */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md border border-indigo-100">
            <LifeRing className="w-3.5 h-3.5" /> Support Center
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to know about our teaching models, registration system, and test mechanics.
          </p>
        </div>

        {/* Dynamic Accordion Deck Container */}
        <div className="space-y-3.5">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden transition-all duration-200"
              >
                {/* Trigger Button bar */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-indigo-600 text-sm transition-colors focus:outline-none"
                >
                  <span>{item.q}</span>
                  <ChevronDown 
                    className={`w-4 h-4 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} 
                  />
                </button>

                {/* Collapsible content compartment */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 border-t border-slate-100' : 'max-h-0'}`}
                >
                  <div className="p-5 text-xs sm:text-sm text-slate-500 leading-relaxed bg-slate-50/30">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}