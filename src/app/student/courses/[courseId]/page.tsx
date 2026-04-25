"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, PlayCircle, CheckCircle2, Circle, FileText, ChevronDown } from "lucide-react";
import courseData from "@/data/courseModules.json";

export default function CoursePlayerPage({ params }: { params: { courseId: string } }) {
  // Use the specific course if it exists in JSON, otherwise fallback to the mock course
  const course = (courseData as any)[params.courseId] || (courseData as any)["mock-course-123"];
  
  const [activeLesson, setActiveLesson] = useState(course.modules[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0].id]: true // Expand first module by default
  });

  // Load completed state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`completed_${params.courseId}`);
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, [params.courseId]);

  // Save to localStorage whenever it changes
  const toggleComplete = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicking the lesson row from also changing the video
    const newCompleted = {
      ...completedLessons,
      [lessonId]: !completedLessons[lessonId]
    };
    setCompletedLessons(newCompleted);
    localStorage.setItem(`completed_${params.courseId}`, JSON.stringify(newCompleted));
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Calculate progress
  const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] -m-4 lg:-m-6 overflow-hidden bg-slate-950">
      {/* Top Bar */}
      <div className="h-14 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-4 shrink-0 text-white z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/student/courses" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-semibold truncate max-w-[200px] sm:max-w-md">{course.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-32 bg-slate-800 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="text-sm font-medium text-slate-300">{progressPercent}% Complete</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Side: Video Player */}
        <div className="flex-1 flex flex-col bg-black overflow-y-auto">
          <div className="w-full aspect-video bg-black relative flex items-center justify-center border-b border-slate-800">
            {activeLesson.type === 'video' && activeLesson.videoUrl ? (
              <iframe 
                src={activeLesson.videoUrl} 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-slate-500 flex flex-col items-center gap-2">
                <FileText className="h-12 w-12 opacity-50" />
                <p>No video available for this lesson type.</p>
              </div>
            )}
          </div>
          
          <div className="p-6 lg:p-8 max-w-4xl w-full mx-auto text-slate-200">
            <h2 className="text-2xl font-bold mb-2 text-white">{activeLesson.title}</h2>
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 border-b border-slate-800 pb-6">
              <span className="flex items-center gap-1.5"><PlayCircle className="h-4 w-4" /> {activeLesson.duration}</span>
              <span className="capitalize bg-slate-800 px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-300">{activeLesson.type}</span>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p>Welcome to <strong>{activeLesson.title}</strong>.</p>
              <p>In this lesson, you will learn the core concepts required to master {course.title}. Make sure to follow along with the video and complete any associated exercises before marking this module as complete.</p>
              
              <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white m-0">Finished watching?</h3>
                  <p className="text-slate-400 text-sm m-0 mt-1">Mark this lesson as completed to update your progress.</p>
                </div>
                <button 
                  onClick={(e) => toggleComplete(activeLesson.id, e)}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    completedLessons[activeLesson.id] 
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20' 
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {completedLessons[activeLesson.id] ? (
                    <><CheckCircle2 className="h-5 w-5" /> Completed</>
                  ) : (
                    <><Circle className="h-5 w-5" /> Mark Complete</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Curriculum Sidebar */}
        <div className="w-full lg:w-96 bg-slate-950 border-l border-slate-800 flex flex-col shrink-0 overflow-hidden h-[40vh] lg:h-auto">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 shrink-0">
            <h3 className="font-semibold text-white">Course Curriculum</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {course.modules.map((module: any, mIndex: number) => (
              <div key={module.id} className="border-b border-slate-800/50">
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-4 py-4 flex items-center justify-between bg-slate-900/20 hover:bg-slate-800/50 transition-colors text-left"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Module {mIndex + 1}</p>
                    <p className="font-medium text-slate-200">{module.title}</p>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${expandedModules[module.id] ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedModules[module.id] && (
                  <div className="bg-slate-950">
                    {module.lessons.map((lesson: any, lIndex: number) => {
                      const isActive = activeLesson.id === lesson.id;
                      const isCompleted = completedLessons[lesson.id];
                      
                      return (
                        <div 
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-l-2 ${
                            isActive 
                              ? 'bg-primary/10 border-primary' 
                              : 'border-transparent hover:bg-slate-900'
                          }`}
                        >
                          <button 
                            onClick={(e) => toggleComplete(lesson.id, e)}
                            className="mt-0.5 shrink-0 text-slate-500 hover:text-primary transition-colors focus:outline-none"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <Circle className="h-5 w-5" />
                            )}
                          </button>
                          
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium leading-snug mb-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                              {lIndex + 1}. {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              {lesson.type === 'video' ? <PlayCircle className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
