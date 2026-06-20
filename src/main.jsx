import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Self-hosted fonts matching the Tailwind config — only the weights and the
// latin character subset actually used in the UI, to keep the font payload
// small and avoid a third-party font-CDN request (faster first paint).
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/inter/latin-800.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import '@fontsource/jetbrains-mono/latin-700.css';

import './index.css';

/**
 * Application Bootstrapper
 * Mounts the root App element tree directly into the index.html target container.
 * Employs StrictMode to catch component lifecycle warning errors early.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Fade out and remove the static first-paint loader once React has taken over.
const initialLoader = document.getElementById('initial-loader');
if (initialLoader) {
  initialLoader.style.opacity = '0';
  setTimeout(() => initialLoader.remove(), 300);
}