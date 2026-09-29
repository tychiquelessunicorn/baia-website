import { cellarItems } from "./cellar";

export type ExploreItem = {
  group: string;
  name: string;
  description: string;
};

export type MenuChapter = {
  id: string;
  label: string;
  intro: string;
  items: ExploreItem[];
};

const seafood: ExploreItem[] = [
  { group: "To start", name: "Baked snails", description: "Oven baked snails smothered in a creamy garlic and herb butter." },
  { group: "To start", name: "Black mussels in Riesling", description: "Steamed mussels served in a white wine, garlic and thyme cream, with toasted parmesan and herb crostini." },
  { group: "To start", name: "Grilled calamari", description: "Succulent tubes grilled in lemon butter, perfected with a light garlic sauce." },
  { group: "To start", name: "Mini langoustines", description: "Four grilled langoustines dressed with olive oil, infused with fresh garlic, ginger and chilli." },
  { group: "To start", name: "Seared scallops", description: "Atlantic scallops seared with thyme oil, served with a micro herb salad, fresh citrus, jalapeño and a black pepper soy dressing." },
  { group: "To start", name: "Live abalone", description: "Live West Coast abalone flame-grilled in the shell with garlic butter, served with a ginger and soy dipping sauce and fresh lemon." },
  { group: "To start", name: "Gochujang roasted prawns", description: "Seared with olive oil and smoked salt, served with a roasted red pepper salsa, olive tapenade, lemon beurre blanc and baby cilantro." },
  { group: "To start", name: "Prawn and lobster risotto", description: "Creamy flame-grilled lobster and prawn risotto with parmesan and saffron." },
  { group: "To start", name: "Creamy seafood bisque", description: "Tomato roasted seafood bisque with a steamed prawn tail." },
  { group: "To start", name: "Oysters Thermidor", description: "Seared in the shell, topped with Thermidor sauce and gratinated." },
  { group: "To start", name: "Fresh oysters", description: "Six, nine or twelve oysters on ice with lemon. Shallot vinaigrette or horseradish cocktail sauce." },
  { group: "To start", name: "Prawn cocktail", description: "De-shelled prawns steamed and chilled, served with sliced avocado and a traditional Marie Rose sauce." },
  { group: "To start", name: "Crispy prawn and tuna", description: "Tuna sashimi and crispy Japanese-style prawns with wild-caught salmon caviar, avocado, wasabi and soy." },
  { group: "To start", name: "Langoustine salad", description: "Steamed and chilled langoustines with crisp apple and cucumber, dressed with Japanese mayonnaise and lime, on baby spinach, rocket, green onion and croutons." },
  { group: "Raw", name: "Linefish tiradito", description: "Linefish tiradito with aji amarillo, yuzu ginger and lime marmalade." },
  { group: "Raw", name: "Salmon crudo", description: "Norwegian salmon crudo, citrus and fennel, with cultivated oyster, cucumber, ginger, lime and wild-caught salmon caviar." },
  { group: "Raw", name: "Prawn and langoustine ceviche", description: "Apple, cucumber and lime tiger’s milk, red chilli, ginger and mint." },
  { group: "Raw", name: "Aguachile negro", description: "Toasted garlic and charred chilli prawns in a dark umami marinade, with cucumber, avocado, red onion and Mexican tostada." },
  { group: "Raw", name: "Kingklip ceviche", description: "Kingklip ceviche with litchi, lime and jalapeño tiger’s milk, red onion, crispy chilli and baby cilantro." },
  { group: "Raw", name: "Kabeljou maracuja ceviche", description: "Ginger and lime marinated kabeljou, passionfruit and baby fennel tiger’s milk, citrus, celery and aji limo." },
  { group: "Raw", name: "Seabass tiradito", description: "Seabass marinated in yuzu, pineapple and citrus with chilli, red onion and seasonal fruit." },
  { group: "From the sea", name: "Queen prawns", description: "The traditional flavours of the former Portuguese colonies." },
  { group: "From the sea", name: "King prawns", description: "The traditional flavours of the former Portuguese colonies." },
  { group: "From the sea", name: "Tiger prawns", description: "Medium tiger prawns, in the traditional flavours of the former Portuguese colonies." },
  { group: "From the sea", name: "Giant tiger prawns", description: "The traditional flavours of the former Portuguese colonies." },
  { group: "From the sea", name: "Langoustines", description: "A sweeter crustacean, prepared to bring out its subtle flavour." },
  { group: "From the sea", name: "Baby lobster", description: "Fresh lobster, grilled and served with lemon butter and garlic sauce." },
  { group: "From the sea", name: "West Coast rock lobster", description: "Large West Coast lobster, grilled, steamed, dressed in olive oil, or finished Thermidor." },
  { group: "From the sea", name: "East Coast rock lobster", description: "Large East Coast lobster, grilled, steamed, dressed in olive oil, or finished Thermidor." },
  { group: "From the sea", name: "Mozambican prawn curry", description: "Eight partially shelled queen prawns in a mild coconut cream curry." },
  { group: "From the sea", name: "Calamari", description: "Succulent tubes grilled with lemon butter and a light garlic sauce." },
  { group: "From the sea", name: "Linefish and lobster", description: "Garlic-butter grilled linefish with a lobster tail, pumpkin, gem squash and shiitake fricassee, wild-caught salmon caviar and lemon butter." },
  { group: "From the sea", name: "Linefish of the day", description: "Freshly caught fillet, grilled in lemon and light garlic butter, or pan-fried with olive oil, lemon and thyme." },
  { group: "From the sea", name: "Kingklip fillet", description: "Pan-fried in fresh ginger, garlic and coriander, served with a pickled ginger salsa." },
  { group: "From the sea", name: "Whole baby kingklip", description: "Grilled on the bone with lemon butter and fresh herbs." },
  { group: "From the sea", name: "Tre pesca", description: "Three flavours of fish, grilled in olive oil, with pan-roasted mushrooms, red onion, capsicum, baby potatoes and lemon cream." },
  { group: "From the sea", name: "Linefish and grilled langoustine", description: "Pan-fried linefish and grilled langoustine on potato purée, mixed peppers, mushrooms, peas and a lemon cream." },
  { group: "From the sea", name: "Norwegian salmon and lobster", description: "Flame-grilled, with sliced jalapeño, château potatoes and peas, half a crayfish and a lime marmalade." },
  { group: "From the sea", name: "Pumpkin seed crusted salmon", description: "Norwegian salmon on long-stem broccoli, potato purée and a vegetable medley, with a tomato and lime cream." },
  { group: "From the sea", name: "Creole kingklip with black mussels", description: "Cajun-spiced grilled kingklip with black mussels in a roasted tomato and red pepper sauce, lime and fresh oregano." },
  { group: "From the sea", name: "Kingklip with crayfish Thermidor", description: "Grilled kingklip fillet with a crayfish tail Thermidor." },
];

