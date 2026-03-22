import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WhyItMatters = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Intuition is not validation.
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Most founders build first and ask questions later. PivotIQ forces you to 
          confront the hard questions before you write a single line of code or spend 
          a dollar. Think of it as a reality check from a VC who doesn't care about 
          your feelings.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            size="lg"
            onClick={() => navigate("/evaluate")}
            className="h-12 px-8 font-semibold glow-primary active:scale-[0.97] transition-transform"
          >
            Try it now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyItMatters;
