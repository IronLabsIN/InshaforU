import React from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import { colors } from "../theme";

// Import the bundled video so it plays when placed in src/assets
import videoFile from "../assets/video.mp4";

export default function Celebration() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", paddingTop: 24 }}>
      <FloatingHearts count={26} />
      <Confetti recycle={false} numberOfPieces={300} gravity={0.18} />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 24px", textAlign: "center" }}>
        <motion.h1 initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ fontFamily: "Pacifico, cursive", color: colors.offWhite }}>
          Celebrations 🎉
        </motion.h1>

        <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 }} style={{ marginTop: 22 }}>
          <video
            src={videoFile}
            controls
            autoPlay
            style={{
              width: "92vw",
              maxWidth: 880,
              borderRadius: 18,
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              border: `6px solid ${colors.royalBlue}`,
              background: "#000",
            }}
          />
        </motion.div>

        <div style={{ marginTop: 24 }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: colors.royalBlue,
              color: colors.offWhite,
              padding: "12px 28px",
              borderRadius: 30,
              border: "none",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}