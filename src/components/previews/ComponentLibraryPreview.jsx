import React from 'react';
import { Button, Card, Badge, ProgressBar, Alert, Input } from '../ui';
import { Mail, Search, Check, AlertCircle, X, Info } from 'lucide-react';

export default function ComponentLibraryPreview({ palette, device = 'desktop' }) {
  const colors = palette || {};

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-dynamic-text mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-dynamic-text mb-4">Form Elements</h3>
        <div className={device === 'mobile' ? 'grid grid-cols-1 gap-4' : device === 'tablet' ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          <Input label="Email" placeholder="Enter your email" icon={Mail} />
          <Input label="Password" type="password" placeholder="Enter password" />
          <Input label="Search" placeholder="Search..." icon={Search} />
          <Input label="Error Example" placeholder="Invalid input" error="This field is required" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-dynamic-text mb-4">Alerts</h3>
        <div className="space-y-4">
          <Alert variant="success">
            <div>
              <h4 className="font-medium">Success!</h4>
              <p className="text-sm mt-1">Your changes have been saved successfully.</p>
            </div>
          </Alert>
          <Alert variant="warning">
            <div>
              <h4 className="font-medium">Warning!</h4>
              <p className="text-sm mt-1">Please review your input before proceeding.</p>
            </div>
          </Alert>
          <Alert variant="error">
            <div>
              <h4 className="font-medium">Error!</h4>
              <p className="text-sm mt-1">Something went wrong. Please try again.</p>
            </div>
          </Alert>
          <Alert variant="info">
            <div>
              <h4 className="font-medium">Info</h4>
              <p className="text-sm mt-1">Here's some helpful information for you.</p>
            </div>
          </Alert>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-dynamic-text mb-4">Cards & Avatars</h3>
        <div className={device === 'mobile' ? 'grid grid-cols-1 gap-4' : device === 'tablet' ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
          {[{
            name: 'Alex Carter',
            role: 'Frontend Engineer',
            img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&h=128&facepad=2'
          }, {
            name: 'Maria Gomez',
            role: 'Product Designer',
            img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=128&h=128&facepad=2'
          }, {
            name: 'Sam Lee',
            role: 'Fullstack Dev',
            img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=128&h=128&facepad=2'
          }].map((user, idx) => (
            <Card key={idx} className="p-4 flex flex-col items-center gap-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.03]">
              <img src={user.img} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-dynamic-primary shadow" loading="lazy" />
              <div className="text-center">
                <h4 className="font-semibold text-dynamic-text">{user.name}</h4>
                <p className="text-xs text-dynamic-text-secondary">{user.role}</p>
              </div>
              <Badge variant="accent">Active</Badge>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-dynamic-text mb-4">Progress & Loading</h3>
        <div className="space-y-6">
          {[
            { label: 'Primary Progress', value: 75, color: 'primary' },
            { label: 'Success Progress', value: 92, color: 'success' },
            { label: 'Warning Progress', value: 68, color: 'warning' },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-dynamic-text">{item.label}</span>
                <span className="text-sm text-dynamic-text-secondary">{item.value}%</span>
              </div>
              <ProgressBar value={item.value} color={item.color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
