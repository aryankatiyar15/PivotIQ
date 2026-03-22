import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface ReportSectionProps {
  icon: LucideIcon;
  title: string;
  content: string;
  delay?: number;
}

const ReportSection = ({ icon: Icon, title, content, delay = 0 }: ReportSectionProps) => (
  <motion.div
    className="bg-card border border-border rounded-xl p-6"
    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-primary" />
      <h4 className="text-sm font-semibold">{title}</h4>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
  </motion.div>
);

export default ReportSection;
