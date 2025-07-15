import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import FullPreview from './components/FullPreview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/full-preview" element={<FullPreview />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
