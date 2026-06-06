"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { label: "The Problem", href: "#problem" },
    { label: "The Solution", href: "#solution" },
    { label: "Core Features", href: "#features" },
    { label: "Glow Score™", href: "#glow-score" },
  ];

  const intelligenceLinks = [
    { label: "Hakim AI Coach", href: "#hakim-ai" },
    { label: "Future Forecast", href: "#features" },
    { label: "Action Engine", href: "#features" },
    { label: "Streaks & Rewards", href: "#features" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  const socialLinks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "#",
      label: "Twitter",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      href: "#",
      label: "Instagram",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      href: "#",
      label: "GitHub",
    },
  ];


  return (
    <footer
      style={{
        position: "relative",
        borderTop: "1px solid var(--line)",
        background: "color-mix(in srgb, var(--surface) 50%, transparent)",
        backdropFilter: "blur(20px)",
        padding: "5rem 0 3rem 0",
        overflow: "hidden",
      }}
    >
      {/* Decorative background glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primary-glow), transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr 0.8fr 0.8fr",
            gap: "2.5rem",
            marginBottom: "4rem",
          }}
          className="footer-grid"
        >
          {/* Brand Col */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <a
              href="#top"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                fontWeight: 800,
                fontSize: "1.25rem",
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  color: "var(--primary)",
                  fontWeight: 900,
                  fontSize: "1.15rem",
                  boxShadow: "0 4px 16px var(--primary-glow)",
                }}
              >
                G
              </span>
              <span>GlowAI</span>
            </a>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                maxWidth: "30ch",
              }}
            >
              See beyond your skin. Discover your wellness. The world's first AI-powered wellness intelligence mirror.
            </p>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    color: "var(--muted)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted)";
                    e.currentTarget.style.borderColor = "var(--line)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "var(--text)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
              }}
            >
              Platform
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {platformLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    fontWeight: 600,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links 2 */}
          <div>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "var(--text)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
              }}
            >
              Wellness Intelligence
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {intelligenceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    fontWeight: 600,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links 3 */}
          <div>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "var(--text)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
              }}
            >
              Company
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {companyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    fontWeight: 600,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: "2rem" }} />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.82rem",
            color: "var(--muted)",
            fontWeight: 600,
          }}
          className="footer-bottom"
        >
          <div>
            © {currentYear} GlowAI Inc. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            Made with <Heart size={12} style={{ color: "var(--rose)", fill: "var(--rose)" }} /> for healthier skin.
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 860px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
