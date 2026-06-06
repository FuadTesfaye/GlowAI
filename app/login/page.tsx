"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, ArrowRight, Sparkles, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setIsLoading(true);
    
    // Mock successful authentication
    setTimeout(() => {
      setIsLoading(false);
      // Save dummy login state to localStorage
      localStorage.setItem("glowai_user", JSON.stringify({ email, name: email.split("@")[0] }));
      router.push("/dashboard");
    }, 1200);
  };

  const autofillDemo = (type: "user" | "hakim") => {
    setError("");
    if (type === "user") {
      setEmail("fuad@glowai.com");
      setPassword("wellness2026");
    } else {
      setEmail("hakim@glowai.com");
      setPassword("dermatology_expert");
    }
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    if (password.length < 5) return 30;
    if (password.length < 8) return 60;
    return 100;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 30) return "var(--rose)";
    if (strength <= 60) return "var(--accent)";
    return "var(--primary)";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primary-glow), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Back Link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--muted)",
            fontSize: "0.88rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>

        {/* Form Card */}
        <div
          className="glass-card"
          style={{
            padding: "2rem 1.75rem",
            boxShadow: "var(--shadow)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span
              style={{
                display: "inline-grid",
                placeItems: "center",
                width: "2.75rem",
                height: "2.75rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--primary)",
                fontWeight: 900,
                fontSize: "1.25rem",
                boxShadow: "0 4px 16px var(--primary-glow)",
                marginBottom: "1rem",
              }}
            >
              G
            </span>
            <h1 style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>
              Welcome back
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", fontWeight: 600 }}>
              Enter your details to access your Wellness Mirror
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius)",
                background: "var(--rose-glow)",
                border: "1px solid var(--rose)",
                color: "var(--rose)",
                fontSize: "0.82rem",
                fontWeight: 700,
                marginBottom: "1.25rem",
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "grid", gap: "1.25rem" }}>
            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "var(--muted)",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                  }}
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    height: "3rem",
                    padding: "0 1rem 0 2.75rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    color: "var(--text)",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                  }}
                >
                  Password
                </label>
                <Link
                  href="#"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                  }}
                >
                  Forgot?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    height: "3rem",
                    padding: "0 2.75rem 0 2.75rem",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    color: "var(--text)",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength meter */}
              {password && (
                <div style={{ marginTop: "0.5rem" }}>
                  <div className="bar" style={{ height: "4px" }}>
                    <div
                      className="bar-fill"
                      style={{
                        width: `${getPasswordStrength()}%`,
                        background: getStrengthColor(),
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: getStrengthColor(),
                      display: "block",
                      marginTop: "0.25rem",
                    }}
                  >
                    {getPasswordStrength() <= 30
                      ? "Weak"
                      : getPasswordStrength() <= 60
                      ? "Medium"
                      : "Strong password"}
                  </span>
                </div>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{
                width: "100%",
                height: "3.25rem",
                marginTop: "0.5rem",
                position: "relative",
              }}
            >
              {isLoading ? (
                <span
                  style={{
                    display: "inline-block",
                    width: "1.25rem",
                    height: "1.25rem",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Autofills */}
          <div
            style={{
              marginTop: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid var(--line)",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "var(--muted)",
                textAlign: "center",
                marginBottom: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              Quick Demo Login
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => autofillDemo("user")}
                className="btn btn-secondary"
                style={{
                  minHeight: "2.5rem",
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                }}
              >
                <Sparkles size={12} style={{ color: "var(--accent)" }} />
                Demo User
              </button>
              <button
                type="button"
                onClick={() => autofillDemo("hakim")}
                className="btn btn-secondary"
                style={{
                  minHeight: "2.5rem",
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                }}
              >
                <Sparkles size={12} style={{ color: "var(--primary)" }} />
                Dr. Hakim AI
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.85rem",
            color: "var(--muted)",
            fontWeight: 700,
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            style={{
              color: "var(--primary)",
              fontWeight: 800,
            }}
          >
            Sign up
          </Link>
        </p>
      </motion.div>

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
