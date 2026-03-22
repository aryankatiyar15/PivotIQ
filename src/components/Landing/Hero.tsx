import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 40% 50%, hsl(160 84% 39%), transparent)",
            "radial-gradient(ellipse 80% 60% at 60% 50%, hsl(160 84% 39%), transparent)",
            "radial-gradient(ellipse 80% 60% at 40% 50%, hsl(160 84% 39%), transparent)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(160 84% 39% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(160 84% 39% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-6 relative">
            <span className="relative z-10 text-primary/80">
              Startup Decision Engine
            </span>
            <span className="absolute inset-0 blur-lg bg-primary/20 rounded-full" />
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Clarity for your
          <br />
          <span className="relative inline-block">
            <span className="text-gradient">startup idea.</span>
            <span className="absolute -inset-x-4 -inset-y-2 blur-2xl bg-primary/10 rounded-full -z-10" />
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Get a VC-style verdict on your idea in under 2 minutes. No
          fluff. No generic praise. Just signal.
        </motion.p>

        {/* ✅ HERO CTA (Primary — Dominant) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-block group"
          >
            {/* Soft Glow Layer */}
            <div className="absolute inset-0 rounded-xl blur-xl bg-primary/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

            <Button
              size="lg"
              onClick={() => navigate("/evaluate")}
              className="
                relative z-10
                h-14 px-10 text-base font-semibold
                bg-gradient-to-r from-primary via-purple-500 to-pink-500
                text-white rounded-xl
                transition-all duration-300
                group-hover:brightness-110
              "
            >
              <span className="flex items-center gap-2">
                Get Your Verdict
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;