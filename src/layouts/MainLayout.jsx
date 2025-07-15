import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette, BarChart3, Layout, Sliders, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ColorPaletteInput } from '../components/ColorPaletteInput';
import { ColorAnalysis } from '../components/ColorAnalysis';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { LayoutShowcase } from '../components/LayoutShowcase';

const Navigation = ({ 
  activeSection, 
  setActiveSection, 
  isDark, 
  toggleTheme, 
  isSidebarOpen, 
  setSidebarOpen,
  isDesktopSidebarCollapsed,
  setDesktopSidebarCollapsed
}) => {
  const navItems = [
    { id: 'palette', label: 'Color Palette', icon: Palette },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'components', label: 'Components', icon: Sliders },
    { id: 'layouts', label: 'Layouts', icon: Layout },
  ];

  return (
    <>
      {/* Mobile Header - ONLY for mobile screens when sidebar is closed */}
      {!isSidebarOpen && (
        <div className="lg:hidden bg-dynamic-surface border-b border-dynamic-border p-4 fixed top-0 left-0 right-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-dynamic-text-secondary hover:text-dynamic-text rounded-lg hover:bg-dynamic-background transition-colors mr-2"
              >
                <Menu size={20} />
              </button>
              <Palette className="text-dynamic-primary" size={24} />
              <h1 className="text-xl font-bold text-dynamic-text">ColorViz</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-dynamic-text-secondary hover:text-dynamic-text rounded-lg hover:bg-dynamic-background transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar - FULL VERSION */}
      {!isDesktopSidebarCollapsed && (
        <div className="hidden lg:block sticky top-0 left-0 h-screen w-80 bg-dynamic-surface border-r border-dynamic-border z-30">
          <div className="p-6 h-full flex flex-col">
            {/* Desktop Header with Close Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-dynamic-primary to-dynamic-secondary rounded-lg flex items-center justify-center">
                  <Palette className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-dynamic-text">ColorViz</h1>
                  <p className="text-xs text-dynamic-text-secondary">Design System Previewer</p>
                </div>
              </div>
              <button
                onClick={() => setDesktopSidebarCollapsed(true)}
                className="p-2 text-dynamic-text-secondary hover:text-dynamic-text rounded-lg hover:bg-dynamic-background transition-colors"
                title="Collapse sidebar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between mb-8 p-3 bg-dynamic-background rounded-lg border border-dynamic-border">
              <span className="text-sm font-medium text-dynamic-text">Theme</span>
              <button
                onClick={toggleTheme}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-dynamic-border transition-colors focus:outline-none focus:ring-2 focus:ring-dynamic-primary focus:ring-offset-2"
              >
                <span
                  className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                  style={{ transform: `translateX(${isDark ? '20px' : '2px'})` }}
                />
                <Sun className={`absolute left-1 h-3 w-3 ${isDark ? 'text-dynamic-text-secondary' : 'text-yellow-500'}`} />
                <Moon className={`absolute right-1 h-3 w-3 ${isDark ? 'text-blue-400' : 'text-dynamic-text-secondary'}`} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-dynamic-primary text-white shadow-sm'
                        : 'text-dynamic-text-secondary hover:text-dynamic-text hover:bg-dynamic-background'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-dynamic-background rounded-lg border border-dynamic-border">
              <h3 className="text-sm font-semibold text-dynamic-text mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dynamic-text-secondary">Colors</span>
                  <span className="text-dynamic-text font-medium">11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dynamic-text-secondary">Contrast Tests</span>
                  <span className="text-dynamic-text font-medium">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dynamic-text-secondary">AA Compliant</span>
                  <span className="text-green-600 font-medium">4/6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar - COLLAPSED VERSION */}
      {isDesktopSidebarCollapsed && (
        <div className="hidden lg:block sticky top-0 left-0 h-screen w-16 bg-dynamic-surface border-r border-dynamic-border z-30">
          <div className="p-4 h-full flex flex-col">
            {/* Expand Button */}
            <button
              onClick={() => setDesktopSidebarCollapsed(false)}
              className="w-8 h-8 flex items-center justify-center text-dynamic-text-secondary hover:text-dynamic-text rounded-lg hover:bg-dynamic-background transition-colors mb-6"
              title="Expand sidebar"
            >
              <Menu size={20} />
            </button>

            {/* Collapsed Navigation Icons */}
            <nav className="space-y-3 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-dynamic-primary text-white shadow-sm'
                        : 'text-dynamic-text-secondary hover:text-dynamic-text hover:bg-dynamic-background'
                    }`}
                    title={item.label}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </nav>

            {/* Theme Toggle Icon */}
            <div className="mt-auto">
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center text-dynamic-text-secondary hover:text-dynamic-text rounded-lg hover:bg-dynamic-background transition-colors"
                title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed top-0 left-0 h-screen w-80 bg-dynamic-surface border-r border-dynamic-border z-50 shadow-2xl">
          <div className="p-6 h-full flex flex-col">
            {/* Mobile Header with Close Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-dynamic-primary to-dynamic-secondary rounded-lg flex items-center justify-center">
                  <Palette className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-dynamic-text">ColorViz</h1>
                  <p className="text-xs text-dynamic-text-secondary">Design System Previewer</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-dynamic-text-secondary hover:text-dynamic-text rounded-lg hover:bg-dynamic-background transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between mb-8 p-3 bg-dynamic-background rounded-lg border border-dynamic-border">
              <span className="text-sm font-medium text-dynamic-text">Theme</span>
              <button
                onClick={toggleTheme}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-dynamic-border transition-colors focus:outline-none focus:ring-2 focus:ring-dynamic-primary focus:ring-offset-2"
              >
                <span
                  className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                  style={{ transform: `translateX(${isDark ? '20px' : '2px'})` }}
                />
                <Sun className={`absolute left-1 h-3 w-3 ${isDark ? 'text-dynamic-text-secondary' : 'text-yellow-500'}`} />
                <Moon className={`absolute right-1 h-3 w-3 ${isDark ? 'text-blue-400' : 'text-dynamic-text-secondary'}`} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-dynamic-primary text-white shadow-sm'
                        : 'text-dynamic-text-secondary hover:text-dynamic-text hover:bg-dynamic-background'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Quick Stats */}
            <div className="mt-8 p-4 bg-dynamic-background rounded-lg border border-dynamic-border">
              <h3 className="text-sm font-semibold text-dynamic-text mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dynamic-text-secondary">Colors</span>
                  <span className="text-dynamic-text font-medium">11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dynamic-text-secondary">Contrast Tests</span>
                  <span className="text-dynamic-text font-medium">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dynamic-text-secondary">AA Compliant</span>
                  <span className="text-green-600 font-medium">4/6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const MainLayout = () => {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('palette');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);

  // Prevent body scroll when mobile sidebar is open
  React.useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const renderContent = () => {
    const contentVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    switch (activeSection) {
      case 'palette':
        return (
          <motion.div
            key="palette"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dynamic-text mb-2">Color Palette</h2>
              <p className="text-dynamic-text-secondary">
                Create and customize your color palette. Enter HEX codes directly or use the visual picker.
              </p>
            </div>
            <ColorPaletteInput />
          </motion.div>
        );
      
      case 'analysis':
        return (
          <motion.div
            key="analysis"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dynamic-text mb-2">Color Analysis</h2>
              <p className="text-dynamic-text-secondary">
                Analyze your palette for accessibility, contrast ratios, and color theory compliance.
              </p>
            </div>
            <ColorAnalysis />
          </motion.div>
        );
      
      case 'components':
        return (
          <motion.div
            key="components"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dynamic-text mb-2">Component Preview</h2>
              <p className="text-dynamic-text-secondary">
                See how your colors look across different UI components and design patterns.
              </p>
            </div>
            <ComponentShowcase />
          </motion.div>
        );
      
      case 'layouts':
        return (
          <motion.div
            key="layouts"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-dynamic-text mb-2">Layout Previews</h2>
              <p className="text-dynamic-text-secondary">
                Visualize your color palette across complete layout patterns and website designs.
              </p>
            </div>
            <LayoutShowcase />
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dynamic-background flex">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDark={isDark}
        toggleTheme={toggleTheme}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDesktopSidebarCollapsed={isDesktopSidebarCollapsed}
        setDesktopSidebarCollapsed={setDesktopSidebarCollapsed}
      />
      
      <main className={`flex-1 min-w-0 ${!isSidebarOpen ? 'pt-20 lg:pt-0' : ''}`}>
        <div className="h-full overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};
