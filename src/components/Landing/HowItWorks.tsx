import { motion } from "framer-motion";
import { MessageSquare, Brain, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Describe your idea",
    desc: "Answer 3–4 sharp questions about your problem, target user, and solution.",
  },
  {
    icon: Brain,
    title: "AI evaluates it",
    desc: "A structured pipeline scores your idea across 5 critical dimensions.",
  },
  {
    icon: BarChart3,
    title: "Get your verdict",
    desc: "Receive a scorecard, stress test, risks, and a concrete MVP suggestion.",
  },
];

const HowItWorks = () => (
  <section className="py-24 px-6">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-16 tracking-tight"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        How it works
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="relative bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_24px_-6px_hsl(160_84%_39%_/_0.15)]"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-mono text-muted-foreground mb-4 block">0{i + 1}</span>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <step.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
