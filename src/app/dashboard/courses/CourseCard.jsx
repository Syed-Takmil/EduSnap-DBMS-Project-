'use client';

import React, { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://edu-snap-dbms-api.vercel.app/api';

export default function CourseCard({ course, studentId }) {
  const [showRoutines, setShowRoutines] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [prereqs, setPrereqs] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);

  // Fetch routine details & prerequisites when expanding details
  const handleOpenDetails = async () => {
    setShowRoutines(true);
    setLoadingModal(true);
    try {
      // 1. Fetch Course Routines
      const routineRes = await fetch(`${API_BASE_URL}/routines/course/${course.courseId}`);
      const routineData = routineRes.ok ? await routineRes.json() : { data: [] };

      // 2. Fetch Days for each routine
      const routinesWithDays = await Promise.all(
        (routineData.data || []).map(async (rt) => {
          const daysRes = await fetch(`${API_BASE_URL}/routines/${rt.routineId}/days`);
          const daysData = daysRes.ok ? await daysRes.json() : { data: [] };
          return { ...rt, days: daysData.data || [] };
        })
      );
      setRoutines(routinesWithDays);

      // 3. Fetch Course Prerequisites
      const prereqRes = await fetch(`${API_BASE_URL}/courses/${course.courseId}/prerequisites`);
      const prereqData = prereqRes.ok ? await prereqRes.json() : { data: [] };
      setPrereqs(prereqData.data || []);
    } catch (err) {
      console.error('Failed to load course details:', err);
    } finally {
      setLoadingModal(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Dark Slate Navy Header */}
      <div className="bg-[#0F172A] text-white p-5 flex justify-between items-center">
        <span className="text-xs uppercase font-semibold tracking-wider bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
          PROGRAM
        </span>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 capitalize">
          {course.status || 'Active'}
        </span>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-slate-600 text-sm mb-6 line-clamp-3">
            {course.description || 'No detailed description available.'}
          </p>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleOpenDetails}
            className="w-full py-3 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold rounded-xl text-sm transition text-center shadow-sm"
          >
            View Schedule & Details →
          </button>
        </div>
      </div>

      {/* Schedule & Routine Modal */}
      {showRoutines && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-1">{course.title}</h3>
            <p className="text-xs text-slate-500 mb-6">Course ID: #{course.courseId}</p>

            {loadingModal ? (
              <div className="py-8 text-center text-slate-500 text-sm">Loading course details...</div>
            ) : (
              <div className="space-y-6">
                {/* Prerequisites Section */}
                {prereqs.length > 0 && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                      Required Prerequisites
                    </h4>
                    <ul className="text-xs text-amber-800 list-disc list-inside space-y-1">
                      {prereqs.map((p, idx) => (
                        <li key={idx}>Course Prerequisite ID #{p.prerequisiteId || p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Routines & Live Links Section */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Class Schedules</h4>
                  {routines.length > 0 ? (
                    <div className="space-y-3">
                      {routines.map((rt) => (
                        <div key={rt.routineId} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                              {rt.days && rt.days.length > 0
                                ? rt.days.map((d) => d.dayOfWeek || d).join(', ')
                                : 'Scheduled'}
                            </span>
                            <span className="text-xs text-slate-500">
                              {rt.startTime} - {rt.endTime}
                            </span>
                          </div>

                          {rt.classLink ? (
                            <a
                              href={rt.classLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-block mt-2 px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold rounded-lg text-xs transition"
                            >
                              Join Live Class
                            </a>
                          ) : (
                            <p className="text-xs text-slate-400 italic mt-2">No live class link active right now.</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-xs italic">No routine schedules found for this course.</p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowRoutines(false)}
              className="mt-6 w-full py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl text-sm hover:bg-slate-200 transition"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}