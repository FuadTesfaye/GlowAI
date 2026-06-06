"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  Compass,
  Layers,
  Camera,
  Cpu,
  RefreshCw,
  GitBranch,
  TrendingUp,
  ListTodo,
  Server,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Bot
} from "lucide-react";

export default function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Entry & Identity",
      subtitle: "Timeline Initialization",
      icon: <UserCheck className="text-primary" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            Establishes a persistent wellness timeline so future scans can be compared against baseline metrics.
          </p>
          <div className="table-wrapper">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>User Action</th>
                  <th>System Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Open GlowAI (web app in Next.js)</td>
                  <td>Load profile, consent status, and latest Glow Score if available</td>
                </tr>
                <tr>
                  <td>Sign in / create account</td>
                  <td>Create user record and wellness history</td>
                </tr>
                <tr>
                  <td>Grant camera/photo permissions</td>
                  <td>Enable selfie upload workflow</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: "2. Onboarding Baseline",
      subtitle: "User Personalization Profile",
      icon: <Compass className="text-accent" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            User completes a short setup wizard to configure core skincare constraints and goals.
          </p>
          <div className="table-wrapper">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Example Inputs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Skin profile</strong></td>
                  <td>Oily / Dry / Combination / Sensitive</td>
                </tr>
                <tr>
                  <td><strong>Primary concerns</strong></td>
                  <td>Acne, dark circles, dryness, pigmentation, fatigue</td>
                </tr>
                <tr>
                  <td><strong>Lifestyle profile</strong></td>
                  <td>Student, employee, freelancer, athlete</td>
                </tr>
                <tr>
                  <td><strong>Goals</strong></td>
                  <td>Clear acne, improve glow, sleep better, reduce stress</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="output-badge">
            <strong>Output:</strong> Baseline user profile used by later AI systems
          </div>
        </div>
      ),
    },
    {
      title: "3. Wellness Assessment",
      subtitle: "Five Core Scoring Modules",
      icon: <Layers className="text-sky" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            Continuous daily questionnaires generate a multidimensional wellness score.
          </p>
          <div className="table-wrapper">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Module</th>
                  <th>What It Measures</th>
                  <th>Output Metric</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sleep</td>
                  <td>Duration, quality, consistency</td>
                  <td><span className="badge sleep">Sleep Score</span></td>
                </tr>
                <tr>
                  <td>Hydration</td>
                  <td>Water intake, caffeine, soft drinks</td>
                  <td><span className="badge hydration">Hydration Score</span></td>
                </tr>
                <tr>
                  <td>Nutrition</td>
                  <td>Fruits, vegetables, sugar, fast food</td>
                  <td><span className="badge nutrition">Nutrition Score</span></td>
                </tr>
                <tr>
                  <td>Stress</td>
                  <td>Workload, anxiety, fatigue, mood</td>
                  <td><span className="badge stress">Stress Score</span></td>
                </tr>
                <tr>
                  <td>Activity</td>
                  <td>Exercise frequency, movement, sedentary time</td>
                  <td><span className="badge activity">Activity Score</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="output-badge">
            <strong>Output:</strong> Structured wellness assessment vector
          </div>
        </div>
      ),
    },
    {
      title: "4. Selfie Validation",
      subtitle: "Biometric Verification",
      icon: <Camera className="text-rose" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            Biometric quality validation filters noise out before calling AI computer vision pipelines.
          </p>
          <div className="validation-checks">
            <div className="check-card">
              <ShieldCheck className="icon-check" />
              <span>Face Detected</span>
            </div>
            <div className="check-card">
              <ShieldCheck className="icon-check" />
              <span>Image Resolution Sufficient</span>
            </div>
            <div className="check-card">
              <ShieldCheck className="icon-check" />
              <span>Lighting Acceptable</span>
            </div>
            <div className="check-card">
              <ShieldCheck className="icon-check" />
              <span>Single Face Present</span>
            </div>
          </div>
          <div className="warning-note">
            <AlertTriangle size={14} />
            <span>If validation fails, the user is automatically prompted to retake the photo.</span>
          </div>
        </div>
      ),
    },
    {
      title: "5. AI Skin Analysis",
      subtitle: "Computer Vision Pipeline",
      icon: <Cpu className="text-primary" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            Selfie file is fed to custom Skin Vision AI networks to detect target dermal variables.
          </p>
          <div className="table-wrapper">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Signal Detected</th>
                  <th>Example Output</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Acne</strong></td>
                  <td>Severity + distribution metrics</td>
                </tr>
                <tr>
                  <td><strong>Dark circles</strong></td>
                  <td>Darkness + coverage area index</td>
                </tr>
                <tr>
                  <td><strong>Dryness</strong></td>
                  <td>Texture / dullness indicators</td>
                </tr>
                <tr>
                  <td><strong>Oiliness</strong></td>
                  <td>Shine / pore visibility indicators</td>
                </tr>
                <tr>
                  <td><strong>Skin fatigue</strong></td>
                  <td>Tired appearance / eye strain indicators</td>
                </tr>
                <tr>
                  <td><strong>Tone uniformity</strong></td>
                  <td>Pigmentation / redness consistency</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="output-badge">
            <strong>Output:</strong> Structured skin telemetry report + confidence scores
          </div>
        </div>
      ),
    },
    {
      title: "6. Correlation Engine",
      subtitle: "The Breakthrough Layer",
      icon: <GitBranch className="text-accent" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            <strong>Our Core Differentiator:</strong> Correlates lifestyle habits and sleep charts directly with skin biometrics.
          </p>
          <div className="table-wrapper">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Observed Pattern</th>
                  <th>Generated Insight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dark circles + Sleep Score 45</td>
                  <td className="insight-text">"Sleep deprivation may be contributing to eye appearance."</td>
                </tr>
                <tr>
                  <td>Acne + high sugar intake + high stress</td>
                  <td className="insight-text">"Lifestyle factors may be contributing to flare-ups."</td>
                </tr>
                <tr>
                  <td>Dryness + low water intake</td>
                  <td className="insight-text">"Hydration may be contributing to dryness."</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="warning-note info">
            <ShieldCheck size={14} className="text-primary" />
            <span>Important: These are wellness correlations, not medical diagnoses.</span>
          </div>
        </div>
      ),
    },
    {
      title: "7. Glow Score™",
      subtitle: "Scoring Normalization",
      icon: <Activity className="text-sky" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            Normalizes input data vector and projects a composite 0–100 score.
          </p>
          <div className="formula-box">
            <span className="formula-title">Glow Score Formula</span>
            <code className="formula-code">Glow Score = (Skin Health * 0.4) + (Sleep * 0.15) + (Hydration * 0.15) + (Nutrition * 0.1) + (Stress * 0.1) + (Activity * 0.1)</code>
          </div>
          
          <div className="table-wrapper">
            <table className="workflow-table text-center">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Skin Health</th>
                  <th>Sleep</th>
                  <th>Hydration</th>
                  <th>Nutrition</th>
                  <th>Stress</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Example</strong></td>
                  <td>78</td>
                  <td>60</td>
                  <td>75</td>
                  <td>70</td>
                  <td>55</td>
                  <td>80</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bands-grid">
            <div className="band poor">0–40 <span>Poor</span></div>
            <div className="band improve">41–60 <span>Needs Improvement</span></div>
            <div className="band healthy">61–80 <span>Healthy</span></div>
            <div className="band radiant">81–100 <span>Radiant</span></div>
          </div>
        </div>
      ),
    },
    {
      title: "8. Hakim AI Coach",
      subtitle: "Personalized Explanation",
      icon: <Bot className="text-rose" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            Translates raw telemetry numbers into human-readable clinical coaching reports.
          </p>
          <div className="chat-demo-bubble">
            <div className="avatar">H</div>
            <div className="text">
              <strong>Dr. Hakim AI</strong>
              <p>
                "Your acne appears concentrated around the jawline. Combined with elevated stress levels and frequent sugary drink consumption, these factors may be contributing to flare-ups. I recommend focusing on stress management and reducing sugar intake for two weeks."
              </p>
            </div>
          </div>
          <div className="bullets-grid">
            <div className="bullet-point">✓ Human-readable explanations</div>
            <div className="bullet-point">✓ Confidence-aware language</div>
            <div className="bullet-point">✓ Actionable recommendations</div>
            <div className="bullet-point">✓ Contextual follow-ups</div>
          </div>
        </div>
      ),
    },
    {
      title: "9. Future Glow Forecast",
      subtitle: "Predictive Simulation Layer",
      icon: <TrendingUp className="text-primary" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            Simulates behavior scenarios to make future consequences visible before they happen.
          </p>
          <div className="table-wrapper">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>30-Day Projection</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Current Habits</strong></td>
                  <td>More fatigue, increased dark circles, higher acne risk (Glow Score: 48)</td>
                </tr>
                <tr>
                  <td><strong>Recommended Habits</strong></td>
                  <td className="text-primary">Reduced inflammation, brighter appearance, better recovery (Glow Score: 87)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: "10. Action Plan",
      subtitle: "Linked Task Generation",
      icon: <ListTodo className="text-accent" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            Converts assessment insights into actionable daily checklist items.
          </p>
          <div className="table-wrapper">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Recommendation</th>
                  <th>Linked Root-Cause Issue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sleep</td>
                  <td>Sleep before 11 PM consistently</td>
                  <td>Low Sleep Score, dark circles</td>
                </tr>
                <tr>
                  <td>Hydration</td>
                  <td>2.5 L water daily</td>
                  <td>Dryness indicators</td>
                </tr>
                <tr>
                  <td>Nutrition</td>
                  <td>Reduce sugary drinks</td>
                  <td>Acne + sugar pattern</td>
                </tr>
                <tr>
                  <td>Stress</td>
                  <td>10-minute breathing exercise</td>
                  <td>High Stress Score</td>
                </tr>
                <tr>
                  <td>Skincare</td>
                  <td>Use SPF daily</td>
                  <td>Tone / pigmentation risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: "11. Re-Scan Loop",
      subtitle: "Streaks & Retention",
      icon: <RefreshCw className="text-sky" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            User completes tasks and re-scans, driving long-term behavioral changes.
          </p>
          <div className="re-scan-cards">
            <div className="card-item">
              <span className="num">01</span>
              <strong>Daily Check-ins</strong>
              <p>User logs sleep and water intake; scores recalculate instantly.</p>
            </div>
            <div className="card-item">
              <span className="num">02</span>
              <strong>Weekly Scans</strong>
              <p>User captures weekly photos. AI compares progress against baseline.</p>
            </div>
            <div className="card-item">
              <span className="num">03</span>
              <strong>Streaks & Badges</strong>
              <p>Encourages retention through hydration progress and logs streaks.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "12. High-Level Architecture",
      subtitle: "System Separation Node",
      icon: <Server className="text-rose" />,
      content: (
        <div className="workflow-detail">
          <p className="description">
            Built for modular performance. Separates high-frequency frontend rendering from heavy AI processing.
          </p>
          <div className="arch-boxes">
            <div className="arch-node frontend">
              <strong>Frontend UX (Next.js)</strong>
              <p>UI rendering, inputs logging, user webcam streams, and chatbot viewports.</p>
            </div>
            <div className="arch-node backend">
              <strong>AI Cloud Backend Services</strong>
              <p>Face validation, Skin Vision AI inference, and predictive trajectory forecasting.</p>
            </div>
          </div>
          <div className="safety-warning">
            <strong>Safety boundary:</strong> Presents wellness correlations and predictions. It does not provide medical diagnoses.
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section id="workflow" className="section-padding" style={{ position: "relative", zIndex: 20 }}>
      <div className="container">
        {/* Header */}
        <div className="section-header text-center" style={{ marginBottom: "3rem" }}>
          <span className="badge-pill">Operational Pipeline</span>
          <h2 className="section-title" style={{ marginTop: "0.5rem" }}>End-to-End Core Workflow</h2>
          <p className="section-desc" style={{ maxWidth: "600px", marginInline: "auto" }}>
            The 12-step engineering roadmap of the GlowAI platform, from initial entry to computer vision analysis and predictive forecasting.
          </p>
        </div>

        {/* Deck Grid */}
        <div className="workflow-deck-grid glass-card">
          
          {/* Vertical Step Sidebar */}
          <div className="workflow-sidebar">
            <div className="sidebar-scroll-wrapper">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`step-nav-btn ${activeStep === idx ? "active" : ""}`}
                >
                  <span className="step-num">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="step-text-col">
                    <span className="step-label">{step.title.replace(/^\d+\.\s*/, "")}</span>
                    <span className="step-sublabel">{step.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Panel Card Viewport */}
          <div className="workflow-viewport">
            <div className="viewport-header">
              <div className="icon-wrapper">
                {steps[activeStep].icon}
              </div>
              <div>
                <h3 className="slide-title">{steps[activeStep].title}</h3>
                <span className="slide-subtitle">{steps[activeStep].subtitle}</span>
              </div>
            </div>

            <div className="viewport-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: "100%" }}
                >
                  {steps[activeStep].content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="viewport-footer">
              <span className="slide-pagination-text">
                Slide <strong>{activeStep + 1}</strong> of {steps.length}
              </span>
              <div className="slide-controls">
                <button onClick={handlePrev} className="btn-control" title="Previous Slide">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={handleNext} className="btn-control" title="Next Slide">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Styled component scoped rules */}
      <style jsx global>{`
        .workflow-deck-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 540px;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(18, 30, 26, 0.45);
          backdrop-filter: blur(16px);
          border: 1px solid var(--line);
        }

        .workflow-sidebar {
          background: rgba(10, 17, 15, 0.6);
          border-right: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          max-height: 580px;
          overflow-y: auto;
        }

        .sidebar-scroll-wrapper {
          display: grid;
          padding: 1rem 0.75rem;
          gap: 0.35rem;
        }

        .step-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem 0.85rem;
          border-radius: 6px;
          background: transparent;
          border: none;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
        }

        .step-nav-btn:hover {
          background: rgba(238, 248, 242, 0.04);
          color: var(--text);
        }

        .step-nav-btn.active {
          background: var(--surface-strong);
          color: var(--primary);
        }

        .step-nav-btn .step-num {
          font-family: monospace;
          font-size: 0.75rem;
          font-weight: 800;
          opacity: 0.6;
          border: 1px solid currentColor;
          width: 1.65rem;
          height: 1.65rem;
          border-radius: 4px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .step-text-col {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .step-label {
          font-size: 0.8rem;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .step-sublabel {
          font-size: 0.65rem;
          opacity: 0.7;
          margin-top: 0.05rem;
          font-weight: 600;
        }

        /* Viewport panel details */
        .workflow-viewport {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: transparent;
        }

        .viewport-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid var(--line);
          padding-bottom: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .viewport-header .icon-wrapper {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 8px;
          background: rgba(238, 248, 242, 0.05);
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border: 1px solid var(--line);
        }

        .slide-title {
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .slide-subtitle {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 700;
        }

        .viewport-body {
          flex: 1;
          display: flex;
          align-items: flex-start;
        }

        .workflow-detail .description {
          font-size: 0.85rem;
          color: var(--muted);
          font-weight: 600;
          line-height: 1.5;
          margin: 0 0 1.25rem 0;
        }

        /* Presentation tables */
        .table-wrapper {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid var(--line);
          background: rgba(10, 17, 15, 0.3);
          margin-bottom: 1rem;
        }

        .workflow-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.78rem;
          text-align: left;
        }

        .workflow-table th {
          background: rgba(238, 248, 242, 0.04);
          color: var(--text);
          font-weight: 800;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--line);
          text-transform: uppercase;
          font-size: 0.65rem;
          letter-spacing: 0.05em;
        }

        .workflow-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--line);
          color: var(--muted);
          font-weight: 600;
          line-height: 1.4;
        }

        .workflow-table tr:last-child td {
          border-bottom: none;
        }

        .workflow-table td.insight-text {
          font-style: italic;
          color: var(--text);
        }

        .workflow-table.text-center th,
        .workflow-table.text-center td {
          text-align: center;
        }

        /* Badges */
        .badge {
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          display: inline-block;
        }
        .badge.sleep { background: var(--accent-glow); color: var(--accent); }
        .badge.hydration { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
        .badge.nutrition { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
        .badge.stress { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
        .badge.activity { background: var(--primary-glow); color: var(--primary); }

        .output-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          background: var(--primary-glow);
          color: var(--primary);
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          border: 1px solid rgba(15, 125, 92, 0.3);
          font-weight: 700;
        }

        /* Validation Step cards */
        .validation-checks {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .check-card {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: rgba(238, 248, 242, 0.02);
          border: 1px solid var(--line);
          padding: 0.85rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 800;
        }

        .check-card .icon-check {
          color: var(--primary);
          flex-shrink: 0;
          width: 1.1rem;
          height: 1.1rem;
        }

        .warning-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          padding: 0.65rem 0.85rem;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .warning-note.info {
          background: var(--primary-glow);
          border-color: rgba(15, 125, 92, 0.25);
          color: var(--text);
        }

        /* Formula element */
        .formula-box {
          background: #090e0c;
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.25rem;
        }

        .formula-title {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 800;
          margin-bottom: 0.4rem;
        }

        .formula-code {
          font-family: monospace;
          font-size: 0.75rem;
          color: var(--primary);
          word-break: break-all;
          font-weight: 800;
        }

        /* Bands */
        .bands-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .band {
          text-align: center;
          font-size: 0.7rem;
          padding: 0.5rem;
          border-radius: 4px;
          font-weight: 850;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .band.poor { background: rgba(239, 68, 68, 0.15); color: #fca5a5; }
        .band.improve { background: var(--accent-glow); color: var(--accent); }
        .band.healthy { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
        .band.radiant { background: var(--primary-glow); color: var(--primary); }
        .band span { font-size: 0.6rem; opacity: 0.8; font-weight: 700; }

        /* Coach chat balloon mockup */
        .chat-demo-bubble {
          display: flex;
          gap: 0.75rem;
          background: rgba(10, 17, 15, 0.4);
          border: 1px solid var(--line);
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.25rem;
        }

        .chat-demo-bubble .avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: var(--primary);
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 900;
          flex-shrink: 0;
          font-size: 0.8rem;
        }

        .chat-demo-bubble .text {
          font-size: 0.78rem;
          line-height: 1.4;
        }

        .chat-demo-bubble .text strong {
          color: var(--text);
          display: block;
          margin-bottom: 0.2rem;
        }

        .chat-demo-bubble .text p {
          margin: 0;
          color: var(--muted);
          font-weight: 600;
        }

        .bullets-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .bullet-point {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
        }

        /* Re-scan cards */
        .re-scan-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .re-scan-cards .card-item {
          background: rgba(238, 248, 242, 0.02);
          border: 1px solid var(--line);
          padding: 1rem;
          border-radius: 8px;
        }

        .re-scan-cards .card-item .num {
          display: block;
          font-size: 1.15rem;
          font-weight: 900;
          color: var(--primary);
          margin-bottom: 0.4rem;
        }

        .re-scan-cards .card-item strong {
          font-size: 0.8rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .re-scan-cards .card-item p {
          margin: 0;
          font-size: 0.68rem;
          color: var(--muted);
          line-height: 1.35;
          font-weight: 600;
        }

        /* Architecture box nodes */
        .arch-boxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .arch-node {
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid var(--line);
        }

        .arch-node.frontend {
          background: var(--primary-glow);
          border-color: rgba(15, 125, 92, 0.2);
        }

        .arch-node.backend {
          background: var(--accent-glow);
          border-color: rgba(231, 160, 63, 0.2);
        }

        .arch-node strong {
          display: block;
          font-size: 0.78rem;
          margin-bottom: 0.35rem;
        }

        .arch-node p {
          margin: 0;
          font-size: 0.68rem;
          color: var(--muted);
          line-height: 1.4;
          font-weight: 600;
        }

        .safety-warning {
          font-size: 0.72rem;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #fca5a5;
          padding: 0.65rem 0.85rem;
          border-radius: 6px;
          font-weight: 700;
          line-height: 1.4;
        }

        /* Viewport bottom controls */
        .viewport-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--line);
          padding-top: 1.25rem;
          margin-top: 1.5rem;
        }

        .slide-pagination-text {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 700;
        }

        .slide-controls {
          display: flex;
          gap: 0.5rem;
        }

        .btn-control {
          width: 2rem;
          height: 2rem;
          border-radius: 4px;
          border: 1px solid var(--line);
          background: transparent;
          color: var(--text);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-control:hover {
          background: var(--surface-strong);
        }

        /* Mobile overrides */
        @media (max-width: 991px) {
          .workflow-deck-grid {
            grid-template-columns: 1fr;
          }
          .workflow-sidebar {
            border-right: none;
            border-bottom: 1px solid var(--line);
            max-height: 120px;
          }
          .sidebar-scroll-wrapper {
            display: flex;
            padding: 0.5rem;
            overflow-x: auto;
            white-space: nowrap;
          }
          .step-nav-btn {
            padding: 0.5rem 0.75rem;
            width: auto;
          }
          .step-text-col {
            display: none; /* Hide description titles on mobile sidebar scrolling */
          }
        }
        @media (max-width: 600px) {
          .validation-checks, .arch-boxes, .re-scan-cards {
            grid-template-columns: 1fr;
          }
          .bands-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
