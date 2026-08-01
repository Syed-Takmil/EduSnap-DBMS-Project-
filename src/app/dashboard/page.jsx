'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://edu-snap-dbms-api.vercel.app/api';

export default function StudentDashboard({ studentId = 1 }) {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [examAttempts, setExamAttempts] = useState([]);
  const [availableExams, setAvailableExams] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        // 1. Fetch ALL Courses first for master title lookup
        const allCoursesRes = await fetch(`${API_BASE_URL}/courses`);
        let allCourses = [];
        if (allCoursesRes.ok) {
          const allCoursesJson = await allCoursesRes.json();
          allCourses = allCoursesJson.data || [];
        }

        const courseTitleMap = allCourses.reduce((acc, c) => {
          acc[c.courseId] = c.title || c.name || `Course #${c.courseId}`;
          return acc;
        }, {});

        // 2. Fetch Student Payments
        const paymentsRes = await fetch(`${API_BASE_URL}/student-payments/student/${studentId}`);
        let fetchedPayments = [];
        if (paymentsRes.ok) {
          const paymentsJson = await paymentsRes.json();
          fetchedPayments = paymentsJson.data || [];
        }

        const enrichedPayments = fetchedPayments.map((p) => ({
          ...p,
          courseTitle: courseTitleMap[p.courseId] || `Course #${p.courseId}`,
        }));
        setPayments(enrichedPayments);

        // 3. Fetch Student Enrollments
        const enrollmentsRes = await fetch(`${API_BASE_URL}/enrollments/student/${studentId}`);
        let activeEnrollments = [];
        if (enrollmentsRes.ok) {
          const enrollmentsJson = await enrollmentsRes.json();
          activeEnrollments = enrollmentsJson.data || [];

          const enrichedEnrollments = activeEnrollments.map((item) => ({
            ...item,
            title: item.title || courseTitleMap[item.courseId] || `Course #${item.courseId}`,
          }));
          setEnrollments(enrichedEnrollments);
        }

        // 4. Fetch Routines & Exams dynamically per enrolled course
        if (activeEnrollments.length > 0) {
          // Fetch Schedules
          const schedulePromises = activeEnrollments.map((item) =>
            fetch(`${API_BASE_URL}/routines/course/${item.courseId}`)
              .then((res) => (res.ok ? res.json() : { data: [] }))
              .then((res) => {
                const list = res.data || [];
                return list.map((sched) => ({
                  ...sched,
                  courseTitle: courseTitleMap[sched.courseId] || courseTitleMap[item.courseId] || `Course #${sched.courseId}`,
                }));
              })
              .catch(() => [])
          );

          // Fetch Exams and map both Available Exams + Exam Attempts
          const allExamsArr = [];
          const examPromises = activeEnrollments.map((item) =>
            fetch(`${API_BASE_URL}/exams/course/${item.courseId}`)
              .then((res) => (res.ok ? res.json() : { data: [] }))
              .then(async (examsJson) => {
                const exams = examsJson.data || [];

                // Store exams for the "Take Exam" section
                exams.forEach((ex) => {
                  allExamsArr.push({
                    ...ex,
                    courseTitle: courseTitleMap[item.courseId] || `Course #${item.courseId}`,
                  });
                });

                // Fetch student attempts for each exam
                const attemptsArr = await Promise.all(
                  exams.map((exam) =>
                    fetch(`${API_BASE_URL}/exams/${exam.examId}/attempts/${studentId}`)
                      .then((res) => (res.ok ? res.json() : { data: [] }))
                      .then((res) => {
                        const attempts = res.data || [];
                        return attempts.map((att) => ({
                          ...att,
                          examTitle: exam.title || `Exam #${exam.examId}`,
                          courseTitle: courseTitleMap[item.courseId] || `Course #${item.courseId}`,
                          passingMarks: exam.passingMarks || 0,
                          maxMarks: exam.maxMarks || 100,
                        }));
                      })
                      .catch(() => [])
                  )
                );
                return attemptsArr.flat();
              })
              .catch(() => [])
          );

          const fetchedSchedules = await Promise.all(schedulePromises);
          const fetchedAttempts = await Promise.all(examPromises);

          setSchedules(fetchedSchedules.flat());
          setExamAttempts(fetchedAttempts.flat());
          setAvailableExams(allExamsArr);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [studentId]);

  // Derived Calculations
  const totalSpent = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const avgMarks = examAttempts.length
    ? Math.round(
        examAttempts.reduce((acc, curr) => acc + (Number(curr.marksObtained) || 0), 0) /
          examAttempts.length
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-600 font-medium">
        Loading Student Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Student Dashboard 👋</h1>
          <p className="text-slate-500 text-sm mt-1">
            Track your live schedules, course progress, exam marks, and transactions.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Enrolled Courses" value={`${enrollments.length} Active`} badge="In Progress" />
        <MetricCard title="Exam Attempts" value={`${examAttempts.length} Completed`} badge="Tracked" />
        <MetricCard title="Avg. Score" value={avgMarks ? `${avgMarks} pts` : 'N/A'} badge="Performance" />
        <MetricCard title="Total Spent" value={`৳${totalSpent.toLocaleString()}`} badge={`${payments.length} Payments`} />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Schedules & Take Exam Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Routine Schedule Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              📅 Live Schedule & Routine
            </h2>
            {schedules.length > 0 ? (
              schedules.map((sched, idx) => (
                <div
                  key={sched.routineId || idx}
                  className="bg-[#0F172A] text-white p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 mb-3"
                >
                  <div>
                    <span className="text-xs bg-amber-400 text-black px-2.5 py-1 rounded-md font-semibold uppercase">
                      {sched.dayOfWeek || (sched.isActive ? 'Active Class' : 'Scheduled')}
                    </span>
                    <h3 className="text-lg font-bold mt-2 text-white">
                      {sched.courseTitle}
                    </h3>
                    <p className="text-sm text-slate-300 mt-0.5">
                      Time: {sched.startTime || 'N/A'} - {sched.endTime || 'N/A'}
                    </p>
                  </div>
                  {sched.classLink ? (
                    <a
                      href={sched.classLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#F59E0B] hover:bg-amber-500 text-slate-950 text-center font-bold px-5 py-2.5 rounded-lg transition-colors w-full md:w-auto shadow-sm"
                    >
                      Join Class
                    </a>
                  ) : (
                    <span className="text-slate-400 text-xs italic">No Link Provided</span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm py-4">No live classes scheduled for today.</p>
            )}
          </div>

          {/* NEW: Take Exam / Quiz Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
              📝 Available Exams & Quizzes
            </h2>
            <p className="text-slate-500 text-xs mb-4">
              Select an assessment from your enrolled courses to attempt and record your score.
            </p>

            <div className="space-y-4">
              {availableExams.length > 0 ? (
                availableExams.map((exam) => (
                  <div
                    key={exam.examId}
                    className="border border-slate-200 p-4 rounded-xl bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">
                        {exam.courseTitle}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base mt-1">
                        {exam.title || `Exam #${exam.examId}`}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Max Marks: <strong className="text-slate-800">{exam.maxMarks}</strong> | Passing Marks: <strong className="text-slate-800">{exam.passingMarks}</strong> | Duration: {exam.durationMinutes || 30} mins [cite: 94]
                      </p>
                    </div>

                    <Link
                      href={`/dashboard/take_exam?examId=${exam.examId}&studentId=${studentId}`}
                      className="bg-[#0F172A] hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-xl text-xs transition text-center shrink-0 shadow-sm"
                    >
                      Take Exam Now →
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm py-2">No active exams available right now.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Exam Performances & Payment History */}
        <div className="space-y-8">
          {/* Exam Performances Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Exam Performances</h2>
            <div className="space-y-3">
              {examAttempts.length > 0 ? (
                examAttempts.map((attempt, idx) => {
                  const isPassed = attempt.marksObtained >= attempt.passingMarks;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">
                          {attempt.courseTitle || 'Course Assessment'}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">
                          {attempt.examTitle}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Attempt #{attempt.attemptNumber || 1}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900 block">
                          {attempt.marksObtained} Marks
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                            isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isPassed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-500 text-sm py-2">No exam attempts recorded yet.</p>
              )}
            </div>
          </div>

          {/* Payment Receipts Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Receipts</h2>
            <div className="space-y-3">
              {payments.length > 0 ? (
                payments.map((txn) => (
                  <div
                    key={txn.paymentId}
                    className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{txn.courseTitle}</h4>
                      <p className="text-slate-500 mt-0.5">Receipt #PAY-{txn.paymentId}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-slate-900 text-sm block">
                        ৳{Number(txn.amount).toLocaleString()}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Paid
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm py-2">No payment history available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, badge }) {
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
      <p className="text-xs text-slate-500 font-semibold uppercase">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
      <span className="text-xs font-medium text-amber-600 mt-1 inline-block">{badge}</span>
    </div>
  );
}