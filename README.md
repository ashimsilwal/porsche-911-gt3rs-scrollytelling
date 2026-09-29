# Porsche 911 GT3 RS — The Architecture of Velocity

An Awwwards-caliber scrollytelling web experience built with **Next.js (App Router)**, **Framer Motion**, and **HTML5 Canvas**. The application features an interactive 50-frame deconstruction sequence of the iconic Porsche 911 GT3 RS finished in Oak Green Metallic Neo, paired with a dynamic acoustic engine and real-time telemetry monitors.

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-magenta?style=flat-square)
![Canvas](https://img.shields.io/badge/Render-HTML5_Canvas-emerald?style=flat-square)
![License](https://img.shields.io/badge/License-Non--Commercial_Fair_Use-amber?style=flat-square)

---

## ✨ Features & Engineering Highlights

- **50-Frame Scrollytelling Deconstruction Canvas**:
  - Continuous 60fps/120fps hardware-accelerated HTML5 Canvas render loop.
  - Linear interpolation (`lerp`) smoothing between scroll ticks for jitter-free mechanical disassembly.
  - Device pixel ratio (`window.devicePixelRatio`) scaling for crisp rendering on Retina & 4K displays.
  - Edge-to-edge cover scaling with zero horizontal or vertical letterboxing across ultrawide monitors, laptops, and mobile screens.

- **Dynamic Acoustic Engine**:
  - Authentic Porsche flat-six engine rev audio with volume controls and scroll-linked pitch modulation.
  - Real-time `playbackRate` acceleration scaling smoothly from idle (0.85×) up to peak revs (1.65×) as the user traverses the disassembly timeline.

- **Sharp Geometric Design Language**:
  - High-end dark luxury palette (`#0a0a0c`) with Oak Green Metallic Neo and Weissach emerald accents.
  - Precision architectural styling utilizing sharp geometric edges (`rounded-none`), bespoke monospaced typography, and subtle scanline vignette textures.

- **Weissach Engineering Deep-Dive**:
  - Interactive tabbed architecture explorer for **Powertrain**, **Active Aerodynamics (DRS)**, and **Double-Wishbone Chassis**.
  - Dynamic lateral acceleration and PCCB braking force telemetry simulations.

- **Bespoke Atelier Color Configurator**:
  - Live livery switcher featuring classic and modern Porsche paint selections:
    - *Oak Green Metallic Neo* (`#1b3226`)
    - *Arctic Grey* (`#3b4046`)
    - *Guards Red* (`#a31621`)
    - *Shark Blue* (`#0c3b69`)
    - *Racing Yellow* (`#d69e2e`)

- **Fully Responsive Architecture**:
  - Fluid support across desktop displays, iPads/tablets, and mobile viewports.
  - Seamless zero-gap fixed navigation with an auto-collapsing notice bar and touch-friendly navigation drawer.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Animation & Scroll Tracking**: [Framer Motion 12](https://www.framer.com/motion/)
- **Rendering**: HTML5 2D Canvas Context with DPR normalization
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tooling**: Turbopack & TypeScript

---

## 📁 Project Structure

```text
porsche-website/
├── public/
│   ├── porsche-animated/        # 50 pre-rendered lossless WebP + JPG sequence frames
│   └── sounds/                  # Authentic recorded engine sound effects (.ogg)
├── src/
│   ├── app/
│   │   ├── globals.css          # Theme tokens, dark luxury backdrop & custom scrollbars
│   │   ├── layout.tsx           # SEO metadata, OpenGraph tags, and font definitions
│   │   └── page.tsx             # Main experience, configurator, telemetry & footer
│   └── components/
│       └── PorscheScrollyCanvas.tsx  # High-performance canvas scrollytelling component
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ashimsilwal/porsche-911-gt3rs-scrollytelling.git
   cd porsche-911-gt3rs-scrollytelling
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. **View in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

---

## ⚖️ Legal Disclaimer & Fair Use Notice

**Non-Commercial Demonstration Only**:  
This project is an educational, non-commercial portfolio demonstration created exclusively to showcase modern creative web development, high-performance HTML5 Canvas scrollytelling techniques, Framer Motion animations, and Next.js capabilities.

- **Intellectual Property**: All visuals, car designs, animations, trademarks, emblems, wordmarks, sound clips, and brand designations (including "Porsche", "911 GT3 RS", and "Weissach") are the registered property of **Dr. Ing. h.c. F. Porsche AG** and their respective partners. No affiliation, endorsement, or commercial rights are claimed.
- **Immediate Takedown Commitment**: Intellectual property rights are fully respected. If you are a copyright or trademark owner or an authorized representative and have any objection to any content shown, please reach out directly:
  - **Copyright Inquiries**: [ashim@fivizo.com](mailto:ashim@fivizo.com) *(Prompt 24-hour removal guaranteed)*

---

## 👨‍💻 Creator Credits

Designed and developed by **[Ashim Silwal](https://ashimsilwal.com.np)**, under **[Fivizo Tech and Marketing](https://fivizo.com)**.
