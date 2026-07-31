'use client';

import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://edu-snap-dbms-api.vercel.app/api';

export default function StudentPaymentsPage({ studentId = 1 }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStudentPayments() {
      try {
        setLoading(true);

        // 1. Fetch all courses in parallel with payment history
        const [paymentsRes, coursesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/student-payments/student/${studentId}`),
          fetch(`${API_BASE_URL}/courses`)
        ]);

        if (!paymentsRes.ok) throw new Error('Failed to load payments history');

        const paymentsJson = await paymentsRes.json();
        const rawPayments = paymentsJson.data || [];

        // 2. Build course lookup map: { [courseId]: "Course Title" }
        let courseTitleMap = {};
        if (coursesRes.ok) {
          const coursesJson = await coursesRes.json();
          const coursesList = coursesJson.data || [];
          courseTitleMap = coursesList.reduce((acc, curr) => {
            acc[curr.courseId] = curr.title || curr.name;
            return acc;
          }, {});
        }

        // 3. Attach actual course title to each payment
        const enrichedPayments = rawPayments.map((payment) => ({
          ...payment,
          courseTitle: courseTitleMap[payment.courseId] || `Course #${payment.courseId}`
        }));

        setPayments(enrichedPayments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStudentPayments();
  }, [studentId]);

  // Derived Financial Stats
  const totalPaid = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-500 font-medium">
        Loading payment receipts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
        Error loading billing history: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10 text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Billing & Payments 💳
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review transaction logs, payment receipts, and tuition fee details.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Total Amount Paid</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
            ৳{totalPaid.toLocaleString()}
          </h3>
          <span className="text-xs font-medium text-emerald-600 mt-1 inline-block">
            Verified Transactions
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Total Transactions</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{payments.length}</h3>
          <span className="text-xs font-medium text-amber-600 mt-1 inline-block">
            Receipts Generated
          </span>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-[#0F172A] text-white p-5">
          <h2 className="text-lg font-bold">Transaction History</h2>
        </div>

        {payments.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No payment history recorded for your account.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-xs border-b border-slate-200">
                <tr>
                  <th className="p-4">Payment ID</th>
                  <th className="p-4">Program Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment Due</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((payment) => (
                  <tr key={payment.paymentId} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">
                      #PAY-{payment.paymentId}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      {payment.courseTitle}
                    </td>
                    <td className="p-4 font-extrabold text-slate-900">
                      ৳{Number(payment.amount).toLocaleString()}
                    </td>
                    <td className="p-4 text-slate-500 text-xs">
                      {payment.paymentDue ? payment.paymentDue : 'Paid in Full'}
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 inline-block">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}