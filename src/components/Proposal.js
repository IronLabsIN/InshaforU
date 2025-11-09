import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme";
import { motion } from "framer-motion";

const persuasiveMsgs = [
  "Are you sure? 🥺",
  "Think of all the memories we’ve made!",
  "But baby, you light up my world 💖",
  "I promise to always bring chocolates...",
  "No? Is that a real answer? 😝",
  "Okay, but imagine us—forever 🤲",
  "Last chance! My heart is on the table... 🥹",
  "C’mon, you know you want to! 😘",
  "Okay, let’s try this again 😉"
];

export default function Proposal() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  function handleNo() {
    setNoCount(n=>n+1);
  }
  function handleYes() {
    setAccepted(true);
    setTimeout(()=>navigate("/celebrate"), 1300);
  }
  // For progressive button, could change "No" to "Yes" after enough clicks.
  let showTrickYes = noCount >= persuasiveMsgs.length;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.89 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display:"flex", flexDirection:"column", alignItems:"center",
        minHeight:"90vh", justifyContent:"center"
      }}
    >
      <h2 style={{color: colors.offWhite, fontFamily:"Pacifico, cursive", fontSize:"2.3rem"}}>
        Will you be mine foreverrrrrrrrrr plssssssssssss?
      </h2>
      {accepted
        ? <motion.div animate={{scale:[1,1.23,1]}} style={{fontSize:"4rem", margin:"40px 0"}}>💍💖</motion.div>
        : <>
          <div style={{margin:"7vh 0 0 0"}}>
            <button
              onClick={handleYes}
              style={{
                background: colors.royalBlue,
                color: colors.offWhite,
                fontWeight:"bold",
                fontSize:"1.3rem",
                padding:"19px 47px",
                borderRadius:"38px",
                border: "3px solid white",
                marginRight:30,
                cursor:"pointer"
              }}>
              Yes!
            </button>
            <button
              onClick={showTrickYes ? handleYes : handleNo}
              style={{
                background: colors.maroon,
                color: colors.offWhite,
                fontWeight:"bold",
                fontSize:"1.3rem",
                padding:"19px 37px",
                borderRadius:"38px",
                border: "3px solid white",
                cursor:"pointer"
              }}>
              {showTrickYes ? "Yes!" : "No"}
            </button>
          </div>
          {noCount > 0 &&
            <motion.div
              key={noCount}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              style={{marginTop: "36px", fontSize:"1.15rem", color:"gold", minHeight:44}}
            >
              {showTrickYes
                ? "I knew you'd say yesssssss! 😍"
                : persuasiveMsgs[noCount-1]
              }
            </motion.div>
          }
        </>
      }
    </motion.div>
  );
}