import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
requestAnimationFrame(() => window.setTimeout(() => document.getElementById("brew-loader")?.remove(), 650));
