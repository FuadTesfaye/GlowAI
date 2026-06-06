"use client";

import { motion } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";

const traditionalFlow = [
  { label: "Selfie", icon: "📷" },
  { label: "Skin Detection", icon: "🔍" },
  { label: "Product Recommendation", icon: "🛒" },
];

const glowAIFlow = [
  { label: "Selfie", icon: "📷" },
  { label: "Skin Detection", icon: "🔬" },
  { label: "Lifestyle Analysis", icon: "🧠" },
  { label: "Root Cause Discovery", icon: "🎯" },
  { label: "Prediction", icon: "🔮" },
  { label: "Personalized Plan", icon: "📋" },
  { label: "Improved Health", icon: "💚" },
  { label: "Improved Appearance", icon: "✨" },
];

export default function Solution() {
  return (
    <section id="solution" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="eyebrow">
            <Zap size={14} />
            The Solution
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
              maxWidth: "22ch",
              marginInline: "auto",
            }}
          >
            GlowAI doesn&apos;t just analyze skin.{" "}
            <span className="gradient-text">
              It analyzes your entire wellness.
            </span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1.05rem",
              maxWidth: "58ch",
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            The difference between a beauty app and a wellness intelligence
            platform is the entire business.
          </p>
        </motion.div>

        {/* Comparison */}
        <div
          className="grid-2"
          style={{ gap: "2rem", maxWidth: "900px", marginInline: "auto" }}
        >
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{ padding: "2rem", position: "relative", overflow: "hidden" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "var(--rose)",
                opacity: 0.6,
              }}
            />
            <h3
              style={{
                fontSize: "1rem",
                color: "var(--rose)",
                marginBottom: "1.5rem",
                fontWeight: 800,
              }}
            >
              Traditional Beauty Apps
            </h3>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {traditionalFlow.map((step, i) => (
                <div key={step.label}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.85rem 1rem",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--line)",
                      background: "var(--surface)",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{step.icon}</span>
                    {step.label}
                  </div>
                  {i < traditionalFlow.length - 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "0.25rem 0",
                        color: "var(--muted)",
                        opacity: 0.5,
                      }}
                    >
                      <ArrowDown size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                borderRadius: "var(--radius)",
                background: "var(--rose-glow)",
                textAlign: "center",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "var(--rose)",
              }}
            >
              3 steps. Symptoms only.
            </div>
          </motion.div>

          {/* GlowAI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card"
            style={{ padding: "2rem", position: "relative", overflow: "hidden" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background:
                  "linear-gradient(90deg, var(--primary), var(--accent))",
              }}
            />
            <h3
              style={{
                fontSize: "1rem",
                color: "var(--primary)",
                marginBottom: "1.5rem",
                fontWeight: 800,
              }}
            >
              GlowAI Approach
            </h3>
            <div style={{ display: "grid", gap: "0.35rem" }}>
              {glowAIFlow.map((step, i) => (
                <div key={step.label}>
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.6rem 1rem",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--line)",
                      background: "var(--surface)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>{step.icon}</span>
                    {step.label}
                  </motion.div>
                  {i < glowAIFlow.length - 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "0.15rem 0",
                        color: "var(--primary)",
                        opacity: 0.4,
                      }}
                    >
                      <ArrowDown size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                borderRadius: "var(--radius)",
                background: "var(--primary-glow)",
                textAlign: "center",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              8 steps. Root cause → real improvement.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
