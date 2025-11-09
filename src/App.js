import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LocksPage from "./components/LocksPage";
import Proposal from "./components/Proposal";
import Celebration from "./components/Celebration";
import AudioPlayer from "./components/AudioPlayer";
import { colors } from './theme';

function App() {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.royalBlue} 70%, ${colors.maroon} 100%)`,
        minHeight: "100vh",
        color: colors.offWhite,
      }}
    >
      <AudioPlayer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locks" element={<LocksPage />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/celebrate" element={<Celebration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;