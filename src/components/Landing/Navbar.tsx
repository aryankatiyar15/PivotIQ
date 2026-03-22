import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="
            text-xl font-semibold tracking-tight
            hover:opacity-80 transition-all duration-200
          "
        >
          Pivot<span className="text-primary">IQ</span>
        </button>

        {/* Flask Icon CTA */}
        <button
          onClick={() => navigate("/evaluate")}
          className="
            p-2.5 rounded-lg
            border border-border
            transition-all duration-200
            hover:bg-muted hover:border-muted-foreground/30
            hover:scale-[1.05]
            active:scale-[0.95]
          "
        >
          <img
            src="/flask.svg"
            alt="Evaluate Idea"
        className="w-5 h-5 object-contain"
          />
        </button>

      </div>
    </nav>
  );
};

export default Navbar;