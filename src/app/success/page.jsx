"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CircleCheck, CreditCard, LayoutCells, ArrowRight, Copy } from '@gravity-ui/icons';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || 'cs_live_B19x28...';
  const courseId = searchParams.get('course_id') || 'crs_001';

  const [syncStatus, setSyncStatus] = useState('verifying'); // verifying | success | error
  const [copied, setCopied] = useState(false);

  // Simulate a live backend handshake verification loop for Stripe Webhooks
  useEffect(() => {
    const timer = setTimeout(() => {
      setSyncStatus('success');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const copyReceiptId = () => {
    navigator.clipboard.writeText(sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200/60 p-8 md:p-10 shadow-xl shadow-indigo-100/20 space-y-8 text-center relative overflow-hidden">
        
        {/* Dynamic Stripe Status Indicator Rings */}
        {syncStatus === 'verifying' ? (
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto relative">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
            <CreditCard className="w-6 h-6" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 animate-[fadeIn_0.4s_ease-out]">
            <CircleCheck className="w-8 h-8" />
          </div>
        )}

        {/* Dynamic Heading Text Layout */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {syncStatus === 'verifying' ? 'Verifying Stripe Escrow...' : 'Payment Successfully Processed!'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            {syncStatus === 'verifying' 
              ? 'We are confirming the bank settlement token with the Stripe Gateway pipeline.' 
              : 'Your transaction records have cleared. The academic program structures are now fully accessible on your panel.'}
          </p>
        </div>

        {/* Invoice Breakdown Deck Panel */}
        {syncStatus === 'success' && (
          <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-5 space-y-3 text-left animate-[fadeIn_0.5s_ease-out]">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5 text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wide">Transaction Parameter</span>
              <span className="text-slate-800 uppercase tracking-wide">Verified Registry</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Payment Channel</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">💳 Stripe Secure Gateway</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Gateway Settlement status</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold text-[10px]">SUCCESS_PAID</span>
            </div>

            <div className="flex justify-between items-start text-xs pt-1">
              <span className="text-slate-500 font-medium mt-0.5">Stripe Session Token</span>
              <button 
                onClick={copyReceiptId}
                className="font-mono text-[10px] text-indigo-600 bg-white border rounded px-2 py-1 max-w-[200px] truncate flex items-center gap-1 hover:bg-slate-50 transition-colors"
                title="Click to copy receipt id"
              >
                {sessionId}
                <Copy className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        )}

        {/* Action Button Navigation Portal Blocks */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link 
            href="/dashboard/student"
            className={`flex-1 inline-flex items-center justify-center gap-1.5 h-12 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all pt-0.5 ${
              syncStatus === 'verifying' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            <LayoutCells className="w-4 h-4" />
            Enter Student Portal
          </Link>
          
          <Link 
            href="/dashboard/student/courses" 
            className={`h-12 px-6 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center justify-center gap-1.5 pt-0.5 ${
              syncStatus === 'verifying' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            My Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Context Toast Confirmation */}
        {copied && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md animate-fade-in">
            Receipt ID Copied to Clipboard
          </div>
        )}

      </div>
    </div>
  );
}