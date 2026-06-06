import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Insight from "@/components/Insight";
import Solution from "@/components/Solution";
import Features from "@/components/Features";
import UserJourney from "@/components/UserJourney";
import GlowScore from "@/components/GlowScore";
import HakimAI from "@/components/HakimAI";
import FutureGlow from "@/components/FutureGlow";
import ActionEngine from "@/components/ActionEngine";
import Gamification from "@/components/Gamification";
import WhyWeWin from "@/components/WhyWeWin";
import BusinessModel from "@/components/BusinessModel";
import Workflow from "@/components/Workflow";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Insight />
        <Solution />
        <Features />
        <UserJourney />
        <GlowScore />
        <HakimAI />
        <FutureGlow />
        <ActionEngine />
        <Gamification />
        <WhyWeWin />
        <BusinessModel />
        <Workflow />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}

