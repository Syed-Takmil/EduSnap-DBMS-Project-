'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://edu-snap-dbms-api.vercel.app/api';

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get admin ID from URL query or default to 1 (e.g. Ada Lovelace)
  const adminId = searchParams.get('adminId') || 1;

  const [admin, setAdmin] = useState(null);
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [teachers, setTeachers] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal States
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  
  // Form States
  const [courseForm, setCourseForm] = useState({ title: '', description: '', price: '' });
  const [assignForm, setAssignForm] = useState({ courseId: '', teacherId: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Dashboard Data
  const fetchAdminData = async () => {
    try {
      setLoading(true);

      const [adminRes, coursesRes, appsRes, teachersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admins/${adminId}`),
        fetch(`${API_BASE_URL}/courses`),
        fetch(`${API_BASE_URL}/teacher-applications?status=pending`),
        fetch(`${API_BASE_URL}/teachers`)
      ]);

      if (adminRes.ok) {
        const aData = await adminRes.json();
        setAdmin(aData.data || aData);
      }
      if (coursesRes.ok) {
        const cData = await coursesRes.json();
        setCourses(cData.data || []);
      }
      if (appsRes.ok) {
        const appData = await appsRes.json();
        setApplications(appData.data || []);
      }
      if (teachersRes.ok) {
        const tData = await teachersRes.json();
        setTeachers(tData.data || []);
      }
    } catch (err) {
      console.error('Error loading admin dashboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [adminId]);

  // Handle Course Creation
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: courseForm.title,
          description: courseForm.description,
          price: Number(courseForm.price),
          adminId: Number(adminId)
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create course');

      alert('Course created successfully!');
      setShowCourseModal(false);
      setCourseForm({ title: '', description: '', price: '' });
      fetchAdminData(); // Refresh data
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Teacher Application Review
  const handleReviewApplication = async (appId, decision) => {
    try {
      const res = await fetch(`${API_BASE_URL}/teacher-applications/${appId}/review`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: decision, // 'approved' or 'rejected'
          adminId: Number(adminId)
        }),
      });

      if (!res.ok) throw new Error('Failed to update application');
      
      alert(`Application ${decision} successfully!`);
      fetchAdminData(); // Refresh apps and teachers list
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Handle Assigning a Teacher to a Course
  const handleAssignTeacher = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/conducts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: Number(assignForm.courseId),
          teacherId: Number(assignForm.teacherId)
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to assign teacher');

      alert('Teacher assigned to course successfully!');
      setShowAssignModal(false);
      setAssignForm({ courseId: '', teacherId: '' });
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-600 font-medium">Loading Administrator Portal...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 p-6 md:p-10">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
            System Administrator
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            Welcome, {admin?.name || 'Admin'} 🛡️
          </h1>
          <p className="text-slate-500 text-sm mt-1">{admin?.email}</p>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => setShowAssignModal(true)}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition border border-slate-300"
          >
            Assign Teacher
          </button>
          <button
            onClick={() => setShowCourseModal(true)}
            className="px-5 py-3 bg-[#0F172A] hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs transition shadow-md flex items-center gap-2"
          >
            ➕ Create New Course
          </button>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Total Courses</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{courses.length} Active</h3>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Pending Applications</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{applications.length} Awaiting</h3>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Registered Teachers</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{teachers.length} Faculty</h3>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Course Directory */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Platform Course Directory</h2>
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.courseId} className="border border-slate-200 p-4 rounded-xl bg-slate-50 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold bg-[#0F172A] text-amber-400 px-2.5 py-1 rounded-md uppercase">
                        Course #{course.courseId}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-2.5">{course.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {course.description || 'No detailed course description.'}
                      </p>
                    </div>
                    <div className="flex justify-between items-end mt-4 pt-3 border-t border-slate-200/60">
                      <p className="text-xs font-extrabold text-slate-900">
                        Price: ৳{Number(course.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No courses currently exist on the platform.</p>
            )}
          </div>
        </div>

        {/* Right Column: Teacher Applications */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Pending Applications</h2>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.applicationId} className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                    <h4 className="font-bold text-slate-900 text-sm">{app.applicantName}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 mb-2">{app.applicantEmail}</p>
                    
                    <div className="flex gap-2 text-[10px] mb-3 font-semibold">
                      {app.resumeLink && <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">View Resume</a>}
                      {app.demoLink && <a href={app.demoLink} target="_blank" rel="noreferrer" className="text-rose-600 hover:underline">Watch Demo</a>}
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => handleReviewApplication(app.applicationId, 'approved')} className="flex-1 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-bold rounded-lg text-xs transition">
                        Approve
                      </button>
                      <button onClick={() => handleReviewApplication(app.applicationId, 'rejected')} className="flex-1 py-2 bg-rose-100 text-rose-700 hover:bg-rose-200 font-bold rounded-lg text-xs transition">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm py-4 border-2 border-dashed border-slate-200 rounded-xl text-center">
                All caught up! No pending applications.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* Create Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Create New Course</h3>
            <form onSubmit={handleCreateCourse} className="space-y-3 text-sm">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Title</label>
                <input type="text" required value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Enrollment Price (৳)</label>
                <input type="number" required value={courseForm.price} onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea rows="3" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div className="pt-3 flex gap-2">
                <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 bg-[#0F172A] text-amber-400 font-bold rounded-xl">{isSubmitting ? 'Saving...' : 'Create Course'}</button>
                <button type="button" onClick={() => setShowCourseModal(false)} className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Teacher Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Assign Teacher to Course</h3>
            <form onSubmit={handleAssignTeacher} className="space-y-4 text-sm">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Course</label>
                <select required value={assignForm.courseId} onChange={(e) => setAssignForm({ ...assignForm, courseId: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <option value="">-- Choose Course --</option>
                  {courses.map(c => <option key={c.courseId} value={c.courseId}>{c.title}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Teacher</label>
                <select required value={assignForm.teacherId} onChange={(e) => setAssignForm({ ...assignForm, teacherId: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <option value="">-- Choose Teacher --</option>
                  {teachers.map(t => <option key={t.teacherId} value={t.teacherId}>{t.name} ({t.email})</option>)}
                </select>
              </div>
              <div className="pt-3 flex gap-2">
                <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 bg-[#0F172A] text-amber-400 font-bold rounded-xl">{isSubmitting ? 'Assigning...' : 'Assign Teacher'}</button>
                <button type="button" onClick={() => setShowAssignModal(false)} className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Administrator Portal...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}