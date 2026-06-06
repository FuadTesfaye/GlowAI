"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Droplets, Moon, Activity, AlertCircle, Smile } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 state: Skin Concerns (multiple choices)
  const [concerns, setConcerns] = useState<string[]>([]);
  
  // Step 3 state: Daily wellness targets
  const [waterTarget, setWaterTarget] = useState(8); // cups
  const [sleepTarget, setSleepTarget] = useState(8); // hours

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const skinConcernsList = [
    { id: "acne", label: "Acne & Blemishes", desc: "Breakouts, clogged pores, or jawline acne", icon: "🔴" },
    { id: "dryness", label: "Dryness & Dehydration", desc: "Flakiness, tight skin, or dull appearance", icon: "💧" },
    { id: "aging", label: "Fine Lines & Wrinkles", desc: "First signs of aging or lack of elasticity", icon: "✨" },
    { id: "dark_circles", label: "Dark Circles & Fatigue", desc: "Puffy eyes, stress signs, sleep deprivation", icon: "👁️" },
    { id: "pigment", label: "Uneven Tone & Spots", desc: "Hyperpigmentation or redness", icon: "🎨" },
  ];

  const handleToggleConcern = (id: string) => {
    if (concerns.includes(id)) {
      setConcerns(concerns.filter((c) => c !== id));
    } else {
      setConcerns([...concerns, id]);
    }
  };

  const handleNextStep = () => {
    setError("");
    if (step === 1) {
      if (!name || !email || !password) {
        setError("Please fill out all fields.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (concerns.length === 0) {
        setError("Please select at least one skin goal/concern.");
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleCompleteSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Save full profile and target goals to localStorage
      const userProfile = {
        name,
        email,
        concerns,
        waterTarget,
        sleepTarget,
        glowScore: 65 + Math.min(concerns.length * 4, 15), // Mock starter score based on inputs
      };
      localStorage.setItem("glowai_user", JSON.stringify(userProfile));
      router.push("/dashboard");
    }, 1500);
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
      {/* Background Glows */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primary-glow), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--sky-glow), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: "480px",
        }}
      >
        {/* Back navigation */}
        <button
          onClick={step > 1 ? handlePrevStep : () => router.push("/login")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--muted)",
            fontSize: "0.88rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={16} />
          {step > 1 ? `Back to step ${step - 1}` : "Back to Sign In"}
        </button>

        {/* Form Card */}
        <div
          className="glass-card"
          style={{
            padding: "2.5rem 2rem",
            boxShadow: "var(--shadow)",
            position: "relative",
          }}
        >
          {/* Onboarding steps indicator */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              background: "var(--surface-soft)",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              border: "1px solid var(--line)",
            }}
          >
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    background: step === s ? "var(--primary)" : step > s ? "var(--primary-strong)" : "var(--surface-strong)",
                    color: step >= s ? "#fff" : "var(--muted)",
                  }}
                >
                  {step > s ? <Check size={10} /> : s}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: step === s ? "var(--text)" : "var(--muted)",
                  }}
                >
                  {s === 1 ? "Account" : s === 2 ? "Concerns" : "Targets"}
                </span>
              </div>
            ))}
          </div>

          {error && (
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius)",
                background: "var(--rose-glow)",
                border: "1px solid var(--rose)",
                color: "var(--rose)",
                fontSize: "0.82rem",
                fontWeight: 700,
                marginBottom: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          {/* Steps Animations */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: "1.75rem" }}>
                  <h2 style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>
                    Create your account
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem", fontWeight: 600 }}>
                    Start your journey with the world&apos;s first wellness mirror
                  </p>
                </div>

                <div style={{ display: "grid", gap: "1.25rem" }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 800, color: "var(--muted)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Fuad Tesfaye"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: "100%",
                        height: "3rem",
                        padding: "0 1rem",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--line)",
                        background: "var(--surface)",
                        color: "var(--text)",
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 800, color: "var(--muted)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: "100%",
                        height: "3rem",
                        padding: "0 1rem",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--line)",
                        background: "var(--surface)",
                        color: "var(--text)",
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 800, color: "var(--muted)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: "100%",
                        height: "3rem",
                        padding: "0 1rem",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--line)",
                        background: "var(--surface)",
                        color: "var(--text)",
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        outline: "none",
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn btn-primary"
                    style={{ width: "100%", height: "3.25rem", marginTop: "0.5rem" }}
                  >
                    Next Step
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>
                    Identify goals & concerns
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem", fontWeight: 600 }}>
                    What wellness factors would you like Hakim AI to analyze? (Select all that apply)
                  </p>
                </div>

                <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {skinConcernsList.map((concern) => {
                    const isSelected = concerns.includes(concern.id);
                    return (
                      <div
                        key={concern.id}
                        onClick={() => handleToggleConcern(concern.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "1rem",
                          borderRadius: "var(--radius)",
                          border: isSelected ? "1px solid var(--primary)" : "1px solid var(--line)",
                          background: isSelected ? "var(--primary-glow)" : "var(--surface)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div style={{ fontSize: "1.5rem" }}>{concern.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--text)" }}>
                            {concern.label}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>
                            {concern.desc}
                          </div>
                        </div>
                        <div
                          style={{
                            width: "1.25rem",
                            height: "1.25rem",
                            borderRadius: "50%",
                            border: "1px solid var(--line)",
                            background: isSelected ? "var(--primary)" : "transparent",
                            display: "grid",
                            placeItems: "center",
                            color: "#fff",
                          }}
                        >
                          {isSelected && <Check size={10} />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn btn-primary"
                  style={{ width: "100%", height: "3.25rem" }}
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: "1.75rem" }}>
                  <h2 style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>
                    Configure wellness targets
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem", fontWeight: 600 }}>
                    Define your baseline wellness daily goals to calculate your dynamic Glow Score
                  </p>
                </div>

                <div style={{ display: "grid", gap: "1.5rem", marginBottom: "2rem" }}>
                  {/* Water Target */}
                  <div
                    style={{
                      padding: "1.25rem",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--line)",
                      background: "var(--surface-soft)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Droplets style={{ color: "var(--sky)" }} size={18} />
                        <span style={{ fontSize: "0.88rem", fontWeight: 800 }}>Hydration Target</span>
                      </div>
                      <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--sky)" }}>
                        {waterTarget} Cups / Day
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="16"
                      value={waterTarget}
                      onChange={(e) => setWaterTarget(parseInt(e.target.value))}
                      style={{
                        width: "100%",
                        accentColor: "var(--sky)",
                        cursor: "pointer",
                      }}
                    />
                  </div>

                  {/* Sleep Target */}
                  <div
                    style={{
                      padding: "1.25rem",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--line)",
                      background: "var(--surface-soft)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Moon style={{ color: "var(--accent)" }} size={18} />
                        <span style={{ fontSize: "0.88rem", fontWeight: 800 }}>Sleep Target</span>
                      </div>
                      <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--accent)" }}>
                        {sleepTarget} Hours / Night
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="10"
                      value={sleepTarget}
                      onChange={(e) => setSleepTarget(parseInt(e.target.value))}
                      style={{
                        width: "100%",
                        accentColor: "var(--accent)",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleCompleteSignup}
                  className="btn btn-primary"
                  style={{ width: "100%", height: "3.25rem", position: "relative" }}
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
                      <Smile size={16} />
                      Complete & Get Started
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "var(--primary)",
              fontWeight: 800,
            }}
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
