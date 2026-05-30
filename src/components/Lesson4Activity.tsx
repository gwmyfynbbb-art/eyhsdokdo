/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LessonReport, EvaluationResponse, ReflectionRecord } from '../types';
import { PenTool, Send, Users, FileSignature, Save, Download, RefreshCw, AlertCircle, Sparkles, CheckCircle, BookOpen } from 'lucide-react';

const EXAMPLE_CONTENT = `동해의 평화로운 섬 독도는 다양한 사료를 통해 한국의 고유 영토임이 증명된다. 한국의 『세종실록지리지(1454년)』에는 울릉도와 독도(우산)가 거리가 멀지 않아 날씨가 맑으면 눈으로 볼 수 있다고 하여 양국의 동해상 고대 인지와 생활권 편입을 보여준다. 또한 메이지 시대 일본 최고 행정 의결 기관이 하달한 『태정관 지령(1877년)』에서도 울릉도와 독도가 본방(일본)과 관계없는 영토 밖의 섬임을 공인하였다. 과거 러일전쟁 중 일본에 의해 독도가 무단 임시 편입당하는 아픔이 있었으나, 2차 대전 승전 후 연합국의 조치를 통해 정형 귀속되었다. 최근 신한일어업협정으로 양국 어업 갈등이 일부 남아있지만, 우리는 단순 감정 전선을 탈피해 역사적 참모습을 직시하고 동해를 상호 소통의 바다로 만들기 위해 한일 청소년 교류를 통한 연대와 학술 협력을 지속해 갈 것이다.`;

interface Lesson4ActivityProps {
  onAddReportCount: () => void;
}

