import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { colors } from "../theme";

/*
  SweetMemoryModal props:
  - isOpen (bool)
  - onClose (fn)
  - onProceed (fn)  // e.g. go to proposal
  - videoSrc (string) OR image (this now supports imported src URLs)
  - messageLines (array of strings) for the typed reveal
*/

function useTypedText(lines = [], speed = 36) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    if (!lines || lines.length === 0) {
      setDisplay("");
      return;
    }
    let mounted = true;
    let totalTimeouts = [];

    const runLine = (line, startDelay = 0) =>
      new Promise((resolve) => {
        let i = 0;
        const t = setTimeout(function tick() {
          if (!mounted) return resolve();
          setDisplay((prev) => prev + line[i]);
          i += 1;
          if (i < line.length) {
            totalTimeouts.push(setTimeout(tick, speed));
          } else {
            resolve();
          }
        }, startDelay);
      });

    (async () => {
      setDisplay("");
      for (let idx = 0; idx < lines.length; idx++) {
        if (!mounted) break;
        await runLine(lines[idx]);
        if (!mounted) break;
        if (idx < lines.length - 1) {
          setDisplay((p) => p + "\n\n");
          // small pause between lines
          await new Promise((r) => {
            totalTimeouts.push(setTimeout(r, 600));
          });
        }
      }
    })();

    return () => {
      mounted = false;
      totalTimeouts.forEach((id) => clearTimeout(id));
    };
  }, [lines, speed]);

  return display;
}

export default function SweetMemoryModal({
  isOpen,
  onClose,
  onProceed,
  videoSrc,
  messageLines
}) {
  // Default romantic message lines (personal and warm)
  const defaultMessage = [
    "She has the kind of smile that turns a bad day into a story worth telling.",
    "Her laugh — small, honest, and infectious — makes the whole room feel lighter.",
    "She notices the tiny things: the way you take your tea, the song you hum, the way you tuck your hair behind your ear.",
    "In quiet moments, her presence feels like home — warm, safe, and endlessly patient.",
    "She drifts between playful mischief and steady comfort, and somehow both are her strongest gifts.",
    "She makes ordinary things feel cinematic: a walk, a shared sandwich, a rainy afternoon.",
    "She believes in second chances, long talks, and that the best days are simple ones together.",
    "This memory is for her — for the little ways she changes everything for the better."
  ];

  const linesToType = messageLines && messageLines.length ? messageLines : defaultMessage;
  const typed = useTypedText(linesToType, 28);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    // If a videoSrc prop is provided (likely an imported/bundler URL), use it directly.
    if (videoSrc) {
      setSelectedVideo(videoSrc);
      setChecked(true);
      return () => { mounted = false; };
    }

    // Otherwise, fallback to probing public paths (unchanged)
    const candidates = ["/video.mp4", "/assets/video.mp4", "/video.webm"];
    const checkUrl = async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        return res && res.ok;
      } catch (e) {
        return false;
      }
    };

    (async () => {
      for (const c of candidates) {
        if (!mounted) return;
        const ok = await checkUrl(c);
        if (ok) {
          if (mounted) {
            setSelectedVideo(c);
            setChecked(true);
          }
          return;
        }
      }
      if (mounted) {
        setSelectedVideo(null);
        setChecked(true);
      }
    })();

    return () => { mounted = false; };
  }, [videoSrc]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Confetti recycle={false} numberOfPieces={260} gravity={0.16} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              left: 0, top: 0,
              width: "100vw", height: "100vh",
              display: "grid",
              placeItems: "center",
              zIndex: 9999,
              backdropFilter: "blur(6px)"
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              style={{
                width: "92%",
                maxWidth: 980,
                borderRadius: 20,
                padding: 20,
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: colors.offWhite,
                display: "grid",
                gap: 18,
                gridTemplateColumns: "1fr 420px",
              }}
            >
              <div style={{ padding: 8 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "Pacifico, cursive", fontSize: 28, color: colors.offWhite }}>A Sweet Memory</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", marginTop: 6 }}>Unlocked by love</div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={onClose} style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: colors.offWhite,
                      padding: "8px 12px",
                      borderRadius: 10,
                      cursor: "pointer"
                    }}>Close</button>
                    <button onClick={onProceed} style={{
                      background: `linear-gradient(90deg, ${colors.maroon}, ${colors.royalBlue})`,
                      color: colors.offWhite,
                      padding: "8px 14px",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 800
                    }}>View Proposal</button>
                  </div>
                </div>

                <div style={{ marginTop: 18, whiteSpace: "pre-wrap", fontSize: 15, lineHeight: 1.45, color: "rgba(255,255,255,0.95)" }}>
                  {typed || "A special note will appear here..."}
                </div>

                <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    padding: 10, borderRadius: 10, minWidth: 100, textAlign: "center"
                  }}>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>Date</div>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>9 Oct</div>
                  </div>
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    padding: 10, borderRadius: 10, minWidth: 100, textAlign: "center"
                  }}>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.72)" }}>Months</div>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>1</div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: 12, alignContent: "center" }}>
                {!checked ? (
                  <div style={{ color: "rgba(255,255,255,0.7)" }}>Checking for your video...</div>
                ) : selectedVideo ? (
                  <video
                    src={selectedVideo}
                    controls
                    autoPlay
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      maxHeight: 360,
                      objectFit: "cover",
                      boxShadow: "0 18px 60px rgba(0,0,0,0.6)",
                      border: `4px solid ${colors.royalBlue}`,
                      background: "#000"
                    }}
                  />
                ) : (
                  <div style={{
                    width: "100%",
                    height: 320,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "inset 0 10px 30px rgba(0,0,0,0.5)",
                    color: "rgba(255,255,255,0.86)",
                    padding: 18,
                    textAlign: "center"
                  }}>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Video not found</div>
                      <div style={{ fontSize: 14, marginBottom: 8 }}>To play your celebration video, put your file named <strong>video.mp4</strong> in the app's public folder (public/video.mp4) or in public/assets/video.mp4, or pass an imported video URL as videoSrc.</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.72)" }}>
                        Alternatively, pass the exact public URL as the <code>videoSrc</code> prop when opening the modal.
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  <button onClick={onClose} style={{
                    background: "transparent",
                    color: colors.offWhite,
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "8px 12px",
                    borderRadius: 12,
                    cursor: "pointer"
                  }}>Close</button>
                  <button onClick={onProceed} style={{
                    background: colors.royalBlue,
                    color: colors.offWhite,
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontWeight: 800
                  }}>Go to Proposal</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}