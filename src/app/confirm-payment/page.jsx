'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://edu-snap-dbms-api.vercel.app/api';

function ConfirmPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId');

  // Hardcoded for now — update with your session/auth user state
  const studentId = 1;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch course details for confirmation summary
  useEffect(() => {
    if (!courseId) {
      setError('No course selected.');
      setLoading(false);
      return;
    }

    async function fetchCourseDetails() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/courses/${courseId}`);
        if (!res.ok) throw new Error('Failed to load course details');
        const json = await res.json();
        setCourse(json.data || json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourseDetails();
  }, [courseId]);

  // Submit combined Enrollment + Payment to backend
  const handleConfirmEnrollment = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Validate course price before submission
      const paymentAmount = Number(course?.price || 0);

      // Endpoint creates BOTH the enrollment record AND the student payment receipt in DB
      const res = await fetch(`${API_BASE_URL}/enrollments/with-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: Number(studentId),
          courseId: Number(courseId),
          amount: paymentAmount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to complete payment and enrollment');
      }

      // Success! Redirect to student dashboard where new course & payment history appear
      router.push('/dashboard/courses');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-600 font-medium">
        Loading payment summary...
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-6 flex flex-col items-center justify-center text-center">
        <div className="p-6 bg-white border border-red-200 rounded-2xl max-w-md w-full shadow-sm">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => router.push('/courses')}
            className="px-4 py-2 bg-[#0B1524] text-amber-400 font-bold rounded-xl text-xs"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-12 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl max-w-lg w-full overflow-hidden">
        {/* Dark Header Banner */}
        <div className="bg-[#0B1524] text-white p-6">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Confirm Enrollment
          </span>
          <h1 className="text-2xl font-black mt-1">Payment & Registration</h1>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
              {error}
            </div>
          )}

          {/* Course Summary Box */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <h2 className="font-bold text-slate-900 text-base">
              {course?.title || `Course #${courseId}`}
            </h2>
            <p className="text-xs text-slate-500 line-clamp-2">
              {course?.description || 'No course details available.'}
            </p>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-3 text-sm text-slate-700 pt-2 border-t border-stone-200">
            <div className="flex justify-between">
              <span>Student ID</span>
              <span className="font-bold text-slate-900">#{studentId}</span>
            </div>
            <div className="flex justify-between">
              <span>Course Fee</span>
              <span className="font-bold text-slate-900">
                ৳{course?.price ? Number(course.price).toLocaleString('en-US') : '0'}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-dashed border-stone-300">
              <span>Total Amount</span>
              <span className="text-amber-600">
                ৳{course?.price ? Number(course.price).toLocaleString('en-US') : '0'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleConfirmEnrollment}
              disabled={submitting}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-[#0B1524] font-black rounded-xl text-sm transition shadow-md shadow-amber-400/20 disabled:opacity-50"
            >
              {submitting ? 'Processing Payment & Enrollment...' : 'Confirm & Complete Enrollment'}
            </button>
            <button
              onClick={() => router.back()}
              disabled={submitting}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-semibold rounded-xl text-xs transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-600 font-medium">
          Loading...
        </div>
      }
    >
      <ConfirmPaymentContent />
    </Suspense>
  );
}