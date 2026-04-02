import type { IdeaInput, EvaluationResult } from "./evaluation";

const GROK_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function evaluateIdeaWithGrok(input: IdeaInput): Promise<EvaluationResult> {
  const apiKey = import.meta.env.VITE_GROK_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_GROK_API_KEY is not set in your .env file");
  }

  const prompt = `You are a brutally honest, skeptical VC analyst. Evaluate this startup idea and return ONLY a valid JSON object — no markdown, no explanation, no preamble.

STARTUP IDEA:
- Problem: ${input.problem}
- Target User: ${input.targetUser}
- Solution: ${input.solution}
- Competitors: ${input.competitors || "Not mentioned"}

Return this exact JSON structure:
{
  "idea_summary": {
    "problem": "${input.problem}",
    "target_user": "${input.targetUser}",
    "solution": "${input.solution}"
  },
  "scores": [
    {
      "category": "Problem Strength",
      "score": <number 1-10, one decimal>,
      "insight": "<2 sharp sentences — be specific, harsh if needed>"
    },
    {
      "category": "Market Potential",
      "score": <number 1-10, one decimal>,
      "insight": "<2 sharp sentences>"
    },
    {
      "category": "Competition",
      "score": <number 1-10, one decimal>,
      "insight": "<2 sharp sentences>"
    },
    {
      "category": "Monetization",
      "score": <number 1-10, one decimal>,
      "insight": "<2 sharp sentences>"
    },
    {
      "category": "Execution Feasibility",
      "score": <number 1-10, one decimal>,
      "insight": "<2 sharp sentences>"
    }
  ],
  "verdict": "<must be exactly one of: GO | CONDITIONAL GO | NO-GO>",
  "stress_score": <integer 0-100>,
  "risks": "<single most critical risk, 1-2 sentences, be direct>",
  "improvements": "<single most impactful improvement, 1-2 sentences, be actionable>",
  "mvp_suggestion": "<concrete MVP suggestion, 2-3 sentences, be specific>"
}

Scoring guide:
- verdict is GO if average score >= 7, CONDITIONAL GO if >= 4.5, NO-GO otherwise
- stress_score reflects overall viability (0 = dead on arrival, 100 = strong signal)
- Be a skeptic — most ideas score between 4-7`;

  const response = await fetch(GROK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Grok API error ${response.status}: ${error}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content ?? "";

  // Strip any accidental markdown fences
  const cleaned = raw.replace(/```json|```/g, "").trim();

  let parsed: EvaluationResult;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Grok returned invalid JSON. Raw response: " + raw);
  }

  // Validate verdict value
  const validVerdicts = ["GO", "CONDITIONAL GO", "NO-GO"] as const;
  if (!validVerdicts.includes(parsed.verdict)) {
    parsed.verdict = "CONDITIONAL GO";
  }

  // Clamp stress_score
  parsed.stress_score = Math.min(100, Math.max(0, Math.round(parsed.stress_score)));

  return parsed;
}