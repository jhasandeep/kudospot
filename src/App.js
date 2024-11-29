import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/welcome";
import Landing from "./components/landing";
import GiveKudos from "./components/givekudos";
import Analytics from "./components/analytics";
import { UserProvider } from "./components/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/give-kudos" element={<GiveKudos />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
