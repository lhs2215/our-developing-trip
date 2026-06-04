import React from 'react';
import { Compass, Github, Rocket, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenDeployGuide: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Header({ onOpenDeployGuide, onScrollToSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div 
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => onScrollToSection('hero')}
          id="header-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-500/20">
            <Compass className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-black tracking-tight text-slate-900">
            Uni<span className="text-indigo-600">Grow</span>
          </span>
          <span className="hidden rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 sm:inline-block">
            대학생 자기계발 가이드
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <button 
            onClick={() => onScrollToSection('roadmap')}
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
            id="nav-roadmap"
          >
            로드맵 찾기
          </button>
          <button 
            onClick={() => onScrollToSection('assessment')}
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
            id="nav-assessment"
          >
            성향 분석 테스트
          </button>
          <button 
            onClick={() => onScrollToSection('habits')}
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
            id="nav-habits"
          >
            루틴 매니저
          </button>
          <button 
            onClick={() => onScrollToSection('resources')}
            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
            id="nav-resources"
          >
            대학생 리소스 팩
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenDeployGuide}
            className="inline-flex items-center space-x-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 hover:border-slate-300 transition-all cursor-pointer shadow-sm"
            id="btn-deploy-guide"
          >
            <Github className="h-4 w-4" />
            <span>GitHub & Vercel 배포법</span>
            <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
          </button>
          
          <button
            onClick={() => onScrollToSection('assessment')}
            className="inline-flex items-center space-x-1 rounded-full bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200/50 cursor-pointer"
            id="btn-cta-nav"
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>무료 테스트하기</span>
          </button>
        </div>
      </div>
    </header>
  );
}
