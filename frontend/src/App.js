import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Dashboard from "./components/dashboard/Dashboard";

export const BannerContext = createContext();
function App() {
  // const threeDaysLater = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  const [initBanner, setInitBanner] = useState({
    bannerLink: "",
    bannerDescription: "",
    bannerEndTime: 0,
    bannerVisibility: false,
  });

  return (
    <BannerContext.Provider value={{ initBanner, setInitBanner }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </BannerContext.Provider>
  );
}

export default App;
