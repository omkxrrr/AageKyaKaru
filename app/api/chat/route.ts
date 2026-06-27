import { NextResponse } from "next/server";
import { cities, colleges, courses } from "@/data/stages";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const maxMessages = 10;

const knowledgeContext = `
Platform: AageKyaKaru, a Maharashtra-focused student guidance app.
Available stages: after 10th, after 12th, after diploma, after degree.
Available courses: ${courses.map((course) => `${course.name} (${course.duration})`).join("; ")}.
College count: ${colleges.length}. City count: ${cities.length}.
Top colleges in catalog: ${colleges
  .slice(0, 18)
  .map((college) => college.name)
  .join("; ")}.
Cities in catalog: ${cities.map((city) => city.name).join(", ")}.
`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY is missing. Add it to .env.local, then restart the dev server."
      },
      { status: 500 }
    );
  }

  const body = (await request.json()) as { messages?: ChatMessage[] };
  const messages = (body.messages ?? [])
    .filter((message) => message.content?.trim())
    .slice(-maxMessages);

  if (!messages.length) {
    return NextResponse.json({ error: "Message required." }, { status: 400 });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-5.5",
      instructions: `You are AageKyaKaru AI, a friendly Indian student guidance assistant.
Always answer in clear, natural English, even if the student asks in Hinglish or Hindi.
Be practical, concise, and supportive. Help students compare streams, courses, colleges, cities, fees, hostels, entrance exams, and career paths.
Do not invent exact admission cutoffs, deadlines, or legal guarantees. If a fact changes often, ask the student to verify official sites.
Use this app context when useful:
${knowledgeContext}`,
      input: messages.map((message) => ({
        role: message.role,
        content: message.content
      })),
      reasoning: { effort: "low" }
    })
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: data.error?.message ?? "AI response failed." },
      { status: response.status }
    );
  }

  const text =
    data.output_text ??
    data.output
      ?.flatMap((item: { content?: Array<{ text?: string }> }) => item.content ?? [])
      .map((content: { text?: string }) => content.text)
      .filter(Boolean)
      .join("\n")
      ?.trim();

  return NextResponse.json({
    message: text || "Sorry, I could not generate a response."
  });
}
