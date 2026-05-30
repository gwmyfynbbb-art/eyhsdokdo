/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { QuizQuestion } from '../types';
import { Compass, CheckCircle2, XCircle, Info, ChevronRight, Map, HelpCircle } from 'lucide-react';

const LESSON_1_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "울릉도에서 독도까지의 가장 가까운 최단 물리적 거리는 대략 얼마입니까?",
    options: ["50.2 km", "87.4 km", "157.5 km", "216.8 km"],
    correctAnswerIndex: 1,
    explanation: "울릉도와 독도 사이의 최단 거리는 87.4 km이며, 이는 한반도 본토(울진 죽변)나 일본 영토(오키섬)에서 독도까지의 거리보다 훨씬 더 가깝습니다."
  },
  {
    id: 2,
    question: "일본에서 독도와 가장 가까운 오키섬(157.5km 거리)에서도 맑은 날에는 날씨가 아무리 좋으면 독도가 육안으로 관측 가능하다.",
    options: ["O (사실이다)", "X (거짓이다)"],
    correctAnswerIndex: 1,
    explanation: "X가 맞습니다. 오키섬에서는 지구 곡률과 거리 한계(157.5 km) 때문에 기상이 아무리 좋아도 독도를 결코 볼 수 없습니다. 반면 울릉도의 고지대(사동, 석포 등)에서는 맑은 날 독도가 또렷이 육안으로 관측됩니다."
  },
  {
    id: 3,
    question: "상주하는 주민과 경비 대원들이 생활하는 독도에는 고유의 도로명이 부여되어 있습니다. 동도와 서도의 정식 도로명 매칭이 올바른 것은 무엇입니까?",
    options: [
      "동도: 이사부길 / 서도: 안용복길",
      "동도: 안용복길 / 서도: 이사부길",
      "동도: 독도대교길 / 서도: 해돋이길",
      "동도: 독도길 / 서도: 동해평화길"
    ],
    correctAnswerIndex: 0,
    explanation: "동도에는 독도경비대와 등대가 있어 '이사부길'이, 서도에는 주민 숙소와 담수원인 '물골'이 위치해 있어 '안용복길'이 부여되었습니다."
  }
];

