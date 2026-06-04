import React, { useState, useEffect } from 'react';
import { MILESTONES_DATA } from '../data';
import { Milestone, MajorCategory } from '../types';
import { Compass, BookOpen, Layers, Laptop, Landmark, ClipboardList, CheckSquare, Square, TrendingUp } from 'lucide-react';

export default function RoadmapContainer() {
  const [selectedCategory, setSelectedCategory] = useState<MajorCategory>('technology');
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  // Load completion state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('unigrow_completed_milestones');
    if (saved) {
      try {
        setCompletedMilestones(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved milestones', e);
      }
    }
  }, []);

  const toggleMilestone = (id: string) => {
    const next = { ...completedMilestones, [id]: !completedMilestones[id] };
    setCompletedMilestones(next);
    localStorage.setItem('unigrow_completed_milestones', JSON.stringify(next));
  };

  // Filter milestones by selected category
  const filteredMilestones = MILESTONES_DATA.filter(m => m.category === selectedCategory);

  // Group filtered milestones by school year
  const groupedByYear: Record<string, Milestone[]> = {
    '1학년 (Freshman)': [],
    '2학년 (Sophomore)': [],
    '3학년 (Junior)': [],
    '4학년 (Senior)': []
  };

  filteredMilestones.forEach(m => {
    if (groupedByYear[m.year]) {
      groupedByYear[m.year].push(m);
    }
  });

  // Calculate statistics for selected category
  const totalInCategory = filteredMilestones.length;
  const completedInCategory = filteredMilestones.filter(m => completedMilestones[m.id]).length;
  const progressRatio = totalInCategory > 0 ? (completedInCategory / totalInCategory) * 100 : 0;

  const categories = [
    { id: 'technology', label: 'Tech & 개발', icon: Laptop, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'business', label: '비즈니스 & 기획', icon: Landmark, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'humanities', label: '인문학 & 글로벌', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { id: 'art', label: '예술 & 디자인', icon: Compass, color: 'text-fuchsia-600 bg-fuchsia-100 border-fuchsia-200' },
    { id: 'general', label: '비전 & 실천력', icon: ClipboardList, color: 'text-violet-600 bg-violet-50 border-violet-200' }
  ];

  return (
    <section className="py-20 bg-indigo-50/10 border-y border-indigo-100/40" id="roadmap">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title and Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 font-display">Track Selector</span>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            나의 대표 커리어 트랙별 <br className="sm:hidden" /> 스케줄 가이드
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            진로분야를 선택하고 학년별 요구되는 메인 포인트를 점검해 보세요. 버튼을 클릭해 완료 상태를 기록하면 로컬에 자동 보관됩니다.
          </p>
        </div>

        {/* Categories Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as MajorCategory)}
                className={`inline-flex items-center space-x-2 rounded-full px-5 py-3 text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/25'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
                id={`tab-category-${cat.id}`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Real-time Track Statistics */}
        <div className="max-w-xl mx-auto mb-12 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl shadow-indigo-50/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {categories.find(c => c.id === selectedCategory)?.label} 트랙 달성률
            </span>
            <div className="flex items-center space-x-1.5">
              <TrendingUp className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-black text-slate-800">
                {completedInCategory} / {totalInCategory} Completed
              </span>
            </div>
          </div>
          <div className="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden p-[3px]">
            <div 
              className="h-full rounded-full bg-indigo-600 transition-all duration-500 ease-out shadow-sm" 
              style={{ width: `${progressRatio}%` }}
            />
          </div>
          <p className="mt-2.5 text-[11px] text-slate-400 text-center font-medium">
            각 마일스톤 카드를 클릭하면 완료 여부가 변경되고, 실시간으로 통계에 반영됩니다.
          </p>
        </div>

        {/* Timeline Columns (Freshman to Senior) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(groupedByYear).map(([year, milestones]) => (
            <div key={year} className="flex flex-col space-y-4" id={`timeline-${year}`}>
              
              {/* Year Header Card */}
              <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-4.5 text-white shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layers className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm font-extrabold tracking-tight font-display">{year}</span>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold text-indigo-200 px-2 py-0.5 rounded bg-white/10">
                  Target
                </span>
              </div>

              {/* Milestones inside */}
              <div className="space-y-4 grow">
                {milestones.length === 0 ? (
                  <div className="text-center py-8 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
                    준비된 마일스톤이 없습니다.
                  </div>
                ) : (
                  milestones.map((ms) => {
                    const isCompleted = !!completedMilestones[ms.id];
                    return (
                      <div
                        key={ms.id}
                        onClick={() => toggleMilestone(ms.id)}
                        className={`group relative rounded-2xl border p-5 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between h-[215px] hover:border-indigo-400 hover:-translate-y-1 hover:shadow-lg ${
                          isCompleted
                            ? 'bg-emerald-50/40 border-emerald-200/80 shadow-inner'
                            : 'bg-white border-slate-200 shadow-sm'
                        }`}
                        id={`milestone-card-${ms.id}`}
                      >
                        <div>
                          {/* Title Area */}
                          <div className="flex items-start justify-between">
                            <span className={`text-sm font-bold tracking-tight transition-colors ${
                              isCompleted ? 'text-emerald-950 line-through' : 'text-slate-950 group-hover:text-indigo-650'
                            }`}>
                              {ms.title}
                            </span>
                            <button
                              type="button"
                              className={`shrink-0 rounded-md p-0.5 transition-all ${
                                isCompleted ? 'text-emerald-600' : 'text-slate-300 group-hover:text-slate-500'
                              }`}
                              aria-label="Toggle achievement"
                            >
                              {isCompleted ? (
                                <CheckSquare className="h-5 w-5" />
                              ) : (
                                <Square className="h-5 w-5" />
                              )}
                            </button>
                          </div>

                          {/* Description */}
                          <p className={`mt-2.5 text-xs xs:text-[11px] leading-relaxed transition-colors ${
                            isCompleted ? 'text-emerald-700/80' : 'text-slate-500'
                          }`}>
                            {ms.description}
                          </p>
                        </div>

                        {/* Badges footer */}
                        <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                          {ms.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                isCompleted 
                                  ? 'bg-emerald-100/50 text-emerald-800' 
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
