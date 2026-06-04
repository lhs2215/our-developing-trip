import React from 'react';
import { X, Github, Rocket, Check, ExternalLink, Globe } from 'lucide-react';
import { VERCEL_DEPLOY_GUIDE } from '../data';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeployGuideModal({ isOpen, onClose }: DeployGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="deploy-guide-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Github className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                GitHub & Vercel 배포 가이드
              </h3>
              <p className="text-xs text-slate-500">
                수정 완료한 멋진 랜딩페이지를 단 3분 만에 무료로 배포하고 주소를 공유해 보세요.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
            id="close-modal-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-6">
          {/* Vercel Tagline */}
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 p-4 border border-blue-100/50">
            <div className="flex items-start space-x-2.5">
              <div className="mt-0.5 rounded-full bg-blue-500/10 p-1 text-blue-600">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Vercel 배포의 장점</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Vercel은 본 사이트와 같은 React/Vite 앱을 호스팅하기에 완벽합니다. GitHub에 코드를 Push하는 즉시 원클릭으로 가볍게 자동 빌드되고, 도메인이 갱신되는 강력한 CI/CD 파이프라인을 100% 영구 무료로 제공합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {VERCEL_DEPLOY_GUIDE.steps.map((step, idx) => (
              <div key={idx} className="flex space-x-4">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm shadow-blue-500/20">
                    {idx + 1}
                  </div>
                  {idx < VERCEL_DEPLOY_GUIDE.steps.length - 1 && (
                    <div className="w-0.5 bg-slate-200 grow my-1 h-12" />
                  )}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">{step.title}</h5>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Build Command Info */}
          <div className="rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-300">
            <div className="flex justify-between items-center text-slate-500 mb-2 border-b border-slate-800 pb-1.5">
              <span>Vercel Build Configuration</span>
              <span className="text-emerald-400">Verified Vercel-ready</span>
            </div>
            <p className="text-slate-400"><span className="text-blue-400">Build Command:</span> npm run build</p>
            <p className="text-slate-400"><span className="text-blue-400">Output Directory:</span> dist</p>
            <p className="text-slate-400"><span className="text-blue-400">Framework Preset:</span> Vite</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-end space-x-3 border-t border-slate-100 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            id="modal-confirm-btn"
          >
            확인했습니다
          </button>
          
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/10 cursor-pointer"
            id="modal-vercel-btn"
          >
            <span>Vercel 대시보드 바로가기</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
