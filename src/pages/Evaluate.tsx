import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "@/components/Chat/ChatMessage";
import TypingIndicator from "@/components/Chat/TypingIndicator";
import ChatInput from "@/components/Chat/ChatInput";
import ValidationReport from "@/components/Report/ValidationReport";
import { evaluateIdea, type IdeaInput, type EvaluationResult } from "@/lib/evaluation";
import { evaluateIdeaWithGrok } from "@/lib/grokEvaluation";

interface Message {
  role: "bot" | "user";
  content: string;
}

const QUESTIONS = [
  "What problem are you solving? Be specific — who feels this pain, and how often?",
  "Who is this for? Describe your target user as precisely as you can.",
  "How does your solution work? Walk me through the core mechanism.",
  "Who are your competitors? (Optional — type 'skip' to move on)",
];

const ANALYSIS_MESSAGES = [
  "Breaking down your idea...",
  "Evaluating problem strength...",
  "Analyzing competition landscape...",
  "Calculating market potential...",
  "Running stress test...",
  "Generating verdict...",
];

type Phase = "chat" | "analyzing" | "report";

const Evaluate = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [phase, setPhase] = useState<Phase>("chat");
  const [currentQ, setCurrentQ] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  const addBotMessage = useCallback((content: string) => {
    return new Promise<void>((resolve) => {
      setIsTyping(true);
      scrollToBottom();
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "bot", content }]);
        scrollToBottom();
        resolve();
      }, 1000 + Math.random() * 500);
    });
  }, [scrollToBottom]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    addBotMessage("Welcome to PivotIQ. I'm going to evaluate your startup idea like a skeptical VC. No fluff — just signal. Let's begin.");
    setTimeout(() => {
      addBotMessage(QUESTIONS[0]);
    }, 1800);
  }, [addBotMessage]);

  const handleSend = async (text: string) => {
    if (phase !== "chat" || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    scrollToBottom();

    const newAnswers = [...answers, text];
    setAnswers(newAnswers);

    const nextQ = currentQ + 1;

    if (nextQ < QUESTIONS.length) {
      setCurrentQ(nextQ);
      await addBotMessage(QUESTIONS[nextQ]);
    } else {
      runAnalysis(newAnswers);
    }
  };

  const runAnalysis = async (ans: string[]) => {
    setPhase("analyzing");

    // Show analysis messages with delays while Grok call runs in parallel
    const messagePromise = (async () => {
      for (const msg of ANALYSIS_MESSAGES) {
        await addBotMessage(msg);
      }
    })();

    const input: IdeaInput = {
      problem: ans[0],
      targetUser: ans[1],
      solution: ans[2],
      competitors: ans[3]?.toLowerCase() === "skip" ? undefined : ans[3],
    };

    // Run Grok and animation messages in parallel
    const [evalResult] = await Promise.all([
      evaluateIdeaWithGrok(input).catch((err) => {
        // Fallback to mock if Grok fails (e.g. no API key, network error)
        console.warn("Grok evaluation failed, falling back to mock:", err.message);
        return evaluateIdea(input);
      }),
      messagePromise,
    ]);

    setResult(evalResult);

    await addBotMessage(
      `Analysis complete. Your verdict: ${evalResult.verdict}. Stress Score: ${evalResult.stress_score}/100.`
    );

    setTimeout(() => setPhase("report"), 1500);
  };

  if (phase === "report" && result) {
    return <ValidationReport result={result} />;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-xl px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground transition-colors active:scale-[0.95]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <span className="text-sm font-bold">
            Pivot<span className="text-primary">IQ</span>
          </span>
          <span className="text-xs text-muted-foreground ml-2">Idea Evaluation</span>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {isTyping && <TypingIndicator />}

          {messages.length === 0 && !isTyping && (
            <div className="text-center text-muted-foreground text-sm py-20">
              Start by describing your idea...
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        disabled={phase !== "chat" || isTyping}
        placeholder={
          phase === "analyzing"
            ? "Analyzing your idea..."
            : currentQ === 3
            ? "Type your answer or 'skip'..."
            : "Type your answer..."
        }
      />
    </div>
  );
};

export default Evaluate;
