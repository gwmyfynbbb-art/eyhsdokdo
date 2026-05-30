/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { QuizQuestion } from '../types';
import { Shield, Anchor, AlertCircle, CheckCircle2, XCircle, Info, HelpCircle } from 'lucide-react';

const LESSON_3_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "제2차 세계대전 종전 직후인 1946년 1월 29일에 연합국 사령부가 발표하여, 울릉도, 제주도와 독도(Liancourt Rocks)를 일본의 행정·주권 범위에서 전면 제외하고 한국에 귀속 복원 수호 조치한 지령 문서는 무엇입니까?",
    options: ["샌프란시스코 강화조약", "SCAPIN(연합국최고사령관지령) 제677호", "한일기본조약", "신한일어업협정"],
    correctAnswerIndex: 1,
    explanation: "SCAPIN 제677호는 전후 연합국 사령부가 승전 후 일본의 영토 점령 기점을 획정하면서 독도를 엄연한 한국 영토적 반환 및 일본 배제 대상으로 정확히 명문화한 기록적 문서입니다."
  },
  {
    id: 2,
    question: "6·25 전쟁 시기의 국가적 극도 혼란기를 틈타 외국 순시선과 무단 어선이 침탈하려 하자, 울릉도 영주 청년 홍순칠을 비롯한 참전 군인들이 순수 자생적으로 결성하여 독도를 수호해낸 의로운 수비단은?",
    options: ["독도자율경비단", "독도의용수비대", "우산국 호위대", "동해영토 사수단"],
    correctAnswerIndex: 1,
    explanation: "'독도의용수비대'는 1953년부터 1956년까지 무장과 보급품이 전혀 없는 극도의 빈한한 상황에서 나무로 만든 가짜 박격포를 설치해 퇴치 작전을 벌이는 등 기개와 희생으로 독도를 실제로 전선에서 지켜냈습니다."
  },
  {
    id: 3,
    question: "1994년 유엔해양법협약 발효에 따라 200해리 배타적 경제수역(EEZ)이 선포되면서 양국 경계가 중첩되자, 1998년 타협안으로 독도를 중간 경계 기점 수역에 배치하며 최종 체결된 외교 어업 협정은?",
    options: ["한일 어교 상생 협정", "평화 수호 한일 협정", "신한일어업협정", "동해 자원 관리 협정"],
    correctAnswerIndex: 2,
    explanation: "1998년 체결된 '신한일어업협정'은 양국의 영토 분쟁 충돌을 우회하고 어업 자유 구역 확보를 타협하기 위해 울릉도와 오키섬을 기점으로 중첩 구역에 '중간수역'을 합의 배치해 두었습니다."
  }
];

