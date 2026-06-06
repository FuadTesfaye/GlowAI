"use client";

import { motion } from "framer-motion";
import {
  Moon,
  Droplets,
  Apple,
  Footprints,
  Sun,
  Target,
} from "lucide-react";

const actions = [
  {
    icon: <Moon size={20} />,
    category: "Sleep Goal",
    action: "Sleep before 11 PM",
    detail: "Consistent bedtime improves skin recovery by up to 40%",
    color: "var(--sky)",
    bg: "var(--sky-glow)",
  },
  {
    icon: <Droplets size={20} />,
    category: "Hydration Goal",
    action: "2.5 liters daily",
    detail: "Proper hydration reduces dryness and improves skin elasticity",
    color: "var(--accent)",
    bg: "var(--accent-glow)",
  },
  {
    icon: <Apple size={20} />,
    category: "Nutrition Goal",
    action: "Reduce sugary drinks",
    detail: "High sugar intake linked to increased breakouts and inflammation",
    color: "var(--primary)",
    bg: "var(--primary-glow)",
  },
  {
    icon: <Footprints size={20} />,
    category: "Activity Goal",
    action: "30 minute walk daily",
    detail: "Light exercise improves circulation and skin oxygenation",
    color: "var(--rose)",
    bg: "var(--rose-glow)",
  },
  {
    icon: <Sun size={20} />,
    category: "Skincare Goal",
    action: "Use SPF daily",
    detail: "Sun protection prevents premature aging and pigmentation",
    color: "var(--accent)",
    bg: "var(--accent-glow)",
  },
];

const trendData = [
  { week: "W1", score: 61 },
  { week: "W2", score: 67 },
  { week: "W3", score: 72 },
  { week: "W4", score: 79 },
];

export default function ActionEngine() {
  const maxScore = 100;

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
          <span className="eyebrow">
            <Target size={14} />
            Action & Progress
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            Personalized plans.{" "}
            <span className="gradient-text">Visible progress.</span>
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
            Every recommendation is tied to a specific detected issue. Track
            your Glow Score improvement week by week.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="action-grid"
        >
          {/* Action cards */}
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {actions.map((action, i) => (
              <motion.div
                key={action.category}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                style={{
                  padding: "1.25rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "var(--radius)",
                    background: action.bg,
                    color: action.color,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {action.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      color: action.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {action.category}
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {action.action}
                  </div>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {action.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress tracking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
                Glow Score Trend
              </h3>
              {/* Simple bar chart */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "1rem",
                  height: "180px",
                  padding: "1rem 0.5rem",
                  borderRadius: "var(--radius)",
                  background: "var(--surface-soft)",
                }}
              >
                {trendData.map((item, i) => (
                  <div
                    key={item.week}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "var(--muted)",
                      }}
                    >
                      {item.score}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{
                        height: `${(item.score / maxScore) * 100}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      style={{
                        width: "100%",
                        borderRadius: "var(--radius) var(--radius) 4px 4px",
                        background:
                          "linear-gradient(180deg, var(--primary), var(--sky))",
                        minHeight: "8px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                      }}
                    >
                      {item.week}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div className="glass-card" style={{ padding: "1.25rem" }}>
              <h3
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "0.85rem",
                  color: "var(--muted)",
                }}
              >
                Weekly Improvements
              </h3>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {[
                  { label: "Acne reduction", change: "-23%" },
                  { label: "Brightness increase", change: "+18%" },
                  { label: "Dark circle improvement", change: "+15%" },
                  { label: "Sleep consistency", change: "+2h avg" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--line)",
                      background: "var(--surface)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <span>{item.label}</span>
                    <span
                      style={{
                        color: "var(--primary)",
                        fontWeight: 800,
                      }}
                    >
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .action-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
