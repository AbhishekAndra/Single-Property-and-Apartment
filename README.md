# THE SOLAIRE RESIDENCES — HTML5, CSS3 & JavaScript Multi-Page Experience

> Ultra-luxury Single Property & Apartment development website inspired by cinematic aerial transitions, 3D architectural perspectives, and editorial typography.

---

## 🏛️ Dedicated Sub-Pages

Each page is a self-contained, high-performance HTML5 document that can be opened directly in any browser:

| File | Page Name | Features & Visual Interactions |
|---|---|---|
| [`index.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/index.html) | **Overview & Hero** | Pinned macro-to-micro drone descent (1,250m down to 48m), altitude gauge, 3D building teaser, and chapter gateways. |
| [`residences.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/residences.html) | **Residences Collection** | Real-time Three.js 3D architectural model with 360° drag orbit, tier elevation fly-to, and specifications comparison matrix. |
| [`interiors.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/interiors.html) | **Interior Walkthrough** | *"Step inside the everyday."* Horizontal panoramic drag scrubber, lighting atmosphere switcher (Day, Sunset, Twilight), and noble materials library. |
| [`floor-plans.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/floor-plans.html) | **Floor Plans & Specs** | Filterable suites (1-Bed to Penthouse), interactive architectural SVG schematic with room highlights, SQ FT / SQ M toggle, and brochure download. |
| [`amenities.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/amenities.html) | **Amenities & Lifestyle** | *"Room to move. Time to exhale."* Staggered kinetic collage, 50m cantilevered infinity sky pool, Nordic spa, private yacht berths, and lightbox inspection. |
| [`architecture.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/architecture.html) | **Architecture & Design** | Foster & Partners engineering monograph, post-tensioned cantilevered slabs, acoustic triple glazing, and delivery milestones to Q4 2027. |
| [`contact.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/contact.html) | **Private Sales Gallery** | VIP appointment booking portal, curated viewing time slots, Rolls-Royce courtesy chauffeur transfer, and direct WhatsApp concierge integration. |

---

## 📂 Project Structure

```
Single Property and Apartment/
├── index.html                      # Overview & Hero Pinned Zoom
├── residences.html                 # 3D Building Explorer & Tiers
├── interiors.html                  # Interior Walkthrough & Pan Scrubber
├── floor-plans.html                # Interactive SVG Blueprints & Specs
├── amenities.html                  # Lifestyle & Kinetic Collage
├── architecture.html               # Engineering & Structural Monograph
├── contact.html                    # Sales Gallery & VIP Booking Portal
├── css/
│   └── style.css                   # Custom scrollbar, typography, glassmorphism, cursor
└── js/
    ├── main.js                     # Lenis scroll, custom cursor, Web Audio soundscape, modal
    ├── three-building.js           # Three.js 3D building model with 360° drag orbit
    ├── interior-scrubber.js        # Horizontal pan scrubber & lighting switcher
    └── floor-plans.js              # Interactive blueprint rooms & metric toggle
```

---

## ⚡ How to Run

### Method 1: Direct File Opening (No tools needed)
Simply double-click [`index.html`](file:///c:/Users/91939/Documents/Single%20Property%20and%20Apartment/index.html) to open and browse in Google Chrome, Microsoft Edge, Safari, or Firefox.

### Method 2: Local Static Server (Optional)
```bash
# Using Python
python -m http.server 3000

# Using Node.js npx serve
npx serve .
```
Open `http://localhost:3000` in your browser.
