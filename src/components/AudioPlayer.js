import React, { useState, useRef, useEffect } from "react";
import { colors } from "../theme";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    // autoplay may be blocked in some browsers; attempt play once mounted
    const a = audioRef.current;
    if (a) {
      a.volume = 0.16;
      a.play().catch(() => {});
    }
  }, []);
  return (
    <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 9999 }}>
      <audio ref={audioRef} loop src="/sahiba.mp3" />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const a = audioRef.current;
          if (!a) return;
          if (muted) {
            a.muted = false;
            setMuted(false);
            a.play().catch(() => {});
          } else {
            a.muted = true;
            setMuted(true);
          }
        }}
        style={{
          borderRadius: 12,
          padding: "10px 14px",
          background: muted ? "rgba(255,255,255,0.08)" : colors.royalBlue,
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.12)",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
        }}
        title={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? "🔇" : "🎵"} Sahiba
      </motion.button>
    </div>
  );
}