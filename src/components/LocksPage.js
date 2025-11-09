import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedLock from "./AnimatedLock";
import SweetMemoryModal from "./SweetMemoryModal";
import FloatingHearts from "./FloatingHearts";
import { colors } from "../theme";

// Import the bundled video (works when video is placed in src/assets)
import videoFile from "../assets/video.mp4";

/*
  LocksPage now owns the unlocked state for all locks.
  When all three are unlocked, SweetMemoryModal is shown.
*/

export default function LocksPage() {
  const navigate = useNavigate();

  const initialLocks = [
    { id: 1, label: "Prajwal's Birthday", code: "2006-06-20", unlocked: false },
    { id: 2, label: "Insha's Birthday", code: "2006-02-22", unlocked: false },
    { id: 3, label: "Anniversary", code: "2024-10-09", unlocked: false },
  ];

  const [locks, setLocks] = useState(initialLocks);
  const [showSweet, setShowSweet] = useState(false);

  // progress percent for the header bar
  const unlockedCount = locks.filter(l => l.unlocked).length;
  const progress = Math.round((unlockedCount / locks.length) * 100);

  function handleUnlock(id) {
    setLocks(prev => prev.map(l => (l.id === id ? { ...l, unlocked: true } : l)));
  }

  useEffect(() => {
    if (locks.every(l => l.unlocked)) {
      // delay briefly so the user sees the final unlock animation
      const t = setTimeout(() => setShowSweet(true), 800);
      return () => clearTimeout(t);
    }
  }, [locks]);

  return (
    <div style={{ minHeight: "100vh", position: "relative", padding: 28, overflowX: "hidden" }}>
      <FloatingHearts count={18} />
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <motion.header initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}>
          <h2 style={{ color: colors.offWhite, fontFamily: "Pacifico, cursive", marginBottom: 6 }}>Unlock the memories</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 12, background: "rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                initial={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                style={{ height: "100%", background: `linear-gradient(90deg, ${colors.maroon}, ${colors.royalBlue})` }}
              />
            </div>
            <div style={{ color: "rgba(255,255,255,0.9)", minWidth: 44, textAlign: "right", fontWeight: 700 }}>{progress}%</div>
          </div>
        </motion.header>

        <motion.main style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 18 }}>
          {locks.map(lock => (
            <AnimatedLock
              key={lock.id}
              id={lock.id}
              label={lock.label}
              code={lock.code}
              unlocked={lock.unlocked}
              onUnlock={() => handleUnlock(lock.id)}
              disabled={false}
            />
          ))}
        </motion.main>

        <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => navigate("/")} style={{
            background: "transparent",
            color: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "8px 14px",
            borderRadius: 10,
            cursor: "pointer"
          }}>Back home</button>

          <div style={{ color: "rgba(255,255,255,0.85)" }}>
            Tip: Open them in order to reveal something special ✨
          </div>
        </div>
      </div>

      <SweetMemoryModal
        isOpen={showSweet}
        onClose={() => setShowSweet(false)}
        onProceed={() => navigate("/proposal")}
        // pass the imported video file URL (bundler-provided)
        videoSrc={videoFile}
        messageLines={[
          "One month today — and countless moments in between.",
          "For every laugh, every quiet talk, every silly memory — thank you.",
          "Insha & Prajwal, here's to forever. 💖"
        ]}
      />
    </div>
  );
}