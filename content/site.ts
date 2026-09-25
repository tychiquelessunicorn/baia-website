const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const photos = {
  heroSeafood: "/atmosphere/terrace.jpg",
  dining: "/atmosphere/room.jpg",
  chefHands: img("photo-1551218808-94e220e084d2"),
  wine: img("photo-1510812431401-41d2bd2722f3"),
  terrace: "/atmosphere/terrace.jpg",
  bowl: img("photo-1540189549336-e6e99c3679fe"),
  cocktail: img("photo-1470337458703-46ad1756a187"),
  amber: img("photo-1514362545857-3bc16c4c7d1b"),
  salmon: img("photo-1467003909585-2f8a72700288"),
  interior: "/atmosphere/corner.jpg",
  warmRoom: "/atmosphere/banquette.jpg",
  prawns: "/dishes/scallops.jpg",
  platter: "/dishes/platter.jpg",
  sashimi: "/dishes/sashimi.jpg",
  rolls: "/dishes/rolls.jpg",
  steak: img("photo-1600891964092-4316c288032e", 800),
  party: "/atmosphere/bar.jpg",
  bar: "/atmosphere/bar.jpg",
  kitchen: img("photo-1577219491135-ce391730fb2c"),
  table: "/atmosphere/banquette.jpg",
  dessert: img("photo-1488477181946-6428a0291777", 800),
  mussels: "/dishes/rolls.jpg",
  linefish: "/dishes/sashimi.jpg",
  glass: img("photo-1510812431401-41d2bd2722f3", 800),
};

export const brand = {
  name: "Baía",
  legal: "Baía Seafood Restaurant",
  phone: "+27 21 421 0935",
  phoneHref: "tel:+27214210935",
  email: "baiarestaurant@wol.co.za",
  emailHref: "mailto:baiarestaurant@wol.co.za",
  address: "Entrance 5, Shop 259, Victoria Wharf, V&A Waterfront, Cape Town",
  addressShort: "Entrance 5, Shop 259 · V&A Waterfront",
  hoursUtility: "Lunch 12:00–15:30 · Dinner 18:00–22:00",
  lunch: "Mon – Sun: 12:00 – 15:30",
  dinner: "Mon – Sun: 18:00 – 22:00",
  instagram: "https://www.instagram.com/baiaseafoodrestaurant/",
  maps: "https://www.google.com/maps/search/?api=1&query=Baia+Seafood+Restaurant+Entrance+5+Shop+259+V%26A+Waterfront+Cape+Town",
  mapEmbed:
    "https://maps.google.com/maps?q=Entrance%205%20Victoria%20Wharf%20V%26A%20Waterfront%20Cape%20Town&z=16&output=embed",
};

export const heroSlides = [
  {
    title: "Baía",
    outline: "Harbour",
    text: "Seafood, wine, and harbour light above Table Bay.",
    image: photos.terrace,
  },
  {
    title: "The",
    outline: "Platter",
    text: "The best seafood platter in the Cape, served above the water.",
    image: photos.dining,
  },
  {
    title: "House",
    outline: "Cataplana",
    text: "Prawns, langoustines, mussels, calamari, and linefish.",
    image: photos.interior,
  },
  {
    title: "Cape",
    outline: "Cellar",
    text: "Rare Cape vintages and a quiet list of imported liqueurs.",
    image: photos.bar,
  },
  {
    title: "Four",
    outline: "Terraces",
    text: "Four terraces, Table Mountain, and the working harbour.",
    image: photos.warmRoom,
  },
];

export const storyTabs = [
  {
    id: "bay",
    label: "The Bay",
    body: "Baía, pronounced Ba-hia, means the bay. Since 2001 the room has sat upstairs at Victoria Wharf, over Table Bay, with Table Mountain and the working harbour in the same view.",
  },
  {
    id: "cellar",
    label: "The Cellar",
    body: "Rare Cape vintages, poured beside the seafood of Patrick Cumaio and the plates of Brian van Zijl. Ask the floor to set the glass before the course.",
  },
  {
    id: "terraces",
    label: "The Terraces",
    body: "Bubbles, wine, or a mocktail on the terrace. The newest plate is Japanese-style sushi from Chef Daisuke, with Chunsheng and Wu. Lunch is midday until half past three. Dinner is six until ten.",
  },
];

export const categories = [
  { kicker: "Shellfish", title: "Cataplana", image: photos.prawns },
  { kicker: "Main Courses", title: "The Platter", image: photos.platter },
  { kicker: "Wine, Drink", title: "The Cellar", image: photos.cocktail },
  { kicker: "A New Chapter", title: "Sushi", image: photos.sashimi },
];

export type Dish = {
  name: string;
  description: string;
  price: string;
  was?: string;
  image: string;
  category: "cocktails" | "seafood" | "mains";
};

