import { motion } from "framer-motion";
import type { ScoreItem } from "@/lib/evaluation";

const ScoreCard = ({ category, score, insight }: ScoreItem & { index: number }) => {
  const color = score >= 7 ? "text-verdict-go" : score >= 4.5 ? "text-verdict-conditional" : "text-verdict-nogo";

  return (
    <motion.div
      className="bg-card border border-border rounded-xl p-6 card-hover"
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-semibold text-foreground">{category}</h4>
        <span className={`text-2xl font-bold font-mono tabular-nums ${color}`}>{score}</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full mb-3 overflow-hidden">
        <motion.div
          className="score-bar h-full"
          initial={{ width: 0 }}
          animate={{ width: `${score * 10}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{insight}</p>
    </motion.div>
  );
};

export default ScoreCard;
