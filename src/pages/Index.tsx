import Navbar from "@/components/Landing/Navbar";
import Hero from "@/components/Landing/Hero";
import HowItWorks from "@/components/Landing/HowItWorks";
import SampleOutput from "@/components/Landing/SampleOutput";
import WhyItMatters from "@/components/Landing/WhyItMatters";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <HowItWorks />
    <SampleOutput />
    <WhyItMatters />
    <footer className="border-t border-border py-8 px-6 text-center">
      <span className="text-xs text-muted-foreground">
        Built with PivotIQ — Clarity for your startup idea.
      </span>
    </footer>
  </div>
);

export default Index;
