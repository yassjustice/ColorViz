import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui';
import { Palette, BarChart3, Sliders, Layout, ArrowRight, Sparkles, Eye, Zap, Shield, Users, Globe, CheckCircle, Star, Play, ChevronDown } from 'lucide-react';

export default function LandingLayout({ onStart }) {
  const { currentPalette } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Palette,
      title: "Smart Palette Input",
      description: "Advanced HEX input, intelligent color picker, and seamless design system imports with AI-powered suggestions.",
      color: currentPalette?.primary || '#6366f1'
    },
    {
      icon: Shield,
      title: "Accessibility Intelligence",
      description: "Real-time WCAG compliance testing, contrast analysis, and color blindness simulation with automated recommendations.",
      color: currentPalette?.secondary || '#10b981'
    },
    {
      icon: Layout,
      title: "Dynamic Layout Previews",
      description: "Instant visualization across 20+ UI patterns including dashboards, e-commerce, mobile apps, and enterprise systems.",
      color: currentPalette?.accent || '#f59e0b'
    },
    {
      icon: Zap,
      title: "Interactive Component Library",
      description: "Live preview of buttons, cards, forms, and complex components with your palette applied in real-time.",
      color: currentPalette?.success || '#06d6a0'
    }
  ];

  const stats = [
    { value: "10M+", label: "Colors Analyzed" },
    { value: "50K+", label: "Designers Trust Us" },
    { value: "99.9%", label: "Accuracy Rate" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ backgroundColor: currentPalette?.primary || '#6366f1' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ backgroundColor: currentPalette?.secondary || '#10b981' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ backgroundColor: currentPalette?.accent || '#f59e0b' }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: currentPalette?.primary || '#6366f1' }}
            >
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              ColorViz
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#showcase" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Showcase</a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
            <Button 
              variant="ghost" 
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-sm font-medium text-purple-800 dark:text-purple-200 mb-8 border border-purple-200/50 dark:border-purple-700/50">
              <Sparkles className="w-4 h-4 mr-2" />
              New: AI-Powered Color Harmony Analysis
            </div>
            
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Perfect Your
              </span>
              <br />
              <span 
                className="bg-gradient-to-r bg-clip-text text-transparent animate-pulse"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${currentPalette?.primary || '#6366f1'}, ${currentPalette?.secondary || '#10b981'}, ${currentPalette?.accent || '#f59e0b'})` 
                }}
              >
                Color Story
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your design process with intelligent color analysis, real-time accessibility testing, and stunning UI previews that bring your palette to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                onClick={onStart}
                className="group relative px-8 py-4 text-lg font-semibold text-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                style={{ backgroundColor: currentPalette?.primary || '#6366f1' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                <div className="relative flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Start Designing
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
              
              <Button 
                variant="outline"
                className="px-8 py-4 text-lg font-semibold border-2 rounded-2xl hover:shadow-lg transition-all duration-300"
                style={{ 
                  borderColor: currentPalette?.primary || '#6366f1',
                  color: currentPalette?.primary || '#6366f1'
                }}
              >
                <Eye className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for Modern Designers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to create, analyze, and perfect color palettes that work beautifully across all your designs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' : ''
                }`}
                style={{ 
                  ringColor: activeFeature === index ? feature.color : 'transparent'
                }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                <div className="relative">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: feature.color }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              See Your Colors Come to Life
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Preview your palette across real-world interfaces and watch your design vision unfold.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <BarChart3 className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Preview</h3>
                <p className="text-gray-600 dark:text-gray-300">See your colors in action across complex data visualization interfaces.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <Globe className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">E-commerce Layout</h3>
                <p className="text-gray-600 dark:text-gray-300">Test how your palette performs in product pages and checkout flows.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <Users className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mobile App Design</h3>
                <p className="text-gray-600 dark:text-gray-300">Optimize your colors for mobile interfaces and touch interactions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Design Process?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of designers who've elevated their work with ColorViz's intelligent color analysis and preview tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={onStart}
              className="group relative px-8 py-4 text-lg font-semibold text-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              style={{ backgroundColor: currentPalette?.primary || '#6366f1' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              <div className="relative flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-2xl transition-all duration-300"
            >
              <Star className="w-5 h-5 mr-2" />
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: currentPalette?.primary || '#6366f1' }}
              >
                <Palette className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">ColorViz</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ColorViz. All rights reserved. Crafted with passion for designers worldwide.
          </div>
        </div>
      </footer>
    </div>
  );
}