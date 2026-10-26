export const propertyMeta = {
  name: "THE SOLAIRE",
  tagline: "Waterfront Sanctuary Above the Horizon",
  location: "Jumeirah Bay Island, Dubai",
  coordinates: "25°12'09.4\"N 55°14'26.8\"E",
  floors: 48,
  units: 92,
  architect: "Foster & Partners in collaboration with Studio Liaigre",
  completion: "Q4 2027",
  startingPrice: "AED 11,800,000 ($3.2M USD)",
};

export const hotspots = [
  {
    id: "penthouse",
    level: "Level 44 - 48",
    title: "The Sky Penthouse Crown",
    subtitle: "Duplex Palace in the Clouds",
    price: "AED 52,000,000 ($14.2M)",
    area: "8,450 sq ft / 785 m²",
    elevation: "185m above sea level",
    yPercent: 12,
    xPercent: 50,
    features: [
      "Private 18m cantilevered infinity pool",
      "Internal glass elevator between dual levels",
      "Dedicated high-speed penthouse express elevator",
      "Master suite with his & hers dual marble spas",
      "360° unobstructed horizon from Palm to Downtown"
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    badge: "Only 2 Remaining"
  },
  {
    id: "horizon",
    level: "Level 28 - 42",
    title: "The Horizon Residences",
    subtitle: "3-Bedroom Panorama Suites",
    price: "AED 21,500,000 ($5.85M)",
    area: "3,940 sq ft / 366 m²",
    elevation: "115m above sea level",
    yPercent: 32,
    xPercent: 46,
    features: [
      "Wrap-around 3.2m deep cantilevered sun deck",
      "Sculpted stone island with Gaggenau 400 series",
      "Full floor-to-ceiling acoustic triple glazing",
      "Private maid's quarters and utility annex"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    badge: "High Demand"
  },
  {
    id: "amenities",
    level: "Level 18 - 20",
    title: "The Celestial Sky Deck",
    subtitle: "Wellness, Spa & Residents Club",
    price: "Exclusive to Residents",
    area: "16,000 sq ft Dedicated Amenity Space",
    elevation: "75m above sea level",
    yPercent: 52,
    xPercent: 54,
    features: [
      "Cantilevered 50m Olympic glass-bottom sky pool",
      "Biophilic Zen garden with organic tea pavilion",
      "State-of-the-art TechnoGym Artis private suite",
      "Soundproof executive boardrooms & cigar humidor"
    ],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    badge: "Private Amenity"
  },
  {
    id: "signature",
    level: "Level 05 - 16",
    title: "Signature Waterfront Suites",
    subtitle: "2-Bedroom Coastal Havens",
    price: "AED 12,200,000 ($3.32M)",
    area: "2,280 sq ft / 212 m²",
    elevation: "30m above sea level",
    yPercent: 72,
    xPercent: 48,
    features: [
      "Direct yacht harbor and tranquil marina line of sight",
      "Custom Rimadesio walk-in dressing suites",
      "Smart home integration with Lutron ambiance controls",
      "Direct elevator connection to private yacht berths"
    ],
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    badge: "Available"
  },
  {
    id: "lobby",
    level: "Ground & Marina Level",
    title: "Grand Arrival & Promenade",
    subtitle: "Private Beach & Berth Access",
    price: "Valet & White-Glove Concierge",
    area: "Triple-Height 12m Travertine Foyer",
    elevation: "0m Sea Level",
    yPercent: 90,
    xPercent: 50,
    features: [
      "Subterranean VIP porte-cochère with supercar lifts",
      "24/7 St. Regis standard concierge & private butler",
      "Private marina slip accommodating up to 45m yachts",
      "Lush water cascades and palm-lined garden avenues"
    ],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    badge: "Grand Lobby"
  }
];

export const floorPlans = [
  {
    id: "1bed",
    category: "1 Bedroom",
    name: "The Atelier Suite",
    levelRange: "Levels 06 - 15",
    sqft: 1420,
    sqm: 132,
    bedrooms: 1,
    bathrooms: 1.5,
    exposure: "North-West Sunset & Marina",
    price: "From AED 8,900,000",
    description: "Designed for refined solo living or international executives. Features a dramatic open-plan salon, tailored Poliform kitchen, and a master sanctuary opening directly to a deep sea-view loggia.",
    rooms: [
      { name: "Living & Dining Salon", dimensions: "7.8m × 5.4m" },
      { name: "Master Suite", dimensions: "5.2m × 4.2m" },
      { name: "En-Suite Bath & Spa", dimensions: "3.6m × 2.8m" },
      { name: "Sunset Terrace", dimensions: "6.2m × 2.4m" }
    ],
    svgPlan: {
      ratio: "4/3",
      roomsLayout: [
        { label: "Living / Salon", x: "15%", y: "20%", w: "45%", h: "45%", color: "rgba(197, 168, 128, 0.15)" },
        { label: "Master Suite", x: "63%", y: "20%", w: "27%", h: "45%", color: "rgba(197, 168, 128, 0.22)" },
        { label: "Kitchen & Dining", x: "15%", y: "68%", w: "35%", h: "22%", color: "rgba(197, 168, 128, 0.1)" },
        { label: "Master Bath", x: "63%", y: "68%", w: "27%", h: "22%", color: "rgba(197, 168, 128, 0.18)" },
        { label: "Sea Loggia / Balcony", x: "5%", y: "5%", w: "90%", h: "12%", color: "rgba(223, 207, 183, 0.25)" }
      ]
    }
  },
  {
    id: "2bed",
    category: "2 Bedroom",
    name: "The Grand Haven",
    levelRange: "Levels 16 - 28",
    sqft: 2380,
    sqm: 221,
    bedrooms: 2,
    bathrooms: 2.5,
    exposure: "Dual Aspect: East Sunrise & West Sunset",
    price: "From AED 14,500,000",
    description: "An expansive dual-orientation sanctuary with flow-through ocean breezes, separate prep kitchen, discreet service corridor, and expansive split master wings.",
    rooms: [
      { name: "Grand Salon & Entertaining", dimensions: "9.6m × 6.8m" },
      { name: "Principal Master Wing", dimensions: "6.0m × 4.6m" },
      { name: "Guest En-Suite Suite", dimensions: "5.0m × 4.0m" },
      { name: "Show Kitchen & Island", dimensions: "4.5m × 3.5m" },
      { name: "Wraparound Terrace", dimensions: "12.4m × 2.8m" }
    ],
    svgPlan: {
      ratio: "4/3",
      roomsLayout: [
        { label: "Grand Entertaining Salon", x: "28%", y: "22%", w: "44%", h: "48%", color: "rgba(197, 168, 128, 0.18)" },
        { label: "Principal Master Suite", x: "74%", y: "15%", w: "22%", h: "55%", color: "rgba(197, 168, 128, 0.25)" },
        { label: "Guest Suite II", x: "4%", y: "15%", w: "22%", h: "45%", color: "rgba(197, 168, 128, 0.2)" },
        { label: "Designer Kitchen", x: "28%", y: "73%", w: "22%", h: "22%", color: "rgba(197, 168, 128, 0.12)" },
        { label: "Private Library / Dining", x: "52%", y: "73%", w: "20%", h: "22%", color: "rgba(197, 168, 128, 0.15)" },
        { label: "Panoramic Terrace", x: "2%", y: "4%", w: "96%", h: "8%", color: "rgba(223, 207, 183, 0.3)" }
      ]
    }
  },
  {
    id: "3bed",
    category: "3 Bedroom",
    name: "The Celestial Residence",
    levelRange: "Levels 30 - 40",
    sqft: 4120,
    sqm: 382,
    bedrooms: 3,
    bathrooms: 4,
    exposure: "Full Panoramic 270° Gulf & Skyline",
    price: "From AED 24,000,000",
    description: "Occupying half an entire floor plate with 3.6m ceiling clearances. Features private direct-to-unit elevators, temperature-controlled wine gallery, and bespoke Dornbracht brushed champagne brassware.",
    rooms: [
      { name: "Formal Reception Salon", dimensions: "12.0m × 8.2m" },
      { name: "Primary Master Sanctuary", dimensions: "7.5m × 5.2m" },
      { name: "Junior Suite I", dimensions: "5.4m × 4.4m" },
      { name: "Junior Suite II", dimensions: "5.0m × 4.2m" },
      { name: "Sky Garden Balcony", dimensions: "16.5m × 3.2m" }
    ],
    svgPlan: {
      ratio: "16/9",
      roomsLayout: [
        { label: "Formal Reception Hall", x: "32%", y: "20%", w: "38%", h: "55%", color: "rgba(197, 168, 128, 0.2)" },
        { label: "Master Sanctuary & Spa", x: "72%", y: "15%", w: "24%", h: "60%", color: "rgba(197, 168, 128, 0.28)" },
        { label: "Suite Two", x: "4%", y: "15%", w: "25%", h: "32%", color: "rgba(197, 168, 128, 0.18)" },
        { label: "Suite Three", x: "4%", y: "50%", w: "25%", h: "35%", color: "rgba(197, 168, 128, 0.18)" },
        { label: "Wine Gallery & Dining", x: "32%", y: "78%", w: "38%", h: "18%", color: "rgba(197, 168, 128, 0.15)" },
        { label: "Continuous Deep Loggia", x: "2%", y: "4%", w: "96%", h: "8%", color: "rgba(223, 207, 183, 0.35)" }
      ]
    }
  },
  {
    id: "penthouse",
    category: "Penthouse",
    name: "The Sky Crown Duplex",
    levelRange: "Levels 46 & 47",
    sqft: 8650,
    sqm: 803,
    bedrooms: 5,
    bathrooms: 6.5,
    exposure: "360° Omnidirectional Panoramic",
    price: "AED 58,000,000",
    description: "The architectural pinnacle of The Solaire. A two-story glass mansion in the sky with 7m double-height living room, private cantilevered infinity pool, indoor reflection ponds, and private rooftop stargazing lounge.",
    rooms: [
      { name: "Cathedral Living Salon (7m Ceilings)", dimensions: "15.0m × 10.5m" },
      { name: "Cantilevered Sky Pool & Deck", dimensions: "18.0m × 6.5m" },
      { name: "Presidential Master Suite", dimensions: "9.2m × 6.8m" },
      { name: "Private Screening Cinema", dimensions: "6.5m × 5.0m" },
      { name: "Chef's Commercial Prep Kitchen", dimensions: "5.5m × 4.2m" }
    ],
    svgPlan: {
      ratio: "16/9",
      roomsLayout: [
        { label: "Cathedral Double-Height Salon", x: "25%", y: "15%", w: "50%", h: "60%", color: "rgba(197, 168, 128, 0.28)" },
        { label: "Cantilevered Infinity Pool", x: "77%", y: "15%", w: "20%", h: "40%", color: "rgba(90, 160, 200, 0.3)" },
        { label: "Sky Lounge & Terrace", x: "77%", y: "58%", w: "20%", h: "35%", color: "rgba(223, 207, 183, 0.35)" },
        { label: "Presidential Master Spa Wing", x: "3%", y: "15%", w: "20%", h: "45%", color: "rgba(197, 168, 128, 0.25)" },
        { label: "Private Screening Room & Bar", x: "3%", y: "63%", w: "20%", h: "30%", color: "rgba(197, 168, 128, 0.18)" },
        { label: "Gourmet Banquet Kitchen", x: "25%", y: "78%", w: "50%", h: "18%", color: "rgba(197, 168, 128, 0.15)" }
      ]
    }
  }
];

export const interiorSpaces = [
  {
    id: "salon",
    title: "Grand Living Salon",
    subtitle: "Air, Light & Architectural Rhythm",
    description: "Floor-to-ceiling motorized Schuco sliding glass walls merge the indoor travertine halls with the expansive terrace. Custom curated bespoke furniture by Studio Liaigre in muted bouclé and French oak.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
    accent: "7.2m Glazed Exposure",
    details: ["Honed Arabescato Orobico marble", "Integrated perimeter acoustic baffles", "Concealed linear diffusers"]
  },
  {
    id: "master",
    title: "The Principal Master Suite",
    subtitle: "A Sanctuary Suspended in Calm",
    description: "Waking up elevated above the gulf waters. The master bedroom features bespoke fluted walnut wall paneling, integrated floating credenzas, and automated blackout architectural drapes.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85",
    accent: "Morning Sunrise Aspect",
    details: ["Silk-wool custom woven carpets", "Private morning coffee loggia", "Dual illuminated dressing galleries"]
  },
  {
    id: "bath",
    title: "Freestanding Marble Spa",
    subtitle: "Elemental Purification",
    description: "Monolithic vanity carved from single-block Calacatta Michelangelo marble. A sculptural soaking tub positioned alongside floor-to-ceiling glass overlooks the city lights reflected in the water.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1800&q=85",
    accent: "Rain Sky Sensory Shower",
    details: ["Underfloor radiant heating", "Dornbracht brushed champagne fittings", "Integrated steam enclosure"]
  },
  {
    id: "kitchen",
    title: "The Culinary Workshop",
    subtitle: "Precision Engineering & Tactile Stones",
    description: "Custom Boffi cabinetry with invisible handleless channels, honed Taj Mahal quartzite countertops, and fully integrated Gaggenau 400 Series appliances.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
    accent: "Chef's Hidden Scullery",
    details: ["Sub-Zero wine preservation column", "Induction cooktop with integrated downdraft", "Solid bronze pivot hardware"]
  },
  {
    id: "terrace",
    title: "The Cantilevered Sky Terrace",
    subtitle: "Uninterrupted Gulf Horizons",
    description: "Extending 3.4 meters outward into the open air with frameless structural glass balustrades. Designed for sunset cocktail soirees and shaded daytime lounging.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85",
    accent: "Frameless Glass Balustrades",
    details: ["Thermally treated teak decking", "Outdoor bio-ethanol architectural fireplace", "Integrated marine-grade misting system"]
  }
];

