import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import EcommercePreview from './previews/EcommercePreview';
import SaasDashboardPreview from './previews/SaasDashboardPreview';
import MobileAppPreview from './previews/MobileAppPreview';
import ComponentLibraryPreview from './previews/ComponentLibraryPreview';
import { Button, Card } from './ui';
import { Monitor, Smartphone, Tablet, Grid, Store, BarChart3 } from 'lucide-react';

const layouts = [
	{ id: 'ecommerce', name: 'E-commerce', icon: Store, component: EcommercePreview },
	{ id: 'saas', name: 'SaaS Dashboard', icon: BarChart3, component: SaasDashboardPreview },
	{ id: 'mobile', name: 'Mobile App', icon: Smartphone, component: MobileAppPreview },
	{ id: 'components', name: 'Components', icon: Grid, component: ComponentLibraryPreview },
];

const devices = [
	{ id: 'desktop', name: 'Desktop', icon: Monitor, frame: 'w-full' },
	{ id: 'tablet', name: 'Tablet', icon: Tablet, frame: 'max-w-xl mx-auto' },
	{ id: 'mobile', name: 'Mobile', icon: Smartphone, frame: 'max-w-sm mx-auto' },
];

export default function FullPreview() {
	const { currentPalette } = useTheme();
	const [activeLayout, setActiveLayout] = useState('ecommerce');
	const [activeDevice, setActiveDevice] = useState('desktop');
	const navigate = useNavigate();
	const ActiveComponent = layouts.find(l => l.id === activeLayout)?.component || EcommercePreview;
	const deviceFrame = devices.find(d => d.id === activeDevice)?.frame || 'w-full';
	return (
		<div className="min-h-screen bg-dynamic-background py-8 px-4">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold text-dynamic-text">Full Design System Preview</h1>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" onClick={() => navigate('/')}>Back to App</Button>
					{devices.map(device => {
						const Icon = device.icon;
						return (
							<Button
								key={device.id}
								variant={activeDevice === device.id ? 'primary' : 'ghost'}
								size="sm"
								onClick={() => setActiveDevice(device.id)}
							>
								<Icon className="w-5 h-5" />
								{device.name}
							</Button>
						);
					})}
				</div>
			</div>
			<div className="flex gap-4 mb-6">
				{layouts.map(layout => {
					const Icon = layout.icon;
					return (
						<Button
							key={layout.id}
							variant={activeLayout === layout.id ? 'primary' : 'ghost'}
							size="sm"
							onClick={() => setActiveLayout(layout.id)}
						>
							<Icon className="w-4 h-4" />
							{layout.name}
						</Button>
					);
				})}
			</div>
			<div className={`transition-all duration-300 ${deviceFrame}`}>
				<ActiveComponent device={activeDevice} palette={currentPalette} />
			</div>
			{/* Accessibility overlays, palette controls, and more can be added here */}
		</div>
	);
}
