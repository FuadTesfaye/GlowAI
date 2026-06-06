"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Sparkles, AlertTriangle } from "lucide-react";

export default function FutureGlow() {
  return (
    <section className="section" style={{ position: "relative" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="eyebrow">
            <Sparkles size={14} />
            WOW Feature
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            Future Glow{" "}
            <span className="gradient-text">Forecast</span>
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
            See your future face before it happens. AI predicts two timelines —
            your current path vs. your improved path.
          </p>
        </motion.div>

        <div
          className="grid-2"
          style={{
            gap: "2rem",
            maxWidth: "950px",
            marginInline: "auto",
          }}
        >
          {/* Scenario A - Current Path */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{
              padding: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "var(--rose)",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background: "var(--rose-glow)",
                  color: "var(--rose)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <TrendingDown size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.05rem" }}>Scenario A</h3>
                <p
                  style={{
                    color: "var(--rose)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  Continue current habits
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: "var(--radius)",
                background: "var(--surface-soft)",
                marginBottom: "1.25rem",
              }}
            >
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  margin: 0,
                  marginBottom: "0.5rem",
                }}
              >
                Current habits:
              </p>
              <div style={{ display: "grid", gap: "0.35rem" }}>
                {["Sleep = 5 hours", "Water = 1 liter", "Stress = High"].map(
                  (item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      <AlertTriangle
                        size={12}
                        style={{ color: "var(--rose)" }}
                      />
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                }}
              >
                30-day prediction:
              </p>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {[
                  "More fatigue & tired skin",
                  "Increased dark circles",
                  "Higher acne risk",
                  "Declining Glow Score",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius)",
                      background: "var(--rose-glow)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ color: "var(--rose)" }}>↓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Score prediction */}
            <div
              style={{
                marginTop: "1.25rem",
                textAlign: "center",
                padding: "1rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--rose)",
                background: "var(--rose-glow)",
              }}
            >
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                }}
              >
                Predicted Glow Score
              </span>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "var(--rose)",
                  lineHeight: 1,
                  marginTop: "0.25rem",
                }}
              >
                48
              </div>
            </div>
          </motion.div>

          {/* Scenario B - Improved Path */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card"
            style={{
              padding: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background: "var(--primary-glow)",
                  color: "var(--primary)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <TrendingUp size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.05rem" }}>Scenario B</h3>
                <p
                  style={{
                    color: "var(--primary)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  Follow GlowAI recommendations
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: "var(--radius)",
                background: "var(--surface-soft)",
                marginBottom: "1.25rem",
              }}
            >
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  margin: 0,
                  marginBottom: "0.5rem",
                }}
              >
                Improved habits:
              </p>
              <div style={{ display: "grid", gap: "0.35rem" }}>
                {[
                  "Sleep = 7.5 hours",
                  "Water = 2.5 liters",
                  "Stress = Managed",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <Sparkles
                      size={12}
                      style={{ color: "var(--primary)" }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                }}
              >
                30-day prediction:
              </p>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {[
                  "Reduced inflammation",
                  "Improved brightness & glow",
                  "Better skin recovery",
                  "Rising Glow Score",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.6rem 0.85rem",
                      borderRadius: "var(--radius)",
                      background: "var(--primary-glow)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ color: "var(--primary)" }}>↑</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Score prediction */}
            <div
              style={{
                marginTop: "1.25rem",
                textAlign: "center",
                padding: "1rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--primary)",
                background: "var(--primary-glow)",
              }}
            >
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                }}
              >
                Predicted Glow Score
              </span>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "var(--primary)",
                  lineHeight: 1,
                  marginTop: "0.25rem",
                }}
              >
                87
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "var(--muted)",
            fontSize: "1rem",
            fontWeight: 700,
            fontStyle: "italic",
          }}
        >
          &quot;See your future face before it happens.&quot;
        </motion.p>
      </div>
    </section>
  );
}
