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
  ChevronRight,
  ShieldCheck,
  Zap,
  Search,
  ChevronDown,
  Activity,
  User,
  Coffee,
  HelpCircle,
  HelpCircle as QuestionIcon
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
    { id: 1, text: "Hydration warning: You are 4 cups behind your target today.", unread: true },
    { id: 2, text: "Hakim Coach: Cortisol levels indicate moderate jawline stress.", unread: true },
    { id: 3, text: "Weekly update: Radiance score improved +3 points.", unread: false },
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
      text: "Welcome back. I have loaded your biometric profile. How can I assist you with your skin telemetry or habits today?",
      time: "10:00 AM",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

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
  }, []);

  // Update dynamic Glow Score whenever habits, water, or sleep logs change
  useEffect(() => {
    const hydPercent = Math.min((waterLogged / waterTarget) * 100, 100);
    setHydrationScore(Math.round(hydPercent));

    const sleepPercent = Math.min((sleepLogged / sleepTarget) * 100, 100);
    setSleepScore(Math.round(sleepPercent));

    const habitsScore = habits.reduce((sum, h) => sum + (h.checked ? h.score : 0), 0);

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
            nextState ? `Task completed! +${h.score} Glow Score` : `Task unchecked`,
            nextState ? "success" : "info"
          );
          return { ...h, checked: nextState };
        }
        return h;
      })
    );
  };

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
      { progress: 25, msg: "Analyzing moisture distribution..." },
      { progress: 55, msg: "Measuring blood perfusion indexes..." },
      { progress: 80, msg: "Mapping pore and sebum ratios..." },
      { progress: 100, msg: "Diagnostics telemetry completed..." },
    ];

    intervals.forEach((stepItem) => {
      setTimeout(() => {
        setScanProgress(stepItem.progress);
        setScanStatusMsg(stepItem.msg);
        if (stepItem.progress === 100) {
          setTimeout(() => {
            setScanState("result");
            stopCamera();
            triggerToast("Moisture telemetry updated. Score increased!", "success");
          }, 800);
        }
      }, stepItem.progress * 25);
    });
  };

  const applyDiagnosis = () => {
    setGlowScore(84);
    setHydrationScore(90);
    setSleepScore(85);
    setStressScore(35);
    triggerToast("Derm metrics integrated. Glow Score updated to 84/100.", "success");
    setActiveTab("home");
    setScanState("idle");
  };

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
        replyText = "Moisture sensors show low hydration and elevated sebum near the jawline. This correlates with sleep deficit (currently 60%). Recommend salicylic acid wash daily, 8+ hours sleep, and increasing logs to 8 cups.";
      } else if (query.includes("sleep") || query.includes("tired")) {
        replyText = `Your sleep log shows ${sleepLogged} hrs, below target of ${sleepTarget} hrs. Consistent REM cycles are required for epidermis barrier healing. Try limiting screen light 45m before bed.`;
      } else if (query.includes("water") || query.includes("hydrate") || query.includes("dry")) {
        replyText = `Current logs: ${waterLogged}/${waterTarget} cups. Hydration impacts tissue volume and collagen radiance. Increase logs to improve overall telemetry results.`;
      } else if (query.includes("glow") || query.includes("score")) {
        replyText = `Glow Score: ${glowScore}/100. Target status: Radiant (>81). Focus on hydration and check off active tasks to boost this automatically.`;
      } else {
        replyText = `Understood. I recommend completing the daily checklist, logging your hydration logs, and triggering a new face scan on the Mirror Scan page.`;
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

  const handleUpgrade = () => {
    setIsLoadingUpgrade(true);
    setTimeout(() => {
      setIsLoadingUpgrade(false);
      setIsUpgraded(true);
      setShowUpgradeModal(false);
      triggerToast("System updated to GlowAI Pro ✦", "success");
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("glowai_user");
    router.push("/login");
  };

  return (
    <div className="shadcn-layout">
      {/* Toast alert banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: toast.type === "success" ? "var(--primary)" : "var(--surface-strong)",
              color: toast.type === "success" ? "#fff" : "var(--text)",
              border: "1px solid var(--line)",
              padding: "0.5rem 1.25rem",
              borderRadius: "6px",
              boxShadow: "var(--shadow-sm)",
              zIndex: 350,
              fontWeight: 700,
              fontSize: "0.82rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {toast.type === "success" ? "✓" : "ℹ"} {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDEBAR NAVIGATION (Desktop) */}
      <aside className="shadcn-sidebar">
        <div className="sidebar-brand">
          <span className="brand-logo">G</span>
          <span className="brand-name">GlowAI</span>
          <span className="workspace-badge">v1.0</span>
        </div>

        <nav className="sidebar-nav">
          <span className="section-title">Navigation</span>
          <button onClick={() => setActiveTab("home")} className={`nav-link ${activeTab === "home" ? "active" : ""}`}>
            <LayoutDashboardIcon size={16} />
            <span>Overview</span>
          </button>
          <button onClick={() => setActiveTab("scan")} className={`nav-link ${activeTab === "scan" ? "active" : ""}`}>
            <Camera size={16} />
            <span>Mirror Telemetry</span>
          </button>
          <button onClick={() => setActiveTab("hakim")} className={`nav-link ${activeTab === "hakim" ? "active" : ""}`}>
            <Bot size={16} />
            <span>Hakim AI Chat</span>
          </button>
          <button onClick={() => setActiveTab("logs")} className={`nav-link ${activeTab === "logs" ? "active" : ""}`}>
            <Droplets size={16} />
            <span>Daily Intake Logs</span>
          </button>
          <button onClick={() => setActiveTab("upgrade")} className={`nav-link ${activeTab === "upgrade" ? "active" : ""}`}>
            <Sparkles size={16} />
            <span>Premium Upgrade</span>
          </button>
        </nav>

        {/* User Card at bottom */}
        <div className="sidebar-footer">
          <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <span className="name">{userName}</span>
            <span className="role">{isUpgraded ? "Pro Tier" : "Standard Tier"}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout" title="Sign out">
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE MAIN CONTAINER */}
      <div className="shadcn-main">
        {/* TOP NAVBAR HEADER */}
        <header className="shadcn-header">
          {/* Left search */}
          <div className="search-bar">
            <Search size={15} className="search-icon" />
            <input type="text" placeholder="Search workspace..." disabled />
            <kbd className="cmd-k">⌘K</kbd>
          </div>

          {/* Right actions */}
          <div className="header-actions">
            {/* Notification bell */}
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) clearNotifications();
              }}
              className="action-btn"
            >
              <Bell size={16} />
              {notifications.some((n) => n.unread) && <span className="alert-dot" />}
            </button>

            {/* User Dropdown */}
            <div className="user-dropdown">
              <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
              <span className="username">{userName}</span>
              <ChevronDown size={14} />
            </div>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="notifications-popover"
                >
                  <div className="popover-header">
                    <span>Notifications</span>
                    <button onClick={() => setShowNotifications(false)}>Clear</button>
                  </div>
                  <div className="popover-list">
                    {notifications.map((n) => (
                      <div key={n.id} className={`popover-item ${n.unread ? "unread" : ""}`}>
                        {n.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* SCROLLABLE MAIN DASHBOARD WINDOW */}
        <main className="shadcn-content">
          <div className="content-header">
            <div>
              <h1 className="page-title">Dashboard Overview</h1>
              <p className="page-subtitle">Track, scan, and consult bio-telemetry reports in real time.</p>
            </div>
            
            {/* Action controls */}
            <div className="action-row">
              <button onClick={() => setActiveTab("scan")} className="btn btn-primary">
                <Camera size={14} />
                New Telemetry Scan
              </button>
            </div>
          </div>

          {/* 4-COLUMN TOP STAT CARDS (REAL SHADCN STYLE) */}
          <section className="stat-cards-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Glow Score</span>
                <Award size={15} className="stat-icon" />
              </div>
              <div className="stat-value">{glowScore} <span className="stat-max">/100</span></div>
              <p className="stat-desc">
                <span className="trend-green">▲ 4%</span> from last week
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Hydration Intake</span>
                <Droplets size={15} className="stat-icon text-sky" />
              </div>
              <div className="stat-value">{waterLogged} <span className="stat-max">/ {waterTarget} Cups</span></div>
              <p className="stat-desc">
                <span className="trend-grey">{Math.round((waterLogged / waterTarget) * 100)}%</span> of daily target
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Sleep Duration</span>
                <Moon size={15} className="stat-icon text-accent" />
              </div>
              <div className="stat-value">{sleepLogged} <span className="stat-max">/ {sleepTarget} Hours</span></div>
              <p className="stat-desc">
                <span className="trend-red">▼ 1.5 hrs</span> from optimal target
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Stress Margin</span>
                <Activity size={15} className="stat-icon text-rose" />
              </div>
              <div className="stat-value">{stressScore} <span className="stat-max">/100</span></div>
              <p className="stat-desc">
                <span className="trend-green">Low</span> jawline cortisol markers
              </p>
            </div>
          </section>

          {/* MAIN TABS VIEWS */}
          <div className="tab-view-container">
            <AnimatePresence mode="wait">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "home" && (
                <motion.div
                  key="tab-home"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="dashboard-columns"
                >
                  {/* Left Column (Chart/Analytics) */}
                  <div className="column-left">
                    <div className="panel-card">
                      <div className="panel-header">
                        <div>
                          <h3 className="panel-title">Skin Radiance Projection</h3>
                          <p className="panel-desc">Calculated cell turnover rates and moisture signals.</p>
                        </div>
                        <TrendingUp size={16} className="text-muted" />
                      </div>
                      
                      {/* Clean CSS Chart */}
                      <div className="chart-wrapper">
                        <div className="chart-grid-lines">
                          <div className="grid-line" />
                          <div className="grid-line" />
                          <div className="grid-line" />
                        </div>
                        
                        <div className="chart-bars">
                          {[58, 62, 60, 65, 69, 74, glowScore, glowScore + 3, glowScore + 7, glowScore + 11].map((val, idx) => (
                            <div key={idx} className="chart-bar-container">
                              <div
                                className={`chart-bar-fill ${idx === 6 ? "highlight" : ""}`}
                                style={{ height: `${val}%` }}
                              >
                                <span className="tooltip">{val}</span>
                              </div>
                              <span className="bar-label">{idx + 1}d</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="panel-footer-info">
                        <Sparkles size={14} className="text-primary" />
                        <span>Consistent task completion will boost overall score to <strong>{glowScore + 11}</strong> in 10 days.</span>
                      </div>
                    </div>

                    {/* Contributors panel */}
                    <div className="panel-card" style={{ marginTop: "1.25rem" }}>
                      <div className="panel-header">
                        <div>
                          <h3 className="panel-title">Biometric Factors</h3>
                          <p className="panel-desc">Score weights based on active logs.</p>
                        </div>
                      </div>
                      <div className="factors-list">
                        {[
                          { label: "Hydration Status", value: hydrationScore, color: "var(--sky)" },
                          { label: "Sleep Recovery", value: sleepScore, color: "var(--accent)" },
                          { label: "Skin Telemetry", value: glowScore > 78 ? 84 : 75, color: "var(--primary)" },
                          { label: "Cortisol Response", value: stressScore, color: "var(--rose)" },
                        ].map((stat) => (
                          <div key={stat.label} className="factor-row">
                            <div className="factor-info">
                              <span className="factor-label">{stat.label}</span>
                              <span className="factor-value" style={{ color: stat.color }}>{stat.value}%</span>
                            </div>
                            <div className="progress-bar-track">
                              <div className="progress-bar-fill" style={{ width: `${stat.value}%`, background: stat.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Checklist) */}
                  <div className="column-right">
                    <div className="panel-card">
                      <div className="panel-header">
                        <div>
                          <h3 className="panel-title">Daily Checklist</h3>
                          <p className="panel-desc">Check tasks to sync with smart mirror telemetry.</p>
                        </div>
                        <span className="badge-pill">
                          {habits.filter(h => h.checked).length} / {habits.length} Done
                        </span>
                      </div>

                      <div className="checklist-items">
                        {habits.map((h) => (
                          <div
                            key={h.id}
                            onClick={() => toggleHabit(h.id)}
                            className={`checklist-item ${h.checked ? "checked" : ""}`}
                          >
                            <div className="checkbox-trigger">
                              {h.checked && <Check size={10} />}
                            </div>
                            <span className="checklist-text">{h.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MIRROR TELEMETRY SCAN */}
              {activeTab === "scan" && (
                <motion.div
                  key="tab-scan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="dashboard-columns"
                >
                  {/* Left block: camera circular stream viewport */}
                  <div className="column-left">
                    <div className="panel-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px", background: "#060a08" }}>
                      <div className="circular-camera-view" style={{ borderColor: scanState === "scanning" ? "var(--primary)" : "var(--line)" }}>
                        {scanState !== "result" && (
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="video-element"
                            style={{ display: hasCamera && (scanState === "streaming" || scanState === "scanning") ? "block" : "none" }}
                          />
                        )}

                        {(!hasCamera || scanState === "idle" || scanState === "requesting") && scanState !== "result" && (
                          <div className="fallback-placeholder">
                            <Camera size={38} className="text-muted" />
                            <span>Mirror Camera Idle</span>
                          </div>
                        )}

                        {scanState === "scanning" && (
                          <>
                            <div className="laser-beam" />
                            <div className="focus-brackets" />
                          </>
                        )}

                        {scanState === "result" && (
                          <div className="scan-success-icon">
                            <ShieldCheck size={44} className="text-primary" />
                            <span>Capture Sync</span>
                          </div>
                        )}
                      </div>

                      <div className="camera-controls-wrapper">
                        {scanState === "idle" && (
                          <button onClick={startCamera} className="btn btn-primary" style={{ width: "100%" }}>
                            <Camera size={14} /> Connect Mirror Camera
                          </button>
                        )}

                        {scanState === "streaming" && (
                          <div className="button-group">
                            <button onClick={triggerScan} className="btn btn-primary" style={{ flex: 1 }}>
                              <Sparkles size={14} /> Analyze Biometrics
                            </button>
                            <button onClick={stopCamera} className="btn btn-secondary">
                              Disconnect
                            </button>
                          </div>
                        )}

                        {scanState === "scanning" && (
                          <div style={{ textAlign: "center", width: "100%" }}>
                            <div className="progress-bar-track" style={{ height: "4px", marginBottom: "0.5rem" }}>
                              <div className="progress-bar-fill" style={{ width: `${scanProgress}%` }} />
                            </div>
                            <span className="scanner-status">{scanStatusMsg}</span>
                          </div>
                        )}

                        {scanState === "result" && (
                          <button onClick={() => setScanState("streaming")} className="btn btn-secondary" style={{ width: "100%" }}>
                            Recapture Signals
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right block: Diagnostics breakdown */}
                  <div className="column-right">
                    <div className="panel-card" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div className="panel-header">
                          <div>
                            <h3 className="panel-title">Telemetry Diagnostics</h3>
                            <p className="panel-desc">Clinical dermal moisture & capillary logs.</p>
                          </div>
                        </div>

                        {scanState === "result" ? (
                          <div className="diagnostics-metrics">
                            <div className="metric-row">
                              <span className="label">Dermal Hydration</span>
                              <span className="value text-sky">90% (Optimal)</span>
                            </div>
                            <div className="metric-row">
                              <span className="label">Sebum Lipids</span>
                              <span className="value text-primary">Balanced</span>
                            </div>
                            <div className="metric-row">
                              <span className="label">Pore Dilation</span>
                              <span className="value text-primary">Minimal</span>
                            </div>
                            <div className="metric-row">
                              <span className="label">Cortisol Stress Indicator</span>
                              <span className="value text-rose">3.5 / 10 (Low)</span>
                            </div>
                            <div className="metric-row total">
                              <span className="label">Dynamic Glow Index</span>
                              <span className="value text-accent">84 / 100</span>
                            </div>
                          </div>
                        ) : (
                          <div className="telemetry-empty">
                            No active biometrics found. Connect mirror camera and start telemetry analysis.
                          </div>
                        )}
                      </div>

                      {scanState === "result" && (
                        <button onClick={applyDiagnosis} className="btn btn-primary" style={{ width: "100%", minHeight: "2.75rem", marginTop: "1rem" }}>
                          Sync Telemetry to Dashboard
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: HAKIM AI CHAT */}
              {activeTab === "hakim" && (
                <motion.div
                  key="tab-hakim"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="dashboard-columns"
                >
                  {/* Chat interface card */}
                  <div className="column-left">
                    <div className="panel-card" style={{ display: "flex", flexDirection: "column", height: "460px" }}>
                      <div className="panel-header" style={{ paddingBottom: "0.75rem", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Bot size={16} className="text-primary" />
                          <div>
                            <h3 className="panel-title">Hakim AI Companion</h3>
                            <p className="panel-desc">Holistic wellness & dermatology advisor.</p>
                          </div>
                        </div>
                      </div>

                      {/* Chat messages */}
                      <div className="chat-viewport chat-messages-container">
                        {chatMessages.map((msg, idx) => (
                          <div key={idx} className={`chat-bubble-wrapper ${msg.sender === "user" ? "user-bubble" : "ai-bubble"}`}>
                            <div className="chat-bubble">
                              {msg.text}
                              <span className="time">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="chat-bubble-wrapper ai-bubble">
                            <div className="chat-bubble typing">Hakim AI is writing...</div>
                          </div>
                        )}
                        <div ref={chatEndRef} />
                      </div>

                      {/* Chat form */}
                      <form onSubmit={handleSendMessage} className="chat-form">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Query about skin breakouts, hydration targets..."
                        />
                        <button type="submit" className="btn btn-primary">
                          <ChevronRight size={16} />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Desktop Right Side: Coach Capabilities overview */}
                  <div className="column-right">
                    <div className="panel-card" style={{ height: "100%" }}>
                      <div className="panel-header">
                        <div>
                          <h3 className="panel-title">Dr. Hakim Clinical Core</h3>
                          <p className="panel-desc">Biometric model integration guidelines.</p>
                        </div>
                      </div>

                      <div className="capabilities-vertical-list">
                        {[
                          { title: "Skin Coach", desc: "Correlates stress indices with jawline sebum blocks.", icon: <Sparkles size={14} /> },
                          { title: "Sleep Coach", desc: "Models collagen volume recovery based on REM logs.", icon: <Moon size={14} /> },
                          { title: "Hydration Coach", desc: "Triggers reminders based on dynamic sensor water logging.", icon: <Droplets size={14} /> },
                        ].map((cap, i) => (
                          <div key={i} className="capability-card">
                            <div className="icon-box">{cap.icon}</div>
                            <div className="info">
                              <span className="title">{cap.title}</span>
                              <p className="desc">{cap.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: LOGGERS */}
              {activeTab === "logs" && (
                <motion.div
                  key="tab-logs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="dashboard-columns"
                >
                  <div className="column-left">
                    {/* Water Logger */}
                    <div className="panel-card">
                      <div className="panel-header">
                        <div>
                          <h3 className="panel-title">Hydration Log</h3>
                          <p className="panel-desc">Log cups of water to raise skin volume signals.</p>
                        </div>
                        <Droplets size={16} className="text-sky" />
                      </div>

                      <div className="logger-action-row">
                        <button onClick={() => adjustWater(-1)} className="btn-icon">
                          <Minus size={14} />
                        </button>
                        
                        <div className="progress-bar-track" style={{ height: "8px", flex: 1 }}>
                          <div className="progress-bar-fill" style={{ width: `${Math.min((waterLogged / waterTarget) * 100, 100)}%`, background: "var(--sky)" }} />
                        </div>

                        <button onClick={() => adjustWater(1)} className="btn-icon">
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="logger-status-info">
                        Current intake: <strong>{waterLogged} / {waterTarget} Cups</strong>
                      </div>
                    </div>

                    {/* Sleep Logger */}
                    <div className="panel-card" style={{ marginTop: "1.25rem" }}>
                      <div className="panel-header">
                        <div>
                          <h3 className="panel-title">Sleep Quality Log</h3>
                          <p className="panel-desc">Log sleep duration to accelerate cell turnover.</p>
                        </div>
                        <Moon size={16} className="text-accent" />
                      </div>

                      <div className="logger-action-row">
                        <button onClick={() => adjustSleep(-0.5)} className="btn-icon">
                          <Minus size={14} />
                        </button>
                        
                        <div className="progress-bar-track" style={{ height: "8px", flex: 1 }}>
                          <div className="progress-bar-fill" style={{ width: `${Math.min((sleepLogged / sleepTarget) * 100, 100)}%`, background: "var(--accent)" }} />
                        </div>

                        <button onClick={() => adjustSleep(0.5)} className="btn-icon">
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="logger-status-info">
                        Sleep duration: <strong>{sleepLogged} / {sleepTarget} Hours</strong>
                      </div>
                    </div>
                  </div>

                  {/* History Logs list */}
                  <div className="column-right">
                    <div className="panel-card">
                      <div className="panel-header">
                        <div>
                          <h3 className="panel-title">Log History Sheet</h3>
                          <p className="panel-desc">Logged inputs over the last 3 days.</p>
                        </div>
                      </div>

                      <div className="logs-sheet-table">
                        {[
                          { day: "Yesterday", water: "7 cups", sleep: "7.0 hrs", score: "71" },
                          { day: "2 days ago", water: "8 cups", sleep: "8.0 hrs", score: "74" },
                          { day: "3 days ago", water: "5 cups", sleep: "6.0 hrs", score: "66" },
                        ].map((row, idx) => (
                          <div key={idx} className="table-row">
                            <span className="day">{row.day}</span>
                            <span className="val">💧 {row.water}</span>
                            <span className="val">🌙 {row.sleep}</span>
                            <span className="score text-primary">{row.score} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: PREMIUM UPGRADES */}
              {activeTab === "upgrade" && (
                <motion.div
                  key="tab-upgrade"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ display: "grid", gap: "1.5rem" }}
                >
                  {/* Upgrade plans */}
                  <div className="plans-grid">
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
                      <div key={tier.name} className={`plan-card ${tier.popular ? "popular" : ""}`}>
                        {tier.popular && <span className="popular-badge">RECOMMENDED</span>}

                        <div className="plan-title-row">
                          <h3 className="name">{tier.name}</h3>
                          <div className="price-box">
                            <span className="price">{tier.price}</span>
                            <span className="period">/mo</span>
                          </div>
                        </div>
                        <p className="desc">{tier.desc}</p>

                        <div className="plan-features">
                          {tier.features.map((f, i) => (
                            <div key={i} className="feature-item">
                              <Check size={11} className="check-icon" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>

                        {isUpgraded ? (
                          <button disabled className="btn btn-secondary" style={{ width: "100%", minHeight: "2.75rem" }}>
                            Active Subscription
                          </button>
                        ) : (
                          <button onClick={() => setShowUpgradeModal(true)} className="btn btn-primary" style={{ width: "100%", minHeight: "2.75rem" }}>
                            Subscribe Now
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

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="shadcn-mobile-bottom-nav">
        {navTabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (scanState === "streaming") stopCamera();
                setActiveTab(tab.id);
              }}
              className={`mobile-nav-btn ${active ? "active" : ""}`}
            >
              {tab.icon}
              <span>{tab.id === "upgrade" ? "Premium" : tab.id === "logs" ? "Logs" : tab.id === "hakim" ? "Hakim" : tab.id === "scan" ? "Scan" : "Home"}</span>
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
            className="checkout-modal-backdrop"
          >
            <motion.div
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              className="checkout-modal-card"
            >
              <h4 className="modal-title">Upgrade Checkout</h4>
              <p className="modal-desc">Enter mock details to finalize mirror integration billing.</p>

              <div className="modal-inputs">
                <div className="input-group">
                  <label>Card number</label>
                  <input type="text" defaultValue="4242 4242 4242 4242" disabled />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Expiry</label>
                    <input type="text" defaultValue="12/28" disabled />
                  </div>
                  <div className="input-group">
                    <label>CVC</label>
                    <input type="password" defaultValue="999" disabled />
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button disabled={isLoadingUpgrade} onClick={handleUpgrade} className="btn btn-primary" style={{ flex: 1 }}>
                  {isLoadingUpgrade ? "Charging..." : "Confirm Upgrade"}
                </button>
                <button onClick={() => setShowUpgradeModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// LayoutDashboard icon fallback since lucide sometimes uses alternative names
function LayoutDashboardIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="10" rx="1" />
      <rect width="7" height="5" x="3" y="14" rx="1" />
    </svg>
  );
}
