import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme";
import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", paddingTop: 48 }}>
      <FloatingHearts />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 20px", textAlign: "center", position: "relative", zIndex: 5 }}>
        <motion.h1
          initial={{ y: -40, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          style={{ fontFamily: "Pacifico, cursive", color: colors.offWhite, fontSize: 48, marginBottom: 4 }}
        >
          Insha & Prajwal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.7 }}
          style={{ color: "rgba(255,255,255,0.95)", fontSize: 18, marginBottom: 28 }}
        >
          One month down — a lifetime to go. A little surprise lives behind 3 locks. Are you ready?
        </motion.p>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            onClick={() => navigate("/locks")}
            style={{
              background: `linear-gradient(90deg, ${colors.maroon}, ${colors.royalBlue})`,
              border: "0",
              padding: "14px 36px",
              borderRadius: 40,
              color: colors.offWhite,
              fontSize: 18,
              fontWeight: 800,
              boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
              cursor: "pointer",
            }}
          >
            Begin The Story
          </button>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.42 }}>
          <div style={{ marginTop: 26, color: "rgba(255,255,255,0.86)" }}>
            <strong style={{ color: colors.royalBlue }}>9 October</strong> — Our special day
          </div>
        </motion.div>
      </div>
    </div>
  );
}