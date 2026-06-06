"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const categories = [
  { label: "Skin Health", score: 78, color: "var(--primary)" },
  { label: "Sleep", score: 60, color: "var(--sky)" },
  { label: "Hydration", score: 75, color: "var(--accent)" },
  { label: "Nutrition", score: 70, color: "var(--primary)" },
  { label: "Stress", score: 55, color: "var(--rose)" },
  { label: "Activity", score: 80, color: "var(--sky)" },
];

const interpretation = [
  { range: "0 – 40", label: "Poor", color: "var(--rose)" },
  { range: "41 – 60", label: "Needs Improvement", color: "var(--accent)" },
  { range: "61 – 80", label: "Healthy", color: "var(--primary)" },
  { range: "81 – 100", label: "Radiant", color: "var(--primary)" },
];

export default function GlowScore() {
  const totalScore = 69;
  const circumference = 2 * Math.PI * 68;
  const offset = circumference - (totalScore / 100) * circumference;

  return (
    <section id="glow-score" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="eyebrow">
            <Award size={14} />
            Signature Metric
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            The <span className="gradient-text">Glow Score™</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1.05rem",
              maxWidth: "55ch",
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            A single score that measures your overall wellness appearance.
            Like a credit score for your health and beauty combined.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "2rem",
            alignItems: "center",
          }}
          className="score-grid"
        >
          {/* Score ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card"
            style={{
              padding: "2.5rem",
              display: "grid",
              placeItems: "center",
            }}
          >
            <div
              className="score-ring"
              style={{ width: "220px", height: "220px" }}
            >
              <svg viewBox="0 0 160 160">
                <defs>
                  <linearGradient
                    id="glowGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="50%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--primary)" />
                  </linearGradient>
                </defs>
                <circle className="ring-track" cx="80" cy="80" r="68" />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="68"
                  fill="none"
                  stroke="url(#glowGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: offset }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />
              </svg>
              <div className="score-value">
                <strong style={{ fontSize: "3.5rem" }}>{totalScore}</strong>
                <span>/100</span>
              </div>
            </div>

            <div
              style={{
                marginTop: "1.25rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "999px",
                background: "var(--primary-glow)",
                color: "var(--primary)",
                fontWeight: 800,
                fontSize: "0.88rem",
              }}
            >
              Healthy
            </div>
          </motion.div>

          {/* Score breakdown */}
          <div>
            {/* Category bars */}
            <div
              className="glass-card"
              style={{ padding: "1.5rem", marginBottom: "1.25rem" }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  marginBottom: "1.25rem",
                  color: "var(--muted)",
                }}
              >
                Score Contributors
              </h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.3rem",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                      }}
                    >
                      <span>{cat.label}</span>
                      <span style={{ color: cat.color }}>{cat.score}</span>
                    </div>
                    <div className="bar">
                      <motion.span
                        className="bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cat.score}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2 + i * 0.08,
                        }}
                        style={{ background: cat.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interpretation scale */}
            <div
              className="glass-card"
              style={{ padding: "1.25rem" }}
            >
              <h3
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "0.85rem",
                  color: "var(--muted)",
                }}
              >
                Score Interpretation
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "0.5rem",
                }}
              >
                {interpretation.map((level) => (
                  <div
                    key={level.label}
                    style={{
                      textAlign: "center",
                      padding: "0.65rem 0.5rem",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--line)",
                      background: "var(--surface)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {level.range}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        color: level.color,
                      }}
                    >
                      {level.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .score-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
