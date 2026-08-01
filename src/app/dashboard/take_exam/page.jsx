'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://edu-snap-dbms-api.vercel.app/api';

// Sample quiz questions (can be dynamic or statically mapped)
const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: 'What is the primary function of a Database Management System (DBMS)?',
    options: ['Styling web pages', 'Storing and managing structured data', 'Compiling JavaScript code', 'Rendering 3D models'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Which SQL keyword is used to retrieve data from a database table?',
    options: ['INSERT', 'UPDATE', 'SELECT', 'REMOVE'],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'What does a PRIMARY KEY constraint ensure in a relational database?',
    options: ['Values can be null', 'Every row has a unique identifier', 'Values are automatically deleted', 'All columns are encrypted'],
    correctAnswer: 1,
  },
];

function TakeExamContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const examId = searchParams.get('examId');
  const studentId = searchParams.get('studentId') || 1;

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Exam Metadata
  useEffect(() => {
    if (!examId) {
      setError('Invalid or missing Exam ID.');
      setLoading(false);
      return;
    }

    async function fetchExamDetails() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/exams/${examId}`);
        if (!res.ok) throw new Error('Failed to load exam details');
        const json = await res.json();
        setExam(json.data || json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchExamDetails();
  }, [examId]);

  const handleOptionChange = (qId, optionIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }));
  };

  const handleSubmitExam = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Calculate score based on correct answers
      let correctCount = 0;
      SAMPLE_QUESTIONS.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) {
          correctCount += 1;
        }
      });

      const maxMarks = exam?.maxMarks || 100;
      
      
      const marksObtained = Math.round((correctCount / SAMPLE_QUESTIONS.length) * maxMarks);
      
      console.log(marksObtained);

      // Submit attempt to POST /api/exams/:examId/attempts
      const res = await fetch(`${API_BASE_URL}/exams/${examId}/attempts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: Number(studentId),
          marksObtained: Number(marksObtained),

        }),
      });

      const data = await res.json();
      console.log(data);
      

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit exam attempt');
      }

      // Success! Return to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-600 font-medium">
        Loading quiz questions...
      </div>
    );
  }

  if (error && !exam) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-6 flex items-center justify-center text-center">
        <div className="p-6 bg-white border border-red-200 rounded-2xl max-w-md w-full shadow-sm">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-[#0B1524] text-amber-400 font-bold rounded-xl text-xs"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-12 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl max-w-2xl w-full overflow-hidden">
        {/* Dark Header */}
        <div className="bg-[#0B1524] text-white p-6 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Live Assessment
            </span>
            <h1 className="text-xl font-bold mt-1">{exam?.title || `Exam #${examId}`}</h1>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold bg-slate-800 text-amber-300 px-3 py-1 rounded-full border border-amber-400/20">
              Max Marks: {exam?.maxMarks || 100} [cite: 94]
            </span>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <p className="font-bold text-slate-900 text-sm">
                  Q{idx + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, oIdx) => (
                    <label
                      key={oIdx}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-xs cursor-pointer transition ${
                        answers[q.id] === oIdx
                          ? 'bg-amber-100 border-amber-400 font-semibold text-slate-900'
                          : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q_${q.id}`}
                        checked={answers[q.id] === oIdx}
                        onChange={() => handleOptionChange(q.id, oIdx)}
                        className="accent-amber-500"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleSubmitExam}
              disabled={submitting}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-[#0B1524] font-bold rounded-xl text-sm transition shadow-md shadow-amber-400/20 disabled:opacity-50"
            >
              {submitting ? 'Submitting Answers...' : 'Submit Exam'}
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              disabled={submitting}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TakeExamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-600 font-medium">
          Loading exam...
        </div>
      }
    >
      <TakeExamContent />
    </Suspense>
  );
}