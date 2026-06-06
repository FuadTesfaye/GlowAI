"use client";

import { motion } from "framer-motion";
import {
  ScanFace,
  Gauge,
  Moon,
  Droplets,
  Brain,
  Apple,
  Activity,
  Search,
  CircleDot,
  Sun as SunIcon,
  Eye,
  Palette,
} from "lucide-react";

const skinSignals = [
  {
    icon: <CircleDot size={20} />,
    label: "Acne",
    desc: "Severity, distribution, type",
    color: "var(--rose)",
    bg: "var(--rose-glow)",
  },
  {
    icon: <Eye size={20} />,
    label: "Dark Circles",
    desc: "Darkness, coverage area",
    color: "var(--sky)",
    bg: "var(--sky-glow)",
  },
  {
    icon: <SunIcon size={20} />,
    label: "Dryness",
    desc: "Texture quality, dullness",
    color: "var(--accent)",
    bg: "var(--accent-glow)",
  },
  {
    icon: <Droplets size={20} />,
    label: "Oiliness",
    desc: "Shine, pore visibility",
    color: "var(--primary)",
    bg: "var(--primary-glow)",
  },
  {
    icon: <Activity size={20} />,
    label: "Skin Fatigue",
    desc: "Tired appearance, eye strain",
    color: "var(--rose)",
    bg: "var(--rose-glow)",
  },
  {
    icon: <Palette size={20} />,
    label: "Tone Uniformity",
    desc: "Pigmentation, redness",
    color: "var(--sky)",
    bg: "var(--sky-glow)",
  },
];

const wellnessModules = [
  {
    icon: <Moon size={20} />,
    label: "Sleep",
    metrics: "Duration, quality, consistency",
    score: "Sleep Score 0-100",
    color: "var(--sky)",
  },
  {
    icon: <Droplets size={20} />,
    label: "Hydration",
    metrics: "Water, coffee, soda intake",
    score: "Hydration Score 0-100",
    color: "var(--accent)",
  },
  {
    icon: <Apple size={20} />,
    label: "Nutrition",
    metrics: "Fruits, veggies, sugar, fast food",
    score: "Nutrition Score 0-100",
    color: "var(--primary)",
  },
  {
    icon: <Brain size={20} />,
    label: "Stress",
    metrics: "Workload, anxiety, mood",
    score: "Stress Score 0-100",
    color: "var(--rose)",
  },
  {
    icon: <Activity size={20} />,
    label: "Activity",
    metrics: "Exercise, movement, sedentary hours",
    score: "Activity Score 0-100",
    color: "var(--sky)",
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="eyebrow">
            <ScanFace size={14} />
            Core Features
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            Two powerful engines.{" "}
            <span className="gradient-text">One complete picture.</span>
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
            GlowAI combines AI skin analysis with lifestyle wellness assessment
            to understand what&apos;s really happening with your skin.
          </p>
        </motion.div>

        {/* Feature 1: AI Skin Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3rem" }}
        >
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
                borderRadius: "var(--radius)",
                background: "var(--primary-glow)",
                display: "grid",
                placeItems: "center",
                color: "var(--primary)",
              }}
            >
              <Search size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.15rem" }}>
                AI Skin Analysis
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                Upload a selfie. AI detects 6 skin signals instantly.
              </p>
            </div>
          </div>

          <div className="grid-3">
            {skinSignals.map((signal, i) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                style={{ padding: "1.25rem" }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "var(--radius)",
                    background: signal.bg,
                    color: signal.color,
                    display: "grid",
                    placeItems: "center",
                    marginBottom: "0.85rem",
                  }}
                >
                  {signal.icon}
                </div>
                <h4
                  style={{
                    fontSize: "1rem",
                    marginBottom: "0.3rem",
                  }}
                >
                  {signal.label}
                </h4>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {signal.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature 2: Wellness Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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
                borderRadius: "var(--radius)",
                background: "var(--accent-glow)",
                display: "grid",
                placeItems: "center",
                color: "var(--accent)",
              }}
            >
              <Gauge size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.15rem" }}>
                Wellness Assessment
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                5 lifestyle modules. Each generates a score from 0-100.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "1rem",
            }}
            className="wellness-modules-grid"
          >
            {wellnessModules.map((mod, i) => (
              <motion.div
                key={mod.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                style={{
                  padding: "1.25rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    border: "2px solid var(--line)",
                    display: "grid",
                    placeItems: "center",
                    color: mod.color,
                    marginInline: "auto",
                    marginBottom: "0.85rem",
                  }}
                >
                  {mod.icon}
                </div>
                <h4
                  style={{
                    fontSize: "0.95rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  {mod.label}
                </h4>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    margin: 0,
                    marginBottom: "0.5rem",
                  }}
                >
                  {mod.metrics}
                </p>
                <span className="pill pill-primary" style={{ fontSize: "0.72rem" }}>
                  {mod.score}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Correlation Engine callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: "3rem",
            padding: "2rem",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--primary)",
            background: "var(--primary-glow)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.15rem",
              marginBottom: "0.75rem",
              color: "var(--primary)",
            }}
          >
            ✦ The Breakthrough: Wellness Mirror AI
          </h3>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              maxWidth: "65ch",
              marginInline: "auto",
              margin: 0,
            }}
          >
            GlowAI doesn&apos;t just detect skin issues — it identifies
            what&apos;s <strong style={{ color: "var(--text)" }}>really</strong>{" "}
            affecting your skin: stress overload, sleep deprivation, poor diet,
            dehydration. It explains{" "}
            <strong style={{ color: "var(--text)" }}>why</strong> your skin is
            changing, not just what is changing.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .wellness-modules-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 680px) {
          .wellness-modules-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
