import { GoogleGenAI } from "@google/genai";

export async function getMotivation(skillName: string): Promise<string> {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "API 키가 구성되지 않았습니다. 동기 부여를 받으려면 설정해주세요.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `'${skillName}' 학습자를 위한 짧고 힘이 되는 동기부여 명언을 한국어로 만들어 주세요. 한두 문장 정도로, 격려가 되면서도 깊이가 있었으면 좋겠습니다.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching motivation from Gemini API:", error);
    return "지금은 동기 부여를 가져올 수 없습니다. 계속 연습하세요!";
  }
}