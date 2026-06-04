import React, { useState } from 'react';
import { SURVEY_QUESTIONS, PERSONAS } from '../data';
import { Question, SelfDevPersona } from '../types';
import { Sparkles, ArrowRight, RotateCcw, Target, Award, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export default function SelfAssessment() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ PP: 0, BD: 0, DR: 0, AN: 0 });
  const [testCompleted, setTestCompleted] = useState(false);
  const [resultPersona, setResultPersona] = useState<SelfDevPersona | null>(null);

  const handleSelectOption = (score: Record<string, number>) => {
    // Add option score to current running totals
    const nextScores = { ...scores };
    Object.entries(score).forEach(([personaId, pts]) => {
      nextScores[personaId] = (nextScores[personaId] || 0) + pts;
    });
    setScores(nextScores);

    if (currentQuestionIdx < SURVEY_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate final persona
      let bestPersonaId = 'PP';
      let maxScore = -1;

      Object.keys(nextScores).forEach((personaId) => {
        const totalScore = nextScores[personaId];
        if (totalScore > maxScore) {
          maxScore = totalScore;
          bestPersonaId = personaId;
        }
      });

      setResultPersona(PERSONAS[bestPersonaId]);
      setTestCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIdx(0);
    setScores({ PP: 0, BD: 0, DR: 0, AN: 0 });
    setTestCompleted(false);
    setResultPersona(null);
  };

  const progressPct = ((currentQuestionIdx + 1) / SURVEY_QUESTIONS.length) * 100;
  const currentQuestion = SURVEY_QUESTIONS[currentQuestionIdx];

  return (
    <section className="py-20 bg-white" id="assessment">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600 font-display">Growth Profile</span>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            나의 대학교 자기계발 성향 검사
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            짧은 5가지 대화형 질문에 답변하고, 내 스타일에 완벽하게 들어맞는 성장 전략 및 추천 대외 프로젝트 종류를 분석받아 보세요.
          </p>
        </div>

        {/* Dynamic Card Container */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 sm:p-10">
          {!testCompleted ? (
            <div>
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>질문 {currentQuestionIdx + 1} / {SURVEY_QUESTIONS.length}</span>
                  <span className="text-indigo-600">{Math.round(progressPct)}% 완료</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden p-[2px]">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-6">
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                  {currentQuestion.text}
                </h3>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-3.5 pt-2">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option.score)}
                      className="flex w-full items-start space-x-3 rounded-2xl border border-slate-200 bg-white p-4.5 text-left text-sm font-semibold text-slate-700 hover:border-indigo-500 hover:bg-indigo-50/20 active:scale-[0.99] transition-all cursor-pointer shadow-sm group"
                      id={`quiz-option-${idx}`}
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-150 group-hover:bg-indigo-100 group-hover:text-indigo-600 font-mono text-xs font-bold text-slate-500 transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="leading-relaxed text-slate-800">{option.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Result Screen */
            resultPersona && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Result Top Badge and Title */}
                <div className="text-center pb-6 border-b border-slate-100">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-4 shadow-sm animate-pulse">
                    <Award className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-black text-indigo-600 tracking-widest uppercase font-display">
                    Your Self-Development Type is
                  </span>
                  <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-black text-slate-900">
                    {resultPersona.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-slate-500">
                    {resultPersona.sub}
                  </p>
                </div>

                {/* Persona Tagline Block */}
                <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-5 text-white text-center">
                  <p className="text-sm font-semibold tracking-tight italic text-indigo-200">
                    &ldquo;{resultPersona.tagline}&rdquo;
                  </p>
                </div>

                {/* Two Column details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  {/* Persona description & Traits */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">내 성향 들여다보기</h4>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed font-semibold">
                        {resultPersona.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">주요 성향 키워드</h4>
                      <div className="mt-3.5 flex flex-wrap gap-2">
                        {resultPersona.traits.map((trait, tIdx) => (
                          <span key={tIdx} className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full text-[10px] border border-indigo-100/50">
                            #{trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recommendation and customized tips */}
                  <div className="rounded-2xl bg-slate-50/50 p-6 border border-slate-105 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span>당신만을 위한 기적의 밀착 솔루션</span>
                      </h4>
                      
                      <ul className="mt-4 space-y-3">
                        {resultPersona.tips.map((tip, sIdx) => (
                          <li key={sIdx} className="flex items-start space-x-2 text-xs text-slate-700 leading-relaxed font-medium">
                            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-100 mt-6">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        강력 추천 타겟 액티비티
                      </span>
                      <span className="text-xs font-bold text-slate-850 leading-relaxed block bg-white px-3 py-2 rounded-xl border border-slate-150/40">
                        {resultPersona.recommendedActivity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Retake Button */}
                <div className="flex justify-center pt-6 border-t border-slate-100">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center space-x-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all cursor-pointer shadow-sm active:scale-95"
                    id="btn-retake-quiz"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
                    <span>재테스트하기</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    </section>
  );
}