export const dishes: Dish[] = [
  { name: "Harbour Negroni", description: "Cape bitter, vermouth, orange oil", price: "R95.00", was: "R120.00", image: photos.amber, category: "cocktails" },
  { name: "Baía Spritz", description: "Prosecco, bitter aperitif, soda, citrus", price: "R110.00", was: "R135.00", image: photos.cocktail, category: "cocktails" },
  { name: "Espresso Martini", description: "Vodka, coffee liqueur, house espresso", price: "R115.00", image: photos.dessert, category: "cocktails" },
  { name: "Mint Loga", description: "White rum, lime, mint, soda", price: "R98.00", was: "R120.00", image: photos.glass, category: "cocktails" },
  { name: "Cataplana", description: "Prawns, langoustines, mussels, calamari, linefish", price: "R890.00", was: "R980.00", image: photos.prawns, category: "seafood" },
  { name: "Seafood Platter", description: "The Cape platter, for the centre of the table", price: "R1 150.00", was: "R1 280.00", image: photos.platter, category: "seafood" },
  { name: "Grilled Linefish", description: "Linefish of the day, lemon, olive oil, herbs", price: "R345.00", was: "R390.00", image: photos.sashimi, category: "seafood" },
  { name: "Langoustines", description: "Grilled langoustines, garlic butter, sea salt", price: "R420.00", was: "R480.00", image: photos.rolls, category: "seafood" },
  { name: "Beef Fillet", description: "Aged fillet, red wine jus, seasonal vegetables", price: "R385.00", was: "R430.00", image: photos.steak, category: "mains" },
  { name: "Venison Loin", description: "Cape venison, berry glaze, root vegetables", price: "R360.00", was: "R410.00", image: photos.steak, category: "mains" },
  { name: "Poultry Breast", description: "Free-range poultry, herbs, light jus", price: "R275.00", was: "R320.00", image: photos.salmon, category: "mains" },
  { name: "Classic Salad", description: "Leaves, barrel-aged feta, bread", price: "R145.00", image: photos.bowl, category: "mains" },
];

export const menuTabs = [
  { id: "cocktails" as const, label: "Cocktails" },
  { id: "seafood" as const, label: "Seafood" },
  { id: "mains" as const, label: "Mains" },
];

export const quotes = [
  {
    text: "A room that understands the coast. The platter arrives as a feast, and the cellar is poured with the same care.",
    name: "Guest",
    role: "Victoria Wharf",
    image: photos.platter,
  },
  {
    text: "The cataplana is the reason to book. Prawns, langoustines, mussels, and linefish, brought to the table still fragrant.",
    name: "Guest",
    role: "The terraces",
    image: photos.prawns,
  },
  {
    text: "Table Mountain, harbour light, and a wine list that never raises its voice. Lunch here is a long, quiet pleasure.",
    name: "Guest",
    role: "Cape Town",
    image: photos.dining,
  },
];

export const marquee = [
  { name: "Cataplana", image: photos.prawns },
  { name: "Seafood Platter", image: photos.platter },
  { name: "Langoustines", image: photos.rolls },
  { name: "Linefish", image: photos.sashimi },
  { name: "Harbour Negroni", image: photos.amber },
  { name: "The Cellar", image: photos.glass },
  { name: "Sushi", image: photos.rolls },
  { name: "Four Terraces", image: photos.terrace },
];

export const events = [
  { title: "Private Dining", date: "By arrangement", time: "Lunch or dinner", image: photos.dining },
  { title: "Corporate Table", date: "Weekdays", time: "Set menus on request", image: photos.table },
  { title: "Harbour Evening", date: "Evenings", time: "18:00 to 22:00", image: photos.party },
  { title: "Cellar Gathering", date: "On request", time: "Wine with the menu", image: photos.wine },
];

export const instagram = [
  photos.prawns,
  photos.interior,
  photos.sashimi,
  photos.table,
  photos.platter,
  photos.terrace,
  photos.rolls,
  photos.wine,
];

export const services = [
  { title: "Fine Dining", text: "Continental cooking and Portuguese colonial tradition, on one menu." },
  { title: "Cocktail Bar", text: "A bar for the harbour hour, before lunch or after the last course." },
  { title: "Halaal Friendly", text: "The kitchen is halaal friendly. Tell us when you reserve." },
  { title: "Functions", text: "Set menus for corporate and private tables. Parties of eight require a deposit." },
];

export const timeline = [
  { year: "2001", title: "Doors open", text: "Baía opens upstairs at Victoria Wharf, looking over the harbour." },
  { year: "Signature", title: "The cataplana", text: "Prawns, langoustines, mussels, calamari, and linefish become the house feast." },
  { year: "Today", title: "Four terraces", text: "A cocktail bar, interior rooms, and covered terraces. Fully licensed." },
];

export const kitchen = [
  { role: "Chef de cuisine", name: "Patrick Cumaio", text: "From Mozambique, he has cooked the house seafood since 2001, and he buys only the finest ingredients." },
  { role: "The cellar", name: "Wine", text: "Rare Cape vintages and a short list of imported liqueurs, poured for shellfish and meat alike." },
  { role: "The bar", name: "Cocktails", text: "The bar sits with the dining rooms, for an aperitif or a last glass above the water." },
  { role: "The floor", name: "Dining room", text: "Service is quiet, exact, and paced for a long lunch or a full evening." },
  { role: "Events", name: "Private dining", text: "Corporate and private functions, with set menus arranged in advance." },
  { role: "The terrace", name: "Harbour tables", text: "Covered outside dining across four terraces, open to the bay." },
];

export const insights = [
  { kicker: "Cuisine", title: "Portuguese colonial cooking, set beside a continental menu.", image: photos.prawns },
  { kicker: "Ingredients", title: "Shellfish and linefish from southern Africa, poultry, beef, and venison.", image: photos.sashimi },
  { kicker: "Wine", title: "A cellar of rare Cape vintages, chosen for the coast.", image: photos.wine },
];

export const partners = ["Cape Cellar", "Walker Bay", "Hemel", "Swartland", "The Coast"];
