'use client';

import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://edu-snap-dbms-api.vercel.app/api';

export default function StudentExamsPage({ studentId = 1 }) {
  const [examsData, setExamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStudentExams() {
      try {
        setLoading(true);

        // 1. Fetch Student Enrollments to know which courses they take
        const enrollmentsRes = await fetch(`${API_BASE_URL}/enrollments/student/${studentId}`);
        if (!enrollmentsRes.ok) throw new Error('Failed to load enrolled courses');
        const enrollmentsJson = await enrollmentsRes.json();
        const enrollments = enrollmentsJson.data || [];

        // 2. Fetch Exams and Attempts for each Enrolled Course
        const examsPromises = enrollments.map(async (course) => {
          const examsRes = await fetch(`${API_BASE_URL}/exams/course/${course.courseId}`);
          if (!examsRes.ok) return [];
          const examsJson = await examsRes.json();
          const courseExams = examsJson.data || [];

          // Fetch attempts for each exam
          const examsWithAttempts = await Promise.all(
            courseExams.map(async (exam) => {
              const attemptsRes = await fetch(
                `${API_BASE_URL}/exams/${exam.examId}/attempts/${studentId}`
              );
              const attemptsJson = attemptsRes.ok ? await attemptsRes.json() : { data: [] };
              return {
                ...exam,
                courseTitle: course.title,
                attempts: attemptsJson.data || [],
              };
            })
          );

          return examsWithAttempts;
        });

        const allExamsNested = await Promise.all(examsPromises);
        setExamsData(allExamsNested.flat());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStudentExams();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-500 font-medium">
        Loading exams and performance records...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
        Error loading exams: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10 text-slate-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Exams & Performance 📝
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          View exam requirements, passing thresholds, and your past performance attempts.
        </p>
      </div>

      {examsData.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-base">
            No exams found for your current enrolled courses.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {examsData.map((exam) => {
            // Find highest marks obtained
            const bestAttempt = exam.attempts.reduce(
              (max, curr) => (Number(curr.marksObtained) > max ? Number(curr.marksObtained) : max),
              0
            );

            const hasAttempted = exam.attempts.length > 0;
            const isPassed = hasAttempted && bestAttempt >= exam.passingMarks;

            return (
              <div
                key={exam.examId}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Header Strip */}
                <div className="bg-[#0F172A] text-white p-4 px-6 flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      {exam.courseTitle}
                    </span>
                    <h3 className="text-lg font-bold">{exam.title || `Exam #${exam.examId}`}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {hasAttempted ? (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          isPassed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {isPassed ? 'PASSED' : 'RETAKE NEEDED'}
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-700 text-slate-300">
                        NOT ATTEMPTED
                      </span>
                    )}
                  </div>
                </div>

                {/* Exam Details Body */}
                <div className="p-6">
                  {/* Grid of Exam Constraints */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <p className="text-slate-500 font-semibold uppercase">Max Marks</p>
                      <p className="text-base font-bold text-slate-900 mt-0.5">{exam.maxMarks}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold uppercase">Passing Marks</p>
                      <p className="text-base font-bold text-slate-900 mt-0.5">{exam.passingMarks}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold uppercase">Duration</p>
                      <p className="text-base font-bold text-slate-900 mt-0.5">
                        {exam.durationMinutes ? `${exam.durationMinutes} Mins` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-semibold uppercase">Total Attempts</p>
                      <p className="text-base font-bold text-slate-900 mt-0.5">{exam.attempts.length}</p>
                    </div>
                  </div>

                  {/* Previous Attempts Table */}
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Attempt History
                  </h4>

                  {exam.attempts.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-100 text-slate-600 font-semibold uppercase border-b border-slate-200">
                          <tr>
                            <th className="p-3">Attempt #</th>
                            <th className="p-3">Marks Obtained</th>
                            <th className="p-3">Result Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {exam.attempts.map((att) => {
                            const passedThisAttempt = att.marksObtained >= exam.passingMarks;
                            return (
                              <tr key={att.attemptNumber} className="hover:bg-slate-50">
                                <td className="p-3 font-medium text-slate-900">
                                  Attempt #{att.attemptNumber}
                                </td>
                                <td className="p-3 font-bold text-slate-900">
                                  {att.marksObtained} / {exam.maxMarks}
                                </td>
                                <td className="p-3">
                                  <span
                                    className={`font-semibold ${
                                      passedThisAttempt ? 'text-emerald-600' : 'text-rose-600'
                                    }`}
                                  >
                                    {passedThisAttempt ? 'Passed' : 'Failed'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-xs italic">
                      No attempts recorded for this exam yet.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}