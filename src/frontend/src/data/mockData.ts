export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice: number;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  specs: Record<string, string>;
  description: string;
  isFeatured: boolean;
  isTrending: boolean;
  emiFrom?: number;
}

export interface DeliveryZone {
  pinCode: string;
  city: string;
  state: string;
  available: boolean;
}

export interface Coupon {
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrder?: number;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const IMG = (query: string, w = 500, h = 500) =>
  `https://placehold.co/${w}x${h}/1e3a5f/ffffff?text=${encodeURIComponent(query)}`;

export const PRODUCTS: Product[] = [
  // Smartphones
  {
    id: "p001",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Smartphones",
    categorySlug: "smartphones",
    price: 134900,
    originalPrice: 149900,
    images: [
      IMG("iPhone 15 Pro"),
      IMG("iPhone 15 Pro Side"),
      IMG("iPhone 15 Pro Back"),
    ],
    rating: 4.8,
    reviewCount: 2341,
    stock: 45,
    isFeatured: true,
    isTrending: true,
    emiFrom: 5621,
    description:
      "The iPhone 15 Pro features Apple's powerful A17 Pro chip, a titanium design, and an advanced camera system with 3x optical zoom.",
    specs: {
      Display: "6.1-inch Super Retina XDR OLED",
      Processor: "Apple A17 Pro",
      RAM: "8 GB",
      Storage: "128 GB",
      Camera: "48MP + 12MP + 12MP Triple Camera",
      Battery: "3274 mAh",
      OS: "iOS 17",
      "5G": "Yes",
    },
  },
  {
    id: "p002",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    categorySlug: "smartphones",
    price: 124999,
    originalPrice: 134999,
    images: [IMG("Galaxy S24 Ultra"), IMG("S24 Back"), IMG("S24 Side")],
    rating: 4.7,
    reviewCount: 1892,
    stock: 32,
    isFeatured: true,
    isTrending: true,
    emiFrom: 5208,
    description:
      "Samsung Galaxy S24 Ultra with S Pen, 200MP camera, and the most powerful Galaxy AI features.",
    specs: {
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 3",
      RAM: "12 GB",
      Storage: "256 GB",
      Camera: "200MP + 12MP + 10MP + 10MP",
      Battery: "5000 mAh",
      OS: "Android 14 (One UI 6.1)",
      "5G": "Yes",
    },
  },
  {
    id: "p003",
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "Smartphones",
    categorySlug: "smartphones",
    price: 64999,
    originalPrice: 69999,
    images: [IMG("OnePlus 12"), IMG("OnePlus 12 Back")],
    rating: 4.6,
    reviewCount: 1124,
    stock: 60,
    isFeatured: false,
    isTrending: true,
    emiFrom: 2708,
    description:
      "OnePlus 12 with Hasselblad camera, 100W SUPERVOOC charging and Snapdragon 8 Gen 3.",
    specs: {
      Display: "6.82-inch LTPO AMOLED 120Hz",
      Processor: "Snapdragon 8 Gen 3",
      RAM: "12 GB",
      Storage: "256 GB",
      Camera: "50MP + 48MP + 64MP Hasselblad",
      Battery: "5400 mAh",
      Charging: "100W SUPERVOOC",
      "5G": "Yes",
    },
  },
  {
    id: "p004",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "Smartphones",
    categorySlug: "smartphones",
    price: 89999,
    originalPrice: 99999,
    images: [IMG("Pixel 8 Pro"), IMG("Pixel 8 Back")],
    rating: 4.5,
    reviewCount: 876,
    stock: 28,
    isFeatured: false,
    isTrending: false,
    emiFrom: 3750,
    description:
      "Google Pixel 8 Pro with Google Tensor G3 chip and best-in-class computational photography.",
    specs: {
      Display: "6.7-inch LTPO OLED 120Hz",
      Processor: "Google Tensor G3",
      RAM: "12 GB",
      Storage: "128 GB",
      Camera: "50MP + 48MP + 48MP",
      Battery: "5050 mAh",
      OS: "Android 14",
      "5G": "Yes",
    },
  },
  // Laptops
  {
    id: "p005",
    name: "MacBook Air M3",
    brand: "Apple",
    category: "Laptops",
    categorySlug: "laptops",
    price: 114900,
    originalPrice: 124900,
    images: [
      IMG("MacBook Air M3"),
      IMG("MacBook Air Open"),
      IMG("MacBook Air Side"),
    ],
    rating: 4.9,
    reviewCount: 3211,
    stock: 25,
    isFeatured: true,
    isTrending: true,
    emiFrom: 4788,
    description:
      "MacBook Air with M3 chip delivers breakthrough performance in an incredibly thin and light design.",
    specs: {
      Display: "13.6-inch Liquid Retina",
      Processor: "Apple M3",
      RAM: "8 GB Unified Memory",
      Storage: "256 GB SSD",
      Battery: "Up to 18 hours",
      Weight: "1.24 kg",
      GPU: "10-core GPU",
      OS: "macOS Sonoma",
    },
  },
  {
    id: "p006",
    name: "Dell XPS 15",
    brand: "Dell",
    category: "Laptops",
    categorySlug: "laptops",
    price: 149990,
    originalPrice: 169990,
    images: [IMG("Dell XPS 15"), IMG("XPS 15 Side")],
    rating: 4.6,
    reviewCount: 1432,
    stock: 15,
    isFeatured: true,
    isTrending: false,
    emiFrom: 6250,
    description:
      "Dell XPS 15 with OLED display, Intel Core i7 and NVIDIA GeForce RTX 4070 graphics.",
    specs: {
      Display: "15.6-inch 3.5K OLED Touch",
      Processor: "Intel Core i7-13700H",
      RAM: "16 GB DDR5",
      Storage: "512 GB NVMe SSD",
      GPU: "NVIDIA GeForce RTX 4070",
      Battery: "Up to 13 hours",
      Weight: "1.86 kg",
      OS: "Windows 11 Home",
    },
  },
  {
    id: "p007",
    name: "HP Spectre x360",
    brand: "HP",
    category: "Laptops",
    categorySlug: "laptops",
    price: 139990,
    originalPrice: 159990,
    images: [IMG("HP Spectre x360"), IMG("Spectre Tent Mode")],
    rating: 4.5,
    reviewCount: 987,
    stock: 20,
    isFeatured: false,
    isTrending: false,
    emiFrom: 5833,
    description:
      "HP Spectre x360 convertible laptop with stunning OLED display and premium aluminum design.",
    specs: {
      Display: "14-inch 2.8K OLED Touch",
      Processor: "Intel Core i7-1355U",
      RAM: "16 GB LPDDR5",
      Storage: "512 GB PCIe SSD",
      "Form Factor": "2-in-1 Convertible",
      Pen: "HP Rechargeable MPP2.0 Tilt Pen",
      Weight: "1.36 kg",
      OS: "Windows 11 Home",
    },
  },
  {
    id: "p008",
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    category: "Laptops",
    categorySlug: "laptops",
    price: 159990,
    originalPrice: 179990,
    images: [IMG("ThinkPad X1 Carbon"), IMG("ThinkPad Side")],
    rating: 4.7,
    reviewCount: 2145,
    stock: 18,
    isFeatured: false,
    isTrending: false,
    emiFrom: 6666,
    description:
      "Lenovo ThinkPad X1 Carbon — ultra-light business laptop with military-grade durability.",
    specs: {
      Display: "14-inch 2.8K IPS Anti-Glare",
      Processor: "Intel Core i7-1365U",
      RAM: "16 GB LPDDR5",
      Storage: "512 GB SSD",
      Weight: "1.12 kg",
      Keyboard: "TrackPoint + Backlit",
      Battery: "Up to 15 hours",
      OS: "Windows 11 Pro",
    },
  },
  // TVs
  {
    id: "p009",
    name: 'Samsung 65" QLED 4K Smart TV',
    brand: "Samsung",
    category: "Televisions",
    categorySlug: "televisions",
    price: 89990,
    originalPrice: 109990,
    images: [IMG("Samsung QLED 65"), IMG("Samsung TV Side")],
    rating: 4.6,
    reviewCount: 1567,
    stock: 12,
    isFeatured: true,
    isTrending: true,
    emiFrom: 3750,
    description:
      "Samsung 65-inch QLED 4K TV with Quantum HDR and smart hub for immersive entertainment.",
    specs: {
      "Screen Size": "65 inches",
      Resolution: "4K UHD (3840 x 2160)",
      "Display Type": "QLED",
      HDR: "Quantum HDR 12x",
      "Smart TV": "Tizen OS",
      "Refresh Rate": "120Hz",
      "HDMI Ports": "4",
      Audio: "60W 2.2.2 Ch",
    },
  },
  {
    id: "p010",
    name: 'LG OLED55 C3 55" 4K',
    brand: "LG",
    category: "Televisions",
    categorySlug: "televisions",
    price: 109990,
    originalPrice: 139990,
    images: [IMG("LG OLED 55"), IMG("LG TV Back")],
    rating: 4.8,
    reviewCount: 2034,
    stock: 8,
    isFeatured: true,
    isTrending: false,
    emiFrom: 4583,
    description:
      "LG OLED C3 with self-lit pixels delivering perfect blacks and infinite contrast.",
    specs: {
      "Screen Size": "55 inches",
      Resolution: "4K UHD",
      "Display Type": "OLED evo",
      HDR: "Dolby Vision IQ",
      "Smart TV": "webOS 23",
      "Refresh Rate": "120Hz",
      Gaming: "G-Sync + FreeSync",
      Audio: "60W 2.2 Ch Dolby Atmos",
    },
  },
  {
    id: "p011",
    name: 'Sony Bravia 75" X90L 4K',
    brand: "Sony",
    category: "Televisions",
    categorySlug: "televisions",
    price: 169990,
    originalPrice: 209990,
    images: [IMG("Sony Bravia 75"), IMG("Sony TV Side")],
    rating: 4.7,
    reviewCount: 876,
    stock: 5,
    isFeatured: false,
    isTrending: false,
    emiFrom: 7083,
    description:
      "Sony Bravia 75-inch with XR Cognitive Intelligence for ultra-realistic picture and sound.",
    specs: {
      "Screen Size": "75 inches",
      Resolution: "4K UHD",
      "Display Type": "Full Array LED",
      Processor: "Sony XR Cognitive Processor",
      "Smart TV": "Google TV",
      Audio: "Acoustic Multi-Audio+",
      HDR: "XR HDR Remaster",
      HDMI: "4 ports (HDMI 2.1 x2)",
    },
  },
  // Refrigerators
  {
    id: "p012",
    name: "LG 260L Double Door Frost Free",
    brand: "LG",
    category: "Refrigerators",
    categorySlug: "refrigerators",
    price: 29990,
    originalPrice: 34990,
    images: [IMG("LG 260L Fridge"), IMG("Fridge Inside")],
    rating: 4.4,
    reviewCount: 1234,
    stock: 22,
    isFeatured: false,
    isTrending: false,
    emiFrom: 1250,
    description:
      "LG 260L Double Door Frost Free Refrigerator with Smart Inverter Compressor for energy savings.",
    specs: {
      Capacity: "260 Liters",
      Type: "Double Door Frost Free",
      "Star Rating": "2 Star",
      Compressor: "Smart Inverter",
      Color: "Shiny Steel",
      "Annual Power": "275 kWh",
    },
  },
  {
    id: "p013",
    name: "Samsung 415L Side-by-Side",
    brand: "Samsung",
    category: "Refrigerators",
    categorySlug: "refrigerators",
    price: 49990,
    originalPrice: 65990,
    images: [IMG("Samsung Side-by-Side"), IMG("Samsung Fridge Interior")],
    rating: 4.5,
    reviewCount: 876,
    stock: 14,
    isFeatured: false,
    isTrending: false,
    emiFrom: 2083,
    description:
      "Samsung 415L Side-by-Side with SpaceMax technology and Twin Cooling Plus system.",
    specs: {
      Capacity: "415 Liters",
      Type: "Side-by-Side",
      "Star Rating": "3 Star",
      "Water Dispenser": "Yes",
      "Ice Maker": "Automatic",
      "Wi-Fi": "SmartThings App",
    },
  },
  // ACs
  {
    id: "p014",
    name: "Daikin 1.5 Ton 5 Star Split AC",
    brand: "Daikin",
    category: "Air Conditioners",
    categorySlug: "air-conditioners",
    price: 42990,
    originalPrice: 52990,
    images: [IMG("Daikin 1.5 Ton AC"), IMG("AC Indoor Unit")],
    rating: 4.6,
    reviewCount: 2109,
    stock: 30,
    isFeatured: true,
    isTrending: false,
    emiFrom: 1792,
    description:
      "Daikin 1.5 Ton 5 Star Split AC with PM 2.5 filter and Streamer discharge technology.",
    specs: {
      Capacity: "1.5 Ton",
      "Star Rating": "5 Star",
      Type: "Split AC",
      Inverter: "Yes",
      "Annual Power": "836.24 kWh",
      "Air Filter": "PM 2.5 Anti-Bacterial",
    },
  },
  {
    id: "p015",
    name: "Voltas 1 Ton 3 Star Window AC",
    brand: "Voltas",
    category: "Air Conditioners",
    categorySlug: "air-conditioners",
    price: 26990,
    originalPrice: 30990,
    images: [IMG("Voltas Window AC"), IMG("Voltas AC Front")],
    rating: 4.2,
    reviewCount: 1456,
    stock: 18,
    isFeatured: false,
    isTrending: false,
    emiFrom: 1125,
    description:
      "Voltas 1 Ton Window AC with easy installation and auto-restart feature.",
    specs: {
      Capacity: "1 Ton",
      "Star Rating": "3 Star",
      Type: "Window AC",
      "Cooling Capacity": "3517 W",
      "Auto Restart": "Yes",
    },
  },
  // Washing Machines
  {
    id: "p016",
    name: "LG 8 Kg Front Load Washing Machine",
    brand: "LG",
    category: "Washing Machines",
    categorySlug: "washing-machines",
    price: 43990,
    originalPrice: 54990,
    images: [IMG("LG Front Load 8kg"), IMG("Washing Machine Door")],
    rating: 4.5,
    reviewCount: 1890,
    stock: 25,
    isFeatured: false,
    isTrending: true,
    emiFrom: 1833,
    description:
      "LG 8 Kg Front Load Washing Machine with AI Direct Drive and 6 Motion DD technology.",
    specs: {
      Capacity: "8 kg",
      Type: "Front Load",
      "Spin Speed": "1400 RPM",
      Programs: "14",
      "Smart Diagnosis": "Yes",
      "Energy Rating": "5 Star",
    },
  },
  // Kitchen Appliances
  {
    id: "p017",
    name: "Instant Pot Pro 8-in-1 Cooker",
    brand: "Instant Pot",
    category: "Kitchen Appliances",
    categorySlug: "kitchen-appliances",
    price: 12999,
    originalPrice: 15999,
    images: [IMG("Instant Pot Pro"), IMG("Instant Pot Open")],
    rating: 4.4,
    reviewCount: 3421,
    stock: 50,
    isFeatured: false,
    isTrending: false,
    emiFrom: 542,
    description:
      "Instant Pot Pro 8-in-1 Electric Multi Cooker — pressure cooker, slow cooker, rice cooker and more.",
    specs: {
      Capacity: "8 Quarts",
      Functions: "8-in-1",
      Material: "Stainless Steel",
      Safety: "10 safety features",
      Power: "1200W",
    },
  },
  // Accessories
  {
    id: "p018",
    name: "boAt Airdopes 141 TWS",
    brand: "boAt",
    category: "Accessories",
    categorySlug: "accessories",
    price: 1299,
    originalPrice: 2999,
    images: [IMG("boAt Airdopes 141"), IMG("TWS Earbuds")],
    rating: 4.1,
    reviewCount: 12345,
    stock: 200,
    isFeatured: false,
    isTrending: true,
    description:
      "boAt Airdopes 141 TWS with 42H playback, Environmental Noise Cancellation and IPX4 rating.",
    specs: {
      "Driver Size": "8mm",
      Playback: "42 Hours Total",
      "Water Resistance": "IPX4",
      Connectivity: "Bluetooth 5.3",
      Charging: "Type-C",
    },
  },
  {
    id: "p019",
    name: "JBL Charge 5 Portable Speaker",
    brand: "JBL",
    category: "Accessories",
    categorySlug: "accessories",
    price: 14999,
    originalPrice: 19999,
    images: [IMG("JBL Charge 5"), IMG("JBL Speaker Side")],
    rating: 4.7,
    reviewCount: 4567,
    stock: 65,
    isFeatured: false,
    isTrending: true,
    emiFrom: 625,
    description:
      "JBL Charge 5 with powerful JBL Pro Sound, IP67 waterproof rating and 20 hours playtime.",
    specs: {
      "Output Power": "30W",
      Playtime: "20 Hours",
      "Water Resistance": "IP67",
      Bluetooth: "5.1",
      Battery: "7500 mAh Power Bank",
      PartyBoost: "Yes",
    },
  },
  {
    id: "p020",
    name: "Logitech MX Keys S Keyboard",
    brand: "Logitech",
    category: "Accessories",
    categorySlug: "accessories",
    price: 10995,
    originalPrice: 12995,
    images: [IMG("Logitech MX Keys"), IMG("Keyboard Side")],
    rating: 4.6,
    reviewCount: 2876,
    stock: 80,
    isFeatured: true,
    isTrending: false,
    description:
      "Logitech MX Keys S with Smart Backlighting, multi-device pairing and quiet key clicks.",
    specs: {
      Connectivity: "Bluetooth + USB-C",
      "Battery Life": "10 days (backlit)",
      Backlight: "Smart Adaptive Backlight",
      "Multi-Device": "Up to 3 devices",
      Compatibility: "Windows, Mac, iOS, Android",
    },
  },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  { pinCode: "400001", city: "Mumbai", state: "Maharashtra", available: true },
  { pinCode: "400051", city: "Mumbai", state: "Maharashtra", available: true },
  { pinCode: "110001", city: "New Delhi", state: "Delhi", available: true },
  { pinCode: "560001", city: "Bengaluru", state: "Karnataka", available: true },
  { pinCode: "600001", city: "Chennai", state: "Tamil Nadu", available: true },
  { pinCode: "500001", city: "Hyderabad", state: "Telangana", available: true },
  { pinCode: "700001", city: "Kolkata", state: "West Bengal", available: true },
  { pinCode: "411001", city: "Pune", state: "Maharashtra", available: true },
  { pinCode: "380001", city: "Ahmedabad", state: "Gujarat", available: true },
  { pinCode: "302001", city: "Jaipur", state: "Rajasthan", available: false },
];

export const COUPONS: Coupon[] = [
  {
    code: "SAVE10",
    type: "percent",
    value: 10,
    description: "10% off on all orders",
  },
  {
    code: "MART200",
    type: "flat",
    value: 200,
    minOrder: 5000,
    description: "Flat ₹200 off on orders above ₹5000",
  },
  {
    code: "NEWUSER",
    type: "percent",
    value: 15,
    description: "15% off for new users",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    productId: "p001",
    userName: "Rahul M.",
    rating: 5,
    comment: "Absolutely love the titanium build. Camera is incredible!",
    date: "2024-01-15",
  },
  {
    id: "r2",
    productId: "p001",
    userName: "Priya S.",
    rating: 4,
    comment: "Great phone but battery could be better. Overall satisfied.",
    date: "2024-01-10",
  },
  {
    id: "r3",
    productId: "p002",
    userName: "Amit K.",
    rating: 5,
    comment: "S Pen makes this device absolutely brilliant for productivity.",
    date: "2024-01-18",
  },
  {
    id: "r4",
    productId: "p005",
    userName: "Sneha R.",
    rating: 5,
    comment: "M3 chip is a game changer. Works silently and blazing fast.",
    date: "2024-01-20",
  },
  {
    id: "r5",
    productId: "p009",
    userName: "Vikram T.",
    rating: 4,
    comment: "Picture quality is stunning. Smart TV interface is smooth.",
    date: "2024-01-12",
  },
];

export const CATEGORIES = [
  { name: "Smartphones", slug: "smartphones", icon: "📱", count: 4 },
  { name: "Laptops", slug: "laptops", icon: "💻", count: 4 },
  { name: "Televisions", slug: "televisions", icon: "📺", count: 3 },
  { name: "Refrigerators", slug: "refrigerators", icon: "🧊", count: 2 },
  { name: "Air Conditioners", slug: "air-conditioners", icon: "❄️", count: 2 },
  { name: "Washing Machines", slug: "washing-machines", icon: "🫧", count: 1 },
  {
    name: "Kitchen Appliances",
    slug: "kitchen-appliances",
    icon: "🍳",
    count: 1,
  },
  { name: "Accessories", slug: "accessories", icon: "🎧", count: 3 },
];

export const BRANDS = [
  "Apple",
  "Samsung",
  "LG",
  "Sony",
  "Dell",
  "HP",
  "Lenovo",
  "OnePlus",
  "Google",
  "Daikin",
  "Voltas",
  "boAt",
  "JBL",
  "Logitech",
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    subtitle: "Titanium. Powerful. Pro.",
    description:
      "The most advanced iPhone ever with A17 Pro chip and titanium design.",
    cta: "Shop Now",
    productId: "p001",
    bg: "from-slate-900 via-blue-950 to-slate-900",
  },
  {
    id: 2,
    title: "MacBook Air M3",
    subtitle: "Thin. Light. Mighty.",
    description: "Up to 18 hours battery life with the most powerful M3 chip.",
    cta: "Explore",
    productId: "p005",
    bg: "from-gray-900 via-slate-800 to-gray-900",
  },
  {
    id: 3,
    title: 'Samsung QLED 65"',
    subtitle: "Cinema at Home.",
    description:
      "4K QLED with Quantum HDR for the ultimate viewing experience.",
    cta: "View Deal",
    productId: "p009",
    bg: "from-blue-950 via-indigo-950 to-blue-950",
  },
];
