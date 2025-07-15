import React, { useState } from 'react';
import { Monitor, Store, BarChart3, Smartphone, Grid } from 'lucide-react';
import { Link } from 'react-router-dom';
import EcommercePreview from './previews/EcommercePreview';
import SaasDashboardPreview from './previews/SaasDashboardPreview';
import MobileAppPreview from './previews/MobileAppPreview';
import ComponentLibraryPreview from './previews/ComponentLibraryPreview';
import { Card, Button } from './ui';

export const ComponentShowcase = () => {
  const [activeShowcase, setActiveShowcase] = useState('ecommerce');
  const showcases = [
    { id: 'ecommerce', name: 'E-commerce', icon: Store, component: EcommercePreview },
    { id: 'saas', name: 'SaaS Dashboard', icon: BarChart3, component: SaasDashboardPreview },
    { id: 'mobile', name: 'Mobile App', icon: Smartphone, component: MobileAppPreview },
    { id: 'components', name: 'Components', icon: Grid, component: ComponentLibraryPreview },
  ];
  const ActiveComponent = showcases.find(s => s.id === activeShowcase)?.component || EcommercePreview;
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dynamic-text">Real-World UI Previews</h2>
          <Link to="/full-preview">
            <Button variant="primary" size="sm">
              <Monitor className="w-4 h-4" />
              Full Preview
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {showcases.map(showcase => {
            const Icon = showcase.icon;
            return (
              <button
                key={showcase.id}
                onClick={() => setActiveShowcase(showcase.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeShowcase === showcase.id
                    ? 'bg-dynamic-primary text-white shadow-lg'
                    : 'text-dynamic-text-secondary hover:text-dynamic-text hover:bg-dynamic-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                {showcase.name}
              </button>
            );
          })}
        </div>
      </Card>
      <ActiveComponent />
    </div>
  );
};
