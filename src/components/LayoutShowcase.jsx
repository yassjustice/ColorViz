import React from 'react';
import { motion } from 'framer-motion';

const LayoutCard = ({ children, title, className = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-dynamic-surface border border-dynamic-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="p-4 border-b border-dynamic-border bg-dynamic-background">
        <h3 className="font-semibold text-dynamic-text text-sm">{title}</h3>
      </div>
      <div className="p-4 bg-dynamic-surface">
        {children}
      </div>
    </motion.div>
  );
};

const MiniHeader = ({ showSidebar = false }) => (
  <div className="h-8 bg-dynamic-primary rounded mb-3 flex items-center justify-between px-3">
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

const MiniCard = ({ height = 'h-8' }) => (
  <div className={`bg-dynamic-background border border-dynamic-border rounded ${height} mb-2`}></div>
);

const MiniSidebar = () => (
  <div className="w-16 bg-dynamic-surface border-r border-dynamic-border mr-3">
    <div className="space-y-2 p-2">
      <div className="w-full h-2 bg-dynamic-primary rounded"></div>
      <div className="w-full h-2 bg-dynamic-border rounded"></div>
      <div className="w-full h-2 bg-dynamic-border rounded"></div>
      <div className="w-full h-2 bg-dynamic-border rounded"></div>
    </div>
  </div>
);

const MiniContent = () => (
  <div className="flex-1">
    <div className="h-3 bg-dynamic-border rounded mb-2"></div>
    <div className="h-2 bg-dynamic-border rounded mb-1 w-3/4"></div>
    <div className="h-2 bg-dynamic-border rounded mb-2 w-1/2"></div>
    <div className="grid grid-cols-2 gap-1">
      <div className="h-6 bg-dynamic-background border border-dynamic-border rounded"></div>
      <div className="h-6 bg-dynamic-background border border-dynamic-border rounded"></div>
    </div>
  </div>
);

const MiniGrid = () => (
  <div className="grid grid-cols-3 gap-2">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="aspect-square bg-dynamic-background border border-dynamic-border rounded"></div>
    ))}
  </div>
);

const MiniDashboard = () => (
  <div>
    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="h-6 bg-dynamic-accent/20 border border-dynamic-accent/30 rounded flex items-center justify-center">
        <div className="w-3 h-1 bg-dynamic-accent rounded"></div>
      </div>
      <div className="h-6 bg-dynamic-secondary/20 border border-dynamic-secondary/30 rounded flex items-center justify-center">
        <div className="w-3 h-1 bg-dynamic-secondary rounded"></div>
      </div>
      <div className="h-6 bg-dynamic-success/20 border border-dynamic-success/30 rounded flex items-center justify-center">
        <div className="w-3 h-1 bg-dynamic-success rounded"></div>
      </div>
    </div>
    <MiniCard height="h-16" />
  </div>
);

const MiniForm = () => (
  <div className="space-y-2">
    <div className="h-2 bg-dynamic-border rounded w-1/3"></div>
    <div className="h-6 bg-dynamic-background border border-dynamic-border rounded"></div>
    <div className="h-2 bg-dynamic-border rounded w-1/4"></div>
    <div className="h-6 bg-dynamic-background border border-dynamic-border rounded"></div>
    <div className="h-4 bg-dynamic-primary rounded w-1/3 mt-3"></div>
  </div>
);

