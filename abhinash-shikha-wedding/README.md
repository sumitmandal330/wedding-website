# ABINASH & Shikha — Cinematic Royal Wedding Invitation 🌸

A bespoke, production-ready, interactive Indian wedding invitation website built for **ABINASH & Shikha**.

Designed with royal Indian aesthetics, featuring warm ivory, antique gold, and deep wedding maroon palettes, refined typography, auspicious blessings, 3D opening royal doors, live countdown timer, and traditional background music.

---

## 🎬 The Cinematic Invitation Flow

The website follows an authentic, sequential digital invitation journey:

```
[Scene 1: Welcome Invitation Card]
               │ (Tap "Open Invitation")
               ▼
[Scene 2: Lord Ganesha Blessings] ─── (Touch feet for divine bell & golden aura)
               │ (Continue)
               ▼
[Scene 3: Grand Royal Double Doors]
         ┌─────┴─────┐
         ▼           ▼
[Scene 4: Engagement]  [Scene 5: Wedding]
 (Details & Photos)     (Ceremonies, Countdown, Venue & Photos)
         └─────┬─────┘
               │ (Return to Royal Doors anytime)
```

1. **Scene 1 — Welcome Invitation Cover (`InvitationCover.jsx`)**
   - High-end wedding invitation card design.
   - Names: **ABINASH & Shikha**.
   - Date: **5 December 2026**.
   - Interactive **"Open Invitation"** button with smooth Framer Motion transition into Scene 2.

2. **Scene 2 — Lord Ganesha Blessings (`GaneshaBlessing.jsx`)**
   - Prominent, respectful Lord Ganesha artwork.
   - Sacred Shloka: *॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥*
   - Interactive **"Touch Sacred Feet for Blessings"** target.
   - Tapping feet triggers a **divine bell chime** (synthesized via Web Audio API), a golden aura glow, and a golden petal shower.
   - Graceful "Continue to Royal Entrance" button leading into Scene 3.

3. **Scene 3 — Grand Royal Double Doors (`RoyalDoors.jsx`)**
   - Architectural palace gateway with two detailed royal carved double doors.
   - Rich maroon textures, antique gold borders, and traditional door knockers.
   - Two distinct choices:
     - **Door I: Engagement**
     - **Door II: Wedding**
   - Choosing either door triggers a smooth **3D perspective door opening animation** (`rotateY`) revealing the selected royal experience!

4. **Scene 4 — Engagement Experience (`EngagementExperience.jsx`)**
   - Elegant engagement-themed design with ring motifs.
   - Graceful placeholders for unconfirmed ceremony timings and venue (*"Ceremony details will be announced soon"*).
   - Dedicated showcase with 8 replaceable photo slots (`public/images/engagement/photo-1.svg` to `photo-8.svg`) and fullscreen lightbox.
   - 1-click WhatsApp share button.
   - **"Return to Royal Doors"** button to easily switch to the Wedding doorway.

5. **Scene 5 — Wedding Experience (`WeddingExperience.jsx`)**
   - Names: **ABINASH & Shikha**.
   - Confirmed Wedding Date: **5 December 2026**.
   - Confirmed Venue: **Co-operative Colony, Bokaro, Jharkhand**.
   - **Live Countdown Timer** calculating days, hours, minutes, and seconds in IST.
   - Dedicated cards for **Haldi**, **Mehndi**, **Sangeet**, and **Shaadi** (with clear placeholders for exact times, no invented details).
   - Gallery showcase with 8 replaceable photo slots (`public/images/wedding/photo-1.svg` to `photo-8.svg`) and fullscreen lightbox.
   - **Google Maps Directions** link for *Co-operative Colony, Bokaro, Jharkhand*.
   - **"Return to Royal Doors"** button.

6. **Ambient Traditional Music (`MusicPlayer.jsx`)**
   - Traditional Indian Shehnai & Sitar background music with animated equalizer bars.
   - Autoplays only after user interaction ("Open Invitation").
   - **Procedural Tanpura / Shehnai Web Audio API Synthesizer Fallback**: Synthesizes a meditative Indian drone if audio streaming is unavailable or blocked.

---

## 🛠️ Technology Stack

