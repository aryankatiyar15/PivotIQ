import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, Zap, Plus, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { EvaluationResult } from "@/lib/evaluation";
import ScoreCard from "./ScoreCard";
import VerdictBanner from "./VerdictBanner";
import StressGauge from "./StressGauge";
import ReportSection from "./ReportSection";
import { Button } from "@/components/ui/button";

interface ValidationReportProps {
  result: EvaluationResult;
}

const ValidationReport = ({ result }: ValidationReportProps) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const text = `PivotIQ Validation Report
========================

IDEA SUMMARY
Problem: ${result.idea_summary.problem}
Target User: ${result.idea_summary.target_user}
Solution: ${result.idea_summary.solution}

SCORES
${result.scores.map(s => `${s.category}: ${s.score}/10 — ${s.insight}`).join("\n")}

VERDICT: ${result.verdict}
Stress Test Score: ${result.stress_score}/100

BIGGEST RISK
${result.risks}

IMPROVEMENTS
${result.improvements}

MVP SUGGESTION
${result.mvp_suggestion}
`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pivotiq-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <button
              onClick={() => navigate("/")}
              className="text-sm font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              Pivot<span className="text-primary">IQ</span>
            </button>
            <h1 className="text-2xl font-bold tracking-tight mt-1">
              Validation Report
            </h1>
          </div>

          {/* ✅ UPDATED BUTTON GROUP */}
          <div className="flex items-center gap-3">
            {/* Secondary CTA — Download */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="
                text-muted-foreground
                bg-transparent
                border border-border/50
                hover:border-border
                hover:text-foreground
                transition-all duration-200
              "
            >
              <Download className="w-4 h-4 mr-1" />
              Download Report
            </Button>

            {/* Primary CTA — New Idea */}
            <Button
              size="sm"
              onClick={() => {
                window.location.href = "/evaluate";
              }}
              className="
                relative
                text-white
                bg-gradient-to-r from-primary via-green-500 to-emerald-500
                border-none
                rounded-lg
                shadow-md shadow-primary/25
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:shadow-lg hover:shadow-primary/40
                active:translate-y-0 active:shadow-md
              "
            >
              <Plus className="w-4 h-4 mr-1" />
              New Idea
            </Button>
          </div>
        </motion.div>

        {/* Idea Summary */}
        <motion.div
          className="bg-card border border-border rounded-xl p-6 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="text-base">🧠</span> Idea Summary
          </h3>
          <div className="grid gap-3 text-sm">
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wider">
                Problem
              </span>
              <p className="text-foreground mt-0.5">
                {result.idea_summary.problem}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wider">
                Target User
              </span>
              <p className="text-foreground mt-0.5">
                {result.idea_summary.target_user}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wider">
                Solution
              </span>
              <p className="text-foreground mt-0.5">
                {result.idea_summary.solution}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scorecard */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {result.scores.map((s, i) => (
            <ScoreCard key={s.category} {...s} index={i} />
          ))}
        </div>

        {/* Verdict + Stress */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <VerdictBanner verdict={result.verdict} />
          <StressGauge score={result.stress_score} />
        </div>

        {/* Risk, Improvements, MVP */}
        <div className="space-y-4 mb-12">
          <ReportSection
            icon={AlertTriangle}
            title="Biggest Risk"
            content={result.risks}
            delay={0.1}
          />
          <ReportSection
            icon={Lightbulb}
            title="Improvements"
            content={result.improvements}
            delay={0.2}
          />
          <ReportSection
            icon={Zap}
            title="MVP Suggestion"
            content={result.mvp_suggestion}
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
};

export default ValidationReport;