export interface IdeaInput {
  problem: string;
  targetUser: string;
  solution: string;
  competitors?: string;
}

export interface ScoreItem {
  category: string;
  score: number;
  insight: string;
}

export interface EvaluationResult {
  idea_summary: {
    problem: string;
    target_user: string;
    solution: string;
  };
  scores: ScoreItem[];
  verdict: "GO" | "CONDITIONAL GO" | "NO-GO";
  stress_score: number;
  risks: string;
  improvements: string;
  mvp_suggestion: string;
}

function scoreText(text: string, weight: number): number {
  const len = text.length;
  const words = text.split(/\s+/).length;
  const specificity = Math.min(words / 8, 1);
  const detail = Math.min(len / 120, 1);
  const base = 3 + (specificity * 3.5 + detail * 3.5) * weight;
  return Math.round(Math.min(10, Math.max(1, base + (Math.random() * 1.5 - 0.75))) * 10) / 10;
}

const problemInsights = [
  "The problem statement lacks specificity. Strong problems name a measurable pain point.",
  "This is a real friction — but you need to quantify how often it occurs for your target user.",
  "Clear pain point identified. The question is whether users currently pay to solve it.",
  "This addresses a genuine gap, but the urgency isn't obvious. Why would users switch now?",
];

const marketInsights = [
  "Market size is unclear. Without a TAM estimate, this is a guess, not a strategy.",
  "There's a market here, but it may be too niche to build a venture-scale business.",
  "Decent market signal. The key question: is the market growing or contracting?",
  "Large addressable market, but that also means incumbents have resources to crush you.",
];

const competitionInsights = [
  "No mention of competitors is a red flag — either you haven't looked or you don't understand the space.",
  "Competitors exist and are funded. You need a defensible wedge, not just a better UX.",
  "The competitive landscape is fragmented — that's an opportunity if you can consolidate.",
  "You're entering a crowded space. Differentiation needs to be structural, not cosmetic.",
];

const monetizationInsights = [
  "No clear monetization path. Users loving your product isn't a business model.",
  "The willingness-to-pay assumption is untested. Have you talked to potential customers?",
  "SaaS pricing could work here, but your value metric needs to be tied to outcomes.",
  "There's a path to revenue, but margins depend on whether this is a tool or a platform.",
];

const executionInsights = [
  "This requires significant technical investment before you can even test demand.",
  "MVP is buildable in weeks — that's good. But distribution is the real challenge.",
  "Execution is straightforward, which means speed to market is your only moat.",
  "This needs domain expertise that's hard to hire for. Who on your team has it?",
];

function pickInsight(insights: string[], score: number): string {
  if (score <= 4) return insights[0];
  if (score <= 6) return insights[1];
  if (score <= 8) return insights[2];
  return insights[3];
}

export function evaluateIdea(input: IdeaInput): EvaluationResult {
  const problemScore = scoreText(input.problem, 1.0);
  const marketScore = scoreText(input.targetUser + " " + input.problem, 0.85);
  const competitionScore = input.competitors
    ? scoreText(input.competitors, 0.9)
    : Math.round((2.5 + Math.random() * 2) * 10) / 10;
  const monetizationScore = scoreText(input.solution + " " + input.problem, 0.75);
  const executionScore = scoreText(input.solution, 0.8);

  const scores: ScoreItem[] = [
    { category: "Problem Strength", score: problemScore, insight: pickInsight(problemInsights, problemScore) },
    { category: "Market Potential", score: marketScore, insight: pickInsight(marketInsights, marketScore) },
    { category: "Competition", score: competitionScore, insight: pickInsight(competitionInsights, competitionScore) },
    { category: "Monetization", score: monetizationScore, insight: pickInsight(monetizationInsights, monetizationScore) },
    { category: "Execution Feasibility", score: executionScore, insight: pickInsight(executionInsights, executionScore) },
  ];

  const avg = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
  const stressScore = Math.round(Math.min(100, Math.max(0, avg * 10 + (Math.random() * 6 - 3))));

  let verdict: "GO" | "CONDITIONAL GO" | "NO-GO";
  if (avg >= 7) verdict = "GO";
  else if (avg >= 4.5) verdict = "CONDITIONAL GO";
  else verdict = "NO-GO";

  const riskOptions = [
    "Your biggest risk is building something nobody asked for. Talk to 20 potential users before writing code.",
    "Distribution is your Achilles' heel. A great product with no channel strategy dies quietly.",
    "You're solving a 'nice-to-have' problem. Unless you can make it urgent, growth will be slow.",
    "Technical complexity could burn through runway before you find product-market fit.",
    "The market timing feels off. Too early means you educate the market on your dime.",
  ];

  const improvementOptions = [
    "Narrow your target user to a single, specific persona. 'Everyone' is not a market.",
    "Add a quantified value proposition. 'Saves time' is weak. '4.2 hours per week' is compelling.",
    "Build a waitlist before building the product. Demand validation costs nothing.",
    "Study your top 2 competitors obsessively. Find the gap they're ignoring and own it.",
    "Define your unfair advantage. If you don't have one, you're in a feature war you'll lose.",
  ];

  const mvpOptions = [
    `Build a single-feature tool that solves "${input.problem.slice(0, 40)}..." for ${input.targetUser.split(" ").slice(0, 3).join(" ")}. No login, no dashboard — just the core action. Ship in 2 weeks.`,
    `Create a landing page describing your solution, add a "Join Waitlist" button, and run $200 in targeted ads. If conversion > 5%, build it. If not, pivot the messaging first.`,
    `Start with a manual/concierge version. Deliver the value by hand to 10 users. If they come back asking for more, automate it.`,
    `Build a Telegram/Discord bot that delivers the core value in a conversational format. Zero infrastructure, instant feedback loop.`,
  ];

  return {
    idea_summary: {
      problem: input.problem,
      target_user: input.targetUser,
      solution: input.solution,
    },
    scores,
    verdict,
    stress_score: stressScore,
    risks: riskOptions[Math.floor(Math.random() * riskOptions.length)],
    improvements: improvementOptions[Math.floor(Math.random() * improvementOptions.length)],
    mvp_suggestion: mvpOptions[Math.floor(Math.random() * mvpOptions.length)],
  };
}