export default function Lesson4Activity({ onAddReportCount }: Lesson4ActivityProps) {
  // 폼 입력 상태
  const [koreanStudent, setKoreanStudent] = useState('');
  const [japaneseStudent, setJapaneseStudent] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // AI 평가 및 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<EvaluationResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // 공유 보고서 갤러리 리스트
  const [savedReports, setSavedReports] = useState<LessonReport[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 성찰 질문 상태
  const [reflection, setReflection] = useState<ReflectionRecord>({
    q1: '',
    q2: '',
    q3: '',
    savedAt: ''
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // 성찰일지 localStorage 로드
  useEffect(() => {
    const cachedReflection = localStorage.getItem('dokdo_reflection');
    if (cachedReflection) {
      try {
        setReflection(JSON.parse(cachedReflection));
      } catch (e) {
        console.error(e);
      }
    }
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      if (data.reports) {
        setSavedReports(data.reports);
      }
    } catch (e) {
      console.error("Failed to load reports from server:", e);
    }
  };

  // 예시 텍스트 로드 헬퍼
  const handleLoadExample = () => {
    setKoreanStudent('김정배 (한국)');
    setJapaneseStudent('사토 유우 (일본)');
    setTitle('역사와 평화의 동해 등대, 독도 공동 단원');
    setContent(EXAMPLE_CONTENT);
  };

  // AI 평가위원 심사 제출
  const handleRequestAIEvaluation = async () => {
    if (!content || content.length < 10) {
      setErrorMessage("공동 작성 내용(본문)을 최소 10자 이상 성실하게 채워야 심사할 수 있습니다.");
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setFeedback(null);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          koreanStudent: koreanStudent || '한국 모둠원',
          japaneseStudent: japaneseStudent || '일본 모둠원',
          title: title || '동아시아 평화 교과서 안',
          content
        })
      });

      if (!response.ok) {
        throw new Error('서버 평가 서비스 상태가 원활하지 않습니다.');
      }

      const evalData: EvaluationResponse = await response.json();
      setFeedback(evalData);
    } catch (error: any) {
      console.error(error);
      setErrorMessage("평가 도중 문제가 발생했습니다. 현장 임시 오프라인 평가로 변환합니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 보고서 임시 서버 저장 및 갤러리 업로드
  const handleSaveReport = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          koreanStudent: koreanStudent || '한국 모둠원',
          japaneseStudent: japaneseStudent || '일본 모둠원',
          title: title || '동해의 독도 수호론',
          content,
          feedback: feedback || undefined
        })
      });

      if (response.ok) {
        setSaveSuccess(true);
        fetchReports();
        onAddReportCount(); // 상위 네비게이션 전역 보고서 카운트 증설 알림
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  // 성찰 일지 저장
  const handleSaveReflection = () => {
    const updated = {
      ...reflection,
      savedAt: new Date().toLocaleDateString()
    };
    localStorage.setItem('dokdo_reflection', JSON.stringify(updated));
    setReflection(updated);
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 3000);
  };

  // 가상 PDF/인쇄 호출
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 animate-fade-in text-left">
      {/* Title */}
      <div className="border-b border-slate-100 pb-5">
        <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-md">4차시 활동지</span>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-3">한·일 평화 공동 교과서 집필하기</h2>
        <p className="text-slate-500 mt-1.5">
          두 나라 청소년이 한 모둠이 되어 사료적 사실과 평화 협력의 관점을 조화롭게 담아낸 가상의 독도 교육 구절을 작성하고 AI 학술 위원회의 심사를 받아봅니다.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-teal-600" />
          공동 교과서 집필 원칙 및 작성 조건
        </h3>
        <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5 leading-relaxed">
          <li>
            <b className="text-slate-800">사료 증빙:</b> 1~2차시에서 학습한 한·일 고문서나 지도 사료 중 <b>최소 2개(예: 세종실록지리지, 태정관 지령 등)</b>를 명확한 역사적 근거로 명명하여 논지의 한계를 깰 것.
          </li>
          <li>
            <b className="text-slate-800">서술 감각:</b> 일방적인 감정 고조, 원색적 상호 비난, 거친 표현을 배제하고 오직 <b>객관적 사실(Fact)</b> 위주로 타협적이고 이성적인 지조를 유지할 것.
          </li>
          <li>
            <b className="text-slate-800">미래 발전:</b> 갈등을 해소하기 위한 양국 협력 동맹이나 <b>미래지향적인 평화 영토 방안</b>을 구상해 포함할 것.
          </li>
        </ul>
        <div className="pt-2 flex justify-start">
          <button
            onClick={handleLoadExample}
            className="text-xs font-bold text-teal-700 hover:text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg px-3 py-1.5 border border-teal-100/70 transition flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            우수 공동 집필 모범 예문 불러오기
          </button>
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <PenTool className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-bold text-slate-800">공동 역사 기술서 제안 작성</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-1" id="label-korean-student">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              한국측 공동 집필 학생명
            </label>
            <input
              type="text"
              id="input-korean-student"
              value={koreanStudent}
              onChange={(e) => setKoreanStudent(e.target.value)}
              placeholder="예: 홍길동 (서울한빛고)"
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-1" id="label-japanese-student">
              <Users className="w-3.5 h-3.5 text-red-500" />
              일본측 공동 집필 학생명
            </label>
            <input
              type="text"
              id="input-japanese-student"
              value={japaneseStudent}
              onChange={(e) => setJapaneseStudent(e.target.value)}
              placeholder="예: 사토 켄지 (도쿄평화중)"
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600" id="label-subject-title">우리가 제안하는 독도 단원 제목</label>
          <input
            type="text"
            id="input-subject-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 평화적 미래를 지탱하는 보석 같은 섬, 동해의 독도"
            className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none font-semibold text-slate-800"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-600" id="label-subject-content">공동 집필 본문 (사실 및 사료 중심 최소 2개 이상 권장)</label>
            <span className="text-[10px] text-slate-400 font-mono">자수: {content.length}자</span>
          </div>
          <textarea
            id="textarea-subject-content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="과거 한일 간 사료(세종실록지리지, 태정관지령 등)를 인용하며 사실을 똑똑히 밝히고, 일방적 도모나 비판이 아닌 미래 동양이 나아갈 전선을 10줄 이내로 서술해 보세요..."
            className="w-full text-xs p-3.5 border border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none leading-relaxed font-sans"
          />
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-150" id="error-alert">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex flex-wrap gap-2.5 justify-end border-t border-slate-100 pt-5">
          {content && (
            <button
              onClick={() => {
                setKoreanStudent('');
                setJapaneseStudent('');
                setTitle('');
                setContent('');
                setFeedback(null);
              }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              지우기
            </button>
          )}
          <button
            onClick={handleRequestAIEvaluation}
            disabled={isLoading || !content}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs rounded-xl active:scale-95 transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-teal-500/10"
            id="submit-evaluate-btn"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>학술 심사 위원회의 심층 평가 진행 중...</span>
              </>
            ) : (
              <>
                <FileSignature className="w-4 h-4" />
                <span>한·일 평화공동 심사위원단 공식 평가 요청</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Evaluation Results Card */}
      {feedback && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden border border-slate-850 animate-fade-in" id="evaluation-card">
          <div className="absolute right-0 top-0 w-48 h-48 bg-gradient-to-br from-teal-500/10 to-blue-500/0 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded tracking-widest">
                Official AI Report Card
              </span>
              <h3 className="text-xl font-bold mt-1.5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
                공동 집필 심층 평가결과서
              </h3>
            </div>
            
            {/* Score Label Grid */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-400">교재 부합성 점수:</span>
              <div className="text-3xl font-black font-mono text-teal-400 bg-slate-950 px-4 py-2 rounded-xl border border-white/5 shadow-inner">
                {feedback.score}점
              </div>
            </div>
          </div>

          <div className="space-y-5 text-left text-xs md:text-sm">
            {/* 1. 종합평가 */}
            <div className="space-y-1">
              <h4 className="font-bold text-slate-300 border-l-2 border-teal-400 pl-2">1. 종합 위원평 및 교육 평론</h4>
              <p className="text-slate-400 leading-relaxed text-xs">{feedback.evaluation}</p>
            </div>

            {/* 2. 한국 학생 강점 */}
            <div className="space-y-1">
              <h4 className="font-bold text-blue-300 border-l-2 border-blue-400 pl-2">2. 한국 학생의 논점 및 사료 분석력 평가</h4>
              <p className="text-slate-400 leading-relaxed text-xs">{feedback.koreanStrength}</p>
            </div>

            {/* 3. 일본 학생 강점 */}
            <div className="space-y-1">
              <h4 className="font-bold text-red-300 border-l-2 border-red-400 pl-2">3. 일본 학생의 객관성과 관선사료 수용력 평가</h4>
              <p className="text-slate-400 leading-relaxed text-xs">{feedback.japaneseStrength}</p>
            </div>

            {/* 4. 미래 대안 */}
            <div className="space-y-1">
              <h4 className="font-bold text-teal-300 border-l-2 border-teal-400 pl-2">4. 상생 및 보완을 위한 미래 영토 제언</h4>
              <p className="text-slate-400 leading-relaxed text-xs">{feedback.peaceAlternative}</p>
            </div>
          </div>

          {/* Seal Graphic Overlay */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-5 mt-4">
            <div className="space-y-0.5 text-left">
              <p className="text-[10px] font-mono text-slate-500">평가 주최</p>
              <p className="text-xs font-bold text-slate-300">대한민국 역사·지리 평화교육위원회</p>
              <p className="text-[10px] text-slate-500">{feedback.evaluationSeal}</p>
            </div>

            {/* Stamp Red Circle Mock */}
            <div className="w-16 h-16 rounded-full border-2 border-red-500/85 flex items-center justify-center text-red-500/90 text-[10px] font-extrabold font-serif rotate-12 rotate bg-red-400/5 select-none shrink-0 uppercase tracking-widest scale-95 md:scale-100">
              <span className="text-center">평화교육<br />위원회</span>
            </div>
          </div>

          {/* Evaluate Action Bar */}
          <div className="flex justify-end gap-2 text-slate-300 text-xs pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-750 border border-white/5 hover:border-white/10 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              PDF 교제 양식으로 출력하기
            </button>
            <button
              onClick={handleSaveReport}
              disabled={isSaving}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition flex items-center gap-1.5 font-bold cursor-pointer"
              id="report-persistence-save-btn"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                  <span>공동보존 저장 완료!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>학습지 보존함에 올리기</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Discussion Reflection Section */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <FileSignature className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800">질문지 토론과 자율 성찰 일지</h3>
        </div>

        <div className="space-y-6" id="reflection-questions">
          
          {/* Question 1 */}
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-slate-700 leading-relaxed">
              성찰 1. 메이지 일본 정부 최고 연합 의결기구였던 『태정관 지령(1877년)』과 첨부도인 『기죽도약도』가 독도 수권 귀속 소유에 대한 일본의 주장을 무색하게 만드는 결정적인 이유가 무엇인지 서술해보세요.
            </p>
            <textarea
              rows={3}
              value={reflection.q1}
              onChange={(e) => setReflection(prev => ({ ...prev, q1: e.target.value }))}
              placeholder="배운 내용을 상기해 이성적 분석의 핵심 구절을 직접 남겨보세요..."
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Question 2 */}
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-slate-700 leading-relaxed">
              성찰 2. 1998년 체결된 '신한일어업협정'에 따라 왜 독도가 우리의 독점 자원 보호를 위한 단독 EEZ 기배 영토기점이 되지 못하고 공동 ‘중간수역’으로 설정되어 갈등을 남겼는지 분석해보세요.
            </p>
            <textarea
              rows={3}
              value={reflection.q2}
              onChange={(e) => setReflection(prev => ({ ...prev, q2: e.target.value }))}
              placeholder="해양법 질서 전개와 자원 보호의 타협 배경을 서술해보세요..."
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Question 3 */}
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-slate-700 leading-relaxed">
              성찰 3. 한-일 미래 세대가 평화와 공동 번영의 역사를 공유하기 위해, 청소년 학술 외교 역사 캠프가 필요한 이유에 관해 본인의 소중한 아이디어나 입장을 남겨봅시다.
            </p>
            <textarea
              rows={3}
              value={reflection.q3}
              onChange={(e) => setReflection(prev => ({ ...prev, q3: e.target.value }))}
              placeholder="감정을 지우고 미래 상생으로 나아가기 위한 청중 교류 방안..."
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center border-t border-slate-100 pt-4">
            <span className="text-[10px] text-slate-400">
              {reflection.savedAt ? `최종 보존 완료: ${reflection.savedAt}` : '현재 로컬 미보존 상태'}
            </span>
            <button
              onClick={handleSaveReflection}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl active:scale-95 transition flex items-center gap-1.5 cursor-pointer"
            >
              {reflectionSaved ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>일지 로컬 저장 완료</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>성찰 일지 보존</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Shared Reports Library / Gallery View */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5 pl-1" id="report-library-title">
          <Users className="w-5 h-5 text-teal-600" />
          한·일 청소년 교과서 집필관 (공동 보존실)
        </h3>
        {savedReports.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400 text-xs">
            아직 다른 학생들이 올린 성찰지나 공동 보고서가 보존되어 있지 않습니다. <br />
            첫 번째 평화 위원회 상고서를 작성하고 올려 명예 보존실의 개척자가 되어보세요!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="report-library-grid">
            {savedReports.map((report) => (
              <div key={report.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4 text-left">
                <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm leading-tight">{report.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">
                      모둠원: {report.koreanStudent} & {report.japaneseStudent}
                    </p>
                  </div>
                  {report.feedback && (
                    <span className="bg-teal-50 text-teal-700 border border-teal-100 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      심사단 {report.feedback.score}점
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">{report.content}</p>
                {report.feedback && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[10.5px] leading-relaxed text-slate-600">
                    <span className="font-bold text-slate-700">대표 평론: </span>
                    {report.feedback.evaluation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
