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

  // Shell custom styling (Desktop frame or fullscreen)
  const [useFrame, setUseFrame] = useState(true);

  // Time state for status bar
  const [currentTime, setCurrentTime] = useState("10:42 AM");

  // Premium Billing Tier states
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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
      // Fallback: simulate streaming without camera
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
      }, stepItem.progress * 30); // scale scanning duration
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

    // Hakim Coach responses
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
  const [isLoadingUpgrade, setIsLoadingUpgrade] = useState(false);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("glowai_user");
    router.push("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: useFrame ? "2rem 1rem" : "0",
        position: "relative",
        transition: "all 0.3s ease",
      }}
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
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      
      {/* Desktop Helper Toggle */}
      <div
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          display: "flex",
          gap: "0.5rem",
          zIndex: 60,
        }}
        className="desktop-frame-controls"
      >
        <button
          onClick={() => setUseFrame(!useFrame)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius)",
            fontSize: "0.82rem",
            fontWeight: 800,
            boxShadow: "var(--shadow-sm)",
            cursor: "pointer",
          }}
        >
          {useFrame ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          {useFrame ? "Full Screen View" : "Device Frame View"}
        </button>
      </div>

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
              zIndex: 100,
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

      {/* Main Wrapper: Phone Shell container */}
      <div
        className={useFrame ? "phone-shell" : "phone-shell-disabled"}
        style={{
          width: useFrame ? "375px" : "100%",
          height: useFrame ? "780px" : "100vh",
          borderRadius: useFrame ? "40px" : "0",
          border: useFrame ? "10px solid var(--surface-strong)" : "none",
          background: "var(--bg)",
          boxShadow: useFrame ? "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" : "none",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          zIndex: 10,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Device Status Bar */}
        {useFrame && (
          <div
            style={{
              height: "44px",
              background: "var(--bg)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 1.5rem",
              fontSize: "0.78rem",
              fontWeight: 800,
              color: "var(--text)",
              position: "relative",
              zIndex: 25,
            }}
          >
            <div>{currentTime}</div>
            
            {/* Notch cutout */}
            <div
              style={{
                width: "110px",
                height: "26px",
                background: "var(--surface-strong)",
                borderBottomLeftRadius: "16px",
                borderBottomRightRadius: "16px",
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Speaker pill */}
              <div style={{ width: "40px", height: "4px", background: "#0a110f", borderRadius: "99px" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              {/* Battery */}
              <Smartphone size={10} style={{ transform: "rotate(-90deg)" }} />
              <span>Glow5G</span>
              <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                <span style={{ fontSize: "0.72rem" }}>100%</span>
                <div style={{ width: "16px", height: "8px", border: "1px solid var(--text)", borderRadius: "2px", padding: "1px", display: "flex" }}>
                  <div style={{ flex: 1, background: "var(--primary)", borderRadius: "1px" }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic App Header */}
        <div
          style={{
            padding: "1rem 1.25rem 0.5rem 1.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--bg)",
            borderBottom: "1px solid var(--line)",
            zIndex: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Profile Avatar */}
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), var(--accent))",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: "1.1rem",
                boxShadow: "0 4px 10px var(--primary-glow)",
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 800 }}>Hello, {userName}!</span>
                {isUpgraded && <Zap size={12} style={{ color: "var(--accent)" }} />}
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 700 }}>
                {new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative" }}>
            {/* Notifications */}
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) clearNotifications();
              }}
              style={{
                width: "2.2rem",
                height: "2.2rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                display: "grid",
                placeItems: "center",
                position: "relative",
              }}
            >
              <Bell size={15} />
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
            
            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                width: "2.2rem",
                height: "2.2rem",
                borderRadius: "var(--radius)",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <LogOut size={15} style={{ color: "var(--rose)" }} />
            </button>

            {/* Notification Dropdown popup */}
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
                    width: "260px",
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius)",
                    padding: "0.75rem",
                    boxShadow: "var(--shadow)",
                    zIndex: 50,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 800 }}>Notifications</span>
                    <button onClick={() => setShowNotifications(false)} style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 800 }}>Close</button>
                  </div>
                  <div style={{ display: "grid", gap: "0.5rem" }}>
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          fontSize: "0.75rem",
                          padding: "0.4rem",
                          borderRadius: "6px",
                          background: n.unread ? "var(--primary-glow)" : "transparent",
                          borderLeft: n.unread ? "2px solid var(--primary)" : "none",
                          fontWeight: 600,
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
        </div>

        {/* Scrollable Main Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem 1.25rem",
            position: "relative",
            zIndex: 10,
          }}
          className="dashboard-scrollable"
        >
          <AnimatePresence mode="wait">
            {/* TAB 1: HOME (OVERVIEW) */}
            {activeTab === "home" && (
              <motion.div
                key="tab-home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid", gap: "1.25rem" }}
              >
                {/* Glow Score Ring */}
                <div
                  className="glass-card"
                  style={{
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                  }}
                >
                  {/* Circular Score Bar */}
                  <div
                    className="score-ring"
                    style={{ width: "105px", height: "105px", flexShrink: 0 }}
                  >
                    <svg viewBox="0 0 160 160">
                      <defs>
                        <linearGradient id="scoreGradientDash" x1="0%" y1="0%" x2="100%" y2="0%">
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
                        stroke="url(#scoreGradientDash)"
                        style={{
                          transform: "rotate(-90deg)",
                          transformOrigin: "center",
                          transition: "stroke-dashoffset 0.8s ease",
                        }}
                      />
                    </svg>
                    <div className="score-value">
                      <strong style={{ fontSize: "1.75rem" }}>{glowScore}</strong>
                      <span style={{ fontSize: "0.6rem" }}>/100</span>
                    </div>
                  </div>

                  <div>
                    <span className="eyebrow" style={{ padding: "0.2rem 0.5rem", fontSize: "0.65rem", marginBottom: "0.4rem" }}>
                      Overall Health
                    </span>
                    <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                      Glow Score™
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600, lineHeight: 1.4 }}>
                      Based on hydration, sleep logs, and active checkmarks.
                    </p>
                    <div
                      style={{
                        marginTop: "0.5rem",
                        display: "inline-block",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "999px",
                        background: glowScore > 80 ? "var(--primary-glow)" : "var(--accent-glow)",
                        color: glowScore > 80 ? "var(--primary)" : "var(--accent)",
                        fontSize: "0.72rem",
                        fontWeight: 900,
                      }}
                    >
                      {glowScore > 80 ? "Radiant ✦" : "Healthy ●"}
                    </div>
                  </div>
                </div>

                {/* Grid of Contributors */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { label: "Hydration", value: hydrationScore, color: "var(--sky)", icon: "💧" },
                    { label: "Sleep", value: sleepScore, color: "var(--accent)", icon: "🌙" },
                    { label: "Skin Health", value: glowScore > 78 ? 82 : 75, color: "var(--primary)", icon: "✨" },
                    { label: "Stress Level", value: stressScore, color: "var(--rose)", icon: "🧘" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-card"
                      style={{ padding: "0.85rem 1rem", display: "grid", gap: "0.35rem" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--muted)" }}>
                          {stat.icon} {stat.label}
                        </span>
                        <span style={{ fontSize: "0.82rem", fontWeight: 900, color: stat.color }}>{stat.value}%</span>
                      </div>
                      <div className="bar" style={{ height: "4px" }}>
                        <div className="bar-fill" style={{ width: `${stat.value}%`, background: stat.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Habits checklist */}
                <div className="glass-card" style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <h4 style={{ fontSize: "0.85rem", fontWeight: 800 }}>Daily Checklist</h4>
                    <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 800 }}>
                      {habits.filter((h) => h.checked).length} / {habits.length} Done
                    </span>
                  </div>

                  <div style={{ display: "grid", gap: "0.6rem" }}>
                    {habits.map((habit) => (
                      <div
                        key={habit.id}
                        onClick={() => toggleHabit(habit.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          padding: "0.65rem 0.85rem",
                          borderRadius: "var(--radius)",
                          background: habit.checked ? "var(--primary-glow)" : "var(--surface-soft)",
                          border: `1px solid ${habit.checked ? "var(--primary-glow)" : "var(--line)"}`,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div
                          style={{
                            width: "1.1rem",
                            height: "1.1rem",
                            borderRadius: "4px",
                            border: "1px solid var(--line)",
                            background: habit.checked ? "var(--primary)" : "var(--surface)",
                            display: "grid",
                            placeItems: "center",
                            color: "#fff",
                            flexShrink: 0,
                          }}
                        >
                          {habit.checked && <Check size={10} />}
                        </div>
                        <span
                          style={{
                            fontSize: "0.78rem",
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

                {/* Prediction Trajectory */}
                <div className="glass-card" style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <TrendingUp size={16} style={{ color: "var(--primary)" }} />
                    <h4 style={{ fontSize: "0.85rem", fontWeight: 800 }}>14-Day Glow Projection</h4>
                  </div>
                  <div style={{ height: "70px", position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 0.5rem 0.5rem 0.5rem" }}>
                    {/* Simulated Graph lines */}
                    <div style={{ position: "absolute", bottom: "16px", left: 0, right: 0, height: "1px", background: "var(--line)" }} />
                    {[58, 62, 60, 65, 69, 74, glowScore, glowScore + 4, glowScore + 8, glowScore + 12].map((val, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: "8%",
                          height: `${val}%`,
                          background: idx === 6 ? "var(--accent)" : "var(--primary)",
                          opacity: idx > 6 ? 0.4 : 1,
                          borderRadius: "2px",
                          position: "relative",
                          transition: "height 0.5s ease",
                        }}
                      >
                        {idx === 6 && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-14px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              fontSize: "0.6rem",
                              fontWeight: 900,
                              color: "var(--accent)",
                            }}
                          >
                            Today
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <span style={{ display: "block", fontSize: "0.7rem", color: "var(--muted)", fontWeight: 700, textAlign: "center", marginTop: "0.4rem" }}>
                    Radiance trajectory improves +12pts with consistent checklist compliance.
                  </span>
                </div>
              </motion.div>
            )}

            {/* TAB 2: WELLNESS MIRROR SCANNER */}
            {activeTab === "scan" && (
              <motion.div
                key="tab-scan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid", gap: "1.25rem" }}
              >
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>AI Skin Telemetry</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>
                    Align your face to capture signals and generate diagnostics.
                  </p>
                </div>

                {/* Scan Window screen */}
                <div
                  className="glass-card"
                  style={{
                    height: "280px",
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                    overflow: "hidden",
                    background: "#080c0a",
                    borderWidth: "2px",
                    borderColor: scanState === "scanning" ? "var(--primary)" : "var(--line)",
                  }}
                >
                  {/* Camera Video Stream */}
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
                        transform: "scaleX(-1)", // Mirror
                      }}
                    />
                  )}

                  {/* Silhouette Fallback when no camera or idle */}
                  {(!hasCamera || scanState === "idle" || scanState === "requesting") && scanState !== "result" && (
                    <div
                      style={{
                        width: "160px",
                        height: "160px",
                        borderRadius: "50%",
                        border: "2px dashed var(--line)",
                        display: "grid",
                        placeItems: "center",
                        position: "relative",
                      }}
                    >
                      <Camera size={44} style={{ color: "var(--line)", opacity: 0.6 }} />
                      <div
                        style={{
                          position: "absolute",
                          inset: "-8px",
                          border: "1px solid var(--primary-glow)",
                          borderRadius: "50%",
                          animation: "spin 12s linear infinite",
                        }}
                      />
                    </div>
                  )}

                  {/* Bounding box face overlays during scanning */}
                  {scanState === "scanning" && (
                    <>
                      {/* Scanning Laser Line */}
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          height: "3px",
                          background: "var(--primary)",
                          boxShadow: "0 0 15px var(--primary)",
                          zIndex: 30,
                          animation: "scanLaser 2s linear infinite",
                        }}
                      />
                      {/* Face bounding boxes */}
                      <div
                        style={{
                          position: "absolute",
                          width: "140px",
                          height: "140px",
                          border: "2px solid var(--primary)",
                          borderStyle: "dashed",
                          borderRadius: "12px",
                          zIndex: 25,
                        }}
                      />
                      <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", background: "rgba(0,0,0,0.6)", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.65rem", color: "var(--primary)", fontWeight: 900 }}>
                        TELEMETRY ACTIVE
                      </div>
                    </>
                  )}

                  {/* Result State Overlay */}
                  {scanState === "result" && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{
                        padding: "1.5rem",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        background: "color-mix(in srgb, var(--surface) 95%, transparent)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <ShieldCheck size={16} style={{ color: "var(--primary)" }} />
                        <span style={{ fontSize: "0.85rem", fontWeight: 800 }}>Diagnostics Complete</span>
                      </div>
                      
                      <div style={{ display: "grid", gap: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", borderBottom: "1px solid var(--line)", paddingBottom: "4px" }}>
                          <span style={{ color: "var(--muted)", fontWeight: 600 }}>Hydration Index</span>
                          <span style={{ fontWeight: 800, color: "var(--sky)" }}>90% (Excellent)</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", borderBottom: "1px solid var(--line)", paddingBottom: "4px" }}>
                          <span style={{ color: "var(--muted)", fontWeight: 600 }}>Sebum Balance</span>
                          <span style={{ fontWeight: 800, color: "var(--primary)" }}>Balanced</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", borderBottom: "1px solid var(--line)", paddingBottom: "4px" }}>
                          <span style={{ color: "var(--muted)", fontWeight: 600 }}>Stress Marker (Cortisol)</span>
                          <span style={{ fontWeight: 800, color: "var(--rose)" }}>3.5/10 (Low)</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", paddingBottom: "4px" }}>
                          <span style={{ color: "var(--muted)", fontWeight: 600 }}>Radiance (Glow Score)</span>
                          <span style={{ fontWeight: 900, color: "var(--accent)" }}>84 / 100</span>
                        </div>
                      </div>

                      <button
                        onClick={applyDiagnosis}
                        className="btn btn-primary"
                        style={{ minHeight: "2.5rem", fontSize: "0.82rem" }}
                      >
                        Apply telemetry to Dashboard
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Scanner Controls */}
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  {scanState === "idle" && (
                    <button onClick={startCamera} className="btn btn-secondary" style={{ width: "100%" }}>
                      <Camera size={16} />
                      Activate Wellness Mirror
                    </button>
                  )}

                  {scanState === "streaming" && (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={triggerScan} className="btn btn-primary" style={{ flex: 1 }}>
                        <Sparkles size={16} />
                        Analyze Telemetry
                      </button>
                      <button onClick={stopCamera} className="btn btn-secondary">
                        Disable
                      </button>
                    </div>
                  )}

                  {scanState === "scanning" && (
                    <div
                      style={{
                        padding: "1rem",
                        borderRadius: "var(--radius)",
                        background: "var(--surface-soft)",
                        border: "1px solid var(--line)",
                        textAlign: "center",
                      }}
                    >
                      <div className="bar" style={{ height: "6px", marginBottom: "0.5rem" }}>
                        <div className="bar-fill" style={{ width: `${scanProgress}%` }} />
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--primary)" }}>
                        {scanStatusMsg}
                      </span>
                    </div>
                  )}

                  {scanState === "result" && (
                    <button onClick={() => setScanState("streaming")} className="btn btn-secondary">
                      Recapture Telemetry
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 3: HAKIM AI COACH */}
            {activeTab === "hakim" && (
              <motion.div
                key="tab-hakim"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ height: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                {/* Chat header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--primary), var(--accent))",
                      display: "grid",
                      placeItems: "center",
                      color: "#fff",
                    }}
                  >
                    <Bot size={14} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800 }}>Dr. Hakim AI Coach</span>
                    <span style={{ display: "block", fontSize: "0.65rem", color: "var(--primary)", fontWeight: 800 }}>● Online</span>
                  </div>
                </div>

                {/* Messages Container */}
                <div
                  style={{
                    height: "320px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    padding: "0.5rem 0",
                  }}
                  className="chat-messages-container"
                >
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                        maxWidth: "85%",
                        padding: "0.65rem 0.85rem",
                        borderRadius: "var(--radius)",
                        background: msg.sender === "user" ? "var(--primary)" : "var(--surface-soft)",
                        border: msg.sender === "user" ? "none" : "1px solid var(--line)",
                        color: msg.sender === "user" ? "#fff" : "var(--text)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        lineHeight: 1.5,
                        position: "relative",
                        borderBottomRightRadius: msg.sender === "user" ? "4px" : "var(--radius)",
                        borderBottomLeftRadius: msg.sender === "ai" ? "4px" : "var(--radius)",
                      }}
                    >
                      {msg.text}
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.6rem",
                          color: msg.sender === "user" ? "rgba(255,255,255,0.7)" : "var(--muted)",
                          textAlign: "right",
                          marginTop: "0.25rem",
                          fontWeight: 700,
                        }}
                      >
                        {msg.time}
                      </span>
                    </div>
                  ))}

                  {isTyping && (
                    <div
                      style={{
                        alignSelf: "flex-start",
                        padding: "0.5rem 1rem",
                        borderRadius: "var(--radius)",
                        background: "var(--surface-soft)",
                        border: "1px solid var(--line)",
                        color: "var(--muted)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                      }}
                    >
                      Hakim is analyzing...
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem" }}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about acne, hydration, sleep, score..."
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
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      minWidth: "2.75rem",
                      borderRadius: "var(--radius)",
                      padding: 0,
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* TAB 4: WELLNESS LOGGERS */}
            {activeTab === "logs" && (
              <motion.div
                key="tab-logs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid", gap: "1.25rem" }}
              >
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Intake Loggers</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>
                    Log sleep and water daily to automatically recalculate Glow score.
                  </p>
                </div>

                {/* Hydration Log widget */}
                <div className="glass-card" style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Droplets size={18} style={{ color: "var(--sky)" }} />
                      <span style={{ fontSize: "0.85rem", fontWeight: 800 }}>Hydration intake</span>
                    </div>
                    <span style={{ fontSize: "0.9rem", fontWeight: 900, color: "var(--sky)" }}>
                      {waterLogged} / {waterTarget} Cups
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <button
                      onClick={() => adjustWater(-1)}
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "50%",
                        border: "1px solid var(--line)",
                        background: "var(--surface)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    
                    <div style={{ flex: 1, height: "10px", background: "var(--surface-strong)", borderRadius: "999px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${Math.min((waterLogged / waterTarget) * 100, 100)}%`,
                          background: "var(--sky)",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>

                    <button
                      onClick={() => adjustWater(1)}
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "50%",
                        border: "1px solid var(--line)",
                        background: "var(--surface)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Sleep Log widget */}
                <div className="glass-card" style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Moon size={18} style={{ color: "var(--accent)" }} />
                      <span style={{ fontSize: "0.85rem", fontWeight: 800 }}>Sleep duration</span>
                    </div>
                    <span style={{ fontSize: "0.9rem", fontWeight: 900, color: "var(--accent)" }}>
                      {sleepLogged} / {sleepTarget} Hrs
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <button
                      onClick={() => adjustSleep(-0.5)}
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "50%",
                        border: "1px solid var(--line)",
                        background: "var(--surface)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Minus size={14} />
                    </button>

                    <div style={{ flex: 1, height: "10px", background: "var(--surface-strong)", borderRadius: "999px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${Math.min((sleepLogged / sleepTarget) * 100, 100)}%`,
                          background: "var(--accent)",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>

                    <button
                      onClick={() => adjustSleep(0.5)}
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        borderRadius: "50%",
                        border: "1px solid var(--line)",
                        background: "var(--surface)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Logs History */}
                <div className="glass-card" style={{ padding: "1rem" }}>
                  <span style={{ display: "block", fontSize: "0.8rem", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    Recent log records
                  </span>
                  <div style={{ display: "grid", gap: "0.4rem" }}>
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
                          fontSize: "0.75rem",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          background: "var(--surface-soft)",
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

            {/* TAB 5: PREMIUM / UPGRADES */}
            {activeTab === "upgrade" && (
              <motion.div
                key="tab-upgrade"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid", gap: "1.25rem" }}
              >
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Mirror Options</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 600 }}>
                    Select a tier to upgrade your wellness mirror experience.
                  </p>
                </div>

                {/* Billing cycle toggler */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    background: "var(--surface-soft)",
                    border: "1px solid var(--line)",
                    padding: "0.25rem",
                    borderRadius: "999px",
                    width: "fit-content",
                    marginInline: "auto",
                  }}
                >
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    style={{
                      padding: "0.35rem 1rem",
                      borderRadius: "999px",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      background: billingCycle === "monthly" ? "var(--primary)" : "transparent",
                      color: billingCycle === "monthly" ? "#fff" : "var(--muted)",
                    }}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("yearly")}
                    style={{
                      padding: "0.35rem 1rem",
                      borderRadius: "999px",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      background: billingCycle === "yearly" ? "var(--primary)" : "transparent",
                      color: billingCycle === "yearly" ? "#fff" : "var(--muted)",
                    }}
                  >
                    Yearly (Save 20%)
                  </button>
                </div>

                {/* Pricing Cards */}
                <div style={{ display: "grid", gap: "1rem" }}>
                  {[
                    {
                      name: "GlowAI Pro",
                      price: billingCycle === "monthly" ? "$19.99" : "$15.99",
                      period: "/mo",
                      popular: true,
                      desc: "Integrates with physical smart mirror attachments.",
                      features: ["HD Telemetry Diagnostics", "Unlimited Hakim AI Consultation", "Hardware mirror overlay integration"],
                    },
                    {
                      name: "GlowAI Studio",
                      price: billingCycle === "monthly" ? "$49.99" : "$39.99",
                      period: "/mo",
                      popular: false,
                      desc: "Standalone double-sided touch-screen glass mirror.",
                      features: ["Premium Hardware Included", "Dermatology coach priority hotline", "Multifamily profile tracking"],
                    },
                  ].map((tier) => (
                    <div
                      key={tier.name}
                      className="glass-card"
                      style={{
                        padding: "1.25rem",
                        position: "relative",
                        borderWidth: tier.popular ? "2px" : "1px",
                        borderColor: tier.popular ? "var(--primary)" : "var(--line)",
                      }}
                    >
                      {tier.popular && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: "1rem",
                            background: "var(--primary)",
                            color: "#fff",
                            fontSize: "0.6rem",
                            fontWeight: 900,
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                          }}
                        >
                          MOST POPULAR
                        </span>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <div>
                          <h4 style={{ fontSize: "0.95rem", fontWeight: 900 }}>{tier.name}</h4>
                          <p style={{ fontSize: "0.7rem", color: "var(--muted)", fontWeight: 600 }}>{tier.desc}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--primary)" }}>{tier.price}</span>
                          <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>{tier.period}</span>
                        </div>
                      </div>

                      <div style={{ display: "grid", gap: "0.35rem", margin: "1rem 0" }}>
                        {tier.features.map((f, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", fontWeight: 600 }}>
                            <Check size={10} style={{ color: "var(--primary)" }} />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      {isUpgraded ? (
                        <button
                          disabled
                          className="btn btn-secondary"
                          style={{ width: "100%", minHeight: "2.5rem", fontSize: "0.78rem" }}
                        >
                          Currently Active
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowUpgradeModal(true)}
                          className="btn btn-primary"
                          style={{ width: "100%", minHeight: "2.5rem", fontSize: "0.78rem" }}
                        >
                          Upgrade Now
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic App Navigation Footer */}
        <div
          style={{
            height: "64px",
            background: "var(--surface)",
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "0 0.5rem 8px 0.5rem", // offset for bottom frame edge
            zIndex: 25,
          }}
        >
          {[
            { id: "home", label: "Home", icon: <Award size={18} /> },
            { id: "scan", label: "Scan", icon: <Camera size={18} /> },
            { id: "hakim", label: "Hakim AI", icon: <Bot size={18} /> },
            { id: "logs", label: "Logs", icon: <Droplets size={18} /> },
            { id: "upgrade", label: "Premium", icon: <Sparkles size={18} /> },
          ].map((tab) => {
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
                <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.01em" }}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Upgrade Checkout Dialog Modal */}
        <AnimatePresence>
          {showUpgradeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.75)",
                display: "grid",
                placeItems: "center",
                zIndex: 100,
                padding: "1rem",
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                className="glass-card"
                style={{
                  padding: "1.5rem",
                  width: "100%",
                  maxWidth: "320px",
                  background: "var(--surface)",
                }}
              >
                <h4 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>Upgrade Checkout</h4>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: "1rem", fontWeight: 600 }}>
                  Enter mock payment details to confirm your Pro Upgrade.
                </p>

                <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Card number</label>
                    <input
                      type="text"
                      defaultValue="4242 4242 4242 4242"
                      disabled
                      style={{ width: "100%", height: "2.5rem", padding: "0 0.75rem", border: "1px solid var(--line)", background: "var(--surface-soft)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: "0.85rem", fontWeight: 700 }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        disabled
                        style={{ width: "100%", height: "2.5rem", padding: "0 0.75rem", border: "1px solid var(--line)", background: "var(--surface-soft)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: "0.85rem", fontWeight: 700 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>CVC</label>
                      <input
                        type="password"
                        defaultValue="999"
                        disabled
                        style={{ width: "100%", height: "2.5rem", padding: "0 0.75rem", border: "1px solid var(--line)", background: "var(--surface-soft)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: "0.85rem", fontWeight: 700 }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    disabled={isLoadingUpgrade}
                    onClick={handleUpgrade}
                    className="btn btn-primary"
                    style={{ flex: 1, minHeight: "2.5rem", fontSize: "0.78rem" }}
                  >
                    {isLoadingUpgrade ? "Processing..." : "Pay & Upgrade"}
                  </button>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="btn btn-secondary"
                    style={{ minHeight: "2.5rem", fontSize: "0.78rem" }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global CSS declarations for Custom Transitions and animations */}
      <style jsx global>{`
        @keyframes scanLaser {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }

        /* Responsive adjustments for device frame */
        @media (max-width: 480px) {
          .desktop-frame-controls {
            display: none !important;
          }
          .phone-shell {
            width: 100% !important;
            height: 100vh !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .phone-shell-disabled {
            height: 100vh !important;
          }
          body {
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
