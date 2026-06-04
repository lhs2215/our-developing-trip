import React, { useState, useEffect } from 'react';
import { Target, Sparkles, TrendingUp, Award, CheckCircle2, ChevronRight, Activity, Plus, Check } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
  onOpenDeployGuide: () => void;
}

const CELEBRITY_HABITS = [
  {
    id: 'cel-1',
    celebrity: '오프라 윈프리',
    title: '기상 후 5분 감사 일기',
    desc: '매일 감사한 세 가지 구체적 일상 기록하기',
    emoji: '🌸',
    tags: ['긍정마인드', '멘탈']
  },
  {
    id: 'cel-2',
    celebrity: '일론 머스크',
    title: '5분 단위 타임 블로킹',
    desc: '하루 모든 계획을 5분 단위 밀착 슬롯으로 몰입 설계',
    emoji: '⚡',
    tags: ['초집중', '효율']
  },
  {
    id: 'cel-3',
    celebrity: '빌 게이츠',
    title: '디지털 디톡스 30분 독서',
    desc: '전자기기 차단 후 도서나 원서 30분 초집중 탐독',
    emoji: '📖',
    tags: ['연구', '사색축적']
  },
  {
    id: 'cel-4',
    celebrity: '스티브 잡스',
    title: '사소한 의사결정 비우기',
    desc: '불필요한 선택지를 최소화하고 중요 본질 1순위 집중',
    emoji: '🧠',
    tags: ['의사결정', '본질']
  }
];

