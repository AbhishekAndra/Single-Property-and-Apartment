# THE SOLAIRE RESIDENCES — Awwwards-Standard Luxury Web Experience

> Ultra-luxury Single Property & Apartment development website inspired by cinematic aerial transitions, 3D architectural perspectives, and editorial typography. Deployed for GitHub Pages compatibility with zero build dependencies required.

---

## 🏛️ Dedicated Sub-Pages

Each page is an optimized HTML5/CSS3/JavaScript document featuring unified GSAP momentum scrolling, custom cursor physics, and luxury preloading:

| File | Page Name | Features & Visual Interactions |
|---|---|---|
| [`index.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/index.html) | **Overview & Hero** | Pinned macro-to-micro drone descent (1,250m down to 48m telemetry scrub with cloud dispersal), Three.js 3D building twin, Global Press Critical Acclaim, Jumeirah Bay Nautical Masterplan map, Collaborative Masters monograph, and chapter gateways. |
| [`residences.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/residences.html) | **Residences Collection** | Real-time Three.js PBR 3D tower with 360° drag orbit, zoom controls, screen-projected 3D hotspot beacons, lighting modes (Daylight, Sunset, Twilight), superyacht marina basin, 48-storey vertical stacking schedule, filterable inventory cards (Penthouses, 3-Bed, 2-Bed), global currency converter (AED, USD, EUR, GBP), SQ FT ⇋ SQ M area switcher, UAE 10-Year Golden Visa & fiscal tax advantages, structured 50/50 milestone payment plan, interactive private wealth mortgage simulator, Foster & Partners materiality matrix, and instant monograph PDF download. |
| [`interiors.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/interiors.html) | **Interior Walkthrough** | GSAP pinned horizontal scroll with multi-layer parallax quote cards, interactive Before/After daylight vs. sunset split slider, and 180° pan scrubber. |
| [`floor-plans.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/floor-plans.html) | **Floor Plans & Specs** | High-precision architectural SVG blueprints with wall geometry & door arcs, room hover tooltips, and instant SQ FT ⇋ SQ M unit conversion. |
| [`amenities.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/amenities.html) | **Amenities & Lifestyle** | *"Room to move. Time to exhale."* Staggered kinetic collage, 50m cantilevered infinity sky pool, Nordic spa, private yacht berths, and lightbox inspection. |
| [`architecture.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/architecture.html) | **Architecture & Design** | Foster & Partners engineering monograph, post-tensioned cantilevered slabs, acoustic triple glazing, and delivery milestones to Q4 2027. |
| [`contact.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/contact.html) | **Private Sales Gallery** | Private client advisory portal, 4 consultation formats (Pavilion, Superyacht Cruise, Holo-Briefing, Family Office), curated atmospheric viewing time slots, Rolls-Royce courtesy chauffeur & 45m yacht berth reservations, live reference code generator with downloadable `.ics` calendar invite, direct WhatsApp concierge, 5 global private client desks (Dubai, London, Geneva, Singapore, Riyadh), senior directors roster, multi-modal arrival matrix, and sovereign legal FAQ accordion. |
| [`login.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/login.html) | **Resident Portal Login** | Any email & password authentication, one-touch VIP demo personas (Lord Sterling, Elena Rostova, H.E. Tariq), and simulated FaceID/Biometric keycard scanner. |
| [`signup.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/signup.html) | **Resident Key Application** | VIP onboarding form with residence tier selection (Penthouse, Celestial, Haven, Atelier), pre-validated invite code, and digital keycard minting. |
| [`dashboard.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/dashboard.html) | **Resident Owner Console** | **Logged-in email prominently displayed at the very top**, live residence portfolio valuation, in-suite smart lighting/glass automation, St. Regis butler dispatches, and encrypted document vault. |

---

## 🌟 Key Features & Creative Implementations

1. **Vibrant Real-Time 3D WebGL Architectural Twin (`js/three-building.js`):**
   - **PBR Architectural Materials:** Honed white travertine floor slabs, reflective azure sea glass, and gleaming metallic champagne gold fascia edges.
   - **Living Interior Apartments:** Multi-toned warm glowing rooms (amber, honey, warm coral, and mint cyan).
   - **50m Cantilevered Sky Infinity Pool (L18):** Electric turquoise water with glass railing and golden under-cantilever LED cove lighting.
   - **Waterfront Island, Marina & Superyacht:** Reflective Persian Gulf water basin, docked 45m luxury yacht with underwater blue LED hull lights, and sculpted palm trees with warm uplighting.
   - **Level 48 Penthouse Crown & Helipad:** Bronze architectural pergola with illuminated 'H' helipad.
   - **Dynamic Lighting Modes:** Instant switching between Mediterranean Azure Daylight, Arabian Sunset Golden Hour, and Dubai Neon Twilight Night.
   - **360° Orbit & Telemetry HUD:** Drag orbit with inertia, mouse wheel zoom, zoom `+`/`-` buttons, auto-spin toggle, and interactive 3D hotspot beacons.

