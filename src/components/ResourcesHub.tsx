import React from 'react';
import { RESOURCE_LINKS } from '../data';
import { ExternalLink, BookOpen, Laptop, Compass, Award, ExternalLinkIcon, HelpCircle } from 'lucide-react';

export default function ResourcesHub() {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'tool':
        return { label: '생산성 툴', icon: Laptop, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' };
      case 'course':
        return { label: '무료 인강자료', icon: Award, color: 'text-emerald-700 bg-emerald-50 border-emerald-100' };
      case 'book':
        return { label: '트렌드 미디어', icon: BookOpen, color: 'text-amber-700 bg-amber-50 border-amber-100' };
      default:
        return { label: '공모전/커뮤니티', icon: Compass, color: 'text-violet-700 bg-violet-50 border-violet-100' };
    }
  };

  return (
    <section className="py-20 bg-white" id="resources">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600 font-display">The Student Toolkit</span>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            대학생 성장을 유도할 골든 리소스 백팩
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            시간 낭비는 이제 그만! 전 세계 선도적 인재들이 사용하는 고농도 무료 공인 플랫폼 및 교육 센터와 한정 혜택을 다이렉트로 매치해 두었습니다.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCE_LINKS.map((link, idx) => {
            const { label, icon: Icon, color } = getTypeStyles(link.type);
            return (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-3xl border border-slate-200 bg-white p-6.5 shadow-sm hover:border-indigo-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[215px] cursor-pointer"
                id={`resource-link-${idx}`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center space-x-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${color}`}>
                      <Icon className="h-3 w-3" />
                      <span>{label}</span>
                    </span>
                    
                    {link.badge && (
                      <span className="rounded bg-amber-500/10 px-2.5 py-0.5 text-[9px] font-extrabold text-amber-700 uppercase tracking-widest border border-amber-500/10">
                        {link.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center space-x-1">
                    <span>{link.name}</span>
                    <ExternalLinkIcon className="h-3.5 w-3.5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </h3>
                  
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-semibold">
                    {link.description}
                  </p>
                </div>

                {/* Footer Action text */}
                <span className="text-[10px] font-bold text-slate-450 group-hover:text-indigo-600 transition-colors flex items-center space-x-1.5 pt-3 border-t border-slate-50 mt-4">
                  <span>공식 사이트 혜택 받기</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            );
          })}
        </div>

        {/* Deploy callout info */}
        <div className="mt-16 rounded-[32px] bg-gradient-to-r from-slate-950 to-indigo-950 p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 -z-0 h-32 w-32 rounded-full bg-indigo-600/20 blur-2xl" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest">GitHub & Vercel Deploy Ready</span>
              <h3 className="font-display text-lg sm:text-2xl font-black tracking-tight">
                나만의 맞춤 대학생 자기계발 랜딩페이지가 탄생했습니다
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                이 템플릿과 로컬 상태 관리 기능 또한 Vercel 및 GitHub 인터페이스 규격에 맞춰 한 점 오차 없이 안전하게 패키징되었습니다. 지금 바로 Fork해 배포해보세요.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