- **Framework**: React.js 19 + Vite 8
- **Language**: JavaScript with JSX
- **Styling**: Tailwind CSS v4 + Custom Royal Theme (Ivory, Beige, Maroon, Antique Gold)
- **Typography**: Cormorant Garamond, Playfair Display, Cinzel, Plus Jakarta Sans
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Celebrations & Sound**: Canvas Confetti, Web Audio API

---

## 📂 Project Structure

```
ABINASH-shikha-wedding/
├── public/
│   └── images/
│       ├── ganesha/           # Lord Ganesha artwork (ganesha.svg)
│       ├── couple/            # Couple portraits (couple-placeholder.svg)
│       ├── engagement/        # 8 engagement photos (photo-1.svg to photo-8.svg)
│       ├── wedding/           # 8 wedding photos (photo-1.svg to photo-8.svg)
│       └── decorations/       # Floral motifs
├── src/
│   ├── components/
│   │   ├── InvitationCover.jsx       # Scene 1: Welcome invitation cover
│   │   ├── GaneshaBlessing.jsx       # Scene 2: Ganesha blessing & feet touch
│   │   ├── RoyalDoors.jsx            # Scene 3: Grand 3D royal double doors
│   │   ├── EngagementExperience.jsx  # Scene 4: Engagement experience & photos
│   │   ├── WeddingExperience.jsx     # Scene 5: Wedding ceremonies, countdown, venue
│   │   ├── Countdown.jsx             # Live countdown to 5 December 2026
│   │   ├── MusicPlayer.jsx           # Background music with Web Audio fallback
│   │   └── PetalShower.jsx           # Floating marigold & rose petals
│   ├── data/
│   │   └── wedding.js                # Centralized wedding & engagement configuration
│   ├── App.jsx                       # Master 5-scene cinematic state orchestrator
│   ├── index.css                     # Royal palette & theme variables
│   └── main.jsx                      # Application entry point
├── package.json
└── vite.config.js
```

---

## 📸 How to Replace Photographs with Real Photos

When you have the 7–8 photographs of the couple:

1. **Engagement Photos**:
   - Save your photos in `public/images/engagement/` as `photo-1.jpg`, `photo-2.jpg`, etc. (or keep your preferred filenames).
   - In `src/data/wedding.js`, update the image paths under `engagement.photos`:
     ```javascript
     { id: 1, title: "A Promise Made", src: "/images/engagement/photo-1.jpg", alt: "..." }
     ```

2. **Wedding Photos**:
   - Save your photos in `public/images/wedding/` as `photo-1.jpg`, `photo-2.jpg`, etc.
   - In `src/data/wedding.js`, update the image paths under `wedding.photos`:
     ```javascript
     { id: 1, title: "Sacred Moments", src: "/images/wedding/photo-1.jpg", alt: "..." }
     ```

3. **Lord Ganesha Artwork**:
   - Currently includes high-quality SVG vector artwork at `public/images/ganesha/ganesha.svg`.
   - If you have a specific family Ganesha portrait, save it in `public/images/ganesha/` and update `src/components/GaneshaBlessing.jsx`.

---

## ⚙️ How to Update Ceremony Dates & Timings

All details are centralized in:

📁 `src/data/wedding.js`

When ceremony dates, times, or venues for **Haldi**, **Mehndi**, **Sangeet**, or **Engagement** are finalized, edit `src/data/wedding.js`. The cards and text automatically update without modifying any UI code.

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   cd ABINASH-shikha-wedding
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Verify code quality**:
   ```bash
   npm run lint
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🌐 Free Static Deployment (Vercel / Netlify)

This project is a static site with no backend requirements, making it ideal for free hosting on Vercel or Netlify.

### Option A: Vercel (Recommended)
1. Push this project to GitHub.
2. Sign in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository and select the `ABINASH-shikha-wedding` directory as the Root Directory.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build` | Output Directory: `dist`.
6. Click **Deploy**. Vercel will provide a free public URL (e.g. `https://ABINASH-shikha-wedding.vercel.app`).

### Option B: Netlify
1. Sign in to [netlify.com](https://netlify.com) and click **"Add new site"** → **"Import an existing project"**.
2. Base directory: `ABINASH-shikha-wedding`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy Site**.

### WhatsApp Sharing
Once deployed, share the link directly on WhatsApp. The built-in **Share** button in the Engagement and Wedding screens automatically pre-fills a festive WhatsApp invitation message!

---

*Crafted with reverence, elegance, and love for ABINASH & Shikha.*
