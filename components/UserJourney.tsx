"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  ClipboardList,
  ScanFace,
  GitBranch,
} from "lucide-react";

const phases = [
  {
    icon: <UserPlus size={22} />,
    phase: "Phase 1",
    title: "Onboarding",
    desc: "Collect baseline information — age, skin type, concerns, lifestyle profile.",
    details: [
      "Oily / Dry / Combination / Sensitive",
      "Acne, dark circles, wrinkles, dryness",
      "Student, employee, freelancer, athlete",
    ],
    color: "var(--primary)",
    bg: "var(--primary-glow)",
  },
  {
    icon: <ClipboardList size={22} />,
    phase: "Phase 2",
    title: "Wellness Assessment",
    desc: "5 lifestyle modules generate individual scores from 0-100.",
    details: [
      "Sleep, Hydration, Nutrition modules",
      "Stress & Activity tracking",
      "Each generates a wellness score",
    ],
    color: "var(--accent)",
    bg: "var(--accent-glow)",
  },
  {
    icon: <ScanFace size={22} />,
    phase: "Phase 3",
    title: "Selfie Scan",
    desc: "The first WOW moment. Upload a selfie and AI detects 6 skin signals.",
    details: [
      "Acne, dryness, oiliness detection",
      "Dark circles & fatigue measurement",
      "Tone uniformity analysis",
    ],
    color: "var(--sky)",
    bg: "var(--sky-glow)",
  },
  {
    icon: <GitBranch size={22} />,
    phase: "Phase 4",
    title: "Correlation Engine",
    desc: "Where GlowAI becomes special. Connects skin data to lifestyle data.",
    details: [
      "Dark circles + poor sleep → correlation",
      "Acne + high sugar + stress → lifestyle contributors",
      "Dry skin + low water → hydration insight",
    ],
    color: "var(--rose)",
    bg: "var(--rose-glow)",
  },
];

export default function UserJourney() {
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
          <span className="eyebrow">User Journey</span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            From selfie to{" "}
            <span className="gradient-text">wellness intelligence</span>
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
            Four phases transform a simple selfie into a comprehensive
            wellness understanding.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            maxWidth: "900px",
            marginInline: "auto",
            position: "relative",
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "2rem",
              top: "2rem",
              bottom: "2rem",
              width: "2px",
              background:
                "linear-gradient(180deg, var(--primary), var(--accent), var(--sky), var(--rose))",
              opacity: 0.3,
            }}
            className="journey-line"
          />

          {phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass-card"
              style={{
                padding: "1.75rem",
                paddingLeft: "5rem",
                position: "relative",
              }}
            >
              {/* Phase icon */}
              <div
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "1.75rem",
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background: phase.bg,
                  color: phase.color,
                  display: "grid",
                  placeItems: "center",
                  border: "2px solid var(--surface)",
                  zIndex: 2,
                }}
              >
                {phase.icon}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: phase.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {phase.phase}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.15rem",
                  marginBottom: "0.4rem",
                }}
              >
                {phase.title}
              </h3>

              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  fontWeight: 600,
                  marginBottom: "0.85rem",
                }}
              >
                {phase.desc}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {phase.details.map((detail) => (
                  <span
                    key={detail}
                    className="pill"
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                    }}
                  >
                    {detail}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 680px) {
          .journey-line {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
