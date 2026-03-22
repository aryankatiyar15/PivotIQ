import { motion } from "framer-motion";

const sampleScores = [
  { cat: "Problem Strength", score: 7.2 },
  { cat: "Market Potential", score: 6.5 },
  { cat: "Competition", score: 4.8 },
  { cat: "Monetization", score: 6.1 },
  { cat: "Execution Feasibility", score: 7.8 },
];

const SampleOutput = () => (
  <section className="py-24 px-6 bg-card/50">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-4 tracking-tight"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Sample verdict
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-center mb-12 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Here's what a PivotIQ evaluation looks like.
      </motion.p>

      <motion.div
        className="bg-card border border-border rounded-xl p-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="space-y-1">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Idea</span>
          <p className="text-sm text-foreground">"AI-powered meal planner for busy parents who want healthy, budget-friendly recipes."</p>
        </div>

        <div className="space-y-3">
          {sampleScores.map((s) => (
            <div key={s.cat} className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground w-40 shrink-0">{s.cat}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="score-bar h-full" style={{ width: `${s.score * 10}%` }} />
              </div>
              <span className="text-sm font-mono font-semibold w-8 text-right">{s.score}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <span className="px-3 py-1 rounded-md text-xs font-bold bg-verdict-conditional/15 text-verdict-conditional uppercase tracking-wider">
            Conditional Go
          </span>
          <span className="text-xs text-muted-foreground">Stress Score: 64/100 — Moderate</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SampleOutput;
