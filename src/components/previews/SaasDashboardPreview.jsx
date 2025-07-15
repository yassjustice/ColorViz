import React from 'react';
import { TrendingUp, Download, Plus } from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '../ui';

export default function SaasDashboardPreview({ palette, device = 'desktop' }) {
  // Sophisticated SaaS dashboard UI
  const metrics = [
    { id: 'revenue', label: 'Revenue', value: '$24,563', change: '+12.5%', trend: 'up', color: 'primary' },
    { id: 'users', label: 'Active Users', value: '1,429', change: '+8.2%', trend: 'up', color: 'success' },
    { id: 'conversion', label: 'Conversion', value: '3.4%', change: '-0.3%', trend: 'down', color: 'warning' },
    { id: 'churn', label: 'Churn Rate', value: '2.1%', change: '+0.5%', trend: 'down', color: 'error' },
  ];
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-dynamic-text">Analytics Dashboard</h1>
          <p className="text-dynamic-text-secondary text-sm md:text-base">Track your business performance</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto">
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="primary" size="sm" className="w-full md:w-auto">
            <Plus className="w-4 h-4" />
            New Report
          </Button>
        </div>
      </div>
      <div
        className={
          device === 'mobile'
            ? 'grid grid-cols-1 gap-4'
            : device === 'tablet'
            ? 'grid grid-cols-2 gap-4'
            : 'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'
        }
      >
        {metrics.map(metric => (
          <Card
            key={metric.id}
            className={`cursor-pointer transition-all duration-200 ${metric.trend === 'up' ? 'ring-2 ring-dynamic-success' : 'ring-2 ring-dynamic-error'} ${device === 'mobile' ? 'p-2' : device === 'tablet' ? 'p-3' : 'p-4 md:p-6'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-dynamic-text-secondary">{metric.label}</h3>
              <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-dynamic-success' : 'text-dynamic-error'}`} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl md:text-2xl font-bold text-dynamic-text">{metric.value}</span>
              <Badge variant={metric.trend === 'up' ? 'success' : 'error'} size="sm">{metric.change}</Badge>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h3 className="text-lg font-semibold text-dynamic-text">Revenue Overview</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">7D</Button>
            <Button variant="primary" size="sm">30D</Button>
            <Button variant="ghost" size="sm">90D</Button>
          </div>
        </div>
        <div className="flex items-end space-x-2 h-32">
          {[45, 52, 48, 61, 55, 67].map((value, idx, arr) => (
            <div key={idx} className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full bg-gradient-to-t from-dynamic-primary to-dynamic-secondary rounded-t-md min-h-[4px]" style={{height: `${(value / Math.max(...arr)) * 100}%`}} />
              <span className="text-xs text-dynamic-text-secondary">{['Jan','Feb','Mar','Apr','May','Jun'][idx]}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className={device === 'mobile' ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8'}>
        <Card>
          <h3 className="text-lg font-semibold text-dynamic-text mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                user: 'Sarah Chen',
                action: 'upgraded to Pro plan',
                time: '2 min ago',
                avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=64&h=64&facepad=2'
              },
              {
                user: 'Mike Johnson',
                action: 'created new project',
                time: '15 min ago',
                avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=64&h=64&facepad=2'
              },
              {
                user: 'Lisa Wong',
                action: 'invited team member',
                time: '1 hour ago',
                avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=64&h=64&facepad=2'
              }
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-dynamic-background rounded-lg shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-dynamic-primary"
              >
                <img
                  src={activity.avatar}
                  alt={activity.user}
                  className="w-10 h-10 rounded-full object-cover border-2 border-dynamic-primary shadow"
                  loading="lazy"
                />
                <div className="flex-1">
                  <p className="text-sm text-dynamic-text"><span className="font-medium">{activity.user}</span> {activity.action}</p>
                  <p className="text-xs text-dynamic-text-secondary">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-dynamic-text mb-4">Team Performance</h3>
          <div className="space-y-4">
            {[{name:'Design Team',progress:87,color:'primary'},{name:'Development',progress:92,color:'success'},{name:'Marketing',progress:76,color:'warning'}].map((team, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-dynamic-text">{team.name}</span>
                  <span className="text-sm text-dynamic-text-secondary">{team.progress}%</span>
                </div>
                <ProgressBar value={team.progress} color={team.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
