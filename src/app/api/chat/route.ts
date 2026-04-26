import { GoogleGenerativeAI } from "@google/generative-ai";
import { successResponse, withErrorHandler } from '@/lib/api-utils';

export async function POST(req: Request) {
  return withErrorHandler(async () => {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return successResponse({
        role: "assistant",
        content: "⚠️ **Free Mode Pending**: I'm ready to help you for free using Google Gemini! 🚀\n\nPlease add your `GEMINI_API_KEY` to the `.env` file to enable my full AI capabilities."
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash", 
      systemInstruction: `You are Nishad IT Solutions' specialized QA Automation Assistant. 
      Your expertise includes:
      - Generating comprehensive test cases (Manual and Automated)
      - Explaining Playwright, Selenium, and Cypress code
      - Answering questions about API Testing, UI Automation, and CI/CD for QA
      - Debugging automation scripts
      
      Always provide code examples in Playwright (TypeScript) unless asked otherwise. 
      Be concise, professional, and encouraging.`
    });

    // Convert OpenAI-style messages to Gemini-style history
    let history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const firstUserIndex = history.findIndex((m: { role: string }) => m.role === "user");
    if (firstUserIndex !== -1) {
      history = history.slice(firstUserIndex);
    } else {
      history = [];
    }

    const lastMessage = (messages[messages.length - 1] as { content: string }).content;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return successResponse({
      role: "assistant",
      content: text
    });
  });
}
