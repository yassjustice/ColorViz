<!-- Use this file to prov### ♿ 3. Advanced Color Theory & Accessibility Analysis
- **WCAG Compliance Testing**: Show contrast ratios with detailed AAA/AA/A ratings
- **Color Harmony Analysis**: Detect and suggest complementary, analogous, triadic, tetradic, split-complementary schemes
- **Psychological Impact Assessment**: Analyze emotional response, cultural implications, and brand perception
- **UI/UX Context Analysis**: Evaluate color effectiveness for different interface elements
- **Color Temperature Analysis**: Warm/cool balance and emotional temperature mapping
- **Accessibility Beyond Vision**: Consider color blindness, cognitive load, and visual fatigue
- **Smart Recommendations**: AI-powered suggestions for palette improvements based on color theory principles
- **Real-time Feedback**: Instant warnings for poor combinations with explanationsorkspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# 🧠 Copilot Instructions for Color Visualization App

## 📌 Project Goal
Build a **production-ready React application** (JavaScript only, no TypeScript) that allows users to input a list of HEX color codes (e.g., `#819A91`, `#A7C1A8`, `#D1D8BE`, `#EEEFE0`) and instantly visualize a full design system styled with those colors.

This tool helps designers and developers test, compare, and decide on color schemes based on real UI layouts, accessibility, and color theory.

---

## 🧱 App Structure Requirements

### 🖼️ 1. Enhanced UI Previews & Real-World Scenarios
Create comprehensive preview systems with:
- **Layout Variations**: Responsive headers, sidebars, cards, grids, dashboards, landing pages
- **Component Library**: Buttons (primary, secondary, disabled, loading), modals, forms, tooltips, notifications
- **Typography Hierarchy**: H1-H6, body text, captions, code blocks, quotes with proper contrast testing
- **Interactive Elements**: Navigation (tabs, breadcrumbs, pagination), data visualization, progress indicators
- **Mobile & Desktop Views**: Responsive previews showing color impact across different screen sizes
- **Real Application Contexts**: E-commerce, SaaS, Portfolio, Blog, Admin Dashboard templates
- **Animation Previews**: Hover states, transitions, micro-interactions showing color dynamics

### 🎨 2. Intelligent Dynamic Theming & Color Science
- **Advanced Color Mapping**: User inputs 4-8 HEX values with intelligent role assignment
- **Color Roles**: Primary, secondary, tertiary, neutral, accent, success, warning, error, info
- **Semantic Mapping**: Background hierarchy (primary, secondary, tertiary), text hierarchy, interactive states
- **Live CSS Variables**: Real-time CSS custom property updates with smooth transitions
- **Color Space Analysis**: HSL, RGB, LAB color space conversions and relationships
- **Brand Context Adaptation**: Automatically suggest optimal assignments based on brand analysis
- **Color Blindness Simulation**: Deuteranopia, Protanopia, Tritanopia real-time previews

### ♿ 3. Accessibility & Color Theory
- Show contrast ratios between text and background
- Labels: “AAA Compliant”, “Good Contrast”, “Fail”
- Optional: generate complementary, analogous, triadic palettes
- Warn about poor color combinations

### 💾 4. Storage & Export
- Save/reload palettes using localStorage
- Export palette to:
  - JSON file
  - CSS custom properties

---

## 🔧 Development Setup

- React app (JavaScript only, no TypeScript)
- Tailwind CSS with theme extension
- Use modern UI libraries like:
  - `shadcn/ui` (or Headless UI)
  - `framer-motion` for animations

---

## 🧠 Copilot Terminal Access

You can access the terminal by running the task defined in:

.vscode/tasks.json



This will:
- Start the development server (`npm run dev` or `npm start`)
- Let you view terminal output live
- Enable interactive package installs and server restarts

Use this to preview the app and verify that the UI updates as expected.

---

## 🏁 Expectations

Do **not** produce a raw sandbox or minimal UI.

✅ The UI must be **refined**, **real-world**, and **interactive**  
✅ All components must dynamically respond to user palettes  
✅ Code must be clean, modular, and scalable  
✅ Styling and transitions must be polished  
✅ No TypeScript, no boilerplate, no placeholders  

---

## ✨ Bonus Features (optional)

- Dark/light mode toggle
- Drag-and-drop color picker or visual palette selector
- Screenshot export or component snapshot
- Use example palettes from design systems (Tailwind, Material)

---

## 📂 Output Structure

src/
├── components/
├── layouts/
├── context/
├── styles/
├── hooks/
├── App.jsx
├── main.jsx
public/
.github/
.vscode/
tailwind.config.js
package.json


Final output should be deploy-ready and executable without further setup.