/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Express App
const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database for reports to simulate persistence
const reportsDatabase: any[] = [];

// Lazy load Gemini API
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
      console.log("GEMINI_API_KEY contains default or empty value. AI evaluation will run in high-quality simulation mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. Get Saved Reports
app.get("/api/reports", (req, res) => {
  res.json({ reports: reportsDatabase });
});

// 2. Save a Report
app.post("/api/reports", (req, res) => {
  const { id, koreanStudent, japaneseStudent, title, content, feedback } = req.body;
  if (!koreanStudent || !japaneseStudent || !title || !content) {
    return res.status(400).json({ error: "모든 필드를 입력해야 기록을 저장할 수 있습니다." });
  }

  const newReport = {
    id: id || Date.now().toString(),
    koreanStudent,
    japaneseStudent,
    title,
    content,
    createdAt: new Date().toISOString(),
    feedback
  };

  reportsDatabase.unshift(newReport); // Adds to the beginning of the list
  res.json({ success: true, report: newReport });
});

// 3. AI Evaluate / Feedback with Gemini
app.post("/api/evaluate", async (req, res) => {
  const { koreanStudent, japaneseStudent, title, content } = req.body;

  if (!content || content.length < 10) {
    return res.status(400).json({ error: "공동 서술 본문은 최소 10자 이상 작성해야 합니다." });
  }

  const gemini = getGeminiClient();

  if (!gemini) {
    // Return an elegantly simulated detailed feedback for educational purposes if API key is missing
    const simulatedResponse = simulateFeedback(koreanStudent, japaneseStudent, title, content);
    return res.json(simulatedResponse);
  }

  try {
    const prompt = `
      한-일 양국의 중·고등학생 가상 공동 역사 기술서 프로젝트 평가를 진행합니다.
      
      이 프로젝트는 감정적 대립을 넘어 역사적 고문서(예: 세종실록지리지, 태정관 지령 등) 및 조약, 고지도 등의 객관적 사실관계를 정립하고, 
      양국이 평화적으로 상생 공동 번영으로 나가기 위한 우수한 대안을 서술하는 교과서 집필 시어입니다.
      
      작성자 정보:
      - 한국 학생: ${koreanStudent || "미지정"}
      - 일본 학생: ${japaneseStudent || "미지정"}
      - 교과서 대단원 제목: ${title}
      - 학생들이 공동 서술한 본문 내용:
      "${content}"

      위 내용을 면밀히 분석한 후, 객관적 사료 중심의 분석, 상호 이성적 협력이 잘 돋보이는지에 대해 꼼꼼하고 건설적인 평가 결과를 제시해주세요.
      답변은 아래와 같은 정해진 JSON 스키마 구조로만 응답해야 합니다. 
    `;

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "양국 간의 과거사 문제를 넘어서 미래지향적 동아시아 평화공동체 교과서 집필을 지도하는 역사·지리 평화 공동 교육 위원회의 권위 있고 친절한 공동 평가위원장 역을 수행하십시오. 학생들의 장점(한국 학생 관점, 일본 학생 관점)을 조리 있게 짚어주며 깊이 있는 역사적 통찰을 제공하세요.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["score", "evaluation", "koreanStrength", "japaneseStrength", "peaceAlternative", "evaluationSeal"],
          properties: {
            score: {
              type: Type.INTEGER,
              description: "공동 집필 결과물에 대한 전체 종합 점수 (0점 ~ 100점). 사료 활용 빈도와 평화지향적 균형감을 고려함."
            },
            evaluation: {
              type: Type.STRING,
              description: "전체 집필 내용에 대한 종합 교육 평론 및 심층적인 격려글 (약 3~4문장)."
            },
            koreanStrength: {
              type: Type.STRING,
              description: "세종실록지리지 등 한국 고문서나 지도 사료적 근거를 현명하게 활용한 점 등 한국 측 관점에서의 논리적 공헌 분석."
            },
            japaneseStrength: {
              type: Type.STRING,
              description: "은주시청합기, 태정관지령 등 일본 관찬 사료 귀속 배제 증거를 적극 수용하고 역사적 진실을 성실히 반영한 점 등 일본 측 관점에서의 평화적인 역사 고찰적 공헌 분석."
            },
            peaceAlternative: {
              type: Type.STRING,
              description: "미래 협력적인 동해/독도의 평화적 공동 이용 방안이나 오해 해결을 위한 대안적 문장 혹은 미래 제언 (약 2~3문장)."
            },
            evaluationSeal: {
              type: Type.STRING,
              description: "예: '한·일 공동 역사·지리 평화교육위원회 평가위원 공동 서명'과 같은 공식 평가 날인 문구."
            }
          }
        }
      }
    });

    if (response && response.text) {
      const resultJson = JSON.parse(response.text.trim());
      res.json(resultJson);
    } else {
      throw new Error("Empty response from Gemini API");
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // On unexpected error, gracefully return a high-quality simulated response so the user flow is uninterrupted
    const simulatedResponse = simulateFeedback(koreanStudent, japaneseStudent, title, content);
    res.json(simulatedResponse);
  }
});

