import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RoadmapContainer from './components/RoadmapContainer';
import SelfAssessment from './components/SelfAssessment';
import HabitLoopTracker from './components/HabitLoopTracker';
import ResourcesHub from './components/ResourcesHub';
import DeployGuideModal from './components/DeployGuideModal';
import { Target, Github, Heart, Share2, Compass, Layers, ClipboardList, HelpCircle } from 'lucide-react';

export default function App() {
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-indigo-50/20 text-[#1E293B]">
      {/* Absolute background accent decoration */}
      <div className="absolute top-0 right-0 -z-50 h-[800px] w-[600px] bg-gradient-to-bl from-indigo-500/10 via-transparent to-transparent blur-3xl opacity-60" />

      {/* Header Navigation Section */}
      <Header 
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Areas */}
      <main className="grow">
        {/* HERO INSTANCE */}
        <Hero 
          onScrollToSection={handleScrollToSection}
          onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        />

        {/* INTERACTIVE COMPREHENSIVE ROADMAP BUILDER */}
        <RoadmapContainer />

        {/* DETAILED SELF-DEVELOPMENT QUIZ */}
        <SelfAssessment />

        {/* STREAK HABIT CHECKLIST ROUTINE TRACKER */}
        <HabitLoopTracker />

        {/* CURATED RESOUCE HUB PLATFORMS AND STUDENT PROMOTIONS */}
        <ResourcesHub />
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-450 py-16 border-t border-indigo-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-slate-900">
            {/* Left brand column */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
                  <Compass className="h-5 w-5" />
                </div>
                <span className="font-display font-black text-white text-xl tracking-tight">
                  Uni<span className="text-indigo-400">Grow</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                대한민국 모든 대학생들의 자기주도적 성장을 응원합니다. 나만의 가치를 찾아 미래를 개척하세요.
              </p>
            </div>

            {/* Quick sections map */}
            <div className="flex flex-wrap gap-8 text-xs font-semibold">
              <div className="space-y-2">
                <span className="text-slate-200 uppercase tracking-widest block text-[10px]">서비스 맵</span>
                <button onClick={() => handleScrollToSection('roadmap')} className="block hover:text-white transition-colors cursor-pointer">학년별 로드맵</button>
                <button onClick={() => handleScrollToSection('assessment')} className="block hover:text-white transition-colors cursor-pointer">성향 검사</button>
              </div>

              <div className="space-y-2">
                <span className="text-slate-200 uppercase tracking-widest block text-[10px]">셀프 트랙</span>
                <button onClick={() => handleScrollToSection('habits')} className="block hover:text-white transition-colors cursor-pointer">주간 루틴 빌더</button>
                <button onClick={() => handleScrollToSection('resources')} className="block hover:text-white transition-colors cursor-pointer">리소스 허브</button>
              </div>

              <div className="space-y-2">
                <span className="text-slate-200 uppercase tracking-widest block text-[10px]">호스트 플랫폼</span>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">GitHub 연동</a>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Vercel 호스팅</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 text-xs">
            <span>&copy; {currentYear} UniGrow. All materials are open source. Optimized for Vercel Cloud Serverless.</span>
            
            <div className="flex items-center space-x-1.5 text-slate-500">
              <span>Made for</span>
              <Heart className="h-3.5 w-3.5 text-red-500 fill-current" />
              <span>Campus Innovators</span>
            </div>
          </div>
        </div>
      </footer>

      {/* HOISTED DEPLOY MIGRATION GUIDE MODAL */}
      <DeployGuideModal 
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />
    </div>
  );
}
