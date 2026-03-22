import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface StressGaugeProps {
  score: number;
}

const StressGauge = ({ score }: StressGaugeProps) => {
  const label = score >= 70 ? "Promising" : score >= 40 ? "Moderate" : "High Risk";
  const color = score >= 70 ? "text-verdict-go" : score >= 40 ? "text-verdict-conditional" : "text-verdict-nogo";
  const barColor = score >= 70 ? "bg-verdict-go" : score >= 40 ? "bg-verdict-conditional" : "bg-verdict-nogo";

  const [displayScore, setDisplayScore] = useState(0);
  const motionVal = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionVal, score, {
      duration: 1.2,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayScore(Math.round(v)),
    });
    return controls.stop;
  }, [score, motionVal]);

  return (
    <motion.div
      className="bg-card border border-border rounded-xl p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold">Stress Test Score</h4>
        <span className={`text-xs font-semibold uppercase tracking-wider ${color}`}>{label}</span>
      </div>
      <div className="flex items-end gap-3">
        <span className={`text-4xl font-bold font-mono tabular-nums ${color}`}>{displayScore}</span>
        <span className="text-muted-foreground text-sm mb-1">/ 100</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full mt-4 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
};

export default StressGauge;
