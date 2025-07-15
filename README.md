# Color Visualization App

A production-ready React application for testing and visualizing custom color palettes in real-time. Built with React and Tailwind CSS.

## Features

- **Real-time Color Palette Visualization**: Input HEX colors and see them applied instantly across UI components
- **Accessibility Analysis**: WCAG contrast ratio checking with AA/AAA compliance indicators
- **Component Showcase**: Preview colors across buttons, forms, cards, navigation, and feedback components
- **Layout Previews**: See how your palette looks in complete website layouts and design patterns
- **Color Theory Tools**: Generate color variations, shades, and tints
- **Export Functionality**: Export palettes as JSON or CSS custom properties
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with your custom colors applied

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Input Colors**: Enter HEX color codes (e.g., #819A91, #A7C1A8, #D1D8BE, #EEEFE0) or use the visual color picker
2. **Real-time Preview**: See your colors applied instantly across all UI components and layouts
3. **Analyze Accessibility**: Check contrast ratios and accessibility compliance
4. **Save Palettes**: Save favorite color combinations for later use
5. **Export**: Download your palette as JSON or CSS for use in projects

## Color Input Methods

- **Quick Input**: Paste multiple HEX codes at once
- **Individual Controls**: Fine-tune each color role (primary, secondary, accent, etc.)
- **Random Generation**: Generate random palettes for inspiration
- **Saved Palettes**: Load previously saved color combinations

## Tech Stack

- **React 18** - Modern React with hooks and context
- **Tailwind CSS** - Utility-first CSS framework with custom color variables
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast development and build tooling

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ColorPaletteInput.jsx
│   ├── ColorAnalysis.jsx
│   ├── ComponentShowcase.jsx
│   └── LayoutShowcase.jsx
├── context/            # React context providers
│   └── ThemeContext.jsx
├── layouts/            # Page layout components
│   └── MainLayout.jsx
├── utils/              # Utility functions
│   └── index.js
├── App.jsx            # Main app component
└── main.jsx           # App entry point
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this for your projects!