const meat: ExploreItem[] = [
  { group: "To start", name: "Beef trinchado", description: "Strips of pan-fried beef tenderloin, deglazed in port, with chilli, garlic, fresh herbs, paprika and cream." },
  { group: "To start", name: "Bone marrow", description: "Olive oil and chilli roasted beef shank marrow, with lemon, rock salt, thyme and rosemary, and a caper, bell pepper and black olive salsa." },
  { group: "To start", name: "Beef tataki", description: "Hoisin beef tataki with toasted sesame, sugar snap, coriander and spring onion." },
  { group: "To start", name: "Venison carpaccio", description: "Flame-grilled springbok loin, butter-roasted pumpkin, watercress and pumpkin seed salad with a candied ginger dressing." },
  { group: "From the grill", name: "Grilled prime beef fillet", description: "Grilled to the temperature you choose, with roasted vegetables and hand-cut potato fries. Pepper sauce, mushroom sauce or a red wine jus." },
  { group: "From the grill", name: "Chateaubriand", description: "Sliced and set on sautéed mushrooms, with sauce béarnaise and pommes frites." },
  { group: "From the grill", name: "Flame-grilled sirloin", description: "Twenty-eight day aged sirloin with a garlic herb butter, mushrooms, seasonal greens and buttered mashed potato." },
  { group: "From the grill", name: "Fire-roasted springbok", description: "Springbok loin flame-grilled with rosemary butter and black pepper, served with a parmesan and toasted pumpkin seed risotto." },
  { group: "From the grill", name: "Beef fillet and baby lobster", description: "Char-grilled fillet with parmesan cream, grilled baby West Coast rock lobster, garlic butter, hand-cut fries and shaved black truffle." },
  { group: "From the grill", name: "Beef ribeye", description: "Aged ribeye flame-grilled with butter, red wine jus, roasted vegetables and hand-cut rosemary fries." },
  { group: "From the grill", name: "Karoo Wagyu skirt steak", description: "Grilled on the open flame with a bourbon pepper sauce, shoestring fries with parmesan and black truffle, and roasted vegetables." },
];