// Highly detailed mock analyzer for perfect UX fallback
function simulateFeedback(koreanStudent: string, japaneseStudent: string, title: string, content: string) {
  // Simple heuristic analyzers to personalize the feedback
  const hasTejungkwan = content.includes("태정관") || content.includes("지령");
  const hasSejong = content.includes("세종실록") || content.includes("지리지") || content.includes("1454");
  const hasEEZ = content.includes("EEZ") || content.includes("배타적") || content.includes("중간수역");
  const hasPeace = content.includes("평화") || content.includes("상생") || content.includes("협력");

  let score = 85;
  if (hasTejungkwan) score += 5;
  if (hasSejong) score += 5;
  if (hasPeace) score += 5;
  if (score > 100) score = 100;

  const evaluation = `[시뮬레이션 분석] 한국 학생(${koreanStudent || '이순신'})과 일본 학생(${japaneseStudent || '가토'})이 공동으로 제안한 "${title || '동해의 등대, 독도'}" 서술안은 감정적 대립에서 탈피하여 객관적인 동해 질서를 기술하고자 노력한 우수한 교제 초안입니다. 역사 속 한-일 양측이 남긴 명확한 관찬 기록들을 조화롭게 연계하는 균형 있는 접근을 높이 평가합니다.`;

  const koreanStrength = `한국 학생은 ${hasSejong ? '1454년 세종실록지리지에 언급된 우산도와 울릉도의 지리적 육안 관측성에 주목하여 아주 먼 옛날부터 우리 삶의 영역에 내재화되었음을 설득력 있게 도출했습니다.' : '독도의 주권적 권원을 증명하는 세종실록지리지와 팔도총도 등의 객관적인 지리 지적 권원을 잘 이해하여 서술 논거를 탄탄하게 지탱했습니다.'}`;

  const japaneseStrength = `일본 학생은 ${hasTejungkwan ? '1877년 태정관 지령이라는 명확한 최고 사법/명령 문서의 시인을 수용하며, 독도가 자국의 한계 밖에 위치한 조선 영토였음을 솔직히 기재하는 지혜와 용기를 제공했습니다.' : '은주시청합기(1667년) 등의 자국 사료 속에 명확히 투영된 경계 한계(오키섬)를 수렴하고, 역사적 사실을 평화적으로 수호하려는 올바른 협력 자세를 보전했습니다.'}`;

  const peaceAlternative = `앞으로 신한일어업협정에 따른 중간 수역 내 자원 보존 문제나 기후변화에 관한 동해 해양 환경 보호 문제를 공동 단원으로 적극 편성하여, 갈등의 중심이 아닌 한·일 평화 협력의 상징물로써 "공동 생태 연구 구역"으로 묘사해보는 서술 보완을 권장합니다.`;

  const evaluationSeal = "한·일 역사·지리 평화교육위원회 공동 평가 평가위원장 (AI 현장 시뮬레이션 날인)";

  return {
    score,
    evaluation,
    koreanStrength,
    japaneseStrength,
    peaceAlternative,
    evaluationSeal
  };
}

// Vite Server Configuration inside Express
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Web server configured and running on http://localhost:${PORT}`);
  });
}

startServer();
