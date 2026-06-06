"use client";

import { motion } from "framer-motion";
import { Moon, Brain, Apple, Droplets, Eye } from "lucide-react";

const factors = [
  { icon: <Moon size={22} />, label: "Sleep", color: "var(--sky)" },
  { icon: <Brain size={22} />, label: "Stress", color: "var(--rose)" },
  { icon: <Apple size={22} />, label: "Nutrition", color: "var(--primary)" },
  { icon: <Droplets size={22} />, label: "Hydration", color: "var(--accent)" },
];

export default function Insight() {
  return (
    <section className="section" style={{ position: "relative" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "center",
          }}
          className="insight-grid"
        >
          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative" }}
          >
            {/* Central face/wellness diagram */}
            <div
              style={{
                position: "relative",
                width: "clamp(280px, 100%, 400px)",
                aspectRatio: "1",
                marginInline: "auto",
              }}
            >
              {/* Central circle */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--primary), var(--accent))",
                  display: "grid",
                  placeItems: "center",
                  boxShadow:
                    "0 0 60px var(--primary-glow), 0 0 120px var(--primary-glow)",
                }}
              >
                <Eye size={40} color="#fff" />
              </div>

              {/* Orbiting factor cards */}
              {factors.map((factor, i) => {
                const angle = (i * 360) / factors.length - 90;
                const rad = (angle * Math.PI) / 180;
                const radius = 42;
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);

                return (
                  <motion.div
                    key={factor.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                    style={{
                      position: "absolute",
                      top: `${y}%`,
                      left: `${x}%`,
                      transform: "translate(-50%, -50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        border: "2px solid var(--line)",
                        background: "var(--surface)",
                        display: "grid",
                        placeItems: "center",
                        color: factor.color,
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      {factor.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        color: "var(--muted)",
                      }}
                    >
                      {factor.label}
                    </span>
                  </motion.div>
                );
              })}

              {/* Connecting lines (decorative) */}
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
                viewBox="0 0 100 100"
              >
                {factors.map((_, i) => {
                  const angle = (i * 360) / factors.length - 90;
                  const rad = (angle * Math.PI) / 180;
                  const radius = 32;
                  const x = 50 + radius * Math.cos(rad);
                  const y = 50 + radius * Math.sin(rad);
                  return (
                    <motion.line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke="var(--line)"
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    />
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">The Insight</span>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "1.25rem",
              }}
            >
              Your skin is a{" "}
              <span className="gradient-text">mirror of your lifestyle</span>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
              }}
            >
              Changes in sleep, stress, nutrition, and hydration often appear on
              your face <strong style={{ color: "var(--text)" }}>before</strong>{" "}
              you feel them in your body. But no existing beauty app connects
              these dots.
            </p>
            <div
              style={{
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--primary)",
                background: "var(--primary-glow)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  fontWeight: 600,
                }}
              >
                <span style={{ color: "var(--primary)", fontWeight: 800 }}>
                  ✦ Key insight:
                </span>{" "}
                Your face is a health dashboard. GlowAI reads it — and connects
                it to your daily habits to explain <em>why</em> your skin is
                changing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .insight-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