export default function Lesson1Geography() {
  const [activeTab, setActiveTab] = useState<'distance' | 'visibility' | 'territory' | 'address'>('distance');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // 국가 영역의 삼요소 상태
  const [openArea, setOpenArea] = useState<string | null>('territory-area');

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    LESSON_1_QUIZ.forEach(q => {
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
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-md uppercase tracking-wider">1차시 교과학습</span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">독도의 지리적 특성과 영역의 이해</h2>
        <p className="text-slate-500 mt-1.5 text-sm">독도가 대한민국의 영토임을 이해하는 첫걸음은 명확한 물리적·지리적 사실과 국제법적 영역 개념을 정확히 확립하는 것입니다.</p>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200">
        <button
          id="tab-distance"
          onClick={() => setActiveTab('distance')}
          className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === 'distance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. 거리 및 유기성 분석
        </button>
        <button
          id="tab-visibility"
          onClick={() => setActiveTab('visibility')}
          className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === 'visibility' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          2. 육안 관측성과 의의
        </button>
        <button
          id="tab-territory"
          onClick={() => setActiveTab('territory')}
          className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === 'territory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          3. 국가의 삼요소 & 독도
        </button>
        <button
          id="tab-address"
          onClick={() => setActiveTab('address')}
          className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
            activeTab === 'address' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          4. 도로명과 유인도
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 md:p-8">
        
        {/* Content 1: Distance */}
        {activeTab === 'distance' && (
          <div className="space-y-8 animate-fade-in" id="content-distance">
            <div>
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-500" />
                지리적 위치와 유기적 연결망
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                독도는 동해상에 홀로 고립된 외로운 돌섬이 아닙니다. 울릉도와 해저 화산 지형으로 긴밀하게 연동되어 있으며, 역사·문화적으로 울릉도에서 충분히 생활권을 확장하며 일구어진 자연스러운 결실입니다.
              </p>
            </div>

            {/* Visual Distance Bar Chart */}
            <div className="p-6 bg-slate-50 rounded-2xl space-y-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">주요 영토적 거점과의 직관적 거리 대조</h4>
              
              <div className="space-y-4">
                {/* 울릉도 */}
                <div className="space-y-1.5" id="distance-bar-ulleung">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                      울릉도 → 독도 (정말 가깝고 유기적임)
                    </span>
                    <span className="text-blue-600">87.4 km</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: '40.3%' }}></div>
                  </div>
                </div>

                {/* 일본 오키섬 */}
                <div className="space-y-1.5" id="distance-bar-oki">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">
                      일본 오키섬 → 독도 (인근 영토 한계 밖)
                    </span>
                    <span className="text-slate-600">157.5 km</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden">
                    <div className="bg-slate-400 h-full rounded-full transition-all duration-1000" style={{ width: '72.6%' }}></div>
                  </div>
                </div>

                {/* 한반도 죽변 */}
                <div className="space-y-1.5" id="distance-bar-mainland">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">
                      한반도 죽변(울진) → 독도
                    </span>
                    <span className="text-slate-600">216.8 km</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden">
                    <div className="bg-slate-500 h-full rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-blue-800 leading-relaxed flex gap-2.5">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">국제 주권 귀속 관행의 통찰:</span> 울릉도에서 독도까지의 거리(87.4km)는 오키섬(157.5km)에 비해 거의 절반에 불과합니다. 이 거리는 울릉도 주민이 목선과 뗏목으로 자연스럽게 해역을 이용할 수 있었던 고유 생활 구역 한계선에 부합함을 지리적으로 강력히 증명합니다.
                </div>
              </div>
            </div>

            {/* Geographical Quick Fact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-100 p-4 rounded-xl">
                <p className="text-xs text-slate-400 font-bold uppercase">위경도 (동도 우산봉 기준)</p>
                <p className="text-lg font-bold text-slate-700 mt-1">북위 37◦14'26.8" / 동경 131◦52'10.4"</p>
              </div>
              <div className="border border-slate-100 p-4 rounded-xl">
                <p className="text-xs text-slate-400 font-bold uppercase">총면적 및 구성</p>
                <p className="text-lg font-bold text-slate-700 mt-1">187,554 ㎡ (부속 89개 바위섬)</p>
                <p className="text-xs text-slate-400 mt-1">동도 73,297 ㎡, 서도 88,740 ㎡ (체육관 2배 크기)</p>
              </div>
            </div>
          </div>
        )}

        {/* Content 2: Visibility */}
        {activeTab === 'visibility' && (
          <div className="space-y-8 animate-fade-in" id="content-visibility">
            <div>
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Map className="w-5 h-5 text-indigo-500" />
                지리적 육안 관측성의 역사적 의의
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                지리학과 역사학에서 <b>'특정 영토가 눈으로 직접 보이는가(육안 관측 가능성)'</b>는 대단히 핵심적인 요소입니다. 고대의 인류가 망망대해에서 섬의 귀속을 무의식적으로 지각하고 자생적인 영토의식에 귀속시켰는지 결정하기 때문입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 울릉도 시점 */}
              <div className="p-6 bg-gradient-to-b from-blue-50/50 to-blue-50/20 border border-blue-100 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold font-mono">
                    관측 100% 가능
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mt-3">울릉도 산등성에서의 독도 독립 관측</h4>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2">
                    울릉도 사동, 석포마을이나 성인봉 고지대(해발 높음)에서는 쾌청한 가을철이나 구름이 없는 날, 독도가 수평선 위편으로 또렷이 모습을 드러냅니다. 영토적 자각이 옛 삼국시대부터 울릉도(우산국)의 통합적인 영역 인식 아래 이어졌음을 뜻합니다.
                  </p>
                </div>
                <div className="text-xs text-blue-800 bg-white/80 p-3 rounded-lg border border-blue-100">
                  <span className="font-bold">세종실록지리지 인용:</span> "두 섬이 서로 거리가 멀지 않아 날씨가 맑으면 바라볼 수 있다."
                </div>
              </div>

              {/* 오키섬 시점 */}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-200 text-slate-600 text-xs font-bold font-mono">
                    관측 불가능 (0%)
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mt-3">일본 오키섬에서의 관측 불허 장벽</h4>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2">
                    오키섬과 독도의 거리는 157.5km로, 지구 표면이 둥근 곡률적 요철 물리적 법칙과 대기 밀도 장벽 때문에 산꼭대기로 기어 가든 고성능 고해상 전용 망원경을 돌리든 맑은 기후 하에서도 절대 볼 수 없습니다.
                  </p>
                </div>
                <div className="text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200/50">
                  <span className="font-bold">역사적 결론:</span> 일본 에도시대 어민들이 독도로 통행한 것은 보이지도 않는 섬을 침범한 의도적이고 모험적인 '원거리 불법 선박 항해'였을 뿐입니다.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content 3: Territory elements */}
        {activeTab === 'territory' && (
          <div className="space-y-8 animate-fade-in" id="content-territory">
            <div>
              <h3 className="text-xl font-bold text-slate-800">국가 영역(Territory)의 삼요소와 배타적 수역</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                국가 주권이 미치는 지리적 범위는 <b>영토, 영해, 영공</b>이라는 세 가지 핵심 하부 영역으로 정밀화됩니다. 여기에 수산 및 지하자원에 대한 주권적 권리가 부여되는 '배타적 경제수역(EEZ)'이 추가됩니다.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {/* 영토 */}
              <div className="border border-slate-100 rounded-xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenArea(openArea === 'territory-area' ? null : 'territory-area')}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 text-left cursor-pointer hover:bg-slate-100/70 transition"
                >
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    1. 영토 (Territory) - 땅의 주권
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{openArea === 'territory-area' ? '닫기' : '열기'}</span>
                </button>
                {openArea === 'territory-area' && (
                  <div className="p-4 text-xs text-slate-600 bg-white leading-relaxed space-y-2 border-t border-slate-100">
                    <p>
                      <b className="text-slate-800">정의:</b> 주권이 온전히 수직/수평적으로 수용되는 지표의 기초 범위입니다.
                    </p>
                    <p>
                      <b className="text-slate-800">독도의 상태:</b> 독도는 <b className="text-blue-600">대한민국 경상북도 울릉군 울릉읍 독도리 1 ~ 96번지</b>에 해당하는 엄연한 국가 공식 지번 부여 행정 영토입니다. 경찰 대원 및 독도 주민들이 거주하며 국가의 지적 관리 사업이 수행되는 절대적 지위를 가집니다.
                    </p>
                  </div>
                )}
              </div>

              {/* 영해 */}
              <div className="border border-slate-100 rounded-xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenArea(openArea === 'sea-area' ? null : 'sea-area')}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 text-left cursor-pointer hover:bg-slate-100/70 transition"
                >
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    2. 영해 (Territorial Sea) - 바다의 주권
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{openArea === 'sea-area' ? '닫기' : '열기'}</span>
                </button>
                {openArea === 'sea-area' && (
                  <div className="p-4 text-xs text-slate-600 bg-white leading-relaxed space-y-2 border-t border-slate-100">
                    <p>
                      <b className="text-slate-800">정의:</b> 영토 해안선(기선)으로부터 정형 한도선까지의 바다 수역으로 주권이 미치는 영해법의 기준입니다. 통상 최대 12해리입니다.
                    </p>
                    <p>
                      <b className="text-slate-800">독도의 상태:</b> 독도 기점 해안선으로부터 주변 12해리는 온전히 대한민국의 독점 주권 바다입니다. 해양경찰청 함정이 상시 순찰하며, 불법 주권 영해를 도모하고 침입하는 외국 불법 조업 어선들을 완벽히 단속·퇴거 조치해오고 있습니다.
                    </p>
                  </div>
                )}
              </div>

              {/* 영공 */}
              <div className="border border-slate-100 rounded-xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenArea(openArea === 'sky-area' ? null : 'sky-area')}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 text-left cursor-pointer hover:bg-slate-100/70 transition"
                >
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                    3. 영공 (Airspace) - 하늘의 주권
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{openArea === 'sky-area' ? '닫기' : '열기'}</span>
                </button>
                {openArea === 'sky-area' && (
                  <div className="p-4 text-xs text-slate-600 bg-white leading-relaxed space-y-2 border-t border-slate-100">
                    <p>
                      <b className="text-slate-800">정의:</b> 영토와 영해 가상 지평의 수직 하늘 상공 우주 전단계 대기선 경계입니다.
                    </p>
                    <p>
                      <b className="text-slate-800">독도의 상태:</b> 독도 및 그 영해 직상방 상공은 원칙상 동의 없이 외국 항공기가 수평 진입할 수 없는 제한 공역이며, 대공 전술적으로 중요히 수호되는 <b className="text-blue-600">대한민국 방공식별구역 (KADIZ)</b>에 강력하게 편제되어 공군의 주권 통제를 받습니다.
                    </p>
                  </div>
                )}
              </div>

              {/* 배타적 경제수역 */}
              <div className="border border-slate-100 rounded-xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenArea(openArea === 'eez-area' ? null : 'eez-area')}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 text-left cursor-pointer hover:bg-slate-100/70 transition"
                >
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    4. 배타적 경제수역 (EEZ) - 자원 독점 권리
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{openArea === 'eez-area' ? '닫기' : '열기'}</span>
                </button>
                {openArea === 'eez-area' && (
                  <div className="p-4 text-xs text-slate-600 bg-white leading-relaxed space-y-2 border-t border-slate-100">
                    <p>
                      <b className="text-slate-800">정의:</b> 기선으로부터 최대 200해리 수역 중 주권적 영해를 제외한 권역으로, 연안국에 천연 자원 탐사, 개발, 어업, 인공 구조물 수립 및 관할권을 제한적으로 부여하는 해역입니다.
                    </p>
                    <p>
                      <b className="text-slate-800">독도의 상태:</b> 한국과 일본의 동해 간극이 좁아 200해리가 중첩되므로, 1998년 "신한일어업협정"을 거쳐 특별 '중간수역'을 합의 배치해 관리하고 있으며, 이는 3차시 단원에서 깊게 역사 지리학적 평가를 통해 고찰해 봅니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content 4: Address */}
        {activeTab === 'address' && (
          <div className="space-y-8 animate-fade-in" id="content-address">
            <div>
              <h3 className="text-xl font-bold text-slate-800">독도의 주소와 수호 지킴이 도로명 체계</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                독도는 주거 주민(김신열 씨 등)과 등대 관리원, 그리고 실시간으로 동도를 경비하는 독도경비대 용사들이 살고 있는 진정한 <b className="text-blue-600">유인도(有人島)</b>입니다. 이에 걸맞은 행정적 국가 주소 도로명이 발부되었습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* 동도 */}
              <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3">
                <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100/50 px-2.5 py-1 rounded">
                  동도 (EAST ISLAND)
                </span>
                <h4 className="text-lg font-bold text-slate-800">이사부길</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  삼국사기 신라본기 지증왕 조에 기재된, 지증왕 13년(서기 512년) 우산국(울릉도와 소속 영해 독도 지칭)을 신라 영토로 통합한 장군 <b className="text-slate-700 font-bold">이사부 야찬</b>의 위엄 어린 이름을 계승했습니다. 
                </p>
                <div className="p-3 bg-white border border-slate-200/50 text-xs font-semibold rounded text-slate-700">
                  📍 위치: 독도경비대 하사 거점, 우산봉, 독도 등대, 주권 헬기착륙장
                </div>
              </div>

              {/* 서도 */}
              <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3">
                <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-100/50 px-2.5 py-1 rounded">
                  서도 (WEST ISLAND)
                </span>
                <h4 className="text-lg font-bold text-slate-800">안용복길</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  조선 숙종 시기, 고기잡이 어민임에도 평화 일선에 적극 나서 일본 돗토리번 및 에도 막부로 건너가 수차례에 걸쳐 울릉도와 독도가 엄연한 조선 영토 소유임을 인정받는 성과를 거두고 돌아온 외교의 영웅 <b className="text-slate-700 font-bold">안용복</b>의 업적을 사색합니다.
                </p>
                <div className="p-3 bg-white border border-slate-200/50 text-xs font-semibold rounded text-slate-700">
                  📍 위치: 독도 어민 주민숙소, 최고봉 (대한봉), 생명 식수원인 '물골' 지형
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1차시 퀴즈 단원 */}
      <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-200">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-extrabold text-slate-900">1차시 배움 점검 퀴즈</h3>
        </div>

        <div className="space-y-6">
          {LESSON_1_QUIZ.map((q, idx) => {
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
                            ? opt.includes("O") || opt.includes("X") || q.correctAnswerIndex === oIdx
                              ? "bg-emerald-50 border-emerald-400 border text-emerald-950 font-extrabold shadow-2xs"
                              : isSelected
                              ? "bg-rose-50 border-rose-300 border text-rose-700"
                              : "bg-slate-50 text-slate-400 border border-slate-200"
                            : isSelected
                            ? "bg-blue-50 border-blue-600 border-2 text-blue-700 font-extrabold shadow-sm"
                            : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 cursor-pointer hover:border-slate-350"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && !quizSubmitted && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                        {quizSubmitted && q.correctAnswerIndex === oIdx && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {quizSubmitted && isSelected && q.correctAnswerIndex !== oIdx && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* 개별 퀴즈 정답 피드백 */}
                {quizSubmitted && (
                  <div className="p-4 bg-blue-50/40 rounded-xl text-slate-700 text-xs leading-relaxed flex gap-2.5 border border-blue-100">
                    <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-blue-700">해설:</span> {q.explanation}
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
              <p className="text-slate-500 text-xs font-semibold">모든 문항을 신중히 선택하신 뒤 채점해주세요.</p>
            ) : (
              <p className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                <span>학습 결과: 총 3점 중 <b className="text-blue-600">{quizScore}점</b> 달성!</span>
                {quizScore === 3 ? (
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">100점 완벽배움</span>
                ) : (
                  <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-bold text-[11px] uppercase tracking-wider">다듬어가기</span>
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
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-250 disabled:text-slate-400 text-white font-bold text-xs rounded-xl active:scale-95 transition cursor-pointer shadow-sm"
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
