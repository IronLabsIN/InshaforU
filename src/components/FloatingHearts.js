import React from "react";
import { motion } from "framer-motion";
import { colors } from "../theme";

export default function FloatingHearts({ count = 18 }) {
  const hearts = Array.from({ length: count });
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "hidden" }}>
      {hearts.map((_, i) => {
        const left = Math.random() * 100;
        const size = 18 + Math.random() * 36;
        const delay = Math.random() * 6;
        const duration = 6 + Math.random() * 8;
        return (
          <motion.div
            key={i}
            initial={{ y: "110%", opacity: 0, scale: 0.8 }}
            animate={{ y: "-20%", opacity: [0.9, 0.6, 0], scale: [1, 1.06, 0.98] }}
            transition={{ duration, delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: `${left}%`,
              fontSize: size,
              color: i % 2 ? colors.maroon : "#ff6fa3",
              textShadow: "0 2px 10px rgba(0,0,0,0.35)",
            }}
          >
            ❤️
          </motion.div>
        );
      })}
    </div>
  );
}