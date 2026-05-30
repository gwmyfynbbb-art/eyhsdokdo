/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { QuizQuestion } from '../types';
import { BookOpen, FileText, Map, Clock, CheckCircle2, XCircle, Info, HelpCircle } from 'lucide-react';

const LESSON_2_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "1877년 메이지 일본 정부 최고 행정 권위 기관인 태정관이 내무성에 하달하여, '울릉도 외 일도(독도)의 건은 일본과 관계없음을 명심할 것'을 지시한 역사적인 공인 사료는 무엇입니까?",
    options: ["은주시청합기", "조선국 교제시말 내탐서", "태정관 지령", "칙령 제41호"],
    correctAnswerIndex: 2,
    explanation: "메이지 최고 국가 의사결정 기구였던 '태정관'이 내린 1877년 '태정관 지령'은 독도가 일본 영토가 아님을 국정 최고 권위에서 사법적으로 인정한 절대 증거입니다."
  },
  {
    id: 2,
    question: "일본 저명 실학자 하야시 시헤이가 1785년에 저술·제작한 아시아 국가 지도로서, 조선반도와 울릉도, 독도를 동일한 황색(Yellow)으로 칠하고 그 아래 '조선의 것'이라 명기한 저명한 고지도는?",
    options: ["개정 일본여지로정전도", "삼국접양지도", "팔도총도", "동국지도"],
    correctAnswerIndex: 1,
    explanation: "'삼국접양지도'는 당시 일본 지리학자 스스로 독도와 울릉도가 조선의 소유임을 세계만방에 솔직하게 규명하고 고백한 가치 높은 교차 사료형 지도입니다."
  },
  {
    id: 3,
    question: "안용복과 막부 간 어업 분쟁 이후, 1695년 에도 막부가 돗토리번에 '울릉도와 독도가 번의 영토인가' 질의하자 번주는 자국 영토 소속이 아님을 회신했습니다. 이에 막부가 1696년 선포한 조치는?",
    options: ["조선국 침공 명령", "울릉도·독도 해역 도해(항해) 금지령", "안용복 수감령", "시마네현 영토 강제 편입 조례"],
    correctAnswerIndex: 1,
    explanation: "에도 막부는 돗토리번의 소유 부정 답변을 접수하고, 역사적 영토 경계가 일본 밖임을 명시해 자국 어민들의 울릉도·독도 방면 항해와 조업을 금지하는 '도해 금지령'을 발표했습니다."
  }
];

