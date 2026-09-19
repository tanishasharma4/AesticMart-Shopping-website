export const seedCategories = [
  {
    name: "Fashion & Apparel",
    slug: "fashion",
    description: "Curated minimalist apparel and luxury streetwear.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    itemCount: 8
  },
  {
    name: "Electronics & Tech",
    slug: "electronics",
    description: "Flagship audio, ergonomic peripherals, and sleek gadgetry.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    itemCount: 8
  },
  {
    name: "Modern Home",
    slug: "home",
    description: "Architectural decor, scandi lighting, and luxury accents.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
    itemCount: 8
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Timepieces, leather goods, and statement eyewear.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    itemCount: 6
  }
];

export const seedProducts = [
  {
    name: "Aestic Studio Acoustic Headphones Max",
    slug: "aestic-studio-headphones-max",
    tagline: "Active Noise Cancellation with Spatial Spatial Audio",
    price: 349.99,
    originalPrice: 429.99,
    category: "electronics",
    brand: "Aestic Audio Labs",
    description: "Engineered with titanium drivers and memory-foam ear cushions, the Studio Headphones Max deliver studio-grade acoustics wrapped in brushed anodized aluminum.",
    features: [
      "Custom 45mm Titanium Acoustic Drivers",
      "Dynamic Active Noise Cancellation (ANC)",
      "40 Hours Continuous Wireless Playback",
      "Ultra-soft Protein Memory Foam Cushions",
      "Mag-Charge Quick Charging (10 mins = 5 hrs)"
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Obsidian Black", hex: "#0f172a" },
      { name: "Lunar Silver", hex: "#e2e8f0" },
      { name: "Champagne Gold", hex: "#d4af37" }
    ],
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    isNewArrival: true,
    isTrending: true,
    rating: 4.9,
    numReviews: 42,
    reviews: [
      {
        userName: "Elena Rostova",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        comment: "The soundstage is breathtaking and the physical build feels like an art piece. Worth every penny!"
      },
      {
        userName: "Marcus Vance",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        comment: "Best noise cancellation I have experienced. Seamless Bluetooth switching across devices."
      }
    ]
  },
  {
    name: "Cashmere Oversized Minimalist Coat",
    slug: "cashmere-oversized-minimalist-coat",
    tagline: "100% Mongolian Cashmere Double-Breasted Silhouette",
    price: 489.00,
    originalPrice: 599.00,
    category: "fashion",
    brand: "Maison Aestic",
    description: "Crafted from hand-selected pure Mongolian cashmere. Designed with clean architectural lines, dropped shoulders, and subtle glassmorphic-inspired polished horn buttons.",
    features: [
      "100% Sustainable Grade-A Cashmere",
      "Double-faced Hand-stitched Finish",
      "Relaxed Dropped-shoulder Cut",
      "Interior Satin Pockets",
      "Includes Custom Dust Bag"
    ],
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1548624149-f1b96a9d2d5f?auto=format&fit=crop&q=80&w=1000"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Beige", hex: "#d7c4b7" },
      { name: "Midnight Black", hex: "#18181b" },
      { name: "Charcoal Grey", hex: "#3f3f46" }
    ],
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isNewArrival: true,
    isTrending: true,
    rating: 4.8,
    numReviews: 28,
    reviews: [
      {
        userName: "Sophia Loren",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        comment: "Unmatched elegance and warmth. The texture is impossibly soft."
      }
    ]
  },
  {
    name: "Architectural Ceramic Arc Lamp",
    slug: "architectural-ceramic-arc-lamp",
    tagline: "Hand-sculpted Matte Ceramic with Ambient LED Glow",
    price: 220.00,
    originalPrice: 260.00,
    category: "home",
    brand: "Aestic Living",
    description: "A sculptural lighting masterpiece. Hand-turned matte ceramic base featuring step-less capacitive touch dimming and warm 2700K ambient illumination.",
    features: [
      "Hand-turned Matte Ceramic Base",
      "Smart Capacitive Touch Dimmer",
      "Energy Efficient 2700K Warm LED",
      "Woven Fabric Cable with Brass Switch"
    ],
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1000"
    ],
    sizes: ["Standard"],
    colors: [
      { name: "Terracotta Earth", hex: "#c86d51" },
      { name: "Chalk White", hex: "#f8fafc" },
      { name: "Raw Sage", hex: "#84a98c" }
    ],
    inStock: true,
    stockCount: 25,
    isFeatured: true,
    isNewArrival: false,
    isTrending: true,
    rating: 4.7,
    numReviews: 19,
    reviews: [
      {
        userName: "Oliver Bennett",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        comment: "Transformative piece for my living room setup. The light output creates such a peaceful atmosphere."
      }
    ]
  },
  {
    name: "Chronos Minimalist Automatic Watch",
    slug: "chronos-minimalist-automatic-watch",
    tagline: "Swiss Automatic Movement with Sapphire Crystal",
    price: 650.00,
    originalPrice: 750.00,
    category: "accessories",
    brand: "Chronos Atelier",
    description: "Refined horology for the contemporary purist. Features a 38mm surgical-grade stainless steel case, exhibition caseback, and a vegetable-tanned Italian leather strap.",
    features: [
      "26-Jewel Swiss Automatic Movement",
      "Scratch-Resistant Sapphire Crystal Lens",
      "5 ATM Water Resistance (50 Meters)",
      "Quick-Release Italian Leather Strap"
    ],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1000"
    ],
    sizes: ["38mm", "42mm"],
    colors: [
      { name: "Emerald Sunray", hex: "#064e3b" },
      { name: "Minimal Pearl", hex: "#f1f5f9" },
      { name: "Stealth Slate", hex: "#334155" }
    ],
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    isNewArrival: true,
    isTrending: true,
    rating: 4.95,
    numReviews: 34,
    reviews: [
      {
        userName: "David K.",
        userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        rating: 5,
        comment: "The sweeping second hand and clean dial design get compliments every time I wear it."
      }
    ]
  },
  {
    name: "Precision Ergonomic Mechanical Keyboard",
    slug: "precision-ergonomic-mechanical-keyboard",
    tagline: "Gasket-Mounted Anodized Aluminum with Hot-Swappable Switches",
    price: 199.99,
    originalPrice: 249.99,
    category: "electronics",
    brand: "Aestic Audio Labs",
    description: "Crafted for discerning typists and creators. Features CNC machined aluminum body, per-key RGB backlighting, custom dampening foam, and multi-device Bluetooth 5.2.",
    features: [
      "CNC Anodized Aluminum Case",
      "Factory-Lubed Mechanical Linear Switches",
      "Gasket Mount for Cushioned Acoustic Typing",
      "Tri-Mode Connectivity (2.4G / BT5.2 / Type-C)"
    ],
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=1000"
    ],
    sizes: ["75% Layout", "100% Full"],
    colors: [
      { name: "Frosted Glass", hex: "#e2e8f0" },
      { name: "Cyber Grey", hex: "#1e293b" }
    ],
    inStock: true,
    stockCount: 30,
    isFeatured: false,
    isNewArrival: true,
    isTrending: false,
    rating: 4.85,
    numReviews: 51,
    reviews: []
  },
  {
    name: "Sculptural Italian Leather Tote Bag",
    slug: "sculptural-italian-leather-tote-bag",
    tagline: "Full-Grain Calfskin with Brass Hardware",
    price: 320.00,
    originalPrice: 380.00,
    category: "accessories",
    brand: "Maison Aestic",
    description: "Structured silhouette handcrafted in Florence. Accommodates up to a 16-inch laptop with dedicated padded sleeve and internal organizer pockets.",
    features: [
      "Full-Grain Tuscan Calfskin Leather",
      "Padded 16\" Laptop Compartment",
      "Polished Solid Brass Protective Feet",
      "Suede-lined Interior"
    ],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000"
    ],
    sizes: ["Medium", "Large"],
    colors: [
      { name: "Cognac Tan", hex: "#9a3412" },
      { name: "Noir", hex: "#09090b" }
    ],
    inStock: true,
    stockCount: 15,
    isFeatured: false,
    isNewArrival: false,
    isTrending: true,
    rating: 4.75,
    numReviews: 22,
    reviews: []
  },
  {
    name: "Handmade Travertine Marble Coffee Table",
    slug: "handmade-travertine-marble-coffee-table",
    tagline: "Natural Italian Travertine with Honed Finish",
    price: 890.00,
    originalPrice: 1100.00,
    category: "home",
    brand: "Aestic Living",
    description: "Each table is a unique piece of geological art featuring distinctive natural vein patterns, soft rounded bevel edges, and a sealed stain-resistant finish.",
    features: [
      "100% Solid Natural Roman Travertine",
      "Hand-honed Soft Satin Finish",
      "Sealed with Nano Ceramic Stain Barrier",
      "Delivered with White-Glove Assembly"
    ],
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000"
    ],
    sizes: ["110cm Round", "130cm Oval"],
    colors: [
      { name: "Ivory Travertine", hex: "#f5f2eb" }
    ],
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    isNewArrival: false,
    isTrending: true,
    rating: 4.9,
    numReviews: 14,
    reviews: []
  },
  {
    name: "Silk Blend Tailored Blazer",
    slug: "silk-blend-tailored-blazer",
    tagline: "Structured Shoulder with Horn Buttons",
    price: 295.00,
    originalPrice: 350.00,
    category: "fashion",
    brand: "Maison Aestic",
    description: "Tailored to perfection with a modern sharp lapel and breathable silk-wool blend structure that drapes gracefully for both formal and smart-casual looks.",
    features: [
      "60% Virgin Wool, 40% Mulberry Silk",
      "Breathable Viscose Cupro Lining",
      "Functional Hand-stitched Buttonhole Cuffs",
      "Slightly Tapered Waist Line"
    ],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=1000"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Ivory White", hex: "#f8fafc" },
      { name: "Midnight Navy", hex: "#1e1b4b" }
    ],
    inStock: true,
    stockCount: 20,
    isFeatured: false,
    isNewArrival: true,
    isTrending: false,
    rating: 4.6,
    numReviews: 11,
    reviews: []
  }
];
