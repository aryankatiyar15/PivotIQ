import { motion } from "framer-motion";

const TypingIndicator = () => (
  <motion.div
    className="flex justify-start"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-dot-1" />
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-dot-2" />
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-dot-3" />
    </div>
  </motion.div>
);

export default TypingIndicator;