const poultry: ExploreItem[] = [
  { group: "Free range", name: "Chicken supreme", description: "Flame-grilled with butter, garlic and fresh herbs, served with mustard mashed potatoes and sautéed exotic mushrooms in a mascarpone chardonnay cream." },
  { group: "Free range", name: "Whole baby chicken", description: "Grilled in the Portuguese style, with garlic and chilli." },
];

const roll = "Six maki pieces, or two as a hand roll. Premium filling wrapped in nori and sushi rice.";

const sushi: ExploreItem[] = [
  { group: "Chef’s special rolls", name: "Rainbow roll", description: "Salmon and avocado inside, topped with salmon, eel, tuna, linefish, avocado, Japanese mayonnaise, caviar and microgreens." },
  { group: "Chef’s special rolls", name: "Prawn tempura dragon roll", description: "Crispy prawn tempura and cucumber inside, topped with avocado, unagi sauce and toasted sesame seeds." },
  { group: "Chef’s special rolls", name: "Red dragon roll", description: "Spicy tuna and avocado inside, topped with tuna, avocado, Japanese mayonnaise, sriracha and caviar." },
  { group: "Chef’s special rolls", name: "Eel dragon roll", description: "Cucumber inside, topped with eel and finished with unagi sauce." },
  { group: "Chef’s special rolls", name: "Crazy salmon roll", description: "Spicy salmon roll topped with coal-seared salmon toro and wild-caught salmon caviar." },
  { group: "Chef’s special rolls", name: "Vegetarian roll", description: "Exotic mushroom, sweet soy glaze, chives, Maldon salt, shaved black truffle and lime." },
  { group: "Maki and hand rolls", name: "Tuna", description: roll },
  { group: "Maki and hand rolls", name: "Salmon", description: roll },
  { group: "Maki and hand rolls", name: "Avocado", description: roll },
  { group: "Maki and hand rolls", name: "Cucumber", description: roll },
  { group: "Maki and hand rolls", name: "Takuan pickled radish", description: roll },
  { group: "Maki and hand rolls", name: "Eel and cucumber", description: roll },
  { group: "Nigiri", name: "Tuna", description: "Two pieces." },
  { group: "Nigiri", name: "Salmon", description: "Two pieces." },
  { group: "Nigiri", name: "Prawn", description: "Two pieces." },
  { group: "Nigiri", name: "Eel", description: "Two pieces." },
  { group: "Nigiri", name: "Mackerel", description: "Two pieces." },
  { group: "Platters", name: "Platter combo", description: "Twelve pieces. A classic selection: tuna and salmon maki, and tuna and salmon nigiri." },
  { group: "Platters", name: "Deluxe platter", description: "Twenty-nine pieces. Spicy tuna and avocado, and salmon and avocado rolls; sashimi of tuna, salmon and seasonal linefish; nigiri of tuna, salmon, linefish, scallop, Alaskan king crab and mackerel." },
  { group: "Omakase", name: "Sashimi selection", description: "Twelve pieces, chosen by the chef. Seasonal linefish and seafood, with Alaskan king crab, scallops and wild-caught salmon caviar." },
  { group: "Omakase", name: "Nigiri selection", description: "Ten pieces, chosen by the chef, from the same premium selection." },
  { group: "Chef’s sashimi", name: "Aburi salmon", description: "Flame-seared salmon belly with sesame oil, ginger, garlic, soy sauce, chives and toasted sesame seeds." },
  { group: "Chef’s sashimi", name: "Seared tuna tataki", description: "Lightly seared tuna with sea salt and cracked black pepper, sweet miso, crispy garlic, chilli oil, spring onion and ponzu." },
  { group: "Chef’s sashimi", name: "Linefish new style", description: "Sliced seasonal linefish with tobiko wasabi caviar, spring onion, Japanese seven-spice and ponzu." },
  { group: "Chef’s sashimi", name: "Salmon tartare", description: "Hand-cut salmon with red onion, spring onion, avocado, lime zest, olive oil, sea salt, black pepper, wild-caught salmon caviar and microgreens." },
  { group: "Chef’s sashimi", name: "Tuna tartare", description: "Tuna with red onion, spring onion, kimchi sauce, sriracha, sesame oil and caviar." },
  { group: "Chef’s sashimi", name: "Healthy vegetarian", description: "Crispy tofu, spicy cucumber and seaweed caviar." },
  { group: "Sashimi", name: "Tuna and salmon", description: "Five pieces of each. Freshly sliced, with daikon, cucumber, carrot, wasabi, soy sauce and ponzu." },
  { group: "Sashimi", name: "Mackerel and octopus", description: "Five pieces of each, served with daikon, cucumber, carrot, wasabi, soy sauce and ponzu." },
  { group: "Sashimi", name: "Linefish and seared abalone", description: "Five pieces of each, served with daikon, cucumber, carrot, wasabi, soy sauce and ponzu." },
  { group: "Sashimi", name: "Live lobster and scallop", description: "Five pieces of each, served with daikon, cucumber, carrot, wasabi, soy sauce and ponzu." },
  { group: "Sashimi", name: "Sea urchin", description: "Uni, served with daikon, cucumber, carrot, wasabi, soy sauce and ponzu." },
  { group: "California rolls", name: "Spicy tuna and avocado", description: "Eight inside-out pieces. Tuna, avocado, kimchi sauce, sriracha, sesame oil and spring onion." },
  { group: "California rolls", name: "Salmon and avocado", description: "Eight inside-out pieces. Salmon, avocado and toasted sesame." },
  { group: "California rolls", name: "Prawn and avocado", description: "Eight inside-out pieces. Prawn with avocado and cream cheese." },
  { group: "California rolls", name: "Alaskan king crab and avocado", description: "Eight inside-out pieces. Alaskan king crab, avocado, cucumber, Japanese mayonnaise, caviar and sesame." },
];

export const menuChapters: MenuChapter[] = [
  {
    id: "seafood",
    label: "Seafood",
    intro: "Shellfish, linefish, and the raw bar.",
    items: seafood,
  },
  {
    id: "meat",
    label: "Meat",
    intro: "Beef, and game from the Karoo.",
    items: meat,
  },
  {
    id: "poultry",
    label: "Poultry",
    intro: "Free-range chicken, grilled in the house style.",
    items: poultry,
  },
  {
    id: "cellar",
    label: "The Cellar",
    intro: "Cape wines with a tasting note, from méthode to the estates.",
    items: cellarItems.filter(
      (item) =>
        item.group !== "Cocktails" &&
        item.group !== "Without alcohol" &&
        item.group !== "By the glass" &&
        item.description.trim().length > 80,
    ),
  },
  {
    id: "sushi",
    label: "Sushi",
    intro: "A new chapter. Rolls, nigiri and sashimi in the Japanese style.",
    items: sushi,
  },
];

export const menuPreviewCount = 4;
