# ✨ Aura Platform

> A modern, full-featured web platform built with React + Vite.

🌐 **Live Demo:** [https://suhani00796.github.io/aura-platform/](https://suhani00796.github.io/aura-platform/)

---

## 🚀 Features

- ⚡ Blazing fast with **Vite** bundler
- ⚛️ Built with **React 18**
- 🎨 Clean, responsive UI
- 📁 Modular component architecture
- 🔗 Path aliasing with `@/` for clean imports
- 🌍 Deployed on **GitHub Pages**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | UI framework |
| Vite | Build tool & dev server |
| JavaScript (JSX) | Component logic |
| GitHub Pages | Hosting & deployment |
| GitHub Actions | CI/CD pipeline |

---

## 📦 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Suhani00796/aura-platform.git

# Navigate into the project
cd aura-platform

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The compiled output will be in the `dist/` folder.

---

## 🚢 Deployment

This project is automatically deployed to GitHub Pages via **GitHub Actions** on every push to `main`.

The workflow:
1. Installs dependencies
2. Runs `npm run build`
3. Publishes the `dist/` folder to the `gh-pages` branch

To trigger a new deployment, simply push your changes:

```bash
git add .
git commit -m "your message"
git push origin main
```

---

## 📁 Project Structure

```
aura-platform/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── assets/         # Images, icons, fonts
│   └── main.jsx        # App entry point
├── index.html          # HTML shell
├── vite.config.js      # Vite configuration
└── package.json
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👩‍💻 Author

**Suhani**
- GitHub: [@Suhani00796](https://github.com/Suhani00796)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
