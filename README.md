# Pavan Kumar — Portfolio

Built with React + Vite + Tailwind CSS (Chromatic Atelier design system).

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Edit Your Content

**All your personal info, projects, skills, and education live in one file:**

```
src/data/portfolio.js
```

Change anything there and the whole site updates automatically.

## Project Structure

```
pavan-portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        ← Navigation bar
│   │   ├── Hero.jsx          ← Landing section
│   │   ├── About.jsx         ← About me + info cards
│   │   ├── Projects.jsx      ← Project cards
│   │   ├── Skills.jsx        ← Languages / Frameworks / Tools
│   │   ├── Education.jsx     ← Education timeline
│   │   ├── Achievements.jsx  ← Achievement cards
│   │   └── Footer.jsx        ← Contact CTA + footer
│   ├── data/
│   │   └── portfolio.js      ← ✏️  EDIT YOUR INFO HERE
│   ├── hooks/
│   │   └── useReveal.js      ← Scroll animation hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             ← Global styles + Tailwind
├── tailwind.config.js        ← Design system tokens
├── index.html
└── package.json
```

## Deploy to GitHub Pages

```bash
npm install -D gh-pages
```

Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Then run:
```bash
npm run deploy
```
