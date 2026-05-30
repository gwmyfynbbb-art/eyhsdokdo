/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const bannerImg = "/src/assets/images/dokdo_peace_banner_1780105730242.png";
import { BookOpen, MapPin, Award, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onStartLesson: (lessonId: number) => void;
}

export default function HeroSection({ onStartLesson }: HeroSectionProps) {
  return (
    <div className="space-y-12 animate-fade-in text-left" id="hero-section">
      {/* Hero Visual Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-805">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-10" />
        <img 
          src={bannerImg} 
          alt="독도 평화 일러스트" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover scale-102 transform hover:scale-100 transition-transform duration-1000"
        />
        
        {/* Content Overlay */}
        <div className="relative z-20 px-8 py-16 sm:px-12 md:py-24 md:max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            중·고등 역사 및 지리 융합 보조 자료
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            독도 영토 주권 교육<br />
            <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200 bg-clip-text text-transparent">
              종합 교재 웹 플랫폼
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            독도의 현대·중세적 지위와 동해 해양 영토의 역사적 맥락을 체계적으로 이해합니다. 
            감정적 해법을 넘어 <b className="text-white">명확한 역사적 고문서, 법적 조약, 고지도 분석</b>을 바탕으로 사실관계를 정립하고, 
            동아시아 평화 공동체를 모색하는 비판적 사고력을 함께 기릅니다.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              id="start-study-btn"
              onClick={() => onStartLesson(1)}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition flex items-center gap-2 cursor-pointer"
            >
              교재 학습 시작하기
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              id="goto-activity-btn"
              onClick={() => onStartLesson(4)}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 backdrop-blur-sm active:scale-95 transition flex items-center gap-2 cursor-pointer"
            >
              평화 교과서 집필하기
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Overview Cards Grid */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight" id="roadmap-title">교육 과정 로드맵</h2>
          <p className="text-slate-500 mt-2 text-sm">단계별 사료 증명과 지리 분석을 통해 독도의 역사적 귀속성과 평화 수호 의지를 배웁니다.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chapter 1 */}
          <div 
            id="curriculum-card-1"
            className="group relative flex flex-col justify-between p-7 bg-white border border-slate-205 hover:border-blue-300 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer text-left"
            onClick={() => onStartLesson(1)}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mb-5">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">1차시 (지리 및 영역)</span>
              <h3 className="text-[18px] font-extrabold text-slate-900 mt-2 mb-3 group-hover:text-blue-600 transition-colors">
                지리적 특성과 영역의 이해
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                위경도, 면적 비교 및 육안 관측 여부의 역사적 가치를 확인하고, 영토/영해/영공/EEZ 구조에서 독도의 국제법적 지위를 정립합니다.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
              입장하기 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Chapter 2 */}
          <div 
            id="curriculum-card-2"
            className="group relative flex flex-col justify-between p-7 bg-white border border-slate-205 hover:border-indigo-300 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer text-left"
            onClick={() => onStartLesson(2)}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 mb-5">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">2차시 (사료 및 지도)</span>
              <h3 className="text-[18px] font-extrabold text-slate-900 mt-2 mb-3 group-hover:text-indigo-600 transition-colors">
                사료와 지도로 규명하는 권원
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                세종실록지리지, 태정관 지령 등 한일 양국의 관찬 고문서들을 대조하고, 삼국접양지도 등 동양 고지도를 통해 조선의 영토 귀속을 명확히 증명합니다.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
              입장하기 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Chapter 3 */}
          <div 
            id="curriculum-card-3"
            className="group relative flex flex-col justify-between p-7 bg-white border border-slate-205 hover:border-teal-300 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer text-left"
            onClick={() => onStartLesson(3)}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 mb-5">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-teal-600 uppercase tracking-wider">3차시 (전후 평화 갈등)</span>
              <h3 className="text-[18px] font-extrabold text-slate-900 mt-2 mb-3 group-hover:text-teal-600 transition-colors">
                현대 갈등과 평화적 해결 방안
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                샌프란시스코 조약의 공백, 평화선 선포, 독도의용수비대의 결의와 신한일어업협정에 따른 중간수역 쟁점을 이해하고 평화로운 미래 대안을 제안합니다.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-teal-600 transition-colors">
              입장하기 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Executive Committee Card */}
      <div className="p-8 bg-white border border-slate-200 rounded-2xl text-slate-600 flex flex-wrap items-center justify-between gap-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full translate-x-12 -translate-y-12 pointer-events-none" />
        <div className="space-y-1.5 z-10">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Platform Publisher</p>
          <p className="text-lg font-extrabold text-slate-900">대한민국 역사·지리 평화교육위원회</p>
          <p className="text-xs text-slate-500 max-w-2xl">
            한일 양국 청소년들이 사료에 기반해 역사적 진실을 똑바로 보고 타협과 배움으로 만날 수 있는 가교를 지지합니다.
          </p>
        </div>
        <div className="text-right text-[11px] font-mono text-slate-400 space-y-0.5 z-10 grid">
          <span>교재 개정 연월: 2026년 5월</span>
          <span>종합 권호: Vol. 12 (중·고등 융합)</span>
        </div>
      </div>
    </div>
  );
}
