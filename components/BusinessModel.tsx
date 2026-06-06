"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Crown, Building2 } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "Free",
    subtitle: "Get started",
    icon: <CheckCircle2 size={20} />,
    color: "var(--muted)",
    features: [
      "Limited scans per month",
      "Basic skin analysis",
      "Basic Glow Score",
      "Daily wellness check-in",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    subtitle: "per month",
    icon: <Crown size={20} />,
    color: "var(--primary)",
    features: [
      "Unlimited scans",
      "Hakim AI coach",
      "Future Glow Forecast",
      "Progress analytics",
      "Advanced insights",
      "Personalized action plans",
    ],
    cta: "Go Premium",
    highlight: true,
  },
  {
    name: "B2B",
    price: "Custom",
    subtitle: "enterprise pricing",
    icon: <Building2 size={20} />,
    color: "var(--accent)",
    features: [
      "Dermatologists & clinics",
      "Fitness centers",
      "Corporate wellness",
      "White-label options",
      "Bulk analytics",
      "API access",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function BusinessModel() {
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
          <span className="eyebrow">Business Model</span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              marginBottom: "1rem",
            }}
          >
            Built to{" "}
            <span className="gradient-text">scale</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1.05rem",
              maxWidth: "50ch",
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            Three revenue streams. Consumer subscription, premium features,
            and enterprise partnerships.
          </p>
        </motion.div>

        <div
          className="grid-3"
          style={{
            gap: "1.5rem",
            maxWidth: "1000px",
            marginInline: "auto",
            alignItems: "stretch",
          }}
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...(tier.highlight
                  ? {
                      border: "1px solid var(--primary)",
                      boxShadow:
                        "0 0 40px var(--primary-glow), var(--shadow)",
                    }
                  : {}),
              }}
            >
              {tier.highlight && (
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
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "var(--radius)",
                    background: `color-mix(in srgb, ${tier.color} 15%, transparent)`,
                    color: tier.color,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {tier.icon}
                </div>
                <h3 style={{ fontSize: "1.1rem" }}>{tier.name}</h3>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: tier.color,
                  }}
                >
                  {tier.price}
                </span>
                <span
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginLeft: "0.35rem",
                  }}
                >
                  {tier.subtitle}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "0.55rem",
                  flex: 1,
                }}
              >
                {tier.features.map((feature) => (
                  <div
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2
                      size={14}
                      style={{
                        color: tier.highlight
                          ? "var(--primary)"
                          : "var(--muted)",
                        flexShrink: 0,
                      }}
                    />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                className={`btn ${tier.highlight ? "btn-primary" : "btn-secondary"}`}
                style={{ marginTop: "1.5rem", width: "100%" }}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
