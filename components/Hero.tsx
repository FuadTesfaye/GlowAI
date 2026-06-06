"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const circumference = 2 * Math.PI * 68;
  const score = 82;
  const offset = circumference - (score / 100) * circumference;

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "6rem",
      }}
    >
      {/* Ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--primary-glow), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--accent-glow), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "center",
        }}
      >
        {/* Left — Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">
            <Sparkles size={14} />
            AI Wellness Intelligence
          </span>

          <h1
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              lineHeight: 0.95,
              marginBottom: "1.5rem",
              maxWidth: "16ch",
            }}
          >
            The World&apos;s First{" "}
            <span className="gradient-text">AI Wellness Mirror</span>
          </h1>

          <p
            style={{
              color: "var(--muted)",
              fontSize: "1.15rem",
              lineHeight: 1.7,
              maxWidth: "52ch",
              marginBottom: "2rem",
            }}
          >
            See beyond your skin. GlowAI analyzes your lifestyle, nutrition,
            stress, sleep, and skincare routine — then predicts your future
            glow and shows exactly how to improve it.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "3rem",
            }}
          >
            <a href="#solution" className="btn btn-primary">
              Discover GlowAI
              <ArrowRight size={16} />
            </a>
            <a href="#features" className="btn btn-secondary">
              Explore Features
            </a>
          </div>

          {/* Metrics strip */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {[
              { value: "6", label: "Skin Signals" },
              { value: "5", label: "Wellness Inputs" },
              { value: "100", label: "Glow Score" },
              { value: "AI", label: "Hakim Coach" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "0.75rem 1rem",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  background:
                    "color-mix(in srgb, var(--surface) 80%, transparent)",
                  minWidth: "7rem",
                }}
              >
                <div style={{ fontSize: "1.35rem", fontWeight: 900 }}>
                  {item.value}
                </div>
                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: "relative" }}
        >
          {/* Main dashboard card */}
          <div
            className="glass-card"
            style={{
              padding: "2rem",
              position: "relative",
            }}
          >
            {/* Score Ring */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              <div
                className="score-ring"
                style={{ width: "180px", height: "180px" }}
              >
                <svg viewBox="0 0 160 160">
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                  </defs>
                  <circle className="ring-track" cx="80" cy="80" r="68" />
                  <motion.circle
                    className="ring-progress"
                    cx="80"
                    cy="80"
                    r="68"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  />
                </svg>
                <div className="score-value">
                  <motion.strong
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {score}
                  </motion.strong>
                  <span>Glow Score™</span>
                </div>
              </div>
            </div>

            {/* Mini signal bars */}
            <div
              style={{
                display: "grid",
                gap: "0.7rem",
              }}
            >
              {[
                { label: "Skin Health", value: 78, color: "var(--primary)" },
                { label: "Sleep Quality", value: 60, color: "var(--sky)" },
                { label: "Hydration", value: 75, color: "var(--accent)" },
                { label: "Nutrition", value: 70, color: "var(--primary)" },
                { label: "Stress Level", value: 45, color: "var(--rose)" },
              ].map((signal) => (
                <div key={signal.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.3rem",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ color: "var(--muted)" }}>
                      {signal.label}
                    </span>
                    <span>{signal.value}%</span>
                  </div>
                  <div className="bar">
                    <motion.span
                      className="bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${signal.value}%` }}
                      transition={{
                        duration: 1,
                        delay: 0.8,
                        ease: "easeOut",
                      }}
                      style={{ background: signal.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating insight pill */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            style={{
              position: "absolute",
              top: "1rem",
              right: "-1rem",
              padding: "0.65rem 1rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--line)",
              background:
                "color-mix(in srgb, var(--surface) 90%, transparent)",
              backdropFilter: "blur(12px)",
              fontSize: "0.82rem",
              fontWeight: 700,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span style={{ color: "var(--primary)" }}>✦</span> AI Insight
            Active
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          section > div.container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
