import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Plus, Trash2, Calendar, Target, Check, 
  TrendingUp, Sparkles, ArrowRight, RotateCcw, HelpCircle,
  Award, BookOpen, Lightbulb, UserCheck, CheckCircle2, ShieldAlert
} from 'lucide-react';

// Character Type definitions
interface CompanionCharacter {
  id: string;
  name: string;
  codename: string;
  sub: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  accentBg: string;
  emoji: string;
  imageUrl?: string;
  quote: string;
  desc: string;
  routineTone: string;
}

// Fixed characters list
const CHARACTERS: CompanionCharacter[] = [
  {
    id: 'quokka',
    name: '든든한 아기곰 웅이 (Bear)',
    codename: '실천 대장 웅이',
    sub: '긍정 파워 가득한 듬직하고 성실한 리더',
    bgColor: 'bg-indigo-50/70',
    borderColor: 'border-indigo-200 focus-within:border-indigo-500',
    textColor: 'text-indigo-900',
    accentBg: 'bg-indigo-100/80 text-indigo-700',
    emoji: '🐻',
    imageUrl: '/src/assets/images/bear_character_1780560918309.png',
    quote: "“매일 작은 성공을 우직하고 성실하게 채우다 보면, 우리 올해 목표 모두 이룰 수 있을 곰!”",
    desc: '든든하고 우직한 태도로 매일의 약속을 지킵니다. 동반자가 되어 끈기 있고 한결같은 기쁨을 선물해 줘요.',
    routineTone: '오늘도 든든하게 실천 완수!'
  },
  {
    id: 'owl',
    name: '야무진 아기병아리 삐약이 (Chick)',
    codename: '치밀한 꼼꼼이 삐약이',
    sub: '작지만 치밀하고 꼼꼼한 야무진 플래닝의 달인',
    bgColor: 'bg-amber-50/75',
    borderColor: 'border-amber-200 focus-within:border-amber-500',
    textColor: 'text-amber-900',
    accentBg: 'bg-amber-100/80 text-amber-800',
    emoji: '🐤',
    imageUrl: '/src/assets/images/chick_character_1780560933812.png',
    quote: "“삐약이와 함께라면 빈틈없는 정밀 관리가 가능해요! 매일 계획대로 철저히 수행해봐요!”",
    desc: '모든 행동과 시간을 꼼꼼하게 조각내고 계획적으로 정돈해 내는 높은 디테일과 카타르시스를 선물합니다.',
    routineTone: '빈틈없이 꼼꼼하게 삐약 완료!'
  },
  {
    id: 'turtle',
    name: '긍정 대장 아기강아지 뭉치 (Puppy)',
    codename: '집중 멍뭉이 뭉치',
    sub: '오직 앞만 보고 뚝심 있게 집중하는 근성의 강아지',
    bgColor: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200 focus-within:border-emerald-500',
    textColor: 'text-emerald-900',
    accentBg: 'bg-emerald-100/80 text-emerald-700',
    emoji: '🐶',
    imageUrl: '/src/assets/images/puppy_character_1780560951694.png',
    quote: "“천천히 가더라도 우리 같이 끝까지 긍정적으로! 나 자신을 믿고 오늘에 무한 몰입하자 멍!”",
    desc: '속도에 일희일비하지 않는 우직함과 활력 넘치는 몰입력을 발휘하여 끝까지 목표를 달성해 냅니다.',
    routineTone: '오늘도 꼬리 흔들며 완수 완료!'
  }
];

interface SmartHabit {
  id: string;
  title: string;
  desc: string;
  category: 'character' | 'bucket' | 'custom';
  completedDays: boolean[]; // Mon~Sun tracking
  bucketTextReference?: string;
}

