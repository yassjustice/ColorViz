import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import FullPreview from './components/FullPreview';
import LandingLayout from './layouts/LandingLayout';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function AppRoutes() {
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setStarted(true);
    navigate('/app');
  };

  return (
    <Routes>
      <Route path="/" element={<LandingLayout onStart={handleStart} />} />
      <Route path="/app" element={<MainLayout />} />
      <Route path="/full-preview" element={<FullPreview />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
