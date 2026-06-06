"use client";

import { motion } from "framer-motion";
import { Bot, MessageSquare, Lightbulb, Heart } from "lucide-react";

const chatMessages = [
  {
    role: "user" as const,
    text: "Why am I getting acne on my jawline?",
  },
  {
    role: "ai" as const,
    text: "Your acne appears concentrated around the jawline. Combined with elevated stress levels (8/10) and frequent sugary drink consumption, these factors may be contributing to flare-ups. I recommend focusing on stress management and reducing sugar intake for 2 weeks.",
  },
  {
    role: "user" as const,
    text: "How can I improve my Glow Score?",
  },
  {
    role: "ai" as const,
    text: "Your lowest contributor is sleep (45/100). Improving sleep consistency to 7+ hours could boost your Glow Score by ~12 points. I've created a personalized sleep plan with hydration and nutrition adjustments.",
  },
];

const capabilities = [
  {
    icon: <Heart size={18} />,
    label: "Wellness Coach",
    desc: "Personalized lifestyle guidance",
  },
  {
    icon: <MessageSquare size={18} />,
    label: "Skin Coach",
    desc: "Root-cause skin explanations",
  },
  {
    icon: <Lightbulb size={18} />,
    label: "Habit Coach",
    desc: "Daily actionable improvements",
  },
  {
    icon: <Bot size={18} />,
    label: "AI Companion",
    desc: "Always available intelligence",
  },
];

export default function HakimAI() {
  return (
    <section id="hakim-ai" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="eyebrow">
            <Bot size={14} />
            Core Intelligence
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            Meet <span className="gradient-text">Hakim AI</span>
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
            The brain of GlowAI. Think ChatGPT + Dermatologist + Wellness
            Coach. Hakim uses your complete profile to generate truly
            personalized explanations.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="hakim-grid"
        >
          {/* Chat preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{ padding: "1.5rem", overflow: "hidden" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--primary), var(--accent))",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                }}
              >
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                  Hakim AI
                </div>
                <div
                  style={{
                    color: "var(--primary)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  ● Online
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gap: "0.85rem",
                maxHeight: "420px",
                overflow: "hidden",
              }}
            >
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  style={{
                    maxWidth: "90%",
                    padding: "0.85rem 1rem",
                    borderRadius: "var(--radius)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    fontWeight: 600,
                    ...(msg.role === "user"
                      ? {
                          justifySelf: "end",
                          background: "var(--primary)",
                          color: "#fff",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          background: "var(--surface-soft)",
                          border: "1px solid var(--line)",
                          borderBottomLeftRadius: "4px",
                        }),
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--muted)",
                fontSize: "0.85rem",
              }}
            >
              Ask Hakim anything about your skin or wellness...
            </div>
          </motion.div>

          {/* Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: "grid", gap: "1rem" }}>
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card"
                  style={{
                    padding: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      borderRadius: "var(--radius)",
                      background: "var(--primary-glow)",
                      color: "var(--primary)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    {cap.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {cap.label}
                    </div>
                    <div
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                      }}
                    >
                      {cap.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key difference */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1.25rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--line)",
                background: "var(--surface-soft)",
              }}
            >
              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  fontWeight: 600,
                  margin: 0,
                  color: "var(--muted)",
                }}
              >
                <strong style={{ color: "var(--text)" }}>
                  Instead of:
                </strong>{" "}
                &quot;Acne is caused by bacteria.&quot;
              </p>
              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  fontWeight: 600,
                  margin: 0,
                  marginTop: "0.5rem",
                  color: "var(--primary)",
                }}
              >
                <strong>Hakim says:</strong> &quot;Your acne appears
                concentrated around the jawline. Combined with elevated stress
                and frequent sugary drinks, these may be contributing to
                flare-ups.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .hakim-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
