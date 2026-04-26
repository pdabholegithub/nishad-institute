import { GoogleGenerativeAI } from "@google/generative-ai";
import { successResponse, withErrorHandler } from '@/lib/api-utils';
import kb from '@/data/knowledge-base.json';

interface ChatMessage {
  role: string;
  content: string;
}

// Helper to find answer from local knowledge base
function getLocalKnowledgeBaseResponse(query: string) {
  const normalizedQuery = query.toLowerCase();
  const match = kb.find(item => 
    item.keywords.some(keyword => normalizedQuery.includes(keyword.toLowerCase()))
  );
  return match ? match.answer : null;
}

// Helper to call Groq API (Secondary Failover)
async function callGroq(messages: ChatMessage[]) {
  if (!process.env.GROQ_API_KEY) return null;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { 
            role: "system", 
            content: "You are Nishad IT Solutions' specialized QA Automation Assistant. Be concise and professional. Provide code examples in Playwright (TypeScript)." 
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.choices[0]?.message?.content || null;
  } catch (err) {
    console.error("Groq Failover Error:", err);
    return null;
  }
}

export async function POST(req: Request) {
  return withErrorHandler(async () => {
    const { messages }: { messages: ChatMessage[] } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // 1. Try Primary AI (Google Gemini)
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash", 
          systemInstruction: "You are Nishad IT Solutions' specialized QA Automation Assistant. Provide Playwright code examples."
        });

        // Convert messages for Gemini
        let history = messages.slice(0, -1).map((m: ChatMessage) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));
        
        const firstUserIndex = history.findIndex((m: { role: string }) => m.role === "user");
        history = firstUserIndex !== -1 ? history.slice(firstUserIndex) : [];

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        return successResponse({ role: "assistant", content: response.text() });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Gemini Primary Error:", errorMessage);
        // Continue to failover
      }
    }

    // 2. Try Secondary AI (Groq Failover)
    const groqResponse = await callGroq(messages);
    if (groqResponse) {
      return successResponse({ role: "assistant", content: groqResponse });
    }

    // 3. Try Local Knowledge Base (Final Fallback)
    const kbResponse = getLocalKnowledgeBaseResponse(lastMessage);
    if (kbResponse) {
      return successResponse({ 
        role: "assistant", 
        content: `🤖 **Backup Mode Active**: I'm currently answering from our local knowledge base.\n\n${kbResponse}` 
      });
    }

    // 4. Ultimate Fallback
    return successResponse({
      role: "assistant",
      content: "I'm currently experiencing high traffic and my AI brain is resting. 😴\n\nPlease try again in a few seconds, or feel free to contact us directly at support@nishadinstitute.com!"
    });
  });
}
