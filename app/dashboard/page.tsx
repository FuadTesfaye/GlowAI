"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Bot,
  Camera,
  Heart,
  Settings,
  Plus,
  Minus,
  MessageSquare,
  Sparkles,
  Droplets,
  Moon,
  Check,
  TrendingUp,
  LogOut,
  Bell,
  Smartphone,
  Maximize2,
  Minimize2,
  ChevronRight,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  User,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Fuad");
  const [activeTab, setActiveTab] = useState("home");
  
  // Dashboard overall stats
  const [glowScore, setGlowScore] = useState(69);
  const [sleepScore, setSleepScore] = useState(60);
  const [hydrationScore, setHydrationScore] = useState(75);
  const [stressScore, setStressScore] = useState(55);
  
  // Logged inputs
  const [waterLogged, setWaterLogged] = useState(4); // cups
  const [waterTarget, setWaterTarget] = useState(8);
  const [sleepLogged, setSleepLogged] = useState(6.5); // hours
  const [sleepTarget, setSleepTarget] = useState(8);
  
  // Habit Checklist
  const [habits, setHabits] = useState([
    { id: 1, text: "Morning hydration (500ml)", checked: false, score: 2 },
    { id: 2, text: "Derm-cleansing wash", checked: false, score: 2 },
    { id: 3, text: "Sunscreen SPF 50 application", checked: false, score: 2 },
    { id: 4, text: "10-minute facial massage", checked: false, score: 3 },
    { id: 5, text: "No screen 45m before bed", checked: false, score: 3 },
  ]);

  // Notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Hydration low: Drink 2 cups of water.", unread: true },
    { id: 2, text: "Hakim AI: Recommended bedtime is 10:30 PM tonight.", unread: true },
    { id: 3, text: "Weekly report: Your Glow Score increased by 2 points!", unread: false },
  ]);

  // Scanner Tab States
  const [scanState, setScanState] = useState<"idle" | "requesting" | "streaming" | "scanning" | "result" | "error">("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusMsg, setScanStatusMsg] = useState("");
  const [hasCamera, setHasCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Hakim AI Chat Tab States
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am Hakim, your AI wellness coach. How can I help you improve your Glow Score today?",
      time: "10:00 AM",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Time state for status bar (mobile simulation)
  const [currentTime, setCurrentTime] = useState("10:42 AM");

  // Premium Billing Tier states
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoadingUpgrade, setIsLoadingUpgrade] = useState(false);

  // Toast message system
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Check login state
  useEffect(() => {
    const cached = localStorage.getItem("glowai_user");
    if (cached) {
      try {
        const profile = JSON.parse(cached);
        if (profile.name) setUserName(profile.name);
        if (profile.waterTarget) setWaterTarget(profile.waterTarget);
        if (profile.sleepTarget) setSleepTarget(profile.sleepTarget);
        if (profile.glowScore) setGlowScore(profile.glowScore);
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }

    // Interval for status bar clock
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minStr = minutes < 10 ? "0" + minutes : minutes;
      setCurrentTime(`${hours}:${minStr} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update dynamic Glow Score whenever habits, water, or sleep logs change
  useEffect(() => {
    // Calculate hydration progress
    const hydPercent = Math.min((waterLogged / waterTarget) * 100, 100);
    setHydrationScore(Math.round(hydPercent));

    // Calculate sleep progress
    const sleepPercent = Math.min((sleepLogged / sleepTarget) * 100, 100);
    setSleepScore(Math.round(sleepPercent));

    // Habits checked modifier
    const habitsScore = habits.reduce((sum, h) => sum + (h.checked ? h.score : 0), 0);

    // Calculate baseline
    const base = 50 + Math.round(hydPercent * 0.15) + Math.round(sleepPercent * 0.15) + habitsScore;
    const finalGlow = Math.min(base, 100);
    setGlowScore(finalGlow);
  }, [waterLogged, sleepLogged, habits, waterTarget, sleepTarget]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // Show Toast helper
  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // Log handlers
  const adjustWater = (amount: number) => {
    setWaterLogged((prev) => {
      const next = Math.max(0, prev + amount);
      if (amount > 0) {
        triggerToast("Logged 1 glass of water 💧", "success");
      }
      return next;
    });
  };

  const adjustSleep = (amount: number) => {
    setSleepLogged((prev) => {
      const next = Math.max(0, parseFloat((prev + amount).toFixed(1)));
      if (amount > 0) {
        triggerToast(`Logged ${amount} hr of sleep 💤`, "success");
      }
      return next;
    });
  };

  // Toggle habit checkbox
  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((h) => {
        if (h.id === id) {
          const nextState = !h.checked;
          triggerToast(
            nextState ? `Habit completed! +${h.score} Glow` : `Habit undone`,
            nextState ? "success" : "info"
          );
          return { ...h, checked: nextState };
        }
        return h;
      })
    );
  };

  // Clear unread notifications
  const clearNotifications = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  // Start Camera for Scanner Tab
  const startCamera = async () => {
    setScanState("requesting");
    setScanStatusMsg("Initializing camera mirror...");
    try {
      const constraints = {
        video: { facingMode: "user", width: 480, height: 480 },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCamera(true);
      setScanState("streaming");
    } catch (err) {
      console.warn("Camera access denied or unavailable", err);
      setHasCamera(false);
      setScanState("streaming");
      triggerToast("Camera not available. Running in simulation mode.", "info");
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setScanState("idle");
  };

  // Trigger Scanning Process
  const triggerScan = () => {
    if (scanState !== "streaming") return;
    setScanState("scanning");
    setScanProgress(0);
    setScanStatusMsg("Locking facial coordinates...");

    const intervals = [
      { progress: 25, msg: "Analyzing skin hydration & dermis layer..." },
      { progress: 55, msg: "Measuring blood oxygenation & stress indices..." },
      { progress: 80, msg: "Checking forehead sebum & pore density..." },
      { progress: 100, msg: "Finalizing full diagnostic matrix..." },
    ];

    intervals.forEach((stepItem) => {
      setTimeout(() => {
        setScanProgress(stepItem.progress);
        setScanStatusMsg(stepItem.msg);
        if (stepItem.progress === 100) {
          setTimeout(() => {
            setScanState("result");
            stopCamera();
            triggerToast("Wellness mirror scan complete! ✦", "success");
          }, 800);
        }
      }, stepItem.progress * 25);
    });
  };

  // Apply Scanner Diagnosis
  const applyDiagnosis = () => {
    setGlowScore(84);
    setHydrationScore(90);
    setSleepScore(85);
    setStressScore(35);
    triggerToast("Scan details merged! Overall Glow Score boosted to 84!", "success");
    setActiveTab("home");
    setScanState("idle");
  };

  // Chat message submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: "user",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const query = chatInput.toLowerCase();
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "";
      if (query.includes("acne") || query.includes("breakout") || query.includes("jawline")) {
        replyText = "Your profile shows a concentration of jawline acne. Jawline blemishes are often correlated with stress (currently 55%) and sugar levels. I recommend drinking 3 more glasses of water today, and applying a salicylic acid spot treatment before bed.";
      } else if (query.includes("sleep") || query.includes("tired")) {
        replyText = `Your sleep log is currently at ${sleepLogged} hours, which is below your target of ${sleepTarget} hours. Getting 1.5 more hours of sleep tonight will raise your Sleep Score by ~18% and increase your overall Glow Score by 3 points. Try a cool 15-minute eye mask.`;
      } else if (query.includes("water") || query.includes("hydrate") || query.includes("dry")) {
        replyText = `To hit your hydration target (${waterLogged}/${waterTarget} cups), try setting a timer every 2 hours. Consistent water intake improves skin turgor and speeds up barrier recovery, directly boosting your overall radiance.`;
      } else if (query.includes("glow") || query.includes("score")) {
        replyText = `Your current Glow Score is ${glowScore}/100 (Healthy). You can boost this to 'Radiant' (>81) by completing the remaining ${habits.filter(h => !h.checked).length} items on your daily checklist and logging your hydration.`;
      } else {
        replyText = `Understood. Based on your wellness mirror telemetry, my main advice is to establish a consistent morning/evening routine, reduce screen time before bed, and log at least 8 cups of water. Would you like a custom sleep schedule?`;
      }

      const aiMsg = {
        sender: "ai",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  // Premium Upgrading
  const handleUpgrade = () => {
    setIsLoadingUpgrade(true);
    setTimeout(() => {
      setIsLoadingUpgrade(false);
      setIsUpgraded(true);
      setShowUpgradeModal(false);
      triggerToast("Congratulations! You upgraded to GlowAI Pro ✦", "success");
    }, 1500);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("glowai_user");
    router.push("/login");
  };

  const navTabs = [
    { id: "home", label: "Overview", icon: <Award size={18} /> },
    { id: "scan", label: "Mirror Scan", icon: <Camera size={18} /> },
    { id: "hakim", label: "Hakim AI", icon: <Bot size={18} /> },
    { id: "logs", label: "Daily Logs", icon: <Droplets size={18} /> },
    { id: "upgrade", label: "Premium Upgrade", icon: <Sparkles size={18} /> },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        position: "relative",
      }}
      className="dashboard-wrapper"
    >
      {/* Background radial effects */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primary-glow), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Toast popup */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: toast.type === "success" ? "var(--primary)" : "var(--surface-soft)",
              color: toast.type === "success" ? "#fff" : "var(--text)",
              border: `1px solid ${toast.type === "success" ? "var(--primary-strong)" : "var(--line)"}`,
              padding: "0.75rem 1.5rem",
              borderRadius: "999px",
              boxShadow: "var(--shadow)",
              zIndex: 200,
              fontWeight: 800,
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {toast.type === "success" ? "✦" : "ℹ"} {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DUAL LAYOUT WRAPPER ─── */}
      <div className="dashboard-container">
        
        {/* DESKTOP SIDEBAR (Visible on Desktop >= 768px, Hidden on Mobile) */}
        <aside className="dashboard-sidebar">
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "1.5rem 1.5rem 2rem 1.5rem", borderBottom: "1px solid var(--line)" }}>
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--primary)",
                fontWeight: 900,
                fontSize: "1.1rem",
                boxShadow: "0 4px 12px var(--primary-glow)",
              }}
            >
              G
            </span>
            <span style={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.01em" }}>GlowAI</span>
          </div>

          <nav style={{ padding: "1.5rem 1rem", display: "grid", gap: "0.35rem", flex: 1 }}>
            {navTabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (scanState === "streaming") stopCamera();
                    setActiveTab(tab.id);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius)",
                    color: active ? "var(--primary)" : "var(--muted)",
                    background: active ? "var(--primary-glow)" : "transparent",
                    fontWeight: 800,
                    fontSize: "0.88rem",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                  className="sidebar-nav-item"
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User profile section at bottom of sidebar */}
          <div style={{ padding: "1rem", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), var(--accent))",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: "1rem",
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {userName}
              </div>
              <span style={{ fontSize: "0.7rem", color: "var(--muted)", fontWeight: 700 }}>
                {isUpgraded ? "Pro Account ✦" : "Free Account"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{ color: "var(--rose)", display: "grid", placeItems: "center", padding: "0.25rem", borderRadius: "6px" }}
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </aside>

        {/* MAIN PANEL CONTENT */}
        <main className="dashboard-main-content">
          
          {/* TOP HEADER */}
          <header className="dashboard-top-header">
            {/* Left side: Brand or Greeting */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="mobile-brand-title">GlowAI</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 800 }} className="desktop-header-greeting">
                  Good day, {userName}! 👋
                </span>
                {isUpgraded && <Zap size={14} style={{ color: "var(--accent)" }} className="desktop-header-greeting" />}
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 700 }} className="header-subtitle">
                Mirror Diagnostics: Connected • {new Date().toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>

            {/* Right side: Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", position: "relative" }}>
              
              {/* Notification Bell */}
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) clearNotifications();
                }}
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <Bell size={16} />
                {notifications.some((n) => n.unread) && (
                  <span
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      width: "6px",
                      height: "6px",
                      background: "var(--rose)",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </button>

              {/* Mobile logout indicator (only on mobile) */}
              <button
                onClick={handleLogout}
                className="mobile-logout-btn"
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <LogOut size={16} style={{ color: "var(--rose)" }} />
              </button>

              {/* User Avatar (only on mobile top bar) */}
              <div className="mobile-user-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>

              {/* Notification Popover Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      position: "absolute",
                      top: "2.75rem",
                      right: 0,
                      width: "280px",
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius)",
                      padding: "0.85rem",
                      boxShadow: "var(--shadow)",
                      zIndex: 150,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--line)" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 800 }}>Mirror System Alerts</span>
                      <button onClick={() => setShowNotifications(false)} style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 800 }}>Dismiss</button>
                    </div>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.5rem",
                            borderRadius: "6px",
                            background: n.unread ? "var(--primary-glow)" : "transparent",
                            borderLeft: n.unread ? "2px solid var(--primary)" : "none",
                            fontWeight: 600,
                            lineHeight: 1.4,
                          }}
                        >
                          {n.text}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          {/* MAIN DYNAMIC CONTENT CONTAINER */}
          <div className="dashboard-content-area">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === "home" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="tab-content-grid"
                >
                  {/* Left Column (Score + Contributors) */}
                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    
                    {/* Glow Score Gauge Card */}
                    <div className="glass-card" style={{ padding: "1.75rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                      <div className="score-ring" style={{ width: "120px", height: "120px", flexShrink: 0 }}>
                        <svg viewBox="0 0 160 160">
                          <defs>
                            <linearGradient id="glowDashGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="var(--primary)" />
                              <stop offset="100%" stopColor="var(--accent)" />
                            </linearGradient>
                          </defs>
                          <circle className="ring-track" cx="80" cy="80" r="68" />
                          <circle
                            className="ring-progress"
                            cx="80"
                            cy="80"
                            r="68"
                            strokeDasharray={2 * Math.PI * 68}
                            strokeDashoffset={2 * Math.PI * 68 - (glowScore / 100) * (2 * Math.PI * 68)}
                            stroke="url(#glowDashGrad)"
                            style={{
                              transform: "rotate(-90deg)",
                              transformOrigin: "center",
                              transition: "stroke-dashoffset 0.8s ease",
                            }}
                          />
                        </svg>
                        <div className="score-value">
                          <strong style={{ fontSize: "2rem" }}>{glowScore}</strong>
                          <span style={{ fontSize: "0.7rem" }}>/100</span>
                        </div>
                      </div>

                      <div>
                        <span className="eyebrow" style={{ padding: "0.2rem 0.6rem", fontSize: "0.68rem", marginBottom: "0.4rem" }}>
                          AI Scorecard
                        </span>
                        <h2 style={{ fontSize: "1.35rem", marginBottom: "0.25rem" }}>Glow Score™</h2>
                        <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 600, lineHeight: 1.4 }}>
                          Your signature wellness index. Automatically updates as you log hydration, sleep, and checklist habits.
                        </p>
                        <div
                          style={{
                            marginTop: "0.6rem",
                            display: "inline-block",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "999px",
                            background: glowScore >= 80 ? "var(--primary-glow)" : "var(--accent-glow)",
                            color: glowScore >= 80 ? "var(--primary)" : "var(--accent)",
                            fontSize: "0.75rem",
                            fontWeight: 900,
                          }}
                        >
                          {glowScore >= 80 ? "Radiant Radiance ✦" : "Healthy Baseline ●"}
                        </div>
                      </div>
                    </div>

                    {/* Contributing Bars Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.85rem" }}>
                      {[
                        { label: "Skin Hydration", value: hydrationScore, color: "var(--sky)", icon: "💧" },
                        { label: "Sleep Quality", value: sleepScore, color: "var(--accent)", icon: "🌙" },
                        { label: "Derm Radiance", value: glowScore > 78 ? 84 : 75, color: "var(--primary)", icon: "✨" },
                        { label: "Stress Marker", value: stressScore, color: "var(--rose)", icon: "🧘" },
                      ].map((item) => (
                        <div key={item.label} className="glass-card" style={{ padding: "1rem 1.25rem", display: "grid", gap: "0.45rem" }}>
                          <div style={{ display: "flex", justifySpace: "space-between", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--muted)" }}>
                              {item.icon} {item.label}
                            </span>
                            <span style={{ fontSize: "0.85rem", fontWeight: 900, color: item.color }}>{item.value}%</span>
                          </div>
                          <div className="bar" style={{ height: "5px" }}>
                            <div className="bar-fill" style={{ width: `${item.value}%`, background: item.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (Checklist + 14 Day Graph) */}
                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    
                    {/* Checklist */}
                    <div className="glass-card" style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h3 style={{ fontSize: "0.95rem", fontWeight: 800 }}>Daily Wellness Tasks</h3>
                        <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 800 }}>
                          {habits.filter(h => h.checked).length} / {habits.length} Complete
                        </span>
                      </div>

                      <div style={{ display: "grid", gap: "0.65rem" }}>
                        {habits.map((habit) => (
                          <div
                            key={habit.id}
                            onClick={() => toggleHabit(habit.id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.85rem",
                              padding: "0.75rem 1rem",
                              borderRadius: "var(--radius)",
                              background: habit.checked ? "var(--primary-glow)" : "var(--surface-soft)",
                              border: `1px solid ${habit.checked ? "var(--primary-glow)" : "var(--line)"}`,
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <div
                              style={{
                                width: "1.15rem",
                                height: "1.15rem",
                                borderRadius: "4px",
                                border: "1px solid var(--line)",
                                background: habit.checked ? "var(--primary)" : "var(--surface)",
                                display: "grid",
                                placeItems: "center",
                                color: "#fff",
                                flexShrink: 0,
                              }}
                            >
                              {habit.checked && <Check size={11} />}
                            </div>
                            <span
                              style={{
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                textDecoration: habit.checked ? "line-through" : "none",
                                color: habit.checked ? "var(--muted)" : "var(--text)",
                              }}
                            >
                              {habit.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Radiance Projection Chart */}
                    <div className="glass-card" style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                        <TrendingUp size={18} style={{ color: "var(--primary)" }} />
                        <h3 style={{ fontSize: "0.95rem", fontWeight: 800 }}>Skin Trajectory (14 Days)</h3>
                      </div>
                      
                      <div style={{ height: "80px", position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 0.5rem 0.5rem 0.5rem" }}>
                        <div style={{ position: "absolute", bottom: "16px", left: 0, right: 0, height: "1px", background: "var(--line)" }} />
                        {[58, 62, 60, 65, 69, 74, glowScore, glowScore + 3, glowScore + 7, glowScore + 11].map((val, idx) => (
                          <div
                            key={idx}
                            style={{
                              width: "8%",
                              height: `${val}%`,
                              background: idx === 6 ? "var(--accent)" : "var(--primary)",
                              opacity: idx > 6 ? 0.45 : 1,
                              borderRadius: "3px",
                              position: "relative",
                              transition: "height 0.4s ease",
                            }}
                          >
                            {idx === 6 && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "-15px",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  fontSize: "0.6rem",
                                  fontWeight: 900,
                                  color: "var(--accent)",
                                }}
                              >
                                Now
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 700, textAlign: "center", marginTop: "0.5rem" }}>
                        Maintaining active habits will boost skin cell turnover, predicting a Glow Score of {glowScore + 11} in 10 days.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MIRROR TELEMETRY SCAN */}
              {activeTab === "scan" && (
                <motion.div
                  key="scan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="tab-content-grid"
                >
                  {/* Left block: Scanner circular stream viewport */}
                  <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px", background: "#060a08" }}>
                    <div
                      style={{
                        width: "240px",
                        height: "240px",
                        borderRadius: "50%",
                        border: `3px solid ${scanState === "scanning" ? "var(--primary)" : "var(--line)"}`,
                        position: "relative",
                        overflow: "hidden",
                        background: "#0c120f",
                        display: "grid",
                        placeItems: "center",
                        boxShadow: scanState === "scanning" ? "0 0 20px var(--primary-glow)" : "none",
                      }}
                    >
                      {scanState !== "result" && (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: hasCamera && (scanState === "streaming" || scanState === "scanning") ? "block" : "none",
                            transform: "scaleX(-1)", // Mirror effect
                          }}
                        />
                      )}

                      {(!hasCamera || scanState === "idle" || scanState === "requesting") && scanState !== "result" && (
                        <div style={{ textAlign: "center", color: "var(--muted)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                          <Camera size={44} style={{ opacity: 0.5 }} />
                          <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>Mirror Camera Offline</span>
                        </div>
                      )}

                      {/* Laser scanner effect */}
                      {scanState === "scanning" && (
                        <>
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              height: "4px",
                              background: "var(--primary)",
                              boxShadow: "0 0 20px var(--primary)",
                              animation: "scanLaser 2s linear infinite",
                              zIndex: 10,
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              width: "160px",
                              height: "160px",
                              border: "2px dashed var(--primary)",
                              borderRadius: "16px",
                              zIndex: 5,
                            }}
                          />
                        </>
                      )}

                      {/* Results visual on scan circular viewport */}
                      {scanState === "result" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          style={{
                            textAlign: "center",
                            color: "var(--primary)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <ShieldCheck size={48} />
                          <span style={{ fontSize: "0.95rem", fontWeight: 900 }}>Scan Success</span>
                        </motion.div>
                      )}
                    </div>

                    <div style={{ marginTop: "1.5rem", width: "100%", maxWidth: "320px" }}>
                      {scanState === "idle" && (
                        <button onClick={startCamera} className="btn btn-primary" style={{ width: "100%" }}>
                          <Camera size={16} />
                          Initialize Mirror Camera
                        </button>
                      )}

                      {scanState === "streaming" && (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button onClick={triggerScan} className="btn btn-primary" style={{ flex: 1 }}>
                            <Sparkles size={16} />
                            Start Skin Scan
                          </button>
                          <button onClick={stopCamera} className="btn btn-secondary">
                            Disconnect
                          </button>
                        </div>
                      )}

                      {scanState === "scanning" && (
                        <div style={{ textAlign: "center" }}>
                          <div className="bar" style={{ height: "6px", marginBottom: "0.5rem" }}>
                            <div className="bar-fill" style={{ width: `${scanProgress}%` }} />
                          </div>
                          <span style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 800 }}>
                            {scanStatusMsg}
                          </span>
                        </div>
                      )}

                      {scanState === "result" && (
                        <button onClick={() => setScanState("streaming")} className="btn btn-secondary" style={{ width: "100%" }}>
                          Recapture Skin Signal
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right block: Diagnostics breakdown */}
                  <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                        <Bot size={18} style={{ color: "var(--primary)" }} />
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 900 }}>Diagnostics Report</h3>
                      </div>

                      {scanState === "result" ? (
                        <div style={{ display: "grid", gap: "0.85rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem", fontSize: "0.85rem" }}>
                            <span style={{ color: "var(--muted)", fontWeight: 700 }}>Skin Moisture (Dermis)</span>
                            <span style={{ fontWeight: 900, color: "var(--sky)" }}>90% (Excellent)</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem", fontSize: "0.85rem" }}>
                            <span style={{ color: "var(--muted)", fontWeight: 700 }}>Sebum Balance Index</span>
                            <span style={{ fontWeight: 900, color: "var(--primary)" }}>Optimal / Balanced</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem", fontSize: "0.85rem" }}>
                            <span style={{ color: "var(--muted)", fontWeight: 700 }}>Pore Dilation & Sebum</span>
                            <span style={{ fontWeight: 900, color: "var(--primary)" }}>Minimal Sebum Pores</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: "0.5rem", fontSize: "0.85rem" }}>
                            <span style={{ color: "var(--muted)", fontWeight: 700 }}>Cortisol Stress Response</span>
                            <span style={{ fontWeight: 900, color: "var(--rose)" }}>3.5 / 10 (Low Stress)</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.25rem", fontSize: "0.88rem" }}>
                            <span style={{ color: "var(--muted)", fontWeight: 800 }}>Computed Radiance (Glow)</span>
                            <span style={{ fontWeight: 950, color: "var(--accent)" }}>84 / 100</span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ color: "var(--muted)", fontSize: "0.82rem", fontWeight: 600, padding: "2rem 0", textAlign: "center" }}>
                          No diagnostics active. Turn on the mirror camera and run the telemetry capture to generate reports.
                        </div>
                      )}
                    </div>

                    {scanState === "result" && (
                      <button
                        onClick={applyDiagnosis}
                        className="btn btn-primary"
                        style={{ width: "100%", minHeight: "3rem", marginTop: "1rem" }}
                      >
                        Apply telemetry to Dashboard
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: HAKIM AI CHAT */}
              {activeTab === "hakim" && (
                <motion.div
                  key="hakim"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="tab-content-grid"
                >
                  {/* Chat interface card */}
                  <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", height: "450px" }}>
                    {/* Chat Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--line)" }}>
                      <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--accent))", display: "grid", placeItems: "center", color: "#fff" }}>
                        <Bot size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 800 }}>Dr. Hakim AI</div>
                        <span style={{ display: "block", fontSize: "0.68rem", color: "var(--primary)", fontWeight: 800 }}>● Active Wellness Mirror Analyst</span>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div
                      style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.85rem", padding: "1rem 0" }}
                      className="chat-messages-container"
                    >
                      {chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          style={{
                            alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                            maxWidth: "80%",
                            padding: "0.75rem 1rem",
                            borderRadius: "var(--radius)",
                            background: msg.sender === "user" ? "var(--primary)" : "var(--surface-soft)",
                            border: msg.sender === "user" ? "none" : "1px solid var(--line)",
                            color: msg.sender === "user" ? "#fff" : "var(--text)",
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            lineHeight: 1.5,
                            borderBottomRightRadius: msg.sender === "user" ? "4px" : "var(--radius)",
                            borderBottomLeftRadius: msg.sender === "ai" ? "4px" : "var(--radius)",
                          }}
                        >
                          {msg.text}
                          <span style={{ display: "block", fontSize: "0.6rem", opacity: 0.7, textAlign: "right", marginTop: "0.3rem", fontWeight: 700 }}>
                            {msg.time}
                          </span>
                        </div>
                      ))}
                      {isTyping && (
                        <div style={{ alignSelf: "flex-start", padding: "0.65rem 1rem", borderRadius: "var(--radius)", background: "var(--surface-soft)", border: "1px solid var(--line)", color: "var(--muted)", fontSize: "0.75rem", fontWeight: 700 }}>
                          Hakim is typing...
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "0.5rem", borderTop: "1px solid var(--line)", paddingTop: "0.75rem" }}>
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about jawline acne, sleep hours, logging, score..."
                        style={{
                          flex: 1,
                          height: "2.75rem",
                          padding: "0 1rem",
                          borderRadius: "var(--radius)",
                          border: "1px solid var(--line)",
                          background: "var(--surface)",
                          color: "var(--text)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          outline: "none",
                        }}
                      />
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "2.75rem", height: "2.75rem", minWidth: "2.75rem", padding: 0, borderRadius: "var(--radius)" }}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </form>
                  </div>

                  {/* Desktop Right Side: Coach Capabilities overview */}
                  <div className="glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div>
                      <span className="eyebrow" style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem", marginBottom: "0.5rem" }}>Core Coach Capabilities</span>
                      <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>AI Diagnostic Core</h3>
                      <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 600, lineHeight: 1.4 }}>
                        Hakim AI is trained on clinical dermatology metrics and holistic health principles.
                      </p>
                    </div>

                    <div style={{ display: "grid", gap: "0.75rem" }}>
                      {[
                        { title: "Skin Coach", desc: "Deciphers localized blemishes (jawline, forehead, cheeks) based on stress.", icon: <Sparkles size={16} /> },
                        { title: "Sleep Analyst", desc: "Calculates impact of REM sleep intervals on skin collagen volume.", icon: <Moon size={16} /> },
                        { title: "Hydration Coach", desc: "Correlates log data with telemetry moisture values.", icon: <Droplets size={16} /> },
                      ].map((cap) => (
                        <div key={cap.title} style={{ display: "flex", gap: "0.85rem", padding: "0.85rem", borderRadius: "var(--radius)", background: "var(--surface-soft)", border: "1px solid var(--line)" }}>
                          <div style={{ width: "2rem", height: "2rem", borderRadius: "6px", background: "var(--primary-glow)", color: "var(--primary)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                            {cap.icon}
                          </div>
                          <div>
                            <div style={{ fontSize: "0.82rem", fontWeight: 800 }}>{cap.title}</div>
                            <span style={{ display: "block", fontSize: "0.72rem", color: "var(--muted)", fontWeight: 600, lineHeight: 1.3 }}>{cap.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: LOGGERS */}
              {activeTab === "logs" && (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="tab-content-grid"
                >
                  {/* Left block: Water & Sleep loggers */}
                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    
                    {/* Water Logger widget */}
                    <div className="glass-card" style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Droplets size={18} style={{ color: "var(--sky)" }} />
                          <span style={{ fontSize: "0.88rem", fontWeight: 800 }}>Water Consumption</span>
                        </div>
                        <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--sky)" }}>
                          {waterLogged} / {waterTarget} Cups
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button onClick={() => adjustWater(-1)} style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", border: "1px solid var(--line)", background: "var(--surface)", display: "grid", placeItems: "center" }}>
                          <Minus size={14} />
                        </button>
                        
                        <div style={{ flex: 1, height: "10px", background: "var(--surface-strong)", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${Math.min((waterLogged / waterTarget) * 100, 100)}%`, background: "var(--sky)", transition: "width 0.4s ease" }} />
                        </div>

                        <button onClick={() => adjustWater(1)} style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", border: "1px solid var(--line)", background: "var(--surface)", display: "grid", placeItems: "center" }}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Sleep Logger widget */}
                    <div className="glass-card" style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Moon size={18} style={{ color: "var(--accent)" }} />
                          <span style={{ fontSize: "0.88rem", fontWeight: 800 }}>Sleep Quality Log</span>
                        </div>
                        <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--accent)" }}>
                          {sleepLogged} / {sleepTarget} Hours
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button onClick={() => adjustSleep(-0.5)} style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", border: "1px solid var(--line)", background: "var(--surface)", display: "grid", placeItems: "center" }}>
                          <Minus size={14} />
                        </button>

                        <div style={{ flex: 1, height: "10px", background: "var(--surface-strong)", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${Math.min((sleepLogged / sleepTarget) * 100, 100)}%`, background: "var(--accent)", transition: "width 0.4s ease" }} />
                        </div>

                        <button onClick={() => adjustSleep(0.5)} style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", border: "1px solid var(--line)", background: "var(--surface)", display: "grid", placeItems: "center" }}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Logs history list */}
                  <div className="glass-card" style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "0.85rem" }}>Log History</h3>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                      {[
                        { day: "Yesterday", water: "7 cups", sleep: "7.0 hrs", score: "71" },
                        { day: "2 days ago", water: "8 cups", sleep: "8.0 hrs", score: "74" },
                        { day: "3 days ago", water: "5 cups", sleep: "6.0 hrs", score: "66" },
                      ].map((row, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "0.78rem",
                            padding: "0.75rem",
                            borderRadius: "var(--radius)",
                            background: "var(--surface-soft)",
                            border: "1px solid var(--line)",
                            fontWeight: 600,
                          }}
                        >
                          <span style={{ fontWeight: 800 }}>{row.day}</span>
                          <span>💧 {row.water}</span>
                          <span>🌙 {row.sleep}</span>
                          <span style={{ color: "var(--primary)", fontWeight: 800 }}>{row.score} score</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: PREMIUM UPGRADES */}
              {activeTab === "upgrade" && (
                <motion.div
                  key="upgrade"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ display: "grid", gap: "1.5rem" }}
                >
                  <div style={{ textAlign: "center", maxWidth: "550px", marginInline: "auto" }}>
                    <h2 style={{ fontSize: "1.35rem", marginBottom: "0.25rem" }}>Upgrade to Smart Telemetry</h2>
                    <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 600 }}>
                      Connect hardware smart mirror overlays or get standalone mirrors for advanced wellness analyses.
                    </p>
                  </div>

                  {/* Toggle billing cycle */}
                  <div style={{ display: "flex", justifyContent: "center", background: "var(--surface-soft)", border: "1px solid var(--line)", padding: "0.25rem", borderRadius: "999px", width: "fit-content", marginInline: "auto" }}>
                    <button onClick={() => setBillingCycle("monthly")} style={{ padding: "0.4rem 1.25rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 800, background: billingCycle === "monthly" ? "var(--primary)" : "transparent", color: billingCycle === "monthly" ? "#fff" : "var(--muted)" }}>
                      Monthly billing
                    </button>
                    <button onClick={() => setBillingCycle("yearly")} style={{ padding: "0.4rem 1.25rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 800, background: billingCycle === "yearly" ? "var(--primary)" : "transparent", color: billingCycle === "yearly" ? "#fff" : "var(--muted)" }}>
                      Yearly billing (Save 20%)
                    </button>
                  </div>

                  {/* Pricing grid */}
                  <div className="pricing-grid">
                    {[
                      {
                        name: "GlowAI Pro",
                        price: billingCycle === "monthly" ? "$19.99" : "$15.99",
                        popular: true,
                        desc: "Attaches a smart touch overlay directly onto your existing bathroom mirror.",
                        features: ["Full moisture & sebum telemetry", "Unlimited Hakim AI chat consults", "Overlay system mirroring integration", "Offline local cache database"],
                      },
                      {
                        name: "GlowAI Studio Mirror",
                        price: billingCycle === "monthly" ? "$49.99" : "$39.99",
                        popular: false,
                        desc: "A standalone double-sided smart touch screen glass mirror.",
                        features: ["Includes 24 inch Touch LED mirror", "Advanced derm-camera sensors", "24/7 dermatologist priority helpline", "Multi-profile accounts support"],
                      },
                    ].map((tier) => (
                      <div
                        key={tier.name}
                        className="glass-card"
                        style={{
                          padding: "2rem 1.5rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          position: "relative",
                          borderWidth: tier.popular ? "2px" : "1px",
                          borderColor: tier.popular ? "var(--primary)" : "var(--line)",
                        }}
                      >
                        {tier.popular && (
                          <span style={{ position: "absolute", top: "-10px", right: "1.5rem", background: "var(--primary)", color: "#fff", fontSize: "0.65rem", fontWeight: 900, padding: "0.2rem 0.6rem", borderRadius: "4px", textTransform: "uppercase" }}>
                            BEST CHOICE
                          </span>
                        )}

                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 900 }}>{tier.name}</h3>
                            <div>
                              <span style={{ fontSize: "1.35rem", fontWeight: 950, color: "var(--primary)" }}>{tier.price}</span>
                              <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>/mo</span>
                            </div>
                          </div>
                          <p style={{ fontSize: "0.78rem", color: "var(--muted)", fontWeight: 600, marginBottom: "1.5rem", lineHeight: 1.4 }}>{tier.desc}</p>

                          <div style={{ display: "grid", gap: "0.5rem", margin: "1.5rem 0" }}>
                            {tier.features.map((f, i) => (
                              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", fontWeight: 600 }}>
                                <Check size={12} style={{ color: "var(--primary)" }} />
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {isUpgraded ? (
                          <button disabled className="btn btn-secondary" style={{ width: "100%", minHeight: "3rem", fontSize: "0.85rem" }}>
                            Currently Active
                          </button>
                        ) : (
                          <button onClick={() => setShowUpgradeModal(true)} className="btn btn-primary" style={{ width: "100%", minHeight: "3rem", fontSize: "0.85rem" }}>
                            Upgrade account
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (Visible on Mobile < 768px, Hidden on Desktop) */}
      <nav className="dashboard-mobile-bottom-nav">
        {navTabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (scanState === "streaming") stopCamera();
                setActiveTab(tab.id);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.2rem",
                flex: 1,
                height: "100%",
                color: active ? "var(--primary)" : "var(--muted)",
                transition: "color 0.2s ease",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  padding: "0.3rem 0.8rem",
                  borderRadius: "12px",
                  background: active ? "var(--primary-glow)" : "transparent",
                  transition: "background 0.2s ease",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {tab.icon}
              </div>
              <span style={{ fontSize: "0.62rem", fontWeight: 800 }}>
                {tab.id === "upgrade" ? "Premium" : tab.id === "logs" ? "Logs" : tab.id === "hakim" ? "Hakim" : tab.id === "scan" ? "Scan" : "Home"}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Upgrade Checkout Dialog Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              display: "grid",
              placeItems: "center",
              zIndex: 300,
              padding: "1rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="glass-card"
              style={{
                padding: "1.75rem",
                width: "100%",
                maxWidth: "350px",
                background: "var(--surface)",
              }}
            >
              <h4 style={{ fontSize: "1.1rem", marginBottom: "0.4rem", fontWeight: 900 }}>Upgrade Checkout</h4>
              <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "1.25rem", fontWeight: 600 }}>
                Log test credit card transaction to authenticate subscription.
              </p>

              <div style={{ display: "grid", gap: "0.85rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.3rem" }}>Credit card number</label>
                  <input
                    type="text"
                    defaultValue="4242 4242 4242 4242"
                    disabled
                    style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", border: "1px solid var(--line)", background: "var(--surface-soft)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: "0.88rem", fontWeight: 700 }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.3rem" }}>Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      disabled
                      style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", border: "1px solid var(--line)", background: "var(--surface-soft)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: "0.88rem", fontWeight: 700 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.3rem" }}>CVC Security</label>
                    <input
                      type="password"
                      defaultValue="999"
                      disabled
                      style={{ width: "100%", height: "2.75rem", padding: "0 0.85rem", border: "1px solid var(--line)", background: "var(--surface-soft)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: "0.88rem", fontWeight: 700 }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  disabled={isLoadingUpgrade}
                  onClick={handleUpgrade}
                  className="btn btn-primary"
                  style={{ flex: 1, minHeight: "2.75rem", fontSize: "0.82rem" }}
                >
                  {isLoadingUpgrade ? "Processing..." : "Submit Upgrade"}
                </button>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="btn btn-secondary"
                  style={{ minHeight: "2.75rem", fontSize: "0.82rem" }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS declarations for Custom Transitions and animations */}
      <style jsx global>{`
        @keyframes scanLaser {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }

        /* ─── DUAL-LAYOUT RESPONSIVE STYLING ─── */
        
        /* Default/Desktop structure (>= 768px) */
        @media (min-width: 768px) {
          .dashboard-container {
            display: flex;
            min-height: 100vh;
            width: 100%;
            position: relative;
            z-index: 10;
          }
          
          .dashboard-sidebar {
            width: 250px;
            background: var(--surface);
            border-right: 1px solid var(--line);
            display: flex;
            flex-direction: column;
            position: sticky;
            top: 0;
            height: 100vh;
            z-index: 40;
          }

          .dashboard-main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: transparent;
            min-width: 0;
          }

          .dashboard-top-header {
            height: 70px;
            border-bottom: 1px solid var(--line);
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--surface);
            position: sticky;
            top: 0;
            z-index: 30;
          }

          .mobile-brand-title,
          .mobile-logout-btn,
          .mobile-user-avatar,
          .dashboard-mobile-bottom-nav {
            display: none !important;
          }

          .dashboard-content-area {
            flex: 1;
            padding: 2rem;
            max-width: 1200px;
            width: 100%;
            margin-inline: auto;
          }

          /* Grids for tabs */
          .tab-content-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 1.5rem;
            align-items: start;
          }

          .pricing-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
        }

        /* Mobile structure (< 768px) */
        @media (max-width: 767px) {
          .dashboard-container {
            display: block;
            position: relative;
            z-index: 10;
          }

          .dashboard-sidebar,
          .desktop-header-greeting {
            display: none !important;
          }

          .dashboard-main-content {
            width: 100%;
            padding-bottom: 80px; /* clear bottom navbar */
          }

          .dashboard-top-header {
            padding: 1rem 1.25rem 0.5rem 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--bg);
            border-bottom: 1px solid var(--line);
          }

          .mobile-brand-title {
            font-size: 1.15rem;
            font-weight: 800;
            color: var(--primary);
          }

          .mobile-user-avatar {
            width: 2.25rem;
            height: 2.25rem;
            borderRadius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            display: grid;
            placeItems: center;
            color: #fff;
            font-weight: 900;
            font-size: 1rem;
          }

          .dashboard-content-area {
            padding: 1rem 1.25rem;
          }

          .tab-content-grid,
          .pricing-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          /* Bottom fixed mobile nav bar */
          .dashboard-mobile-bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 64px;
            background: var(--surface);
            border-top: 1px solid var(--line);
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 0.5rem 8px 0.5rem;
            z-index: 100;
          }
        }
      `}</style>
    </div>
  );
}
