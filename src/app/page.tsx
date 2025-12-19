import Hero from "../components/Hero";
import Features from "../components/Features";
import Showcase from "../components/Showcase";

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <main className="px-6">
        <Hero />
        <Features />
      </main>
    </div>
  );
}
