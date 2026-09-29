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
  booking: "https://www.dineplan.com/restaurant/baia-seafood-restaurant",
  instagram: "https://www.instagram.com/baiaseafoodrestaurant/",
  facebook: "https://www.facebook.com/baiaseafoodrestaurant/",
  headerHours: [
    { label: "Lunch", time: "12:00–15:30" },
    { label: "Dinner", time: "18:00–22:00" },
  ],
  headerAddress: ["Shop 259, Entrance 5", "V&A Waterfront"],
  maps: "https://www.google.com/maps/search/?api=1&query=Baia+Seafood+Restaurant+Shop+259+Entrance+5+V%26A+Waterfront+Cape+Town+8001",
  mapEmbed:
    "https://maps.google.com/maps?q=Shop%20259%20Entrance%205%20V%26A%20Waterfront%20Cape%20Town%208001&z=16&output=embed",
};

export const heroSlides = [
  {
    title: "The",
    outline: "Bay",
    text: "Baía means the bay. Take a new table before Table Mountain, above Cape Town's working harbour, and watch the city become the view.",
    image: "/atmosphere/hero-1.jpg",
  },
  {
    title: "The",
    outline: "Cellar",
    text: "Indulge from the first glass. Champagne, bespoke Cape wine, and cocktails composed for the hour the mountain turns to gold.",
    image: "/atmosphere/hero-2.jpg",
  },
  {
    title: "The",
    outline: "Room",
    text: "Two chefs. One pursuit. Patrick Cumaio, from Mozambique, brings the sea to the plate. Brian van Zijl, the artist, makes you look before you taste.",
    image: "/atmosphere/hero-3.jpg",
  },
  {
    title: "The",
    outline: "House",
    text: "A new house on the water, built for the long evening. Relax here. Chef Daisuke's sushi, five generations of Japanese craft, now belongs to the bay.",
    image: "/atmosphere/hero-4.jpg",
  },
  {
    title: "Every",
    outline: "Visit",
    text: "Come and experience Baía. Lunch or dinner, this is a journey by the sea: the mountain, the cellar, and the rare pleasure of being truly looked after.",
    image: "/atmosphere/hero-5.jpg",
  },
];

export const storyTabs = [
  {
    id: "food",
    label: "The Food",
    body: "Seafood leads, and the menu refuses to stop there. Linefish and shellfish sit beside aged beef, Cape venison, and poultry, then a sushi bar worked in the Japanese style. Several traditions, one kitchen, and a plate that is rarely the one you expected.",
  },
  {
    id: "bar",
    label: "The Bar",
    body: "The list is rooted in the Cape winelands: estates poured to sit beside the food. The cocktails travel further. International classics, and house drinks written only for this room, with bubbles or a mocktail when that is the glass you want.",
  },
  {
    id: "atmosphere",
    label: "The Atmosphere",
    body: "A romantic table. A business lunch. A family gathered for the afternoon. The room is fine dining with more than one manner: quiet when the evening is yours, composed when the meeting matters, and generous when the table is full.",
  },
];

