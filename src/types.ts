/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// 공동 기술서 제출 데이터 타입
export interface LessonReport {
  id: string;
  koreanStudent: string;
  japaneseStudent: string;
  title: string;
  content: string;
  createdAt: string;
  feedback?: EvaluationResponse;
}

// Gemini에서 반환할 평가 결과 타입
export interface EvaluationResponse {
  score: number;
  evaluation: string;
  koreanStrength: string;
  japaneseStrength: string;
  peaceAlternative: string;
  evaluationSeal: string;
}

// 퀴즈 타입 정의
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

// 성찰 일지 기록 타입
export interface ReflectionRecord {
  q1: string;
  q2: string;
  q3: string;
  savedAt: string;
}
