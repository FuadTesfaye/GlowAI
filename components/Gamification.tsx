"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Star, Zap, Target, Medal } from "lucide-react";

const achievements = [
  { icon: <Star size={20} />, label: "First Scan", desc: "Glow Beginner", color: "var(--accent)" },
  { icon: <Flame size={20} />, label: "7 Day Streak", desc: "Consistency Badge", color: "var(--rose)" },
  { icon: <Zap size={20} />, label: "30 Day Streak", desc: "Glow Warrior", color: "var(--primary)" },
  { icon: <Medal size={20} />, label: "100 Glow Score", desc: "Radiance Master", color: "var(--accent)" },
];

const challenges = [
  { name: "Hydration Challenge", duration: "7 Days", icon: "💧", color: "var(--sky)" },
  { name: "Better Sleep Challenge", duration: "14 Days", icon: "🌙", color: "var(--primary)" },
  { name: "No Sugar Challenge", duration: "30 Days", icon: "🍎", color: "var(--rose)" },
];

const streaks = [
  { label: "Water Logging", streak: "12 days", icon: <Target size={16} /> },
  { label: "Sleep Tracking", streak: "8 days", icon: <Target size={16} /> },
  { label: "Daily Check-in", streak: "15 days", icon: <Target size={16} /> },
];

export default function Gamification() {
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
            <Trophy size={14} />
            Engagement
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            Gamification &{" "}
            <span className="gradient-text">Social</span>
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
            Daily check-ins, streaks, achievements, and challenges keep users
            engaged and returning every day.
          </p>
        </motion.div>

        <div className="grid-3" style={{ gap: "1.5rem" }}>
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: "1.5rem" }}
          >
            <h3
              style={{
                fontSize: "1rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Trophy size={16} style={{ color: "var(--accent)" }} />
              Achievements
            </h3>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {achievements.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "0.75rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "50%",
                      background: `color-mix(in srgb, ${badge.color} 15%, transparent)`,
                      color: badge.color,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    {badge.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.88rem" }}>
                      {badge.label}
                    </div>
                    <div
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {badge.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card"
            style={{ padding: "1.5rem" }}
          >
            <h3
              style={{
                fontSize: "1rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Flame size={16} style={{ color: "var(--rose)" }} />
              Challenges
            </h3>
            <div style={{ display: "grid", gap: "0.85rem" }}>
              {challenges.map((challenge) => (
                <div
                  key={challenge.name}
                  style={{
                    padding: "1rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {challenge.icon}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem" }}>
                    {challenge.name}
                  </div>
                  <span
                    className="pill"
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.72rem",
                      color: challenge.color,
                    }}
                  >
                    {challenge.duration}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Streaks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card"
            style={{ padding: "1.5rem" }}
          >
            <h3
              style={{
                fontSize: "1rem",
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Zap size={16} style={{ color: "var(--primary)" }} />
              Active Streaks
            </h3>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {streaks.map((streak) => (
                <div
                  key={streak.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                    }}
                  >
                    <span style={{ color: "var(--primary)" }}>
                      {streak.icon}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                      {streak.label}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "var(--primary)",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    🔥 {streak.streak}
                  </span>
                </div>
              ))}
            </div>

            {/* Social hint */}
            <div
              style={{
                marginTop: "1.25rem",
                padding: "1rem",
                borderRadius: "var(--radius)",
                border: "1px dashed var(--line)",
                background: "var(--surface-soft)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ color: "var(--text)" }}>Coming soon:</strong>{" "}
                Compare Glow Scores with friends, join group challenges, and
                build wellness streaks together.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