export const chefs = [
  {
    role: "Original chef",
    name: "Patrick Cumaio",
    text: "Baía’s original chef, from Mozambique, continues to bring his passion, flair, and deep connection to seafood to every plate. His culinary artistry has helped establish the reputation for which the house is known.",
    image: "/chefs/patrick.jpg",
  },
  {
    role: "Creator",
    name: "Brian van Zijl",
    text: "Creator, perfectionist, and artist, he transforms each dish into an experience. His attention to detail, visual artistry, and pursuit of flavour create dishes that are as captivating to look at as they are memorable to taste.",
    image: "/chefs/brian.jpg",
  },
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

// Five-bubble Tripadvisor notes only, with no complaint in the text.
// image is that guest's profile picture on Tripadvisor.
// href opens that review, not the restaurant's review list.
export const quotes = [
  {
    text: "We had a fabulous experience a Baia. Alfred our waiter was super helpful. We shared a warm seafood platter and a sea food salad. The seafood was truly beautiful and perfectly cooked. The service was brilliant. Would highly recommend if you are staying in the V & A Waterfront.",
    name: "firenzo71",
    source: "Tripadvisor",
    when: "September 2026",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1079598096-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/firenzo71.jpg",
  },
  {
    text: "We went here on a recommendation. We were not disappointed. Excellent sea bass. One to go back to.",
    name: "Westlawns",
    source: "Tripadvisor",
    when: "September 2026",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1078996005-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/westlawns.jpg",
  },
  {
    text: "We had a fantastic experience at Baia! The wild oysters from Mossel Bay, langoustines and rock lobster were absolutely delicious — fresh, beautifully prepared, and full of flavour. A special mention goes to Debra (from Zambia) who was an amazing waitress. She was warm, attentive, friendly, and made our evening even more enjoyable. Great food, excellent wine, and wonderful service.",
    name: "Magaluf",
    source: "Tripadvisor",
    when: "September 2026",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1077633078-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/magaluf.jpg",
  },
  {
    text: "The food from this restaurant surprised both me and my son. We are not really very fish fans, but the linefish we ate there was EXCEPCIONAL. Very good service, nice place, inside the shopping V&A Wharf. Super recommend!!!",
    name: "VaniaBrazil",
    source: "Tripadvisor",
    when: "March 2026",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1053924565-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/vaniabrazil.jpg",
  },
  {
    text: "This was our final night in Cape Town and what a very enjoyable meal we shared at Baía. A shared starter of grilled sardines to begin with excellent fresh small bread rolls. We then both chose the prawn and lobster main course served with half rice and half chips which was superb. The flavour was exceptional.",
    name: "Royston S",
    source: "Tripadvisor",
    when: "February 2026",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1048945264-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/royston.jpg",
  },
  {
    text: "There are plenty of places to get seafood in Capetown, but ONLY one place to eat it safely and enjoyably. That’s BAIA in the waterfront. I have been eating here for over 5 years and never had a bad meal.",
    name: "drmalcolm",
    source: "Tripadvisor",
    when: "January 2026",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1047510301-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/drmalcolm.jpg",
  },
  {
    text: "We had a very friendly welcome and the table gave us a great view of the sea. The food was outstanding and the service just as good. Definitely the best place to go for seafood.",
    name: "Andrew A",
    source: "Tripadvisor",
    when: "January 2026",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1046190251-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/andrew-a.jpg",
  },
  {
    text: "One of the best restaurants in Cape Town. Very good food and very nice staff. When we are in Cape Town, the Baia is always on the agenda.",
    name: "Christiane W",
    source: "Tripadvisor",
    when: "January 2026",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1047315773-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/christiane.jpg",
  },
  {
    text: "Wonderful seafood restaurant. The second time I was here and it was just as good both times. Everyone was super happy!",
    name: "Cecilia R",
    source: "Tripadvisor",
    when: "January 2026",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1045352179-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/cecilia.jpg",
  },
  {
    text: "The restaurant was recommended by a local guide to taste the delicious lobsters. Great experience with friendly staff. Very good lobsters! If you pass through here try this restaurant.",
    name: "16niko73",
    source: "Tripadvisor",
    when: "December 2025",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1045166481-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/niko.jpg",
  },
  {
    text: "Excellent service, great location, generous portions and the freshest seafood packed full of flavour. The lobster tails followed by the Mozambican prawns were cooked to perfection. Would definitely return.",
    name: "georgereid",
    source: "Tripadvisor",
    when: "August 2025",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1032364295-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/georgereid.jpg",
  },
  {
    text: "Baia is well-mannered and welcoming with a diverse menu and well-deserved reputation for excellent seafood. We were not disappointed. Attentive, friendly waiting staff served us great food.",
    name: "David S",
    source: "Tripadvisor",
    when: "August 2025",
    rating: 5,
    href: "https://www.tripadvisor.com/ShowUserReviews-g312659-d786129-r1027453733-Baia_Seafood_Restaurant-Cape_Town_Central_Western_Cape.html",
    image: "/reviews/david-s.jpg",
  },
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
  { title: "Fine Dining", text: "Seafood, meat, and poultry are served together across our fine-dining menu." },
  { title: "Halaal Friendly", text: "The kitchen is halaal friendly. Please tell us when you reserve your table." },
  { title: "Functions", text: "Set menus for corporate or private tables. Eight or more require a deposit." },
];

export const timeline = [
  {
    year: "2001",
    title: "Where it began",
    text: "Opened at the V&A Waterfront, and known since as a landmark for fine cuisine and wine. The years between have been spent raising that standard, not resting on it.",
  },
  {
    year: "Cuisine",
    title: "Many traditions",
    text: "Not one signature plate. A fusion of this coast’s seafood, Cape beef, venison and poultry, and a sushi bar of Japanese craft. The uniqueness is the range, held to a single standard.",
  },
  {
    year: "Today",
    title: "Room and terrace",
    text: "A sophisticated dining room within. Outside, a terrace with a bespoke view of Table Mountain. The house is new, and it offers you both.",
  },
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
