import React from 'react';
import { Target, Sparkles, TrendingUp, Award, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
  onOpenDeployGuide: () => void;
}

export default function Hero({ onScrollToSection, onOpenDeployGuide }: HeroProps) {
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
            <h1 className="font-display text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.08]">
              대학생활의 끝,<br />
              <span className="text-indigo-600 italic font-black">나만의 커리어</span>를<br />
              완성하세요.
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base text-slate-600 sm:text-lg leading-relaxed">
              우왕좌왕 방황하는 대학 학년별 맞춤 로드맵부터, 나의 내적 흥미를 찾아줄 5분 성향 분석 검사, 그리고 일상 루틴을 체킹할 스마트 루틴 매니저까지 대학교 혁신의 마스터피스를 만나보세요.
            </p>

            {/* User Interaction metrics */}
            <div className="flex items-center space-x-4 py-1">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-350 shadow-sm flex items-center justify-center font-bold text-xs text-slate-700 bg-amber-100">🎓</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-300 shadow-sm flex items-center justify-center font-bold text-xs text-indigo-700 bg-indigo-100">🚀</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-300 shadow-sm flex items-center justify-center font-bold text-xs text-emerald-700 bg-emerald-100">📈</div>
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
            <div className="relative rounded-[40px] border-[12px] border-white bg-slate-50 p-6 shadow-2xl relative flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-3 w-3 rounded-full bg-red-400" />
                  <div className="flex h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="flex h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="font-mono text-xs text-slate-400">@unigrow/dashboard</span>
              </div>

              {/* Mock Dashboard Widgets */}
              <div className="space-y-4">
                {/* Metric Box */}
                <div className="rounded-2xl bg-indigo-600 p-5 text-white shadow-lg shadow-indigo-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-100 uppercase tracking-wider">나의 캠퍼스 성장 지수</span>
                    <Award className="h-4 w-4 text-yellow-300" />
                  </div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-3xl font-black tracking-tight">87.5%</span>
                    <span className="text-xs font-bold text-emerald-300">+12.4% 이번 달</span>
                  </div>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-indigo-800">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: '87.5%' }} />
                  </div>
                </div>

                {/* Sub widgets */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">완료한 마일스톤</span>
                    <span className="mt-1 block text-lg font-black text-slate-800">14 / 24</span>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold">진행 일수</span>
                    <span className="mt-1 block text-lg font-black text-slate-800">42 Days</span>
                  </div>
                </div>

                {/* Micro Action List */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">오늘 가꾸어야 할 습관</span>
                  
                  <div className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold">📚</div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800">IT 기사 2개 노션 요약</span>
                        <span className="block text-[10px] text-slate-400">일일 요약 기록 완료</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Streak🔥 5일째</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">💻</div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800">전공서적 10페이지 탐독</span>
                        <span className="block text-[10px] text-slate-400">학습 보완 노트 기필</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">대기 중</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Background absolute floats */}
            <div className="absolute -bottom-6 -right-6 h-14 w-14 rounded-full bg-white shadow-xl flex items-center justify-center font-bold text-lg border border-slate-100 md:flex hidden animate-bounce-slow">
              🏆
            </div>
            <div className="absolute -top-6 -left-6 rounded-2xl glass-panel p-3 border border-slate-200 shadow-md flex items-center space-x-2">
              <Activity className="h-4 w-4 text-indigo-600 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">실시간 피드백 활성화</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
