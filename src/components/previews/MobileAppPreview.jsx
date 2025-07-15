import React, { useState } from 'react';
import { Home, Search, Camera, User, Palette, Heart, Share, Settings } from 'lucide-react';
import { Button, Badge, Card } from '../ui';

export default function MobileAppPreview({ palette, device = 'desktop' }) {
  const [currentScreen, setCurrentScreen] = useState('home');
  const screens = {
    home: {
      title: 'Home',
      content: (
        <div className="space-y-4">
          <div className="text-center py-8">
            <img
              src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
              alt="Color Harmony Hero"
              className="mx-auto mb-4 w-24 h-24 rounded-2xl object-cover shadow-lg border-4 border-dynamic-primary"
              loading="lazy"
            />
            <h2 className="text-xl font-bold text-dynamic-text mb-2">Color Harmony</h2>
            <p className="text-dynamic-text-secondary">Discover perfect color combinations</p>
          </div>
          <div className="space-y-3">
            <Button variant="primary" className="w-full" size="lg">
              <Palette className="w-5 h-5" />
              Create New Palette
            </Button>
            <Button variant="outline" className="w-full">
              <Camera className="w-5 h-5" />
              Extract from Photo
            </Button>
          </div>
        </div>
      )
    },
    explore: {
      title: 'Explore',
      content: (
        <div className="text-center py-16">
          <Search className="w-10 h-10 mx-auto mb-4 text-dynamic-primary" />
          <h2 className="text-xl font-bold text-dynamic-text mb-2">Explore Palettes</h2>
          <p className="text-dynamic-text-secondary">Browse trending color schemes and discover new combinations.</p>
        </div>
      )
    },
    camera: {
      title: 'Camera',
      content: (
        <div className="text-center py-16">
          <Camera className="w-10 h-10 mx-auto mb-4 text-dynamic-primary" />
          <h2 className="text-xl font-bold text-dynamic-text mb-2">Camera</h2>
          <p className="text-dynamic-text-secondary">Capture colors from your environment and create palettes.</p>
        </div>
      )
    },
    profile: {
      title: 'Profile',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=96&h=96&facepad=2"
              alt="Jane Designer"
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-dynamic-primary shadow"
              loading="lazy"
            />
            <h2 className="text-xl font-bold text-dynamic-text">Jane Designer</h2>
            <p className="text-dynamic-text-secondary">UI/UX Designer</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-dynamic-surface rounded-lg">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-dynamic-text-secondary" />
                <span className="text-dynamic-text">My Palettes</span>
              </div>
              <Badge variant="primary">24</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-dynamic-surface rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-dynamic-text-secondary" />
                <span className="text-dynamic-text">Favorites</span>
              </div>
              <Badge variant="secondary">12</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-dynamic-surface rounded-lg">
              <div className="flex items-center gap-3">
                <Share className="w-5 h-5 text-dynamic-text-secondary" />
                <span className="text-dynamic-text">Shared</span>
              </div>
              <Badge variant="success">8</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      )
    }
  };
  const activeScreen = screens[currentScreen] || screens.home;
  // Responsive frame and paddings for device
  const frameClass = device === 'mobile' ? 'max-w-xs mx-auto' : device === 'tablet' ? 'max-w-md mx-auto' : 'max-w-sm mx-auto';
  const padClass = device === 'mobile' ? 'p-2' : device === 'tablet' ? 'p-4' : 'p-6';
  const navPadClass = device === 'mobile' ? 'px-2 py-2' : device === 'tablet' ? 'px-4 py-3' : 'px-6 py-3';
  const contentHeight = device === 'mobile' ? 'h-[400px]' : device === 'tablet' ? 'h-[480px]' : 'h-[500px]';
  return (
    <div className={frameClass}>
      <div className="bg-gray-900 rounded-[2.5rem] p-3">
        <div className="bg-dynamic-background rounded-[2rem] overflow-hidden">
          <div className={`bg-dynamic-surface flex items-center justify-between text-sm ${navPadClass}`}>
            <span className="text-dynamic-text font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 bg-dynamic-success rounded-sm"></div>
              <span className="text-dynamic-text-secondary">100%</span>
            </div>
          </div>
          <div className={`${contentHeight} ${padClass} overflow-auto`}>
            {activeScreen.content}
          </div>
          <div className={`bg-dynamic-surface border-t border-dynamic-border ${navPadClass}`}>
            <div className="flex items-center justify-around">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'explore', icon: Search, label: 'Explore' },
                { id: 'camera', icon: Camera, label: 'Camera' },
                { id: 'profile', icon: User, label: 'Profile' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${currentScreen === item.id ? 'text-dynamic-primary bg-dynamic-primary/10' : 'text-dynamic-text-secondary hover:text-dynamic-text'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
