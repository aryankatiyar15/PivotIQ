import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "bot" | "user";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => (
  <motion.div
    className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
    initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    <div
      className={cn(
        "max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
        role === "bot"
          ? "bg-card border border-border text-foreground rounded-bl-md"
          : "bg-primary text-primary-foreground rounded-br-md"
      )}
    >
      {content}
    </div>
  </motion.div>
);

export default ChatMessage;