export default function Hero({ onScrollToSection, onOpenDeployGuide }: HeroProps) {
  const [habits, setHabits] = useState<any[]>([]);
  const [adoptedToast, setAdoptedToast] = useState<string | null>(null);

  const loadHabits = () => {
    const saved = localStorage.getItem('unigrow_smart_habits');
    if (saved) {
      try {
        setHabits(JSON.parse(saved));
      } catch (e) {
        setHabits([]);
      }
    } else {
      setHabits([]);
    }
  };

  useEffect(() => {
    loadHabits();

    const handleSync = () => {
      loadHabits();
    };

    window.addEventListener('unigrow_habits_updated', handleSync);
    return () => {
      window.removeEventListener('unigrow_habits_updated', handleSync);
    };
  }, []);

  // Compute live statistics based on Section 4 bucket list items
  const totalSlots = habits.length * 7;
  const completedSlots = habits.reduce((sum, h) => sum + (h.completedDays ? h.completedDays.filter(Boolean).length : 0), 0);
  const growthRate = totalSlots > 0 ? Math.round((completedSlots / totalSlots) * 100) : 0;

  // Active progress days (days in the week where at least one checklist item is complete)
  const activeDays = [0, 1, 2, 3, 4, 5, 6].filter(dayIdx => {
    return habits.some(h => h.completedDays && h.completedDays[dayIdx] === true);
  }).length;

  const handleAdoptCelebrity = (cel: typeof CELEBRITY_HABITS[0]) => {
    // Check for duplicates
    const isAlreadyAdopted = habits.some(h => h.title.includes(cel.title));
    if (isAlreadyAdopted) {
      setAdoptedToast(`'${cel.title}'은(는) 이미 주간 습관에 등록되어 있습니다!`);
      setTimeout(() => setAdoptedToast(null), 3500);
      return;
    }

    const newHabit = {
      id: `cel-adopt-${Date.now()}`,
      title: `${cel.emoji} [셀럽] ${cel.celebrity}: ${cel.title}`,
      desc: cel.desc,
      category: 'custom',
      completedDays: [false, false, false, false, false, false, false]
    };

    const updated = [...habits, newHabit];
    setHabits(updated);

    // Persist and alert
    localStorage.setItem('unigrow_smart_habits', JSON.stringify(updated));
    localStorage.setItem('unigrow_analyzed', 'true'); // Automatically expand tracker view!
    
    // Dispatch sync event
    window.dispatchEvent(new Event('unigrow_habits_updated'));

    setAdoptedToast(`'${cel.celebrity}' 명품 루틴을 내 습관에 적용했습니다! 아래 주간 스마트 루틴 매니저에서 즉각 체크해볼 수 있습니다.`);
    setTimeout(() => setAdoptedToast(null), 4000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/30 py-20 lg:py-28" id="hero">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-10 -z-10 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="absolute top-2/3 right-10 -z-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Top Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
                <Sparkles className="h-3 w-3" />
                <span>대학생 전용 자기계발 지침서</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                <TrendingUp className="h-3 w-3" />
                <span>GitHub & Vercel 배포 최적화</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-leeseoyun text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-slate-900 leading-[1.4] break-keep">
              대학생활을 나만의 캐릭터와<br />
              <span className="text-indigo-600 font-bold">함께 성장해나가요!</span>
            </h1>

            {/* Subtitle */}
            <p className="font-leeseoyun max-w-xl text-base text-slate-600 sm:text-lg leading-relaxed antialiased">
              우왕좌왕 방황하는 학년별 맞춤 로드맵부터, 나의 성향을 파악해보는 5문제 성향분석 검사, 그리고 올해의 버킷리스트를 하루마다 점검해줄 스마트 루틴 매니저까지 모두 만나보세요.
            </p>

            {/* User Interaction metrics */}
            <div className="flex items-center space-x-4 py-1">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-100 shadow-sm flex items-center justify-center font-bold text-xs text-slate-700">🎓</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 shadow-sm flex items-center justify-center font-bold text-xs text-indigo-700">🚀</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-100 shadow-sm flex items-center justify-center font-bold text-xs text-emerald-700">📈</div>
              </div>
              <div className="text-sm text-slate-500 font-medium">
                지금 <span className="text-slate-900 font-bold">12,400명+</span>의 대학생들이 실전 갓생을 리드 중입니다.
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onScrollToSection('roadmap')}
                className="inline-flex items-center justify-center space-x-2 rounded-full bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 active:scale-[0.98] transition-all cursor-pointer"
                id="hero-cta-roadmap"
              >
                <span>학년별 추천 로드맵 탐색</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onScrollToSection('assessment')}
                className="inline-flex items-center justify-center space-x-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
                id="hero-cta-test"
              >
                <span>나의 자기계발 성향 검사</span>
                <Target className="h-4 w-4 text-indigo-600" />
              </button>
            </div>

            {/* Quick trust bullet points */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 w-full sm:max-w-md">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-semibold text-slate-600">성향 피드백 100% 매칭</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-semibold text-slate-600">유용한 무상 리소스 포함</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-semibold text-slate-600">무제한 로컬 저장 지원</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-semibold text-slate-600">Vercel 호스팅 완벽 대응</span>
              </div>
            </div>
          </div>

          {/* Interactive Mockup Column */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Outline Card Mock */}
            <div className="relative rounded-[40px] border-[12px] border-white bg-slate-50 p-5 shadow-2xl relative flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-3 w-3 rounded-full bg-red-400" />
                  <div className="flex h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="flex h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="font-mono text-[10px] text-slate-400">@unigrow/dashboard</span>
              </div>

              {/* Toast banner inside Mockup if adopted */}
              {adoptedToast && (
                <div className="mb-4 rounded-xl bg-indigo-50 border border-indigo-100 p-3 text-xs text-indigo-750 font-medium leading-relaxed shadow-sm animate-fade-in animate-pulse">
                  ✨ {adoptedToast}
                </div>
              )}

              {/* Dynamic Dashboard Widgets */}
              <div className="space-y-4">
                {/* Metric Box */}
                <div className="rounded-2xl bg-indigo-600 p-4 text-white shadow-lg shadow-indigo-100/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-100 uppercase tracking-wider">나의 성장 지수</span>
                    <Award className="h-4 w-4 text-yellow-300" />
                  </div>
                  
                  {habits.length > 0 ? (
                    <>
                      <div className="mt-2 flex items-baseline space-x-2">
                        <span className="text-3xl font-black tracking-tight">{growthRate}%</span>
                        <span className="text-xs font-bold text-emerald-350">
                          {completedSlots > 0 ? `🔥 기세 등등!` : `🌱 시작이 반입니다`}
                        </span>
                      </div>
                      <div className="mt-3 h-2 w-full rounded-full bg-indigo-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-500" 
                          style={{ width: `${growthRate}%` }} 
                        />
                      </div>
                    </>
                  ) : (
                    <div className="mt-2 text-center py-2">
                      <p className="text-xs text-indigo-150 leading-relaxed font-semibold">
                        동반 캐릭터와 버킷 목표가 존재하지 않습니다.<br />
                        아래 4단계 스마트 루틴 매니저에서 첫 버킷을 기입해 보세요!
                      </p>
                      <button 
                        onClick={() => onScrollToSection('habits')}
                        className="mt-3 inline-flex items-center space-x-1 px-3 py-1 bg-white text-indigo-700 text-xs font-black rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span>루틴 설계하러 스크롤</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Sub widgets */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-450 font-bold">완료한 체크 수</span>
                    <span className="mt-1 block text-base font-black text-slate-800">
                      {habits.length > 0 ? `${completedSlots} / ${totalSlots}` : '0 / 0'}
                    </span>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-450 font-bold">진행 일수</span>
                    <span className="mt-1 block text-base font-black text-indigo-600">
                      {habits.length > 0 ? `${activeDays} Days` : '0 Days'}
                    </span>
                  </div>
                </div>

                {/* Celebrities' Habits to Have (갖추면 좋은 셀럽의 습관들) Section */}
                <div className="rounded-2xl border border-indigo-100/50 bg-indigo-50/20 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-indigo-100/30 pb-1.5">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center space-x-1">
                      <span>✨ 갖추면 좋은 셀럽의 습관들 </span>
                    </span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full font-bold">인기순</span>
                  </div>

                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {CELEBRITY_HABITS.map((cel) => {
                      const alreadyAdded = habits.some(h => h.title.includes(cel.title));
                      return (
                        <div key={cel.id} className="flex items-start justify-between rounded-xl bg-white p-2.5 border border-slate-150/50 shadow-sm transition-all hover:border-indigo-100">
                          <div className="flex items-start space-x-2.5 max-w-[70%]">
                            <div className="min-w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-sm">
                              {cel.emoji}
                            </div>
                            <div>
                              <div className="flex items-center space-x-1">
                                <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-50 px-1 rounded">
                                  {cel.celebrity}
                                </span>
                                <span className="text-[10px] font-bold text-slate-800 line-clamp-1">{cel.title}</span>
                              </div>
                              <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{cel.desc}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleAdoptCelebrity(cel)}
                            disabled={alreadyAdded}
                            className={`px-2 py-1 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                              alreadyAdded
                                ? 'bg-emerald-50 text-emerald-600 cursor-not-allowed border border-emerald-100'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-sm'
                            }`}
                          >
                            {alreadyAdded ? (
                              <span className="flex items-center space-x-0.5">
                                <Check className="h-2.5 w-2.5 stroke-[3px]" />
                                <span>추가됨</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-0.5">
                                <Plus className="h-2.5 w-2.5 stroke-[3px]" />
                                <span>추가</span>
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Today's Actions preview if habits exist */}
                {habits.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">실시간 진행도 피드백</span>
                    <div className="text-[11px] text-slate-500 leading-relaxed font-leeseoyun font-semibold">
                      나의 위 버킷 주간 체크 상태에 따라 <span className="text-indigo-600 font-bold">성장률 {growthRate}%</span>가 동적으로 승급 중입니다. 아래 루프 트래커에서 요일별 체크 박스를 누르면 실시간으로 반영됩니다!
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Background absolute floats */}
            <div className="absolute -bottom-6 -right-6 h-14 w-14 rounded-full bg-white shadow-xl flex items-center justify-center font-bold text-lg border border-slate-100 md:flex hidden animate-bounce-slow">
              🏆
            </div>
            <div className="absolute -top-6 -left-6 rounded-2xl bg-white border border-slate-200 p-2.5 shadow-md flex items-center space-x-2 z-10">
              <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-800">성장 실체화 지표 연동됨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
