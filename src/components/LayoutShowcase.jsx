import React, { useState } from 'react';
import { Palette, Eye, Zap, Share2, Download, Play, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Card with modern shadow, border, and palette compliance
const LayoutCard = ({ children, title, className = '' }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`bg-dynamic-surface border border-dynamic-border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
  >
    <div className="p-4 border-b border-dynamic-border bg-dynamic-background">
      <h3 className="font-semibold text-dynamic-text text-base tracking-tight">{title}</h3>
    </div>
    <div className="p-4 bg-dynamic-surface">{children}</div>
  </motion.div>
);

// Modern, palette-compliant header bar
const MiniHeader = ({ showSidebar = false }) => (
  <div className="h-8 bg-dynamic-primary rounded-lg mb-3 flex items-center justify-between px-3 shadow-sm">
    <div className="flex items-center space-x-2">
      {showSidebar && <div className="w-4 h-1 bg-white rounded"></div>}
      <div className="w-12 h-1 bg-white rounded"></div>
    </div>
    <div className="flex items-center space-x-1">
      <div className="w-1 h-1 bg-white rounded-full"></div>
      <div className="w-1 h-1 bg-white rounded-full"></div>
      <div className="w-4 h-1 bg-white rounded"></div>
    </div>
  </div>
);

// Card block with palette compliance
const MiniCard = ({ height = 'h-8' }) => (
  <div className={`bg-dynamic-background border border-dynamic-border rounded-lg ${height} mb-2`}></div>
);

// Sidebar with palette compliance
const MiniSidebar = () => (
  <div className="w-16 bg-dynamic-surface border-r border-dynamic-border mr-3 rounded-l-xl">
    <div className="space-y-2 p-2">
      <div className="w-full h-2 bg-dynamic-primary rounded"></div>
      <div className="w-full h-2 bg-dynamic-border rounded"></div>
      <div className="w-full h-2 bg-dynamic-border rounded"></div>
      <div className="w-full h-2 bg-dynamic-border rounded"></div>
    </div>
  </div>
);

// Content area with palette compliance
const MiniContent = () => (
  <div className="flex-1">
    <div className="h-3 bg-dynamic-border rounded mb-2"></div>
    <div className="h-2 bg-dynamic-border rounded mb-1 w-3/4"></div>
    <div className="h-2 bg-dynamic-border rounded mb-2 w-1/2"></div>
    <div className="grid grid-cols-2 gap-1">
      <div className="h-6 bg-dynamic-background border border-dynamic-border rounded-lg"></div>
      <div className="h-6 bg-dynamic-background border border-dynamic-border rounded-lg"></div>
    </div>
  </div>
);

// Grid with palette compliance
const MiniGrid = () => (
  <div className="grid grid-cols-3 gap-2">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="aspect-square bg-dynamic-background border border-dynamic-border rounded-lg"></div>
    ))}
  </div>
);

// Dashboard with palette compliance
const MiniDashboard = () => (
  <div>
    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="h-6 bg-dynamic-accent/20 border border-dynamic-accent/30 rounded-lg flex items-center justify-center">
        <div className="w-3 h-1 bg-dynamic-accent rounded"></div>
      </div>
      <div className="h-6 bg-dynamic-secondary/20 border border-dynamic-secondary/30 rounded-lg flex items-center justify-center">
        <div className="w-3 h-1 bg-dynamic-secondary rounded"></div>
      </div>
      <div className="h-6 bg-dynamic-success/20 border border-dynamic-success/30 rounded-lg flex items-center justify-center">
        <div className="w-3 h-1 bg-dynamic-success rounded"></div>
      </div>
    </div>
    <MiniCard height="h-16" />
  </div>
);

// Form with palette compliance
const MiniForm = () => (
  <div className="space-y-2">
    <div className="h-2 bg-dynamic-border rounded w-1/3"></div>
    <div className="h-6 bg-dynamic-background border border-dynamic-border rounded-lg"></div>
    <div className="h-2 bg-dynamic-border rounded w-1/4"></div>
    <div className="h-6 bg-dynamic-background border border-dynamic-border rounded-lg"></div>
    <div className="h-4 bg-dynamic-primary rounded-lg w-1/3 mt-3"></div>
  </div>
);

// Ecommerce with palette compliance
const MiniEcommerce = () => (
  <div>
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="aspect-square bg-dynamic-background border border-dynamic-border rounded-xl p-2">
        <div className="w-full h-1/2 bg-dynamic-border rounded mb-1"></div>
        <div className="h-1 bg-dynamic-border rounded mb-1 w-2/3"></div>
        <div className="h-1 bg-dynamic-primary rounded w-1/3"></div>
      </div>
      <div className="aspect-square bg-dynamic-background border border-dynamic-border rounded-xl p-2">
        <div className="w-full h-1/2 bg-dynamic-border rounded mb-1"></div>
        <div className="h-1 bg-dynamic-border rounded mb-1 w-2/3"></div>
        <div className="h-1 bg-dynamic-primary rounded w-1/3"></div>
      </div>
    </div>
    <div className="flex space-x-1">
      <div className="flex-1 h-4 bg-dynamic-primary rounded"></div>
      <div className="w-4 h-4 bg-dynamic-secondary rounded"></div>
    </div>
  </div>
);

// Blog with palette compliance
const MiniBlog = () => (
  <div className="space-y-3">
    <div className="h-8 bg-dynamic-background border border-dynamic-border rounded-lg"></div>
    <div>
      <div className="h-2 bg-dynamic-border rounded mb-1"></div>
      <div className="h-1 bg-dynamic-border rounded mb-1 w-4/5"></div>
      <div className="h-1 bg-dynamic-border rounded w-3/5"></div>
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 bg-dynamic-primary rounded-full"></div>
      <div className="h-1 bg-dynamic-border rounded flex-1"></div>
    </div>
  </div>
);

// Chat with palette compliance
const MiniChat = () => (
  <div className="space-y-2">
    <div className="flex justify-start">
      <div className="bg-dynamic-surface border border-dynamic-border rounded-xl p-1 max-w-[70%]">
        <div className="h-1 bg-dynamic-border rounded mb-1"></div>
        <div className="h-1 bg-dynamic-border rounded w-2/3"></div>
      </div>
    </div>
    <div className="flex justify-end">
      <div className="bg-dynamic-primary rounded-xl p-1 max-w-[70%]">
        <div className="h-1 bg-white/70 rounded mb-1"></div>
        <div className="h-1 bg-white/70 rounded w-3/4"></div>
      </div>
    </div>
    <div className="flex justify-start">
      <div className="bg-dynamic-surface border border-dynamic-border rounded-xl p-1 max-w-[60%]">
        <div className="h-1 bg-dynamic-border rounded"></div>
      </div>
    </div>
  </div>
);

export const LayoutShowcase = () => {
  // Use the app's palette system
  const { currentPalette } = useTheme();
  const palette = currentPalette || {};

  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="space-y-12 px-2 md:px-0 pb-12">
      {/* --- FULL WEBSITE PREVIEW (revamped, ClaudeSuggestsRevamp, palette-compliant) --- */}
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-dynamic-border bg-dynamic-surface mb-12">
        {/* Navigation */}
        <nav className="relative px-8 py-4 bg-gradient-to-r from-dynamic-primary via-dynamic-accent to-dynamic-secondary">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">ColorViz Pro</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Features</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Gallery</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Pricing</a>
              </div>
            </div>
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium px-5 py-2 rounded-xl hover:bg-white/30 transition-all duration-200">
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative px-8 py-20 bg-gradient-to-br from-dynamic-primary/10 via-dynamic-accent/10 to-dynamic-secondary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-dynamic-primary/5 via-dynamic-accent/5 to-dynamic-secondary/5"></div>
          {/* Floating color dots */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-dynamic-primary rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-2 h-2 bg-dynamic-accent rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-40 left-40 w-4 h-4 bg-dynamic-secondary rounded-full animate-pulse delay-700"></div>
          <div className="relative text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-dynamic-border/50">
              <div className="w-2 h-2 bg-dynamic-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-dynamic-text">Live Color Analysis</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-dynamic-text mb-6 leading-tight">
              Design with
              <span className="bg-gradient-to-r from-dynamic-primary via-dynamic-accent to-dynamic-secondary bg-clip-text text-transparent"> Perfect Colors</span>
            </h1>
            <p className="text-xl text-dynamic-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
              Analyze color theory, discover harmonious palettes, and see them live in your UI. 
              From concept to creation in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button className="group bg-gradient-to-r from-dynamic-primary to-dynamic-accent text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
                <span>Try Live Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white/80 backdrop-blur-sm border border-dynamic-border/50 text-dynamic-text font-medium px-8 py-4 rounded-2xl hover:bg-white transition-all duration-300 flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            </div>
            {/* Color palette preview */}
            <div className="flex justify-center items-center space-x-2 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dynamic-primary to-dynamic-primary/80 shadow-lg"></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dynamic-accent to-dynamic-accent/80 shadow-lg"></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dynamic-success to-dynamic-success/80 shadow-lg"></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dynamic-warning to-dynamic-warning/80 shadow-lg"></div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dynamic-secondary to-dynamic-secondary/80 shadow-lg"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-8 py-20 bg-dynamic-surface">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dynamic-text mb-4">Powerful Color Intelligence</h2>
            <p className="text-xl text-dynamic-text-secondary max-w-2xl mx-auto">
              Advanced algorithms meet intuitive design to give you the perfect palette every time
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Live UI Preview",
                description: "See your colors applied instantly across components, states, and interactions",
                color: "from-dynamic-primary to-dynamic-accent",
                bgColor: "bg-dynamic-primary/10"
              },
              {
                icon: Zap,
                title: "Color Theory Analysis",
                description: "AI-powered harmony detection with complementary, triadic, and analogous suggestions",
                color: "from-dynamic-accent to-dynamic-secondary",
                bgColor: "bg-dynamic-accent/10"
              },
              {
                icon: CheckCircle,
                title: "Accessibility Guard",
                description: "WCAG compliance, contrast ratios, and color blindness testing built-in",
                color: "from-dynamic-success to-dynamic-warning",
                bgColor: "bg-dynamic-success/10"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl border border-dynamic-border/50 hover:border-dynamic-border transition-all duration-300 cursor-pointer ${feature.bgColor}`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-dynamic-text mb-3">{feature.title}</h3>
                  <p className="text-dynamic-text-secondary leading-relaxed">{feature.description}</p>
                  {/* Removed unwanted gray hover overlay */}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Export Tools */}
        <section className="px-8 py-16 bg-gradient-to-br from-dynamic-surface to-dynamic-background">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dynamic-text mb-4">Export & Share</h2>
            <p className="text-lg text-dynamic-text-secondary">Take your perfect palette anywhere</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Download, label: "CSS Variables", color: "bg-dynamic-primary/10 text-dynamic-primary" },
              { icon: Share2, label: "Live Link", color: "bg-dynamic-success/10 text-dynamic-success" },
              { icon: Download, label: "JSON Export", color: "bg-dynamic-accent/10 text-dynamic-accent" },
              { icon: Share2, label: "Figma Plugin", color: "bg-dynamic-warning/10 text-dynamic-warning" }
            ].map((tool, index) => (
              <div key={index} className={`flex items-center space-x-2 px-4 py-3 rounded-xl ${tool.color} font-medium`}>
                <tool.icon className="w-4 h-4" />
                <span>{tool.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 py-20 bg-gradient-to-br from-dynamic-primary via-dynamic-accent to-dynamic-secondary text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Create Magic?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of designers creating beautiful, accessible color palettes
            </p>
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-lg">
              Start Building Your Palette
            </button>
          </div>
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-8 bg-dynamic-surface border-t border-dynamic-border text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-dynamic-primary to-dynamic-accent rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span className="text-dynamic-text font-medium">© {new Date().getFullYear()} ColorViz Pro</span>
            </div>
            <div className="flex space-x-6 text-sm text-dynamic-text-secondary">
              <a href="#" className="hover:text-dynamic-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-dynamic-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-dynamic-primary transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Modern Layout Previews - No Duplicates, Clean Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-dynamic-text mb-6">Layout Previews</h2>
        <p className="text-dynamic-text-secondary mb-8">
          See how your color palette looks across real UI patterns and design systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LayoutCard title="Website Shell" className="h-48">
            <MiniHeader />
            <div className="flex">
              <MiniSidebar />
              <MiniContent />
            </div>
          </LayoutCard>
          <LayoutCard title="Gallery Grid" className="h-48">
            <MiniHeader />
            <div className="mt-2">
              <MiniGrid />
            </div>
          </LayoutCard>
          <LayoutCard title="Dashboard" className="h-48">
            <MiniHeader showSidebar />
            <div className="flex">
              <MiniSidebar />
              <div className="flex-1">
                <MiniDashboard />
              </div>
            </div>
          </LayoutCard>
          <LayoutCard title="Form Page" className="h-48">
            <MiniHeader />
            <div className="mt-4">
              <MiniForm />
            </div>
          </LayoutCard>
          <LayoutCard title="E-commerce" className="h-48">
            <MiniHeader />
            <div className="mt-2">
              <MiniEcommerce />
            </div>
          </LayoutCard>
          <LayoutCard title="Blog/Article" className="h-48">
            <MiniHeader />
            <div className="mt-2">
              <MiniBlog />
            </div>
          </LayoutCard>
          <LayoutCard title="Chat Interface" className="h-48">
            <MiniHeader />
            <div className="mt-2">
              <MiniChat />
            </div>
          </LayoutCard>
        </div>
      </motion.div>
    </div>
  );
};
