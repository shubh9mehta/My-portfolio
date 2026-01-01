# 🚀 Shubh Mehta Portfolio - VS Code Setup Guide

## Step 1: Create the Project

Open your terminal and run:

```bash
# Create new React project with Vite (faster than create-react-app)
npm create vite@latest shubh-portfolio -- --template react

# Navigate into project
cd shubh-portfolio

# Install dependencies
npm install

# Install additional packages we need
npm install recharts lucide-react
```

---

## Step 2: Project Structure

After setup, your folder should look like this. Delete the default files and create this structure:

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
│   │   └── portfolioData.js
│   ├── hooks/
│   │   └── useCounter.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

---

## Step 3: Install & Configure Tailwind CSS

```bash
# Install Tailwind and its dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

---

## Step 4: Configure Files

### 4a. Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0F172A',
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

### 4b. Update `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background-color: #0F172A;
  color: #f1f5f9;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

/* Glassmorphism utility */
.glass {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(51, 65, 85, 0.5);
}
```

### 4c. Update `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Shubh Mehta - Data Analyst Portfolio. Transforming complex data into actionable insights." />
    <title>Shubh Mehta | Data Analyst</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## Step 5: Create the Files

Now create each file in order. I've provided all the code in the accompanying files:

1. `src/data/portfolioData.js` - Your resume data
2. `src/hooks/useCounter.js` - Animation hook
3. `src/components/Navbar.jsx`
4. `src/components/Hero.jsx`
5. `src/components/ImpactDashboard.jsx`
6. `src/components/Toolbox.jsx`
7. `src/components/SkillRadar.jsx`
8. `src/components/Experience.jsx`
9. `src/components/AnalysisSimulation.jsx`
10. `src/components/Projects.jsx`
11. `src/components/Contact.jsx`
12. `src/App.jsx`
13. `src/main.jsx`

---

## Step 6: Run the Project

```bash
npm run dev
```

Open `http://localhost:5173` in your browser!

---

## Step 7: Deploy (Free Options)

### Option A: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option B: Netlify
```bash
npm run build
# Drag the `dist` folder to netlify.com/drop
```

### Option C: GitHub Pages
```bash
npm install -D gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Then run:
npm run deploy
```

---

## Customization Tips

1. **Update contact links** in `portfolioData.js`
2. **Add your LinkedIn/GitHub URLs** 
3. **Replace placeholder images** if you want to add project screenshots
4. **Adjust colors** in `tailwind.config.js` if you want a different vibe

---

## Need Help?

If you run into issues:
1. Make sure Node.js is v18+: `node --version`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Clear Vite cache: `rm -rf .vite && npm run dev`

Happy coding! 🎉
