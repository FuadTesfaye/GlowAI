"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Frown, ShieldOff } from "lucide-react";

const stats = [
  {
    icon: <AlertTriangle size={20} />,
    value: "1 in 10",
    label: "People globally affected by acne",
    color: "var(--rose)",
    bg: "var(--rose-glow)",
  },
  {
    icon: <TrendingDown size={20} />,
    value: "66%+",
    label: "Increase in adult acne cases over 30 years",
    color: "var(--accent)",
    bg: "var(--accent-glow)",
  },
  {
    icon: <Frown size={20} />,
    value: "63%",
    label: "Higher risk of depression with skin issues",
    color: "var(--sky)",
    bg: "var(--sky-glow)",
  },
  {
    icon: <ShieldOff size={20} />,
    value: "49.4M",
    label: "Adults living with acne in 2021",
    color: "var(--primary)",
    bg: "var(--primary-glow)",
  },
];

const ignored = [
  "Sleep quality",
  "Stress levels",
  "Nutrition patterns",
  "Hydration habits",
  "Lifestyle factors",
];

export default function Problem() {
  return (
    <section id="problem" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="eyebrow">The Problem</span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
              maxWidth: "20ch",
              marginInline: "auto",
            }}
          >
            Skin problems are{" "}
            <span style={{ color: "var(--rose)" }}>not just skin-deep</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1.1rem",
              maxWidth: "60ch",
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            Most beauty apps only treat symptoms, not causes. They recommend
            products but ignore the lifestyle factors silently damaging your
            skin every day.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid-4" style={{ marginBottom: "4rem" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card"
              style={{ padding: "1.5rem", textAlign: "center" }}
            >
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "var(--radius)",
                  background: stat.bg,
                  color: stat.color,
                  marginInline: "auto",
                  marginBottom: "1rem",
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  marginBottom: "0.3rem",
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two-column layout: what apps do vs what they miss */}
        <div className="grid-2" style={{ gap: "2rem" }}>
          {/* What current apps do */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{ padding: "2rem" }}
          >
            <h3
              style={{
                fontSize: "1.15rem",
                marginBottom: "1.25rem",
                color: "var(--rose)",
              }}
            >
              What beauty apps do today
            </h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              {[
                "Detect acne on your face",
                "Say: 'Buy this cleanser'",
                "Recommend generic products",
                "Symptoms treated, causes ignored",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius)",
                    background: "var(--rose-glow)",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "var(--rose)", fontWeight: 800 }}>
                    ✕
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--line)",
                background: "var(--surface-soft)",
              }}
            >
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                <strong style={{ color: "var(--text)" }}>The result:</strong>{" "}
                Acne returns. Skin fatigue returns. Dark circles return.
                Temporary fixes, not real health.
              </p>
            </div>
          </motion.div>

          {/* What apps ignore */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{ padding: "2rem" }}
          >
            <h3
              style={{
                fontSize: "1.15rem",
                marginBottom: "1.25rem",
                color: "var(--accent)",
              }}
            >
              What they never ask
            </h3>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {ignored.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.85rem 1rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: "0.5rem",
                      height: "0.5rem",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </motion.div>
              ))}
            </div>

            <div
              style={{
                marginTop: "1.25rem",
                padding: "1rem",
                borderRadius: "var(--radius)",
                border: "1px dashed var(--accent)",
                background: "var(--accent-glow)",
              }}
            >
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                People with skin issues spend money without understanding{" "}
                <strong style={{ color: "var(--text)" }}>root causes</strong>.
                Beauty today is reactive, not predictive.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
