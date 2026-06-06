"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Glow Score", href: "#glow-score" },
  { label: "Hakim AI", href: "#hakim-ai" },
  { label: "Roadmap", href: "#roadmap" },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("glowai-theme");
    if (saved) {
      const dark = saved === "dark";
      setIsDark(dark);
      document.documentElement.dataset.theme = dark ? "dark" : "light";
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("glowai-theme", next ? "dark" : "light");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0.75rem 0",
        transition: "all 0.3s ease",
        ...(scrolled
          ? {
              background:
                "color-mix(in srgb, var(--bg) 80%, transparent)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--line)",
            }
          : {}),
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Brand */}
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            fontWeight: 800,
            fontSize: "1.1rem",
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

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.3rem",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            background:
              "color-mix(in srgb, var(--surface) 80%, transparent)",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: "0.55rem 0.85rem",
                borderRadius: "var(--radius)",
                color: "var(--muted)",
                fontSize: "0.88rem",
                fontWeight: 700,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background =
                  "var(--surface-soft)";
                (e.target as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = "var(--muted)";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              display: "grid",
              placeItems: "center",
              width: "2.5rem",
              height: "2.5rem",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              background: "var(--surface)",
              transition: "all 0.2s ease",
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-mobile-toggle"
            aria-label="Toggle menu"
            style={{
              display: "none",
              placeItems: "center",
              width: "2.5rem",
              height: "2.5rem",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              background: "var(--surface)",
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-mobile-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: "0.5rem",
            right: "0.5rem",
            padding: "0.75rem",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-lg)",
            background:
              "color-mix(in srgb, var(--surface) 95%, transparent)",
            backdropFilter: "blur(20px)",
            display: "grid",
            gap: "0.25rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius)",
                color: "var(--muted)",
                fontSize: "0.92rem",
                fontWeight: 700,
              }}
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      )}

      <style jsx global>{`
        @media (max-width: 860px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: grid !important;
          }
        }
      `}</style>
    </motion.header>
  );
}
