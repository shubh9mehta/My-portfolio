# Shubh Mehta - Data Analyst Portfolio 🚀

A modern, high-impact portfolio website showcasing data analytics skills with interactive visualizations.

![Portfolio Preview](./preview.png)

## ✨ Features

- **Impact Dashboard** - Animated metrics showcasing key achievements
- **Interactive Skill Radar** - Hover-enabled radar chart showing competency balance
- **Analysis Simulation** - Live demo of SQL automation impact (toggle between before/after)
- **Glassmorphism Design** - Modern UI with blur effects and smooth animations
- **Fully Responsive** - Works on all devices
- **Dark Theme** - Midnight blue + teal color palette

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide Icons** - Icon library

## 🚀 Quick Start

### 1. Clone/Download the project

Put all these files in a folder called `shubh-portfolio`.

### 2. Install dependencies

```bash
cd shubh-portfolio
npm install
```

### 3. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
npm run build
```

## 📁 Project Structure

```
shubh-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ImpactDashboard.jsx
│   │   ├── Toolbox.jsx
│   │   ├── SkillRadar.jsx
│   │   ├── Experience.jsx
│   │   ├── AnalysisSimulation.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── portfolioData.js    <-- YOUR DATA HERE
│   ├── hooks/
│   │   └── useCounter.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎨 Customization

### Update Your Information

Edit `src/data/portfolioData.js`:

```javascript
export const personalInfo = {
  name: "Your Name",
  email: "your.email@example.com",
  linkedin: "https://linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  // ... more
};
```

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      midnight: '#0F172A',  // Background
      teal: {
        400: '#2DD4BF',     // Accent
        500: '#14B8A6',     // Primary
      },
    },
  },
},
```

### Add Your Resume

1. Place your PDF in the `public/` folder as `resume.pdf`
2. The download link in Contact section will work automatically

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag `dist` folder to netlify.com/drop
```

### GitHub Pages

```bash
npm install -D gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

npm run deploy
```

## 📝 Important: Update These!

Before deploying, make sure to update in `src/data/portfolioData.js`:

- [ ] Your LinkedIn URL
- [ ] Your GitHub URL
- [ ] Your email address
- [ ] Your phone number
- [ ] Project GitHub links

## 🤝 Contributing

Feel free to fork and customize for your own portfolio!

## 📄 License

MIT License - feel free to use this for your own portfolio.

---

Built with ❤️ for data professionals