const MiniEcommerce = () => (
  <div>
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="aspect-square bg-dynamic-background border border-dynamic-border rounded p-2">
        <div className="w-full h-1/2 bg-dynamic-border rounded mb-1"></div>
        <div className="h-1 bg-dynamic-border rounded mb-1 w-2/3"></div>
        <div className="h-1 bg-dynamic-primary rounded w-1/3"></div>
      </div>
      <div className="aspect-square bg-dynamic-background border border-dynamic-border rounded p-2">
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

const MiniBlog = () => (
  <div className="space-y-3">
    <div className="h-8 bg-dynamic-background border border-dynamic-border rounded"></div>
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

const MiniChat = () => (
  <div className="space-y-2">
    <div className="flex justify-start">
      <div className="bg-dynamic-surface border border-dynamic-border rounded-lg p-1 max-w-[70%]">
        <div className="h-1 bg-dynamic-border rounded mb-1"></div>
        <div className="h-1 bg-dynamic-border rounded w-2/3"></div>
      </div>
    </div>
    <div className="flex justify-end">
      <div className="bg-dynamic-primary rounded-lg p-1 max-w-[70%]">
        <div className="h-1 bg-white/70 rounded mb-1"></div>
        <div className="h-1 bg-white/70 rounded w-3/4"></div>
      </div>
    </div>
    <div className="flex justify-start">
      <div className="bg-dynamic-surface border border-dynamic-border rounded-lg p-1 max-w-[60%]">
        <div className="h-1 bg-dynamic-border rounded"></div>
      </div>
    </div>
  </div>
);

export const LayoutShowcase = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-dynamic-text mb-6">Layout Previews</h2>
        <p className="text-dynamic-text-secondary mb-8">
          See how your color palette looks across different layout patterns and design systems.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Standard Website Layout */}
          <LayoutCard title="Standard Website" className="h-48">
            <MiniHeader />
            <div className="flex">
              <MiniSidebar />
              <MiniContent />
            </div>
          </LayoutCard>

          {/* Grid Gallery Layout */}
          <LayoutCard title="Gallery Grid" className="h-48">
            <MiniHeader />
            <div className="mt-2">
              <MiniGrid />
            </div>
          </LayoutCard>

          {/* Dashboard Layout */}
          <LayoutCard title="Dashboard" className="h-48">
            <MiniHeader showSidebar />
            <div className="flex">
              <MiniSidebar />
              <div className="flex-1">
                <MiniDashboard />
              </div>
            </div>
          </LayoutCard>

          {/* Form Layout */}
          <LayoutCard title="Form Page" className="h-48">
            <MiniHeader />
            <div className="mt-4">
              <MiniForm />
            </div>
          </LayoutCard>

          {/* E-commerce Layout */}
          <LayoutCard title="E-commerce" className="h-48">
            <MiniHeader />
            <div className="mt-2">
              <MiniEcommerce />
            </div>
          </LayoutCard>

          {/* Blog Layout */}
          <LayoutCard title="Blog/Article" className="h-48">
            <MiniHeader />
            <div className="mt-2">
              <MiniBlog />
            </div>
          </LayoutCard>

          {/* Chat Interface */}
          <LayoutCard title="Chat Interface" className="h-48">
            <MiniHeader />
            <div className="mt-2">
              <MiniChat />
            </div>
          </LayoutCard>

          {/* Landing Page */}
          <LayoutCard title="Landing Page" className="h-48">
            <MiniHeader />
            <div className="mt-2 space-y-2">
              <div className="h-16 bg-gradient-to-r from-dynamic-primary to-dynamic-secondary rounded"></div>
              <div className="grid grid-cols-3 gap-1">
                <MiniCard height="h-8" />
                <MiniCard height="h-8" />
                <MiniCard height="h-8" />
              </div>
            </div>
          </LayoutCard>

          {/* Admin Panel */}
          <LayoutCard title="Admin Panel" className="h-48">
            <div className="flex h-full">
              <div className="w-12 bg-dynamic-text text-white p-1">
                <div className="space-y-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-2 bg-white/20 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-2">
                <div className="h-4 bg-dynamic-primary rounded mb-2"></div>
                <MiniDashboard />
              </div>
            </div>
          </LayoutCard>
        </div>
      </motion.div>

      {/* Full Website Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-dynamic-text mb-6">Full Website Preview</h2>
        
        <div className="bg-dynamic-background border border-dynamic-border rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-dynamic-surface border-b border-dynamic-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="text-2xl font-bold text-dynamic-primary">ColorViz Pro</div>
                <nav className="hidden md:flex items-center space-x-6">
                  <a href="#" className="text-dynamic-primary font-medium">Home</a>
                  <a href="#" className="text-dynamic-text-secondary hover:text-dynamic-text transition-colors">Features</a>
                  <a href="#" className="text-dynamic-text-secondary hover:text-dynamic-text transition-colors">Gallery</a>
                  <a href="#" className="text-dynamic-text-secondary hover:text-dynamic-text transition-colors">Pricing</a>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-dynamic-primary border border-dynamic-primary rounded-lg hover:bg-dynamic-primary hover:text-white transition-all duration-200">
                  Sign In
                </button>
                <button className="px-4 py-2 bg-dynamic-primary text-white rounded-lg hover:opacity-90 transition-all duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-dynamic-primary via-dynamic-secondary to-dynamic-accent p-12 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Design with Confidence</h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Create stunning color palettes and see them in action across real UI components and layouts.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-8 py-3 bg-white text-dynamic-primary rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200">
                Try Free Demo
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-dynamic-primary transition-all duration-200">
                Watch Video
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="p-12 bg-dynamic-background">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dynamic-text mb-4">Powerful Features</h2>
              <p className="text-dynamic-text-secondary text-lg">Everything you need to perfect your color schemes</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-dynamic-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-dynamic-text mb-2">Real-time Preview</h3>
                <p className="text-dynamic-text-secondary">See your colors applied instantly across UI components</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-dynamic-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-dynamic-text mb-2">Accessibility Check</h3>
                <p className="text-dynamic-text-secondary">Ensure your colors meet WCAG accessibility standards</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-dynamic-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-dynamic-text mb-2">Export Ready</h3>
                <p className="text-dynamic-text-secondary">Export palettes as CSS, JSON, or design tokens</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-dynamic-surface border-t border-dynamic-border p-12 text-center">
            <h2 className="text-2xl font-bold text-dynamic-text mb-4">Ready to Get Started?</h2>
            <p className="text-dynamic-text-secondary mb-6">Join thousands of designers creating beautiful color palettes</p>
            <button className="px-8 py-3 bg-dynamic-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200">
              Start Free Trial
            </button>
          </div>

          {/* Footer */}
          <div className="bg-dynamic-text text-white p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <div className="space-y-2 text-sm opacity-75">
                  <div>Features</div>
                  <div>Pricing</div>
                  <div>API</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <div className="space-y-2 text-sm opacity-75">
                  <div>About</div>
                  <div>Blog</div>
                  <div>Careers</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <div className="space-y-2 text-sm opacity-75">
                  <div>Documentation</div>
                  <div>Tutorials</div>
                  <div>Community</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="space-y-2 text-sm opacity-75">
                  <div>Twitter</div>
                  <div>GitHub</div>
                  <div>Discord</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