export default function Lesson2History() {
  const [activeSection, setActiveSection] = useState<'korean' | 'japanese' | 'maps' | 'anyongbok'>('korean');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    LESSON_2_QUIZ.forEach(q => {
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
        <span className="text-xs font-bold text-indigo-705 text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md uppercase tracking-wider">2차시 사료탐구</span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">사료와 지도로 규명하는 역사적 권원</h2>
        <p className="text-slate-500 mt-1.5 text-sm">역사학적 진실의 힘은 감정이 아닌 명확한 1차 사료(Primary Sources)의 과학적이고 상호 대조적인 교차 분석에서 나옵니다.</p>
      </div>

      {/* Nav Menu */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveSection('korean')}
          className={`flex items-center justify-center gap-1.5 py-3 text-xs font-extrabold border-b-2 -mb-px transition cursor-pointer tracking-wider ${
            activeSection === 'korean' ? 'border-indigo-650 border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          대한민국 고문서
        </button>
        <button
          onClick={() => setActiveSection('japanese')}
          className={`flex items-center justify-center gap-1.5 py-3 text-xs font-extrabold border-b-2 -mb-px transition cursor-pointer tracking-wider ${
            activeSection === 'japanese' ? 'border-indigo-650 border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          일본 관찬 고문서
        </button>
        <button
          onClick={() => setActiveSection('maps')}
          className={`flex items-center justify-center gap-1.5 py-3 text-xs font-extrabold border-b-2 -mb-px transition cursor-pointer tracking-wider ${
            activeSection === 'maps' ? 'border-indigo-650 border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Map className="w-4 h-4" />
          역사적 고지도 대조
        </button>
        <button
          onClick={() => setActiveSection('anyongbok')}
          className={`flex items-center justify-center gap-1.5 py-3 text-xs font-extrabold border-b-2 -mb-px transition cursor-pointer tracking-wider ${
            activeSection === 'anyongbok' ? 'border-indigo-650 border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          안용복 평화 투쟁
        </button>
      </div>

      {/* Detail Area */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 md:p-8">

        {/* Section 1: Korean Documents */}
        {activeSection === 'korean' && (
          <div className="space-y-6 animate-fade-in" id="history-doc-korean">
            <div>
              <h3 className="text-xl font-bold text-slate-800">한국 왕조의 실록과 법방이 지켜낸 우리 영유</h3>
              <p className="text-slate-500 text-xs mt-1">우리 선조들은 수세기 동안 정책적이고 일관된 어휘로 동해 끝단 독도를 관할구역으로 기록해 관리해 왔습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 세종실록지리지 */}
              <div className="p-5 border border-slate-100/80 rounded-xl space-y-2 hover:bg-slate-50/20 transition">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">1454년 발해</span>
                <h4 className="font-bold text-slate-800 text-sm">세종실록지리지</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  "우산(于山, 독도)과 무릉(武陵, 울릉도) 두 섬이 강원도 현의 정동쪽 바다안에 있다. 두 섬이 서로 거리가 멀지 않아 날씨가 맑으면 바라볼 수 있다."
                </p>
                <div className="text-[10px] text-blue-600 font-semibold bg-blue-50/30 p-2 rounded">
                  💡 지리적 육안 관측성과 영토 인지를 명확히 규명한 최초 국가 공식 기록.
                </div>
              </div>

              {/* 신증동국여지승람 */}
              <div className="p-5 border border-slate-100/80 rounded-xl space-y-2 hover:bg-slate-50/20 transition">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">1531년 조선</span>
                <h4 className="font-bold text-slate-800 text-sm">신증동국여지승람</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  동해 해상에 우산도와 울릉도가 명확히 존재함을 기록했으며, 부속 지도인 국가 최초 인쇄 전도인 <b className="text-slate-700">'팔도총도'</b> 내에 두 개의 섬으로 그려 넣어 국가 영토 내 통치 지위로 영유했습니다.
                </p>
              </div>

              {/* 만기요람 */}
              <div className="p-5 border border-slate-100/80 rounded-xl space-y-2 hover:bg-slate-50/20 transition">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">1808년 국정원</span>
                <h4 className="font-bold text-slate-800 text-sm">만기요람 (군정편)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  "울릉과 우산은 모두 옛 우산국의 땅인데, 우산은 바로 왜인(일본인)들이 자기네 명칭이라며 칭하는 송도(松島, 당시 일본의 독도 지칭 명칭)이다."
                </p>
                <div className="text-[10px] text-blue-600 font-semibold bg-blue-50/30 p-2 rounded">
                  💡 일본 명칭(송도)과 우리 영토인 우산도가 완벽히 동일한 실체임을 일치 성토함.
                </div>
              </div>

              {/* 대한제국 칙령 제41호 */}
              <div className="p-5 border border-slate-100/80 rounded-xl space-y-2 hover:bg-indigo-50/10 border-indigo-100/50 transition">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">1900년 10월 25일</span>
                <h4 className="font-bold text-slate-800 text-sm">대한제국 칙령 제41호</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  고종 황제는 근대 국가 법령 조처를 통해 울릉도를 정식 군도인 <b className="text-slate-800 font-bold">'울도군'</b>으로 승격시키고, 관할 구역에 '울릉전도, 죽도 및 <b>석도(石島, 돌섬의 훈독인 소리에서 온 독도의 당시 공식 행정 지칭)</b>'를 명시했습니다.
                </p>
                <div className="text-[10px] text-indigo-600 font-semibold bg-indigo-50/30 p-2 rounded">
                  💡 일본의 1905년 시마네현 강탈 편입 음모 시도보다 약 5년 앞서 완벽한 근대 국제법적 관할권을 천명함.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Japanese Documents */}
        {activeSection === 'japanese' && (
          <div className="space-y-6 animate-fade-in" id="history-doc-japanese">
            <div>
              <h3 className="text-xl font-bold text-slate-800">일본 국가 관찬 고문서의 진실된 고백</h3>
              <p className="text-slate-500 text-xs mt-1">역설적이게도 본인들의 지리 공기록에는 독도를 조선 영유의 범위이자 자국의 한계 바깥 영역으로 수없이 시인해 두었습니다.</p>
            </div>

            <div className="space-y-4">
              {/* 은주시청합기 */}
              <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-sm">은주시청합기 (隱州視聽合記)</h4>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">1667년 시마네현 서지</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  시마네현 관리가 번주의 명을 받아 저술한 공식 시찰 서지 보고서입니다. <br />
                  <b className="text-slate-800">"본방(일본)의 은지(오키섬)을 일본 서북쪽 한계로 규명하며, 죽도(당시 울릉도)와 송도(당시 독도)는 고려(조선)의 영토로 정하고 본다"</b>고 명확한 선을 그었습니다.
                </p>
              </div>

              {/* 조선국 교제시말 내탐서 */}
              <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-sm">조선국 교제시말 내탐서 (朝鮮國交際始末內探書)</h4>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">1870년 외무성 보고</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  메이지 신정부 출범 직후 외무성의 고위 관리 사절단들이 조선 영유 상태를 극비리에 염탐하고 작성해 외무대신에게 올린 보고서입니다. 
                  보고 안건 중 하나인 <b className="text-slate-800 font-bold">"죽도(울릉도)와 송도(독도)가 조선 영역으로 환원되어 귀속된 전말"</b>에 대한 서지가 있어, 신정부 자체적으로 독도를 조선 영토로 완전 시인했었음을 입증합니다.
                </p>
              </div>

              {/* 태정관 지령 */}
              <div className="p-5 border border-indigo-100 rounded-xl bg-indigo-50/10 space-y-3.5 border-l-4 border-l-indigo-500">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-indigo-950 text-sm flex items-center gap-1.5">
                    🌟 최고 의사결정 사료: 태정관 지령 (太政官指令)
                  </h4>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-mono font-bold">1877년 3월 국가훈령</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  당시 메이지 국가 행정 최고 지휘기관이었던 <b className="text-indigo-900 font-bold">'태정관'</b>이 내무성 관리의 질교에 정식 국결을 거쳐 하달한 훈령문서입니다. 
                  <br />
                  <span className="inline-block bg-white p-3 rounded-md border border-indigo-100/50 font-medium text-[11.5px] text-slate-700 mt-1.5">
                    "품의한 죽도(울릉도) 외 일도(一島, 독도)의 건은 본방(일본)과 전혀 관계가 없는 국가적 영역 밖의 사안(즉, 조선의 조종 영역)이니, 내무성과 해안관리관들은 각별히 유념하여 관리할 것"
                  </span>
                </p>
                <p className="text-[10.5px] text-indigo-800 leading-relaxed font-semibold">
                  📌 특히 지령서 뒤에 첨부된 지도인 '기죽도약도'에도 독도와 울릉도가 자국 한도 노선 밖에 조선 영유로 그려져 있어, 역사적 소유 구도를 명백히 인정한 절대 열쇠입니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Maps Analysis */}
        {activeSection === 'maps' && (
          <div className="space-y-6 animate-fade-in" id="history-doc-maps">
            <div>
              <h3 className="text-xl font-bold text-slate-800">동해 해양 영토의 역사적 시각 판도, 고지도 대조</h3>
              <p className="text-slate-500 text-xs mt-1">지도는 영토에 대한 옛 지리학자들과 국가들의 실질적이고 가시적인 지각을 한눈에 비추는 지표입니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 팔도총도 */}
              <div className="p-4 border border-slate-100 rounded-2xl space-y-2.5 bg-slate-50/30">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">한국 관찬</span>
                <h4 className="font-bold text-slate-800 text-sm">팔도총도 (1531년)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  신증동국여지승람에 첨부된 지도로, 조선의 전 영토를 통합적으로 그리면서 울릉도와 우산도(독도)를 뚜렷한 독립 섬으로 배치하여 영유권을 확립했습니다.
                </p>
              </div>

              {/* 개정 일본여지로정전도 */}
              <div className="p-4 border border-slate-100 rounded-2xl space-y-2.5 bg-slate-50/30">
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">일본 최초의 사찬·관선</span>
                <h4 className="font-bold text-slate-800 text-sm">개정 일본여지로정전도 (1779년)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  나가쿠보 세키스이가 제작한 대표적인 관선 지도로, 자국의 경선 내 영유지는 선명하게 채색한 반면, 울릉도와 독도는 <b className="text-slate-700 font-bold">채색 없이 하얗게 투명(무색)하게 방치</b>하여 자국 밖의 영역임을 구도적으로 명명했습니다.
                </p>
              </div>

              {/* 삼국접양지도 */}
              <div className="p-4 border border-indigo-150 rounded-2xl space-y-2.5 bg-indigo-50/20 border border-indigo-100">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">일본 실학자 명증</span>
                <h4 className="font-bold text-indigo-900 text-sm">삼국접양지도 (1785년)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  일본 학풍의 거두 하야시 시헤이가 제작했습니다. 양국의 영토적 귀속을 시각적으로 다투지 않고 명확히 칠하기 위해 조선 반도체와 함께 <b>독도 및 울릉도를 조선 영유의 상징적 황색(노란색)</b>으로 채색한 대조적 진실 지도입니다.
                </p>
                <div className="p-2 bg-white rounded border border-indigo-100 text-[10px] font-bold text-indigo-700">
                  🗺️ 지도 표기: 독도 옆에 "조선의 소유(朝鮮ノ持)"라고 똑똑히 하필 기재해 둠.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Anyongbok Chronology */}
        {activeSection === 'anyongbok' && (
          <div className="space-y-6 animate-fade-in" id="history-doc-anyongbok">
            <div>
              <h3 className="text-xl font-bold text-slate-800">어부 안용복의 주도적 동해 외교 영웅사</h3>
              <p className="text-slate-500 text-xs mt-1">17세기 말, 국가의 전적인 관료가 아닌 평범한 조선 어부 신분으로 가혹한 바다 일선에 정비하여 국가 소유 주권을 확약받은 평화 민간 외교사입니다.</p>
            </div>

            {/* Vertical Flow Timeline */}
            <div className="relative border-l-2 border-indigo-100 ml-4 pl-6 space-y-8 py-2">
              
              {/* Event 1 */}
              <div className="relative" id="anyongbok-timeline-1">
                <div className="absolute -left-10 top-0.5 w-7.5 h-7.5 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-xs font-bold text-indigo-600">
                  1
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">1693년 봄</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1">1차 도일 및 억류 침탈 폭로</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    울릉도에서 정당히 어업 활동을 수행하던 도중 불법 침입한 일본 돗토리번 소유 어민들에게 강제로 납치되어 도일 당했습니다. 억류 중 도망치지 않고 관철하여 울릉도와 독도가 조선 영토임을 한문 대조 문서로 호령해 막부가 분쟁을 인지하도록 하는 초석을 닦았습니다.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative" id="anyongbok-timeline-2">
                <div className="absolute -left-10 top-0.5 w-7.5 h-7.5 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-xs font-bold text-indigo-600">
                  2
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">1695년 12월</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1">돗토리번 국가 소유 한례 시인</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    안용복의 강경 주장 이후 막부는 돗토리번 영주에게 '죽도(울릉도)와 송도(독도)가 소속 번 영지인가'를 탐문하였습니다. 영주는 <b>"두 섬은 자국 번 소유가 아니므로 돗토리번에 귀속된 사실이 없다"</b>고 공식 자인 답변을 보냈습니다.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative" id="anyongbok-timeline-3">
                <div className="absolute -left-10 top-0.5 w-7.5 h-7.5 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-xs font-bold text-indigo-600">
                  3
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">1696년 1월</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1">에도 막부의 '도해(항해) 금지령' 공표</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    돗토리번의 소속성 부정 공식 보고로 정당 논리를 회색 처리하기 어려워진 에도 막부는 평화적인 동해 어업 마찰 종식을 위해 즉각, <b>대조 도해 금지령</b>을 선포하여 자국 어민들의 울릉도·독도 항해 이동을 불법으로 규정하며 영유권을 확증해 주었습니다.
                  </p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative" id="anyongbok-timeline-4">
                <div className="absolute -left-10 top-0.5 w-7.5 h-7.5 rounded-full bg-indigo-600 border-4 border-white flex items-center justify-center text-xs font-bold text-white">
                  4
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">1696년 5월</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1">2차 도일 및 외교적 권원 호통 대활약</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    도해 금지령 발효 이후에도 울릉도에 은밀히 잠입 중인 외국 포경/낚시 배들을 목격하고 성토한 뒤, 직접 스스로를 대조 행정 관리인 '울릉자산양도감세장'으로 사칭칭하여 호키주 영주를 직접 접견, 공식 침탈 사과와 상호 통상 분쟁의 평화적 종결을 확인받았습니다.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* 2차시 배움 확인 문제 */}
      <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-200">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-extrabold text-slate-900">2차시 배움 점검 퀴즈</h3>
        </div>

        <div className="space-y-6">
          {LESSON_2_QUIZ.map((q, idx) => {
            const isCorrect = selectedAnswers[q.id] === q.correctAnswerIndex;
            return (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-left shadow-2xs">
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
                            ? "bg-indigo-50 border-indigo-600 border-2 text-indigo-700 font-extrabold shadow-xs"
                            : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 cursor-pointer hover:border-slate-350"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && !quizSubmitted && <span className="w-2 h-2 rounded-full bg-indigo-600"></span>}
                        {quizSubmitted && q.correctAnswerIndex === oIdx && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {quizSubmitted && isSelected && q.correctAnswerIndex !== oIdx && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* 개별 퀴즈 정답 피드백 */}
                {quizSubmitted && (
                  <div className="p-4 bg-indigo-50/40 rounded-xl text-slate-700 text-xs leading-relaxed flex gap-2.5 border border-indigo-100">
                    <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-indigo-750 text-indigo-900">해설:</span> {q.explanation}
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
              <p className="text-slate-500 text-xs font-semibold">모든 배움 질문을 짚어보고 채점으로 전진합니다.</p>
            ) : (
              <p className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                <span>역사 사료 이해도: 총 3점 중 <b className="text-indigo-600">{quizScore}점</b> 달성!</span>
                {quizScore === 3 ? (
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">100점 완벽배움</span>
                ) : (
                  <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-bold text-[11px] uppercase tracking-wider">차곡차곡 다지기</span>
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
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-250 disabled:text-slate-400 text-white font-bold text-xs rounded-xl active:scale-95 transition cursor-pointer shadow-sm"
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
