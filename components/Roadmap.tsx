"use client";

import { motion } from "framer-motion";
import { Milestone, Sparkles, Heart, Activity, ShieldCheck } from "lucide-react";

const phases = [
  {
    version: "Version 1",
    title: "AI Wellness Mirror",
    icon: <Sparkles size={20} />,
    desc: "Uses visible skin signals, lifestyle patterns, and behavioral data to help people understand the relation between appearance and overall well-being.",
    features: ["Selfie skin scanning", "Glow Score calculation", "Hakim AI chat v1", "Correlation Engine"],
    color: "var(--primary)",
    bg: "var(--primary-glow)",
    active: true,
  },
  {
    version: "Version 2",
    title: "AI Beauty Coach",
    icon: <Heart size={20} />,
    desc: "Expands into personalized aesthetic coaching and recommendation algorithms directly connected to local skin health markets.",
    features: ["Aesthetic intelligence", "Skincare recommendations", "Daily routine tracking", "Hakim AI coach v2"],
    color: "var(--accent)",
    bg: "var(--accent-glow)",
    active: false,
  },
  {
    version: "Version 3",
    title: "AI Wellness Platform",
    icon: <Activity size={20} />,
    desc: "Broadens the diagnostic scope to track lifestyle details directly affecting physiological health.",
    features: ["Nutrition tracking", "Habit logs & streaks", "Meal photo analysis", "Active biometric integrations"],
    color: "var(--sky)",
    bg: "var(--sky-glow)",
    active: false,
  },
  {
    version: "Version 4",
    title: "AI Preventive Health Platform",
    icon: <ShieldCheck size={20} />,
    desc: "The ultimate vision: a personal AI health companion that warns and guides users proactively based on early wellness signals.",
    features: ["Early wellness risk detection", "Biometric risk forecasting", "Professional health coaching", "Clinical integrations"],
    color: "var(--rose)",
    bg: "var(--rose-glow)",
    active: false,
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="section" style={{ position: "relative" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="eyebrow">
            <Milestone size={14} />
            The Vision
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            Business Expansion <span className="gradient-text">Roadmap</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1.05rem",
              maxWidth: "60ch",
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            From an AI wellness mirror to a preventive health platform. See how GlowAI scales to become a personal AI health companion.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
          className="roadmap-grid"
        >
          {phases.map((phase, i) => (
            <motion.div
              key={phase.version}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: phase.active ? "1px solid var(--primary)" : "1px solid var(--line)",
                boxShadow: phase.active ? "0 0 24px var(--primary-glow)" : "none",
              }}
            >
              {/* Badge for Active state */}
              {phase.active && (
                <span
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    color: "var(--primary)",
                    background: "var(--primary-glow)",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "999px",
                    border: "1px solid var(--primary-glow)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Current Phase
                </span>
              )}

              {/* Version Identifier */}
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: phase.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.5rem",
                }}
              >
                {phase.version}
              </span>

              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "var(--radius)",
                    background: phase.bg,
                    color: phase.color,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {phase.icon}
                </div>
                <h3 style={{ fontSize: "1.1rem", lineHeight: 1.2 }}>{phase.title}</h3>
              </div>

              {/* Description */}
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  fontWeight: 600,
                  marginBottom: "1.5rem",
                  flexGrow: 1,
                }}
              >
                {phase.desc}
              </p>

              {/* Features check list */}
              <div
                style={{
                  display: "grid",
                  gap: "0.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "var(--text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: "0.2rem",
                  }}
                >
                  Key Elements
                </span>
                {phase.features.map((feat) => (
                  <div
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--muted)",
                    }}
                  >
                    <span style={{ color: phase.color, fontSize: "0.9rem" }}>•</span>
                    {feat}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 960px) {
          .roadmap-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .roadmap-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