2. **Ultra-Luxury Polish & Global Telemetry:**
   - **Live Dubai Meridian Telemetry:** Live local time (UTC+4) and weather ticker updated dynamically in the fixed header across all pages.
   - **Global Reading / Scroll Progress Line:** Radiant champagne gold progress line (`#global-scroll-progress`) tracking scroll completion.
   - **Crystalline Acoustic Haptics:** Web Audio API generating soft harmonic crystalline chimes upon button interactions and tier selection.
   - **Persistent Film Grain Overlay:** Subtle SVG noise filter providing tactile editorial monograph depth.

3. **Jumeirah Bay Nautical Masterplan & Collaborative Masters Monograph:**
   - Interactive nautical proximity map detailing transit times to Downtown Dubai, DIFC, DXB, and Bulgari Yacht Club with chauffeur and yacht options.
   - Curated monograph featuring Foster + Partners, Studio Liaigre, WET Design, and The St. Regis Residences.
   - Global critical acclaim quotes from Robb Report, Architectural Digest, Financial Times, and Vogue Living.

4. **Flexible Any-Email Resident Authentication & Personas:**
   - Any valid email and password can log in immediately.
   - One-touch VIP Persona shortcuts for instant client presentations.
   - Interactive Biometric Keycard simulation with laser scanning animation.
   - Synchronized header authentication state across all public pages.

2. **Prominent Top-Bar Email & Telemetry in Dashboard:**
   - Dedicated top-level telemetry ribbon exhibiting `LOGGED IN AS: [user-email]` alongside live Jumeirah Bay tide levels, berth readiness, and weather.
   - Main navigation capsule with user initial avatar and owner tier badge.
   - Personalized editorial hero greeting addressing the resident by their exact email.

3. **In-Suite Smart Environmental Controls:**
   - **Atmospheric Lighting Moods:** 12:00 Midday Sun, 18:15 Golden Sunset, 21:00 Twilight Blue, Midnight Amber.
   - **Motorized 7.2m Schuco Balcony Slider:** Live interactive percentage slider from 0% sealed to 100% open air.
   - **Thermostat Climate:** Concealed linear diffusers with interactive temperature stepper.
   - **Sensory Curation:** Bespoke Santal 26 nebulized HVAC diffusion.

4. **St. Regis 24/7 Butler & Concierge Dispatches:**
   - One-touch dispatch for Rolls-Royce Phantom chauffeur.
   - Sommelier private cellar vault booking.
   - Level 18 Celestial infinity sky pool cabana reservation.
   - WhatsApp concierge link with user email and residence suite pre-filled.

5. **Encrypted Ownership Vault & VIP Calendar:**
   - Downloadable blueprints, RERA-approved escrow guarantees, and blockchain ownership tokens with interactive toast notifications.
   - Exclusive resident gala invitations with RSVP status toggles.

---

## 📂 Project Structure

```
Single Property and Apartment/
├── index.html                      # Overview & Hero Pinned Zoom
├── residences.html                 # Three.js 3D Building Explorer & Hotspots
├── interiors.html                  # Horizontal Walkthrough & Split Slider
├── floor-plans.html                # Interactive SVG Blueprints & Specs
├── amenities.html                  # Lifestyle & Kinetic Collage
├── architecture.html               # Engineering & Structural Monograph
├── contact.html                    # Sales Gallery & VIP Booking Portal
├── login.html                      # Resident Portal Authentication
├── signup.html                     # Resident Keycard Registration
├── dashboard.html                  # Resident Owner Console & Telemetry
├── css/
│   └── style.css                   # Custom scrollbar, typography, glassmorphism, cursor
└── js/
    ├── auth.js                     # Resident authentication engine & session sync
    ├── main.js                     # Lenis scroll, magnetic cursor, Web Audio, modal
    ├── three-building.js           # Three.js 3D tower with PBR materials & 3D hotspots
    ├── interior-scrubber.js        # Pinned horizontal scroll & Before/After split slider
    └── floor-plans.js              # Interactive SVG blueprints & metric toggle
```

---

## ⚡ How to Run

### Method 1: Direct File Opening
Double-click [`index.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/index.html) or [`login.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/login.html) to run in Chrome, Edge, Safari, or Firefox without any build step.

### Method 2: Local Static Server
```bash
# Using Python 3
python -m http.server 3000

# Using Node.js
npx serve .
```
Navigate to `http://localhost:3000`.