export default function Lesson3ModernConflict() {
  const [activeSection, setActiveSection] = useState<'afterwar' | 'defense' | 'fishes'>('afterwar');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    LESSON_3_QUIZ.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizScore(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="space-y-10 animate-fade-in text-left">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-md uppercase tracking-wider">3차시 현대이슈</span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">현대 독도 갈등의 전개와 평화적 상생</h2>
        <p className="text-slate-500 mt-1.5 text-sm">제2차 세계대전 전후 처리 시기의 법적 조약 틈새와 배타적 수역 설계 과정에서 야기된 긴장을 이해하고, 평화로운 공동체 대안을 모색합니다.</p>
      </div>

      {/* Nav Menu */}
      <div className="grid grid-cols-3 gap-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveSection('afterwar')}
          className={`flex items-center justify-center gap-1.5 py-3 text-xs font-extrabold border-b-2 -mb-px transition cursor-pointer tracking-wider ${
            activeSection === 'afterwar' ? 'border-teal-600 text-teal-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          전후 조약과 영토 공백
        </button>
        <button
          onClick={() => setActiveSection('defense')}
          className={`flex items-center justify-center gap-1.5 py-3 text-xs font-extrabold border-b-2 -mb-px transition cursor-pointer tracking-wider ${
            activeSection === 'defense' ? 'border-teal-600 text-teal-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          평화선과 의용수비대
        </button>
        <button
          onClick={() => setActiveSection('fishes')}
          className={`flex items-center justify-center gap-1.5 py-3 text-xs font-extrabold border-b-2 -mb-px transition cursor-pointer tracking-wider ${
            activeSection === 'fishes' ? 'border-teal-600 text-teal-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Anchor className="w-4 h-4" />
          신한일어업협정
        </button>
      </div>

      {/* Detail Area */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 md:p-8">

        {/* Section 1: After War */}
        {activeSection === 'afterwar' && (
          <div className="space-y-6 animate-fade-in" id="conflict-afterwar">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 animate-fade-in">연합국의 영토 규명과 샌프란시스코 조약의 공백</h3>
              <p className="text-slate-500 text-xs mt-1">세계대전 파국 선포 후, 동아시아의 평화 영토 재분배 과정에서 남겨진 외교사적 비극을 살펴봅니다.</p>
            </div>

            <div className="space-y-4">
              {/* SCAPIN 제677호 */}
              <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm">연합국최고사령관 지령 (SCAPIN) 제677호</h4>
                  <span className="text-[10px] bg-teal-100 text-teal-850 px-2.5 py-1 rounded font-bold font-mono">1946년 1월 29일</span>
                </div>
                <p className="text-xs text-slate-650 leading-relaxed">
                  포츠담 선언을 이행하고 패전한 일본의 영토적 분계와 주권 행사 가이드라인을 획정하기 위해 연합국 최고사령부가 발포했습니다. <br />
                  이 지령에서 <b className="text-slate-900 font-extrabold">"일본의 정치상 행정상 관할 구역에서 울릉도, 제주도, 그리고 독도(Liancourt Rocks)를 전면 제외하며 한국으로 복원 귀속시킨다"</b>고 한 치의 의심 없이 격리 반환 조치했습니다.
                </p>
              </div>

              {/* 샌프란시스코 강화조약의 장벽 */}
              <div className="p-5 border border-amber-200 rounded-xl bg-amber-50/10 space-y-3 border-l-4 border-l-amber-500">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    샌프란시스코 강화조약 (1951년 9월 8일 타결)
                  </h4>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded font-bold font-mono">1951년 9월 8일</span>
                </div>
                <p className="text-xs text-slate-650 leading-relaxed">
                  제2차 세계대전을 종전하고 일본과 연합국간 평화적 조율을 도모한 대규모 강화조약입니다. <br />
                  조약의 초기 초안(1차~5차)문들에는 일본이 한국에 명확히 명기 포기해야 할 영토 리스트에 '독도'가 똑바로 기록되어 있었습니다. 그러나 일본 정부의 은밀하고도 치기 어린 침탈식 대미 외교 대관방 로비 활동으로 인해, 핵심 자구인 <b className="font-extrabold text-rose-600">'독도' 명칭이 최종 공식 조례문 텍스트 내에서 누락</b>되는 아쉬운 사건이 발생했습니다.
                </p>
                <p className="text-[10.5px] text-amber-900 leading-relaxed font-extrabold">
                  ⚠️ 일본 정부는 이 '독도' 자구 누락을 고의적인 외교상 구실로 삼아 가며, 오늘날까지 독도를 수선해 '영유권이 불확실한 분쟁지'로 세분화 왜곡 선전하는 허상의 무기를 삼고 있습니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Defense Efforts */}
        {activeSection === 'defense' && (
          <div className="space-y-6 animate-fade-in" id="conflict-defense">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 animate-fade-in">이승만 평화선 구획과 독도의용수비대의 헌신</h3>
              <p className="text-slate-500 text-xs mt-1">격변하는 현대사 및 전란 한가운데에서 우리 관할 영역을 실제적이고 결연하게 사수해낸 평화 방파제 사적을 배웁니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 이승만 평화선 */}
              <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/40 space-y-2.5">
                <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded font-mono">
                  1952년 1월 선포
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">인접해양 주권 선포 (평화선)</h4>
                <p className="text-xs text-slate-650 leading-relaxed">
                  샌프란시스코 조약이 정식 발효를 앞둔 해양 수급의 과도한 약탈 방지를 우려하여, 이승만 대통령은 한반도의 경제 수역 및 환경 어족보호를 지킬 <b className="text-slate-800 font-extrabold">'평화선(Rhee Line)'</b>을 영해 인접지에 획선 배치했습니다. 
                  <br />
                  이 평화선 내부에 독도를 명확히 편입시킴으로써 외국의 무단 어업 침입과 불법 탈세를 철저히 단속·나포 수호하는 튼튼한 장치를 마련했습니다.
                </p>
              </div>

              {/* 독도의용수비대 */}
              <div className="p-5 border border-teal-200 rounded-2xl bg-teal-50/10 space-y-2.5">
                <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded font-mono">
                  1953 ~ 1956년 수호
                </span>
                <h4 className="font-extrabold text-slate-900 text-sm">독도의용수비대 (獨島義勇守備隊)</h4>
                <p className="text-xs text-slate-650 leading-relaxed">
                  국가가 6·25 전쟁이라는 피비린내 나는 동족상잔의 사투를 벌이는 고통 속에서, 외국 경비함이나 순찰 보트가 틈을 보아 독도에 진입하여 표석 왜곡 말뚝을 박는 비극이 속출했습니다. <br />
                  이에 울릉도 청년 영웅 <b className="text-slate-900 font-extrabold">홍순칠 대장</b>과 예비역 장병 등 거용의 전역 청년 33명이 기적적으로 자율적인 민간 군사조직인 독도의용수비대를 결성해 총탄과 가짜 목제 박격포로 독도를 실제 사수했습니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Fishery Agreement */}
        {activeSection === 'fishes' && (
          <div className="space-y-6 animate-fade-in" id="conflict-fishes">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 animate-fade-in">신한일어업협정과 중간수역 및 해양 관할권</h3>
              <p className="text-slate-500 text-xs mt-1">유엔해양법협약(UNCLOS) 시대의 도래와 한일 양국의 배타적 수역 중첩에 따른 평화적 분쟁 조율의 역사적 성격을 규명합니다.</p>
            </div>

            <div className="space-y-4">
              {/* 유엔해양법협약과 EEZ */}
              <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">200해리 배타적 경제수역(EEZ)의 갈등</h4>
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-2.5 py-1 rounded font-bold font-mono">1994년 발효</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  유엔해양법협약에 따라 영해 12해리를 넘어서 최대 200해리까지 연안국의 독점적 경제 자원 관할권을 인정하는 배타적 경제수역(EEZ) 제도가 공식화되었습니다. 
                  동해 바다는 한일 양국 간의 최단 거리가 400해리 미만이므로 두 나라의 EEZ가 필연적으로 교차·중첩되며 수산업적, 법학적 상호 마찰이 극에 달했습니다.
                </p>
              </div>

              {/* 신한일어업협정과 중간수역 타협 */}
              <div className="p-5 border border-teal-200 rounded-xl bg-teal-50/5 space-y-3 border-l-4 border-l-teal-600">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Anchor className="w-4 h-4 text-teal-600" />
                    신한일어업협정 (1998년 11월 국회 비준)
                  </h4>
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-2.5 py-1 rounded font-bold font-mono">1998년 체결</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  양국 정부는 어업 충돌의 상호 무력 귀결을 피하고, 원활한 동해 공존 수계를 합의 형성하기 위해 울릉도와 일본 오키섬 간 중첩되는 일부 구획을 공동 관리하는 <strong className="text-slate-900 font-extrabold">'중간수역'</strong>으로 합의 배치하였습니다.<br />
                  일부에서 독도가 중간수역에 포함된 사실을 주권 침해라 비난하기도 하지만, 본 협정은 <strong className="text-slate-900 font-extrabold">수리적인 어업·어구 사용 구역 조정만을 조령한 기술적 행정 조약</strong>이며 영토 경계 획정과는 철저히 별개임을 조약 제15조("본 협정은 영토 주권의 법적 지위에 어떠한 영향도 주지 아니한다")에 강력히 가이드라인 명문화해두고 있습니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3차시 점검 문제 */}
      <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-200 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-teal-600" />
          <h3 className="text-xl font-extrabold text-slate-900 animate-fade-in">3차시 배움 점검 퀴즈</h3>
        </div>

        <div className="space-y-6">
          {LESSON_3_QUIZ.map((q, idx) => {
            return (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-205 space-y-4 text-left shadow-2xs">
                <p className="font-extrabold text-slate-900 text-sm">
                  {idx + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[q.id] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectAnswer(q.id, oIdx)}
                        className={`p-3.5 text-xs rounded-xl flex items-center justify-between text-left transition duration-200 active:scale-[0.98] ${
                          quizSubmitted
                            ? q.correctAnswerIndex === oIdx
                              ? "bg-emerald-50 border-emerald-400 border text-emerald-950 font-extrabold shadow-2xs"
                              : isSelected
                              ? "bg-rose-50 border-rose-300 border text-rose-700"
                              : "bg-slate-50 text-slate-400 border border-slate-200"
                            : isSelected
                            ? "bg-teal-50 border-teal-600 border-2 text-teal-705 text-teal-700 font-extrabold shadow-xs"
                            : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-205 cursor-pointer hover:border-slate-350"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && !quizSubmitted && <span className="w-2 h-2 rounded-full bg-teal-600"></span>}
                        {quizSubmitted && q.correctAnswerIndex === oIdx && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {quizSubmitted && isSelected && q.correctAnswerIndex !== oIdx && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* 개별 퀴즈 정답 피드백 */}
                {quizSubmitted && (
                  <div className="p-4 bg-teal-50/40 rounded-xl text-slate-700 text-xs leading-relaxed flex gap-2.5 border border-teal-100">
                    <Info className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-teal-700">해설:</span> {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 퀴즈 채점 결과 컨트롤 바 */}
        <div className="mt-8 flex flex-wrap items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 gap-4 shadow-sm">
          <div>
            {!quizSubmitted ? (
              <p className="text-slate-500 text-xs font-semibold">현대 갈등과 조약 지식을 되짚어가며 제출합니다.</p>
            ) : (
              <p className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                <span>현대 영유 평화적 이해도: 총 3점 중 <b className="text-teal-600">{quizScore}점</b> 달성!</span>
                {quizScore === 3 ? (
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">100점 완벽배움</span>
                ) : (
                  <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-bold text-[11px] uppercase tracking-wider">지혜 넓혀가기</span>
                )}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {quizSubmitted ? (
              <button
                onClick={handleResetQuiz}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl active:scale-95 transition cursor-pointer border border-slate-200"
              >
                다시 풀기
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < 3}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-250 disabled:text-slate-400 text-white font-bold text-xs rounded-xl active:scale-95 transition cursor-pointer shadow-sm"
              >
                제출 및 채점하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