export default function HabitLoopTracker() {
  // App state
  const [selectedCharId, setSelectedCharId] = useState<string>('quokka');
  const [bucketList, setBucketList] = useState<string[]>(['', '']);
  const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false);
  const [analyzingProgress, setAnalyzingProgress] = useState<number>(-1);
  const [habits, setHabits] = useState<SmartHabit[]>([]);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customDesc, setCustomDesc] = useState<string>('');

  // Load state from localStorage on mount
  const loadStoredData = () => {
    const savedChar = localStorage.getItem('unigrow_selected_character');
    const savedBuckets = localStorage.getItem('unigrow_bucket_list');
    const savedHabits = localStorage.getItem('unigrow_smart_habits');
    const savedAnalyzed = localStorage.getItem('unigrow_analyzed');

    if (savedChar) setSelectedCharId(savedChar);
    if (savedBuckets) {
      try {
        setBucketList(JSON.parse(savedBuckets));
      } catch (e) {
        setBucketList(['', '']);
      }
    }
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (e) {
        setHabits([]);
      }
    }
    if (savedAnalyzed === 'true') {
      setIsAnalyzed(true);
    } else {
      setIsAnalyzed(false);
    }
  };

  useEffect(() => {
    loadStoredData();

    window.addEventListener('unigrow_habits_updated', loadStoredData);
    return () => {
      window.removeEventListener('unigrow_habits_updated', loadStoredData);
    };
  }, []);

  // Sync state helpers
  const saveStateToLocalStorage = (
    charId: string, 
    buckets: string[], 
    analyzedHabits: SmartHabit[], 
    analyzedBool: boolean
  ) => {
    localStorage.setItem('unigrow_selected_character', charId);
    localStorage.setItem('unigrow_bucket_list', JSON.stringify(buckets));
    localStorage.setItem('unigrow_smart_habits', JSON.stringify(analyzedHabits));
    localStorage.setItem('unigrow_analyzed', analyzedBool ? 'true' : 'false');
    window.dispatchEvent(new Event('unigrow_habits_updated'));
  };

  // Add Bucket goal field
  const handleAddBucketField = () => {
    setBucketList([...bucketList, '']);
  };

  // Edit individual bucket input
  const handleEditBucketValue = (index: number, val: string) => {
    const updated = [...bucketList];
    updated[index] = val;
    setBucketList(updated);
  };

  // Remove bucket item (with minimum 2 safety limit)
  const handleRemoveBucketField = (index: number) => {
    if (bucketList.length <= 2) return;
    const updated = bucketList.filter((_, i) => i !== index);
    setBucketList(updated);
  };

  // Run the analysis flow with mock processor simulator
  const handleProcessAnalysis = () => {
    // Basic verification: At least two bucket elements must be filled
    const activeBuckets = bucketList.filter(item => item.trim().length > 0);
    if (activeBuckets.length < 2) {
      alert('올해 이루고 싶은 버킷리스트를 최소 2가지 이상 입력해주세요!');
      return;
    }

    setAnalyzingProgress(0);
    
    // Simulate smart analyzer calculating parameters
    const interval = setInterval(() => {
      setAnalyzingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Complete and build recommendations
          const chosenCharacter = CHARACTERS.find(c => c.id === selectedCharId) || CHARACTERS[0];
          
          // Generate direct habits from non-empty custom bucket list items verbatim!
          const bucketHabits: SmartHabit[] = activeBuckets.map((bText, index) => {
            const trimmed = bText.trim();
            const lowerVal = trimmed.toLowerCase();
            let emoji = '🎯';
            if (lowerVal.includes('영어') || lowerVal.includes('어학') || lowerVal.includes('토익') || lowerVal.includes('스피킹') || lowerVal.includes('외국어') || lowerVal.includes('english') || lowerVal.includes('speak')) {
              emoji = '📚';
            } else if (lowerVal.includes('코딩') || lowerVal.includes('개발') || lowerVal.includes('깃허브') || lowerVal.includes('프로그래밍') || lowerVal.includes('공부') || lowerVal.includes('알고리즘') || lowerVal.includes('파이썬')) {
              emoji = '💻';
            } else if (lowerVal.includes('학점') || lowerVal.includes('a+') || lowerVal.includes('성적') || lowerVal.includes('전공') || lowerVal.includes('장학금')) {
              emoji = '🎓';
            } else if (lowerVal.includes('디자인') || lowerVal.includes('드로잉') || lowerVal.includes('피그마') || lowerVal.includes('그림') || lowerVal.includes('포토샵') || lowerVal.includes('일러스트')) {
              emoji = '🎨';
            } else if (lowerVal.includes('운동') || lowerVal.includes('헬스') || lowerVal.includes('체력') || lowerVal.includes('건강') || lowerVal.includes('다이어트') || lowerVal.includes('러닝') || lowerVal.includes('조깅')) {
              emoji = '🏃';
            } else if (lowerVal.includes('여행') || lowerVal.includes('바다') || lowerVal.includes('해외') || lowerVal.includes('제주')) {
              emoji = '✈️';
            } else if (lowerVal.includes('블로그') || lowerVal.includes('글쓰기') || lowerVal.includes('기록') || lowerVal.includes('노션') || lowerVal.includes('일기')) {
              emoji = '🖋️';
            }

            return {
              id: `bucket-h-${Date.now()}-${index}`,
              title: `${emoji} ${trimmed}`,
              desc: `성공적인 올해를 달성하기 위한 나의 약속`,
              category: 'bucket',
              completedDays: [false, false, false, false, false, false, false],
              bucketTextReference: trimmed
            };
          });

          setHabits(bucketHabits);
          setIsAnalyzed(true);
          setAnalyzingProgress(-1);

          // Save state to local storage
          saveStateToLocalStorage(selectedCharId, bucketList, bucketHabits, true);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  // Toggle checklist checkbox
  const handleToggleDay = (habitId: string, dayIdx: number) => {
    const updated = habits.map(h => {
      if (h.id === habitId) {
        const nextCompleted = [...h.completedDays];
        nextCompleted[dayIdx] = !nextCompleted[dayIdx];
        return { ...h, completedDays: nextCompleted };
      }
      return h;
    });
    setHabits(updated);
    saveStateToLocalStorage(selectedCharId, bucketList, updated, isAnalyzed);
  };

  // Delete checklist item
  const handleDeleteHabit = (id: string) => {
    const updated = habits.filter(h => h.id !== id);
    setHabits(updated);
    saveStateToLocalStorage(selectedCharId, bucketList, updated, isAnalyzed);
  };

  // Add individual custom habit manually to checklist
  const handleAddCustomHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newHabit: SmartHabit = {
      id: `custom-smart-${Date.now()}`,
      title: '🛠️ ' + customTitle.trim(),
      desc: customDesc.trim() || '내가 직접 정의한 실천 로드맵',
      category: 'custom',
      completedDays: [false, false, false, false, false, false, false]
    };

    const updated = [...habits, newHabit];
    setHabits(updated);
    saveStateToLocalStorage(selectedCharId, bucketList, updated, isAnalyzed);
    setCustomTitle('');
    setCustomDesc('');
  };

  // Reset Analyzer to configure again
  const handleResetPlanner = () => {
    if (confirm('설정한 캐릭터와 버킷리스트 설정을 리셋하고 처음부터 다시 설계하겠습니까? (그간의 모든 목표 텍스트와 요일별 체크 이력은 사라집니다)')) {
      setIsAnalyzed(false);
      setHabits([]);
      setBucketList(['', '']);
      saveStateToLocalStorage(selectedCharId, ['', ''], [], false);
    }
  };

  // Go back to setup screen keeping the existing characters and goals intact
  const handleBackToSetup = () => {
    setIsAnalyzed(false);
    saveStateToLocalStorage(selectedCharId, bucketList, habits, false);
  };

  const DAYS_SHORT = ['월', '화', '수', '목', '금', '토', '일'];

  // Global Stat Calculations
  const totalSlots = habits.length * 7;
  const completedSlots = habits.reduce((sum, h) => sum + h.completedDays.filter(Boolean).length, 0);
  const completionRate = totalSlots > 0 ? Math.round((completedSlots / totalSlots) * 100) : 0;

  // Selected companion profile
  const companion = CHARACTERS.find(c => c.id === selectedCharId) || CHARACTERS[0];

  return (
    <section className="py-20 bg-slate-50/50 border-b border-slate-200/50" id="habits">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-14" id="section-routines-intro">
          <span className="text-xs font-black uppercase tracking-widest text-[#6366F1] font-sans">
            AI SMART ROUTINE PLANNER
          </span>
          <h2 className="mt-2 font-sans text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            캐릭터 맞춤형 스마트 루틴 매니저
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-650 leading-relaxed font-leeseoyun">
            나의 동반자 캐릭터를 고르고 올해 꼭 하고 싶은 버킷리스트를 작성해 보세요. 
            AI 플래너가 성향에 맞춘 실질적이고 행동 중심의 매일 실천 가이드와 체크리스트를 정밀 구축해 드립니다.
          </p>
        </div>

        {/* LOADING ANIMATION FOR ANALYZER */}
        {analyzingProgress >= 0 && (
          <div className="max-w-xl mx-auto my-12 rounded-3xl bg-white border border-slate-200 p-8 text-center shadow-lg animate-pulse" id="analyzer-spinner">
            <div className="relative inline-flex items-center justify-center p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-indigo-600 animate-spin" />
            </div>
            <h3 className="text-lg font-black text-slate-900 font-sans">AI 스마트 라이프 분석기 작동 중</h3>
            <p className="text-xs text-slate-500 mt-1">
              선택한 캐릭터성 및 버킷리스트 {bucketList.filter(b=>b.trim().length>0).length}가지를 기반으로 최고의 생활 루프를 계산하고 있습니다...
            </p>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${analyzingProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-black mt-2 text-indigo-600 block">{analyzingProgress}% 완료</span>
          </div>
        )}

        {/* STEP 1: INITIAL SETTINGS FORM (NOT ANALYZED YET) */}
        {!isAnalyzed && analyzingProgress === -1 && (
          <div className="space-y-12 max-w-5xl mx-auto" id="routine-planner-setup">
            
            {/* CHARACTER SELECT CARD GRID */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-[#6366F1] border border-indigo-100">
                  <UserCheck className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  STEP 1. 나만의 대리 캐릭터 선택하기 (나중에 이미지 삽입 가능)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CHARACTERS.map((char) => {
                  const isSelected = selectedCharId === char.id;
                  return (
                    <button
                      key={char.id}
                      onClick={() => setSelectedCharId(char.id)}
                      className={`text-left rounded-3xl border-2 p-6 transition-all duration-300 relative cursor-pointer outline-none flex flex-col justify-between ${
                        isSelected 
                          ? `${char.bgColor} border-indigo-600 ring-4 ring-indigo-500/10 shadow-md transform -translate-y-1`
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                      id={`char-btn-${char.id}`}
                    >
                      {/* Badge indicator */}
                      {isSelected && (
                        <span className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm">
                          <Check className="h-3.5 w-3.5 stroke-[3px]" />
                        </span>
                      )}

                      <div className="space-y-4">
                        {/* Character Illustration Frame */}
                        <div className="h-32 w-full rounded-2xl bg-white border border-slate-200/60 flex items-center justify-center relative overflow-hidden p-2 shadow-inner">
                          {char.imageUrl ? (
                            <img 
                              src={char.imageUrl} 
                              alt={char.name} 
                              className="h-full object-contain pointer-events-none rounded-xl"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span className="text-4xl filter drop-shadow">{char.emoji}</span>
                          )}
                        </div>

                        <div>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${char.accentBg}`}>
                            {char.codename}
                          </span>
                          <h4 className="font-sans font-black text-base text-slate-950 mt-2 leading-tight">
                            {char.name}
                          </h4>
                          <span className="block text-[11px] text-slate-450 font-medium font-sans mt-0.5 line-clamp-1">
                            {char.sub}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          {char.desc}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 italic text-[11px] text-slate-600 font-leeseoyun font-semibold">
                        {char.quote}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BUCKET LIST DYNAMIC LISTS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-[#6366F1] border border-indigo-100">
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      STEP 2. 올해 나의 버킷리스트 다짐 설정 (최소 2개)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">키워드(예: 영어공부, 성적A+, 운동, 드로잉)를 필두로 자유롭게 정해 주세요.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddBucketField}
                  className="inline-flex items-center space-x-1 py-1.5 px-3 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
                  id="btn-add-bucket-field"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>새 항목 추가</span>
                </button>
              </div>

              {/* Bucket List Input Fields */}
              <div className="space-y-3.5">
                {bucketList.map((bucketItem, idx) => {
                  const isRequired = idx < 2; // Required minimum of 2
                  return (
                    <div key={idx} className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-black text-slate-400 w-6">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="grow relative">
                        <input
                          type="text"
                          value={bucketItem}
                          onChange={(e) => handleEditBucketValue(idx, e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50/50"
                          placeholder={isRequired 
                            ? `버킷리스트 다짐을 적어주세요. (예: 하루 15분 영어 쉐도잉하기, 학점 4.2 달성) *필수`
                            : '추가적인 버킷리스트와 목표를 기입하세요.'
                          }
                          id={`bucket-input-${idx}`}
                        />
                        {isRequired && (
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-indigo-500/80 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100/30">
                            필수 항목
                          </span>
                        )}
                      </div>

                      {/* Delete icon - Hidden for the first two items */}
                      {!isRequired && (
                        <button
                          type="button"
                          onClick={() => handleRemoveBucketField(idx)}
                          className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                          title="목표 삭제"
                          id={`btn-delete-bucket-${idx}`}
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
                <button
                  type="button"
                  onClick={handleProcessAnalysis}
                  className="inline-flex items-center space-x-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white hover:text-indigo-200 font-sans font-black text-xs sm:text-sm py-4 px-8 tracking-wide transition-all shadow-md shadow-slate-950/10 hover:shadow-lg active:scale-95 cursor-pointer"
                  id="btn-trigger-analysis"
                >
                  <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
                  <span>맞춤형 스마트 데일리 루틴 생성 및 분석하기</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: ACTIVE ANALYZED ROUNTINES VIEW */}
        {isAnalyzed && (
          <div className="space-y-8 max-w-7xl mx-auto" id="smart-checklist-view">
            
            {/* Top Analysis Board Banner */}
            <div className="rounded-[30px] bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-indigo-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 -z-10 h-64 w-64 bg-indigo-500/10 blur-3xl rounded-full" />
              <div className="absolute left-1/3 bottom-0 -z-10 h-44 w-44 bg-emerald-500/10 blur-3xl rounded-full" />

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                
                {/* Character & Quote widget */}
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="h-16 w-16 sm:h-18 sm:w-18 bg-white rounded-2xl border border-white/20 flex items-center justify-center shrink-0 overflow-hidden p-1 shadow-md">
                    {companion.imageUrl ? (
                      <img 
                        src={companion.imageUrl} 
                        alt={companion.name} 
                        className="h-full w-full object-contain pointer-events-none rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-3xl sm:text-4xl filter drop-shadow">{companion.emoji}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-sans font-black bg-indigo-500/30 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">
                        {companion.codename} 모드 온
                      </span>
                      <span className="text-[10px] font-sans font-bold bg-white/10 text-emerald-300 px-2.5 py-0.5 rounded-full border border-white/5">
                        스마트 루프 매칭 100% 완료
                      </span>
                    </div>
                    <h3 className="mt-1 font-sans text-xl font-black text-white">
                      {companion.name}과(와) 함께하는 주간 실천
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 italic font-leeseoyun">
                      {companion.quote}
                    </p>
                  </div>
                </div>

                {/* Progress Circle & Controls */}
                <div className="flex items-center gap-4.5 bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl shrink-0 self-start lg:self-auto w-full lg:w-auto justify-between sm:justify-start">
                  <div>
                    <span className="block text-[10px] text-indigo-200 uppercase font-bold tracking-widest font-sans">
                      종합 주간 달성 효율 디렉션
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-black mt-0.5 text-white block">
                      {completionRate}% 달성 중
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      총 {totalSlots}개 중 {completedSlots}개 실천함
                    </span>
                  </div>

                  {/* Reset/Edit configuration */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={handleBackToSetup}
                      className="inline-flex items-center justify-center space-x-1.5 py-2 px-3.5 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 active:scale-95 transition-all cursor-pointer shadow-sm shadow-indigo-950/20"
                      title="입력한 내용 그대로 편집 화면으로 되돌아갑니다."
                      id="btn-edit-setup"
                    >
                      <UserCheck className="h-3.5 w-3.5 text-indigo-200" />
                      <span>캐릭터 & 목표 수정</span>
                    </button>
                    
                    <button
                      onClick={handleResetPlanner}
                      className="inline-flex items-center justify-center space-x-1.5 py-2 px-3.5 rounded-xl text-xs font-black text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 active:scale-95 transition-all cursor-pointer"
                      title="모든 설정을 완전히 비우고 초기화합니다."
                      id="btn-reconfigure-routine"
                    >
                      <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
                      <span>전체 초기화</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Habits Check Matrix (Take 2 Cols) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                    <span>오늘 나의 주간 체크인 시트 (월요일 ~ 일요일)</span>
                  </h4>
                  <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />
                    <span>{companion.routineTone}</span>
                  </span>
                </div>

                {habits.length === 0 ? (
                  <div className="text-center py-16 rounded-3xl bg-white border border-slate-205 text-slate-405 font-medium shadow-sm">
                    등록된 맞춤형 추천 습관이 비었습니다. 계획표를 새로 생성해 보세요!
                  </div>
                ) : (
                  <div className="space-y-3.5" id="routines-check-list">
                    {habits.map((habit) => {
                      const completedCount = habit.completedDays.filter(Boolean).length;
                      const isBucketCategory = habit.category === 'bucket';
                      const isCharCategory = habit.category === 'character';
                      
                      return (
                        <div
                          key={habit.id}
                          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all hover:border-indigo-150 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                          id={`habit-row-${habit.id}`}
                        >
                          <div className="grow space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-sm font-black text-slate-905 tracking-tight">
                                {habit.title}
                              </span>
                              <span className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[9px] font-black text-slate-600 border border-slate-200">
                                {completedCount}회 클리어
                              </span>
                              
                              {/* Category indicator Badge */}
                              {isCharCategory ? (
                                <span className="rounded-full bg-indigo-50/70 border border-indigo-100 text-[8px] font-black text-indigo-600 px-1.5 py-0.2">
                                  캐릭터 시그니처
                                </span>
                              ) : isBucketCategory ? (
                                <span className="rounded-full bg-emerald-50/70 border border-emerald-100 text-[8px] font-black text-emerald-700 px-1.5 py-0.2">
                                  버킷 연동형
                                </span>
                              ) : (
                                <span className="rounded-full bg-amber-50/70 border border-amber-100 text-[8px] font-black text-amber-700 px-1.5 py-0.2">
                                  개인 수동계획
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 font-semibold font-leeseoyun leading-relaxed">
                              {habit.desc}
                            </p>
                          </div>

                          {/* Mon ~ Sun checklist grid */}
                          <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                            <div className="flex space-x-1.5 overflow-x-auto">
                              {DAYS_SHORT.map((day, dIdx) => {
                                const isDone = habit.completedDays[dIdx];
                                return (
                                  <button
                                    key={dIdx}
                                    onClick={() => handleToggleDay(habit.id, dIdx)}
                                    className={`flex h-9 w-9 flex-col items-center justify-center rounded-xl border text-xs font-black cursor-pointer transition-all ${
                                      isDone
                                        ? 'bg-indigo-650 text-white border-indigo-600 shadow-sm shadow-indigo-500/10'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                                    title={`${day}요일 완료 여부 변경`}
                                    id={`smart-habit-${habit.id}-day-${dIdx}`}
                                  >
                                    <span className={`text-[8.5px] font-black ${isDone ? 'text-indigo-100' : 'text-slate-400'}`}>
                                      {day}
                                    </span>
                                    <span className="text-xs mt-0.5 font-sans font-black">
                                      {isDone ? '✓' : '•'}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Delete custom/bucket items */}
                            <button
                              onClick={() => handleDeleteHabit(habit.id)}
                              className="rounded-xl p-2 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0 cursor-pointer ml-1"
                              title="항목 제거"
                              id={`delete-smart-row-${habit.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add Custom Routines Form Panel */}
              <div className="space-y-6">
                
                {/* Info Card containing the Buckets */}
                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center space-x-1.5">
                    <Target className="h-4 w-4 text-emerald-600" />
                    <span>올해의 활성 버킷리스트</span>
                  </h4>
                  <div className="space-y-2">
                    {bucketList.filter(b=>b.trim().length > 0).map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-slate-700 leading-tight">
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* New custom routine additions */}
                <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-sm">
                  <h4 className="font-sans text-xs font-black text-slate-900 flex items-center space-x-1.5 uppercase tracking-wider">
                    <Plus className="h-4 w-4 text-indigo-600" />
                    <span>개인 맞춤형 습관 직접 더하기</span>
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 mb-4 leading-relaxed font-semibold">
                    내 스케줄에 알맞은 구체적 행동 강령을 기입해 주간 보드판에 직접 올려 보세요.
                  </p>

                  <form onSubmit={handleAddCustomHabit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        습관/실천 미션 명칭
                      </label>
                      <input
                        type="text"
                        required
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
                        placeholder="예: 과외 알바 복습 & 수업자료 세팅"
                        id="custom-habit-input-title"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        간략한 행동 요강 기술
                      </label>
                      <input
                        type="text"
                        value={customDesc}
                        onChange={(e) => setCustomDesc(e.target.value)}
                        className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
                        placeholder="예: 주 2회 퇴근 전 구글 드라이브 업로드"
                        id="custom-habit-input-desc"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center space-x-1 py-3 px-4 rounded-full bg-slate-950 text-white hover:text-indigo-200 hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans text-xs font-black tracking-wide"
                      id="btn-add-custom-routine"
                    >
                      <span>보드판에 즉시 추가하기</span>
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
