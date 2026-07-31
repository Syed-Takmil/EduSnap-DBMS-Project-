"use client";

import React, { useState, useEffect } from 'react';
import CourseCard from '../../Components/CourseCard';
import CustomLoading from '@/Components/shared/CustomLoading';

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://edu-snap-dbms-api.vercel.app/api/courses')
      .then((response) => response.json())
      .then((res) => {
        // API returns { success: true, data: [...] }
        if (res.success && Array.isArray(res.data)) {
          setCourses(res.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <CustomLoading />
        <span>Loading courses...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
        Our Academic Programs
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </div>
  );
}