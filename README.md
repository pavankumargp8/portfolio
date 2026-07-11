# Pavan Kumar — Interactive Developer Portfolio

[![Build & Lint CI](https://github.com/pavankumargp8/portfolio/actions/workflows/build-lint.yml/badge.svg)](https://github.com/pavankumargp8/portfolio/actions/workflows/build-lint.yml)

A high-fidelity, editorial developer portfolio engineered in React. Designed with minimalist Monopo Saigon aesthetics, typography grids, dynamic 3D layouts, and strict accessibility hardening.

👉 **Live Demo:** [https://github.com/pavankumargp8/portfolio](https://github.com/pavankumargp8/portfolio)

---

## 🚀 Key Features

### 1. 3D WebGL Circular Gallery
- Powered by a lightweight **OGL WebGL library** context.
- Distorts project tiles into a smooth circular arc on drag/scroll.
- **Dynamic Mobile Optimization:** Dynamically cuts polygon counts by **98%** on touch devices and switches to a pure CSS bento slider on non-WebGL browsers.

### 2. Zero-Flash Theme Transitions
- Features custom circular expansion transition wipes when switching between Light and Dark mode.
- **System Theme Matching:** Automatically detects client `prefers-color-scheme` settings on initial load.
- **Theme Flash Guard:** Inline blocking script execution in `index.html` prevents flashing default themes before React mounts.

### 3. Fanning 3D Hobbies Cards
- Custom interactive card deck stack. Hovering over a card fans the deck out, revealing SVG hobby illustrations with HSL-variable colored shadows.

### 4. Interactive RAG Chat Simulator
- Simulate a direct messaging RAG chatbot client with Pavan.
- Operator interface supports custom responsive message pings linked directly via Formspree backend endpoints.

---

## 🛠️ Tech Stack

- **Core:** React 19, JavaScript, Vanilla CSS
- **3D Graphics & Animations:** OGL (WebGL), Framer Motion, GSAP
- **Icons:** Lucide React
- **Hosting & Bundling:** Create React App, Webpack

---

## 🔒 Security & Accessibility Hardening

- **Reverse Tabnabbing Shield:** All outbound links secured with `rel="noopener noreferrer"`.
- **WCAG AAA Compliance:** Bushed light-mode contrast ratio on helper text variables to **`7.14:1`** for extreme readability under sunlight.
- **Reduced Motion Support:** Global `@media (prefers-reduced-motion: reduce)` overrides to instantly disable transitions for visual-sensitivity accessibility.
- **Screen Reader Navigation:** Screen-reader accessible buttons configured with clear, descriptive `aria-label` tags.

---

## 📦 Local Setup & Development

To clone, run, and compile the project locally on your machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/pavankumargp8/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm start
   ```
   *The local server compiles and serves the page at [http://localhost:3000](http://localhost:3000).*

4. **Compile Production Build:**
   ```bash
   npm run build
   ```
   *Compiles an optimized production bundle inside the `build/` folder ready for deployment.*
