import React, { useState, useEffect } from 'react';
import { Habit } from '../types';
import { ClipboardList, Plus, Trash2, Calendar, Target, HelpCircle, Check, TrendingUp } from 'lucide-react';

const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit-1',
    title: '동향 뉴스 & IT 트렌드 요약',
    desc: '하루 아티클 2개 요약 노션에 작성하기',
    frequency: '매일',
    completedDays: [false, false, false, false, false, false, false]
  },
  {
    id: 'habit-2',
    title: '하드 스킬 전공 탐구',
    desc: '코딩 문제 풀이 또는 마케팅 케이스 디깅',
    frequency: '주 5회',
    completedDays: [false, false, false, false, false, false, false]
  },
  {
    id: 'habit-3',
    title: '독서 & 사유의 아카이브',
    desc: '인문 사회 도서 무조건 10페이지 읽기',
    frequency: '매일',
    completedDays: [false, false, false, false, false, false, false]
  },
  {
    id: 'habit-4',
    title: '건강 체력 & 피지컬 리프레시',
    desc: '하루 30분 빠른 조깅 또는 가벼운 고강도 스트레칭',
    frequency: '주 3회',
    completedDays: [false, false, false, false, false, false, false]
  }
];

export default function HabitLoopTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState('이번 학기 평균 학점 4.0 이상 & 포트폴리오 사이트 완성');

  // Load state on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('unigrow_habits');
    const savedGoal = localStorage.getItem('unigrow_monthly_goal');
    
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (e) {
        setHabits(INITIAL_HABITS);
      }
    } else {
      setHabits(INITIAL_HABITS);
    }

    if (savedGoal) {
      setMonthlyGoal(savedGoal);
    }
  }, []);

  const saveHabits = (updatedHabits: Habit[]) => {
    setHabits(updatedHabits);
    localStorage.setItem('unigrow_habits', JSON.stringify(updatedHabits));
  };

  const handleToggleDay = (habitId: string, dayIdx: number) => {
    const updated = habits.map(h => {
      if (h.id === habitId) {
        const nextCompleted = [...h.completedDays];
        nextCompleted[dayIdx] = !nextCompleted[dayIdx];
        return { ...h, completedDays: nextCompleted };
      }
      return h;
    });
    saveHabits(updated);
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newHabit: Habit = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      desc: newDesc.trim() || '나만의 커스텀 성장 습관',
      frequency: '매일',
      completedDays: [false, false, false, false, false, false, false]
    };

    const updated = [...habits, newHabit];
    saveHabits(updated);
    setNewTitle('');
    setNewDesc('');
  };

  const handleDeleteHabit = (id: string) => {
    const updated = habits.filter(h => h.id !== id);
    saveHabits(updated);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyGoal(e.target.value);
    localStorage.setItem('unigrow_monthly_goal', e.target.value);
  };

  const DAYS_SHORT = ['월', '화', '수', '목', '금', '토', '일'];

  // Global Stat Calculations
  const totalCheckboxes = habits.length * 7;
  const checkedCheckboxes = habits.reduce((sum, h) => {
    return sum + h.completedDays.filter(Boolean).length;
  }, 0);
  const completionRate = totalCheckboxes > 0 ? Math.round((checkedCheckboxes / totalCheckboxes) * 100) : 0;

  return (
    <section className="py-20 bg-slate-50/50 border-b border-slate-200/50" id="habits">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600 font-display">Procrastination Destroyer</span>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            작심삼일 브레이커: 주간 루틴 빌더
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            대담한 계획도 매일의 작은 습관 없이는 공상에 그칩니다. 나의 메인 성향에 알맞게 맞춤형 데일리 지수 습관 루프를 관리하고 체크해보세요.
          </p>
        </div>

        {/* Goal Banner */}
        <div className="mb-10 rounded-[28px] bg-gradient-to-r from-indigo-700 via-indigo-600 to-emerald-600 p-6 sm:p-8 text-white shadow-xl shadow-indigo-900/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white border border-white/10 shrink-0">
                <Target className="h-5.5 w-5.5" />
              </div>
              <div className="grow">
                <span className="text-[10px] text-indigo-100 uppercase font-black tracking-widest">나의 이번 분기 핵심 마일스톤</span>
                <input
                  type="text"
                  value={monthlyGoal}
                  onChange={handleGoalChange}
                  className="mt-0.5 block w-full bg-transparent text-sm sm:text-base font-black text-white border-b border-transparent focus:border-white focus:outline-none transition-colors"
                  placeholder="예: 어학 점수 850점 획득 & IT 부트캠프 프로젝트 마무리"
                />
              </div>
            </div>
            <div className="shrink-0 bg-white/10 py-2.5 px-5 rounded-2xl border border-white/10 text-center sm:text-right">
              <span className="block text-[10px] text-indigo-100 uppercase font-bold tracking-wider">주간 루틴 달성 지수</span>
              <span className="text-xl font-mono font-black">{completionRate}% 달성 중</span>
            </div>
          </div>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Habits Check Grid (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5 flex items-center space-x-1.5">
              <Calendar className="h-4 w-4 text-indigo-600" />
              <span>오늘 나의 실천 체크리스트 (월요일 ~ 일요일)</span>
            </h3>

            {habits.length === 0 ? (
              <div className="text-center py-12 rounded-3xl bg-white border border-slate-200 text-slate-400 text-sm font-medium shadow-sm">
                지정된 습관이 없습니다. 오른쪽 폼에서 새로운 성장에 박차를 가할 습관을 더해 보세요!
              </div>
            ) : (
              habits.map((habit) => {
                const habitDoneCount = habit.completedDays.filter(Boolean).length;
                return (
                  <div
                    key={habit.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    id={`habit-card-${habit.id}`}
                  >
                    {/* Habit Info */}
                    <div className="grow space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900 leading-tight">
                          {habit.title}
                        </span>
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[9px] font-bold text-indigo-700 border border-indigo-100/50">
                          {habitDoneCount}일 수행
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                        {habit.desc}
                      </p>
                    </div>

                    {/* Check Grid Mo~Su */}
                    <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="flex space-x-1.5 overflow-x-auto">
                        {DAYS_SHORT.map((day, dIdx) => {
                          const isDone = habit.completedDays[dIdx];
                          return (
                            <button
                              key={dIdx}
                              onClick={() => handleToggleDay(habit.id, dIdx)}
                              className={`flex h-9 w-9 flex-col items-center justify-center rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                                isDone
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                              }`}
                              title={`${day}요일 루틴 토글`}
                              id={`habit-${habit.id}-day-${dIdx}`}
                            >
                              <span className={`text-[9px] font-bold ${isDone ? 'text-indigo-100' : 'text-slate-400'}`}>
                                {day}
                              </span>
                              <span className="text-xs mt-0.5 font-black">
                                {isDone ? '✓' : '•'}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Delete icon */}
                      <button
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0 cursor-pointer ml-2"
                        title="루틴 삭제"
                        id={`delete-habit-${habit.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Add Habit Sidepanel Form */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="font-display text-sm font-bold text-slate-900 flex items-center space-x-1.5">
              <Plus className="h-4 w-4 text-indigo-600" />
              <span>새로운 커스텀 루틴 추가</span>
            </h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed mb-4">
              성공은 복리로 작용합니다. 매일 꾸준히 하여 나의 역량을 높일 수 있는 구체적인 행동 단위를 더하세요.
            </p>

            <form onSubmit={handleAddHabit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  습관 이름 (의무 행동)
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
                  placeholder="예: 영어 스피킹 15분 미션"
                  id="input-habit-title"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  메모 / 디테일 정의
                </label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
                  placeholder="예: 케이크 앱 또는 스픽 회화 연습"
                  id="input-habit-desc"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-1.5 rounded-full bg-slate-900 px-4 py-3 text-xs font-bold text-white hover:bg-slate-800 hover:text-indigo-200 active:scale-95 transition-all cursor-pointer"
                id="btn-add-habit"
              >
                <span>내 주간 계획표에 박제</span>
                <Check className="h-3.5 w-3.5 text-indigo-400" />
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-indigo-50/50 p-4 border border-indigo-150/40">
              <div className="flex items-start space-x-2">
                <TrendingUp className="h-3.5 w-3.5 text-indigo-600 mt-0.5" />
                <p className="text-[10px] text-indigo-800 leading-relaxed font-semibold">
                  <strong>💡 습관 팁: </strong> 너무 거대한 미션은 포기하기 쉽습니다. 일별 실행 가능한 아주 작은 단위를 등록해 점진적으로 성취를 도모하세요.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
