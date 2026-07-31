'use client';

import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function MyCoursesPage({ studentId = 1 }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEnrolledCourses() {
      try {
        setLoading(true);
        // 1. Fetch enrollments
        const res = await fetch(`${API_BASE_URL}/enrollments/student/${studentId}`);
        if (!res.ok) throw new Error('Failed to load enrolled courses');
        
        const json = await res.json();
        const enrollments = json.data || [];

        // 2. Fetch detailed info for each course in parallel
        const coursePromises = enrollments.map(async (item) => {
          try {
            const courseRes = await fetch(`${API_BASE_URL}/courses/${item.courseId}`);
            if (!courseRes.ok) return item; // Fallback to raw item if detail fetch fails
            const courseJson = await courseRes.json();
            return {
              ...item,
              ...courseJson.data // Merge course metadata (title, image, etc.)
            };
          } catch {
            return item;
          }
        });

        const detailedCourses = await Promise.all(coursePromises);
        setCourses(detailedCourses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadEnrolledCourses();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-500 font-medium">
        Loading your enrolled courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
        Unable to load courses: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10 text-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Enrolled Courses 🎓
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Access your course materials, view class schedules, and join live online sessions.
          </p>
        </div>
        <a
          href="/courses"
          className="mt-4 md:mt-0 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-sm transition"
        >
          Explore More Courses
        </a>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-base mb-4">
            You are not enrolled in any courses yet.
          </p>
          <a
            href="/courses"
            className="inline-block px-6 py-3 bg-[#F59E0B] text-slate-950 font-bold rounded-xl text-sm hover:bg-[#D97706] transition"
          >
            Browse Available Programs
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.courseId}
              course={course}
              studentId={studentId}
            />
          ))}
        </div>
      )}
    </div>
  );
}