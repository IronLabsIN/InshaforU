import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { colors } from "../theme";

/*
  AnimatedLock:
  - Accepts id, label, code, unlocked (boolean), onUnlock()
  - If unlocked prop becomes true externally, it shows the unlocked UI
  - When user enters the correct date, it runs a beautiful unlock animation and calls onUnlock()
*/

export default function AnimatedLock({ id, label, code, unlocked: unlockedProp, onUnlock, disabled }) {
  const [input, setInput] = useState("");
  const [localUnlocked, setLocalUnlocked] = useState(Boolean(unlockedProp));
  const [validating, setValidating] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (unlockedProp) setLocalUnlocked(true);
  }, [unlockedProp]);

  function tryUnlock(e) {
    e.preventDefault();
    if (localUnlocked) return;
    setValidating(true);
    // small delay to allow micro-animation
    setTimeout(() => {
      if (input === code) {
        // confirmed: animate unlock then inform parent
        setLocalUnlocked(true);
        // trigger parent callback (LocksPage will already have updated but ensure it)
        onUnlock && onUnlock(id);
      } else {
        // feedback
        setShake(true);
        setTimeout(() => setShake(false), 700);
      }
      setValidating(false);
    }, 480);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: localUnlocked ? -6 : -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
        borderRadius: 18,
        padding: 18,
        boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
        minHeight: 190,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <motion.div
          animate={localUnlocked ? { rotate: -20, y: -8 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            boxShadow: "inset 0 6px 14px rgba(0,0,0,0.3)"
          }}
        >
          <motion.div animate={localUnlocked ? { scale: 1.06 } : { scale: 1 }} style={{ fontSize: 36 }}>
            {localUnlocked ? "🔓" : "🔒"}
          </motion.div>
        </motion.div>

        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,0.95)" }}>{label}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.62)" }}>Enter the special date</div>
        </div>
      </div>

      <div>
        {localUnlocked ? (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: 8 }}>
            <div style={{ color: "#ffd36b", fontWeight: 800, marginBottom: 8 }}>Unlocked</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>Nice! Keep going to reveal the surprise.</div>
          </motion.div>
        ) : (
          <form onSubmit={tryUnlock} style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
            <motion.input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="date"
              whileFocus={{ scale: 1.01 }}
              animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.6 }}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.02)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.04)",
                outline: "none",
                minWidth: 170,
                boxShadow: "inset 0 8px 18px rgba(0,0,0,0.45)",
              }}
              disabled={disabled || validating}
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              style={{
                background: `linear-gradient(90deg, ${colors.royalBlue}, ${colors.maroon})`,
                border: 0,
                padding: "10px 14px",
                borderRadius: 12,
                color: "white",
                fontWeight: 800,
                cursor: "pointer"
              }}
              disabled={disabled || validating}
            >
              {validating ? "…" : "Unlock"}
            </motion.button>
          </form>
        )}
      </div>
    </motion.div>
  );
}