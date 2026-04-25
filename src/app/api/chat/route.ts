import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      // DEMO MODE: Provide a helpful mock response if no key is found
      return NextResponse.json({
        role: "assistant",
        content: "⚠️ **Free Mode Pending**: I'm ready to help you for free using Google Gemini! 🚀\n\nPlease add your `GEMINI_API_KEY` to the `.env` file to enable my full AI capabilities. You can get a free key from the [Google AI Studio](https://aistudio.google.com/)."
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `You are Nishad IT's specialized QA Automation Assistant. 
      Your expertise includes:
      - Generating comprehensive test cases (Manual and Automated)
      - Explaining Playwright, Selenium, and Cypress code
      - Answering questions about API Testing, UI Automation, and CI/CD for QA
      - Debugging automation scripts
      
      Always provide code examples in Playwright (TypeScript) unless asked otherwise. 
      Be concise, professional, and encouraging.`
    });

    // Convert OpenAI-style messages to Gemini-style history
    // Gemini requires the first message in history to be from the 'user'
    let history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Ensure history starts with 'user' role
    const firstUserIndex = history.findIndex((m: any) => m.role === "user");
    if (firstUserIndex !== -1) {
      history = history.slice(firstUserIndex);
    } else {
      history = [];
    }

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      role: "assistant",
      content: text
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch response from AI" },
      { status: 500 }
    );
  }
}
