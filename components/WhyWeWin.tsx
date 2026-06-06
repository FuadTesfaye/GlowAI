"use client";

import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

const others = [
  "Analyze skin only",
  "Recommend generic products",
  "Ignore lifestyle causes",
  "No future predictions",
  "No progress tracking",
];

const glowai = [
  "Connects beauty + wellness",
  "Predicts future skin health",
  "Personalizes based on lifestyle",
  "Shows visible transformation",
  "Root-cause analysis engine",
];

export default function WhyWeWin() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="eyebrow">Competitive Edge</span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            Why <span className="gradient-text">GlowAI wins</span>
          </h2>
        </motion.div>

        <div
          className="grid-2"
          style={{
            gap: "2rem",
            maxWidth: "850px",
            marginInline: "auto",
          }}
        >
          {/* Other apps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                marginBottom: "1.25rem",
              }}
            >
              Most Beauty Apps
            </h3>
            <div style={{ display: "grid", gap: "0.65rem" }}>
              {others.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.7rem 1rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                  }}
                >
                  <X size={16} style={{ color: "var(--rose)", flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* GlowAI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                marginBottom: "1.25rem",
              }}
            >
              GlowAI
            </h3>
            <div style={{ display: "grid", gap: "0.65rem" }}>
              {glowai.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.7rem 1rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--line)",
                    background: "var(--primary-glow)",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                  }}
                >
                  <CheckCircle2
                    size={16}
                    style={{ color: "var(--primary)", flexShrink: 0 }}
                  />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
