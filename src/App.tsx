/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import Lesson1Geography from './components/Lesson1Geography';
import Lesson2History from './components/Lesson2History';
import Lesson3ModernConflict from './components/Lesson3ModernConflict';
import Lesson4Activity from './components/Lesson4Activity';
import { BookOpen, MapPin, Compass, Award, FileText, ChevronRight, GraduationCap } from 'lucide-react';

export default function App() {
  // 0: Home/Overview, 1: Geography, 2: History Docs, 3: Modern Peace, 4: Worksheet
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [savedReportsCount, setSavedReportsCount] = useState<number>(0);

  // 로컬 보존 관문 보고서 개수 초기 카운트 계산
  useEffect(() => {
    fetchSavedReportsCount();
  }, []);

  const fetchSavedReportsCount = async () => {
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      if (data.reports) {
        setSavedReportsCount(data.reports.length);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const incrementSavedReportsCount = () => {
    setSavedReportsCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70" id="main-app-container">
      {/* Upper Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 h-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            
            {/* Title / Logo Brand */}
            <div 
              id="app-branding"
              className="flex items-center gap-2.5 cursor-pointer selection:bg-transparent"
              onClick={() => setCurrentTab(0)}
            >
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5.5 h-5.5 text-blue-500 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-slate-900 font-extrabold text-[15px] tracking-tight block">독도 주권 평화 교육</span>
                <span className="text-[10px] text-slate-400 font-bold block -mt-0.5">역사·지리 융합 웹북</span>
              </div>
            </div>

            {/* Practical Top Nav links */}
            <nav className="hidden lg:flex items-center gap-8" id="desktop-navigation">
              <button
                id="nav-home"
                onClick={() => setCurrentTab(0)}
                className={`text-xs uppercase tracking-wider font-extrabold transition-colors cursor-pointer ${
                  currentTab === 0 ? 'text-blue-600' : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                교차 배움 홈
              </button>
              <button
                id="nav-tab-1"
                onClick={() => setCurrentTab(1)}
                className={`text-xs uppercase tracking-wider font-extrabold transition-colors cursor-pointer ${
                  currentTab === 1 ? 'text-blue-600' : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                1차시. 지리·영역
              </button>
              <button
                id="nav-tab-2"
                onClick={() => setCurrentTab(2)}
                className={`text-xs uppercase tracking-wider font-extrabold transition-colors cursor-pointer ${
                  currentTab === 2 ? 'text-blue-600' : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                2차시. 역사·사료
              </button>
              <button
                id="nav-tab-3"
                onClick={() => setCurrentTab(3)}
                className={`text-xs uppercase tracking-wider font-extrabold transition-colors cursor-pointer ${
                  currentTab === 3 ? 'text-blue-600' : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                3차시. 갈등·평화
              </button>
              <button
                id="nav-tab-4"
                onClick={() => setCurrentTab(4)}
                className={`bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-sm text-xs font-bold flex items-center gap-2 cursor-pointer`}
              >
                4차시. 평화서 집필
                {savedReportsCount > 0 && (
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full" id="reports-count-badge">
                    {savedReportsCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Publisher Seal Signature */}
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">COMMITTEE</span>
              <span className="text-xs font-bold text-slate-700 block -mt-0.5">평화교육위원회</span>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Sub-Header Horizontal Scroller */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-2.5 flex gap-2 overflow-x-auto scrollbar-none sticky top-[80px] z-40 shadow-xs" id="mobile-scrollbar-nav">
        <button
          onClick={() => setCurrentTab(0)}
          className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap rounded-lg cursor-pointer transition-colors ${
            currentTab === 0 ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          홈
        </button>
        <button
          onClick={() => setCurrentTab(1)}
          className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap rounded-lg cursor-pointer transition-colors ${
            currentTab === 1 ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          1차시 지리
        </button>
        <button
          onClick={() => setCurrentTab(2)}
          className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap rounded-lg cursor-pointer transition-colors ${
            currentTab === 2 ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-indigo-350'
          }`}
        >
          2차시 사료
        </button>
        <button
          onClick={() => setCurrentTab(3)}
          className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap rounded-lg cursor-pointer transition-colors ${
            currentTab === 3 ? 'bg-teal-600 text-white' : 'text-slate-500 hover:text-teal-350'
          }`}
        >
          3차시 영평
        </button>
        <button
          onClick={() => setCurrentTab(4)}
          className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
            currentTab === 4 ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          4차시 활동지
          {savedReportsCount > 0 && (
            <span className="bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
              {savedReportsCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Educational Dashboard Container */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Render respective panels depending on the Active Class Turn tab */}
        {currentTab === 0 && <HeroSection onStartLesson={(turnNum) => setCurrentTab(turnNum)} />}
        {currentTab === 1 && <Lesson1Geography />}
        {currentTab === 2 && <Lesson2History />}
        {currentTab === 3 && <Lesson3ModernConflict />}
        {currentTab === 4 && <Lesson4Activity onAddReportCount={incrementSavedReportsCount} />}
      </main>

      {/* Global Class Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 mt-16 border-t border-slate-800" id="global-class-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Branding left */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                독
              </div>
              <span className="text-sm font-bold text-slate-200">독도 영토 주권 교육 종합 교재 플랫폼</span>
            </div>

            {/* Quick footer menu links */}
            <div className="flex gap-4 text-[10.5px]">
              <button onClick={() => setCurrentTab(0)} className="hover:text-slate-100 cursor-pointer">소개</button>
              <button onClick={() => setCurrentTab(1)} className="hover:text-slate-100 cursor-pointer">1차시 지리</button>
              <button onClick={() => setCurrentTab(2)} className="hover:text-slate-100 cursor-pointer">2차시 역사</button>
              <button onClick={() => setCurrentTab(3)} className="hover:text-slate-100 cursor-pointer">3차시 평화</button>
              <button onClick={() => setCurrentTab(4)} className="hover:text-slate-100 cursor-pointer">수업활동지</button>
            </div>
          </div>

          <hr className="border-slate-850" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-550 text-slate-500">
            <p>© 2026 대한민국 역사·지리 평화교육위원회. All Rights Reserved. 본 자료는 학술 연구 및 평화 교육용 지원 도구입니다.</p>
            <p className="font-mono text-[9px]">Platform build v2.6.5 - Cloud Run Integration Container Enabled</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
