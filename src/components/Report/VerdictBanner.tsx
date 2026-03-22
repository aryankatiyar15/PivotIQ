import { motion } from "framer-motion";

interface VerdictBannerProps {
  verdict: "GO" | "CONDITIONAL GO" | "NO-GO";
}

const config = {
  GO: {
    bg: "bg-verdict-go/10 border-verdict-go/30",
    text: "text-verdict-go",
    label: "GO",
    glow: "shadow-[0_0_40px_-8px_hsl(160_84%_39%_/_0.3)]",
    tagline: "Strong signal. Move fast, validate with real users, and iterate.",
  },
  "CONDITIONAL GO": {
    bg: "bg-verdict-conditional/10 border-verdict-conditional/30",
    text: "text-verdict-conditional",
    label: "CONDITIONAL GO",
    glow: "shadow-[0_0_40px_-8px_hsl(43_96%_56%_/_0.25)]",
    tagline: "This idea shows potential, but execution will define success.",
  },
  "NO-GO": {
    bg: "bg-verdict-nogo/10 border-verdict-nogo/30",
    text: "text-verdict-nogo",
    label: "NO-GO",
    glow: "shadow-[0_0_40px_-8px_hsl(0_72%_51%_/_0.25)]",
    tagline: "The fundamentals need rethinking. Pivot before you invest further.",
  },
};

const VerdictBanner = ({ verdict }: VerdictBannerProps) => {
  const c = config[verdict];

  return (
    <motion.div
      className={`border rounded-xl p-6 text-center ${c.bg} ${c.glow}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">Final Verdict</span>
      <span className={`text-4xl font-bold tracking-tight block ${c.text}`}>{c.label}</span>
      <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-[220px] mx-auto">{c.tagline}</p>
    </motion.div>
  );
};

export default VerdictBanner;
