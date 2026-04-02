# 🚀 PivotIQ — Startup Idea Validator

**Clarity for your startup idea. Verdicts you can act on.**

👉 **Live Demo:** [pivot-iq.vercel.app](https://pivot-iq.vercel.app)

---

## 🧠 Overview

PivotIQ is a **VC-style startup decision engine** that evaluates ideas through a structured conversational flow and delivers a clear **GO / NO-GO verdict**.

Instead of generic AI responses, PivotIQ simulates how a **skeptical investor** would analyze an idea — surfacing risks, exposing weak assumptions, and generating actionable next steps.

> "This is not a chatbot — it's a decision engine."

---

## 🎯 Problem It Solves

Most startup ideas fail not because of poor execution, but because of **unchallenged assumptions**.

Existing tools:
- Give vague, encouraging feedback
- Feel like generic chatbot wrappers
- Lack any structured evaluation framework

PivotIQ enforces **clarity, structure, and critical thinking** at every step.

---

## ⚙️ How It Works

| Step | What Happens |
|------|-------------|
| 1. **Guided Input** | You describe your Problem, Target User, Solution, and Competitors |
| 2. **Evaluation Engine** | Scores across Problem Strength, Market Potential, Competition, Monetization & Execution |
| 3. **Stress Test Layer** | Aggregates all signals into a final 0–100 score |
| 4. **Verdict** | GO / CONDITIONAL GO / NO-GO — with reasoning and insights |

---

## ✨ Features

- 💬 **Structured Chatbot** — guided flow, not freeform chat
- ⚖️ **Verdict System** — GO / CONDITIONAL GO / NO-GO
- 📊 **Scorecard Evaluation** — across 5 key dimensions
- 🔥 **Stress Test Score** — 0 to 100
- 🚨 **Risk Identification** — flags blind spots early
- 💡 **Improvement Suggestions** — actionable, not generic
- ⚡ **MVP Recommendation** — what to build first
- 📄 **Downloadable Report** — share or revisit your validation

---

## 🖥️ Tech Stack

- **React + Vite** — fast, modern frontend
- **TypeScript** — type-safe throughout
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — smooth UI transitions
- **Groq API** — AI-powered evaluation engine

---

## 🤖 AI Integration

PivotIQ uses the **Groq API** for fast, structured AI evaluation. The evaluation layer is designed around a skeptical investor persona — not a helpful assistant.

### Environment Setup

Create a `.env` file in the root of the project:

```env
VITE_GROK_API_KEY=your_api_key_here
```
You can get your Groq API key from [console.groq.com](https://console.groq.com).

---

## 📁 Project Structure

```
/src
  /components
    /Chat        → Conversational input flow
    /Landing     → Hero and intro screens
    /Report      → Scorecard and verdict display
    /ui          → Reusable UI primitives
  /hooks         → Custom React hooks
  /lib           → Utility functions and helpers
  /pages         → Route-level page components
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/pivotiq.git
cd pivotiq

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your VITE_GROQ_API_KEY to .env

# Start the dev server
npm run dev
```

---

## 🙌 Author

**Aryan Katiyar**

---

## ⭐ The Goal

PivotIQ helps founders move from:

> *"This sounds like a good idea"*

to:

> *"This is a validated decision."*