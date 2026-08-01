'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://edu-snap-dbms-api.vercel.app/api';

function TeacherDashboardContent() {
  const searchParams = useSearchParams();

  // Get teacher ID from URL query or default to 1 (Tara Teacher)
  const teacherId = searchParams.get('teacherId') || 1;

  const [teacher, setTeacher] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New Exam Modal State
  const [showExamModal, setShowExamModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [examForm, setExamForm] = useState({
    title: '',
    maxMarks: 100,
    passingMarks: 50,
    durationMinutes: 60,
  });
  const [creatingExam, setCreatingExam] = useState(false);

  useEffect(() => {
    async function fetchTeacherData() {
      try {
        setLoading(true);

        // 1. Fetch Teacher Info, All Master Courses, Conducted Assignments, Routines, and Payments in parallel
        const [teacherRes, allCoursesRes, conductsRes, routinesRes, paymentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/teachers/${teacherId}`),
          fetch(`${API_BASE_URL}/courses`),
          fetch(`${API_BASE_URL}/conducts/teacher/${teacherId}/courses`),
          fetch(`${API_BASE_URL}/routines/teacher/${teacherId}`),
          fetch(`${API_BASE_URL}/teacher-payments/teacher/${teacherId}`),
        ]);

        if (teacherRes.ok) {
          const tData = await teacherRes.json();
          setTeacher(tData.data || tData);
        }

        // 2. Build Master Course Map from /api/courses
        let masterCourses = [];
        if (allCoursesRes.ok) {
          const cJson = await allCoursesRes.json();
          masterCourses = cJson.data || [];
        }

        const courseMap = masterCourses.reduce((acc, course) => {
          acc[course.courseId] = course;
          return acc;
        }, {});

        // 3. Process Conducted Courses and merge with Master Course details
        if (conductsRes.ok) {
          const conductsJson = await conductsRes.json();
          const conductsList = conductsJson.data || [];

          const fullAssignedCourses = conductsList.map((item) => {
            const courseDetails = courseMap[item] || {};
            // console.log(courseDetails);
            return {
              courseId: item,
              title: courseDetails.title || item.title || item.courseTitle || `Course #${item.courseId}`,
              description: courseDetails.description || item.description || 'No detailed course description available.',
              price: Number(courseDetails.price || item.price || item.coursePrice || 0),
            };
          });
          
        
          
          setAssignedCourses(fullAssignedCourses);
        }
        // console.log(assignedCourses);
        console.log(setAssignedCourses);
        
        
        // 4. Enrich Routines with Course Titles from courseMap
        if (routinesRes.ok) {
          const rData = await routinesRes.json();
          const rawRoutines = rData.data || [];

          const enrichedRoutines = rawRoutines.map((sched) => ({
            ...sched,
            courseTitle: courseMap[sched.courseId]?.title || `Course #${sched.courseId}`,
          }));

          setRoutines(enrichedRoutines);
        }

        // 5. Load Payments
        if (paymentsRes.ok) {
          const pData = await paymentsRes.json();
          setPayments(pData.data || []);
        }
      } catch (err) {
        console.error('Error loading teacher dashboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeacherData();
  }, [teacherId]);

  // Handle Creating a New Exam for a Course
  const handleCreateExam = async (e) => {
    e.preventDefault();
    if (!selectedCourseId) return alert('Please select a course');

    try {
      setCreatingExam(true);
      const res = await fetch(`${API_BASE_URL}/exams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: examForm.title,
          maxMarks: Number(examForm.maxMarks),
          passingMarks: Number(examForm.passingMarks),
          durationMinutes: Number(examForm.durationMinutes),
          courseId: Number(selectedCourseId),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create exam');

      alert('Exam created successfully!');
      setShowExamModal(false);
      setExamForm({ title: '', maxMarks: 100, passingMarks: 50, durationMinutes: 60 });
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setCreatingExam(false);
    }
  };

  const totalEarnings = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-600 font-medium">
        Loading Teacher Portal...
      </div>
    );
  }
  console.log(assignedCourses);
  

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 p-6 md:p-10">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Faculty Dashboard
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            Welcome, {teacher?.name || 'Instructor'} 👨‍🏫
          </h1>
          <p className="text-slate-500 text-sm mt-1">{teacher?.email}</p>
        </div>

        <button
          onClick={() => {
            if (assignedCourses.length > 0) {
              setSelectedCourseId(assignedCourses[0].courseId);
            }
            setShowExamModal(true);
          }}
          className="mt-4 md:mt-0 px-5 py-3 bg-[#0F172A] hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs transition shadow-md flex items-center gap-2"
        >
          ➕ Create Course Exam
        </button>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Assigned Courses</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{assignedCourses.length} Programs</h3>
          <span className="text-xs font-medium text-amber-600 mt-1 inline-block">Active Teaching Load</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Scheduled Classes</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{routines.length} Routines</h3>
          <span className="text-xs font-medium text-emerald-600 mt-1 inline-block">Weekly Sessions</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Total Compensation</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">৳{totalEarnings.toLocaleString()}</h3>
          <span className="text-xs font-medium text-indigo-600 mt-1 inline-block">
            {payments.length} Disbursements Received
          </span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Conducted Courses & Class Routines */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Conducted Courses Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Assigned Programs</h2>
            {assignedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignedCourses.map((course) => (
                  <div key={course.courseId} className="border border-slate-200 p-4 rounded-xl bg-slate-50 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold bg-[#0F172A] text-amber-400 px-2.5 py-1 rounded-md uppercase">
                        Course #{course.courseId}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-2.5">{course.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                    <p className="text-xs font-extrabold text-slate-900 mt-4 pt-3 border-t border-slate-200/60">
                      Price: ৳{course.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No courses assigned to teach yet.</p>
            )}
          </div>

          {/* Class Routine Schedules */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Class Routines</h2>
            {routines.length > 0 ? (
              <div className="space-y-3">
                {routines.map((sched) => (
                  <div
                    key={sched.routineId}
                    className="bg-[#0F172A] text-white p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4"
                  >
                    <div>
                      <span className="text-xs bg-amber-400 text-black px-2.5 py-1 rounded-md font-bold uppercase">
                        Routine #{sched.routineId}
                      </span>
                      <h3 className="text-base font-bold mt-2 text-white">
                        {sched.courseTitle}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Time: {sched.startTime} - {sched.endTime}
                      </p>
                    </div>
                    {sched.classLink ? (
                      <a
                        href={sched.classLink}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#F59E0B] hover:bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs transition"
                      >
                        Start Live Stream →
                      </a>
                    ) : (
                      <span className="text-slate-400 text-xs italic">No Link Provided</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No teaching routines configured.</p>
            )}
          </div>
        </div>

        {/* Right Column: Earnings Receipts */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Receipts</h2>
            {payments.length > 0 ? (
              <div className="space-y-3">
                {payments.map((p) => (
                  <div key={p.paymentId} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Disbursement #{p.paymentId}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {p.paymentDate ? p.paymentDate.split('T')[0] : 'Recorded'}
                      </p>
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">
                      ৳{Number(p.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No salary payments recorded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Create Exam Modal */}
      {showExamModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Create New Course Exam</h3>

            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Course</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                >
                  {assignedCourses.map((c) => (
                    <option key={c.courseId} value={c.courseId}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Exam Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Midterm Evaluation"
                  value={examForm.title}
                  onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Max Marks</label>
                  <input
                    type="number"
                    required
                    value={examForm.maxMarks}
                    onChange={(e) => setExamForm({ ...examForm, maxMarks: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Passing Marks</label>
                  <input
                    type="number"
                    required
                    value={examForm.passingMarks}
                    onChange={(e) => setExamForm({ ...examForm, passingMarks: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  required
                  value={examForm.durationMinutes}
                  onChange={(e) => setExamForm({ ...examForm, durationMinutes: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  disabled={creatingExam}
                  className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl"
                >
                  {creatingExam ? 'Saving...' : 'Create Exam'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowExamModal(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeacherDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading portal...</div>}>
      <TeacherDashboardContent />
    </Suspense>
  );
}