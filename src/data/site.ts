export const SITE = {
  name: "Queen E's Heirr",
  tagline: "Curating Culture & Confections",
  email: "info@queenesheirr.com",
  phone: "",
  social: {
    facebook: "https://www.facebook.com/queenesheirr",
    instagram: "https://www.instagram.com/queenesheirr",
    linkedin: "https://www.linkedin.com/in/queenesheirr",
  },
  location: {
    name: "Bayou Stuf",
    address: "28178 U.S. Hwy 190, Lacombe, LA",
    note: "Retail partner — find Queen E's jams and pickles in store.",
  },
  shippingCents: 500,
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  blurb: string;
  description: string;
  image: string;
  badge?: string;
  category: "confection" | "curriculum";
  ships: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "jam-strawberry-champagne",
    slug: "strawberry-champagne-jam",
    name: "Strawberry Champagne Jam",
    priceCents: 1400,
    badge: "Bestseller",
    image: "/images/strawberry-champagne.jpg",
    category: "confection",
    ships: true,
    blurb:
      "Sun-ripened strawberries kissed with fine champagne. Perfect for croissants or charcuterie.",
    description:
      "Small-batch strawberry jam finished with champagne. Bright, floral, and made for morning toast, cheese boards, and gifting.",
  },
  {
    id: "jam-bourbon-peach",
    slug: "bourbon-peach-preserve",
    name: "Bourbon Peach Preserve",
    priceCents: 1600,
    badge: "Limited Batch",
    image: "/images/bourbon-peach.jpg",
    category: "confection",
    ships: true,
    blurb:
      "Southern peaches infused with Kentucky bourbon and Madagascar vanilla.",
    description:
      "Ripe peaches slow-cooked with bourbon and vanilla. Deep, warm, and limited by the harvest.",
  },
  {
    id: "pickle-okra",
    slug: "signature-pickled-okra",
    name: "Signature Pickled Okra & Veggies",
    priceCents: 1500,
    image: "/images/pickled-okra.jpg",
    category: "confection",
    ships: true,
    blurb:
      "Crisp farm vegetables packed with garlic, dill, and a subtle spice kick.",
    description:
      "Crunchy pickled okra and mixed vegetables with garlic and dill. A pantry staple for po'boys, boards, and bayou tables.",
  },
  {
    id: "Judah-student",
    slug: "judah-curriculum-students",
    name: "J.U.D.A.H. Curriculum — Students",
    priceCents: 25000,
    badge: "Curriculum",
    image: "/images/afternoon-tea.jpg",
    category: "curriculum",
    ships: false,
    blurb:
      "Leadership curriculum for students: presence, communication, and character in rooms that matter.",
    description:
      "J.U.D.A.H. for students is a structured leadership curriculum covering poise, voice, and how to show up as a young leader.",
  },
  {
    id: "Judah-professional",
    slug: "judah-curriculum-professionals",
    name: "J.U.D.A.H. Curriculum — Professionals",
    priceCents: 45000,
    badge: "Curriculum",
    image: "/images/collection.jpg",
    category: "curriculum",
    ships: false,
    blurb:
      "Leadership curriculum for professionals: executive presence, culture, and how you lead a room.",
    description:
      "J.U.D.A.H. for professionals is the full leadership curriculum for managers, teams, and rising executives.",
  },
  {
    id: "Judah-keynote",
    slug: "judah-leadership-keynote",
    name: "J.U.D.A.H. Leadership Keynote",
    priceCents: 150000,
    badge: "Keynote",
    image: "/images/jam-lab.jpg",
    category: "curriculum",
    ships: false,
    blurb:
      "A J.U.D.A.H. keynote on leadership — the curriculum as a stage talk for schools, companies, and conferences.",
    description:
      "Book the J.U.D.A.H. leadership keynote. The listed fee is a starting honorarium; use Contact for custom events after adding to bag or inquiring.",
  },
];

export type Program = {
  id: string;
  name: string;
  priceLabel: string;
  audience: "class" | "student" | "professional";
  blurb: string;
  points?: string[];
  productId?: string;
};

export const PROGRAMS: Program[] = [
  {
    id: "stem-lab",
    name: "Standalone Jam Making & STEM Lab",
    priceLabel: "$55",
    audience: "class",
    blurb:
      "Fruit acids, pectin, and precise temperatures — the science of a perfect gel.",
    points: [
      "Hands-on fruit biochemistry & heat science",
      "Take home two custom artisan jam jars",
    ],
  },
  {
    id: "combined-class",
    name: "Jam Making & Etiquette Combined Class",
    priceLabel: "$85",
    audience: "class",
    blurb:
      "Jam crafting plus formal tea service, table manners, and gracious hosting.",
    points: [
      "Afternoon tea pairing & dining etiquette",
      "Gracious hosting and social poise",
    ],
  },
  {
    id: "youth-dining",
    name: "Youth Dining & Social Graces",
    priceLabel: "$125",
    audience: "student",
    blurb:
      "Table manners, first impressions, and polite conversation for ages 8–17.",
  },
  {
    id: "student-leadership",
    name: "Student Leadership Academy",
    priceLabel: "$250",
    audience: "student",
    blurb:
      "Public speaking, emotional intelligence, and foundational leadership.",
  },
  {
    id: "judah-student",
    name: "J.U.D.A.H. Curriculum — Students",
    priceLabel: "$250",
    audience: "student",
    productId: "Judah-student",
    blurb:
      "The J.U.D.A.H. leadership curriculum written for students. Purchase through checkout.",
  },
  {
    id: "executive-presence",
    name: "Executive Presence & Dining",
    priceLabel: "$350",
    audience: "professional",
    blurb:
      "Business dining, networking poise, and polished non-verbal communication.",
  },
  {
    id: "corporate-coaching",
    name: "Corporate Leadership Coaching",
    priceLabel: "Custom",
    audience: "professional",
    blurb:
      "Training for emerging managers, teams, conflict, and cross-cultural etiquette.",
  },
  {
    id: "judah-professional",
    name: "J.U.D.A.H. Curriculum — Professionals",
    priceLabel: "$450",
    audience: "professional",
    productId: "Judah-professional",
    blurb:
      "The J.U.D.A.H. leadership curriculum for professionals. Purchase through checkout.",
  },
  {
    id: "judah-keynote",
    name: "J.U.D.A.H. Leadership Keynote",
    priceLabel: "$1,500",
    audience: "professional",
    productId: "Judah-keynote",
    blurb:
      "The J.U.D.A.H. curriculum as a leadership keynote for schools, companies, and conferences.",
  },
];

export type Story = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const STORIES: Story[] = [
  {
    slug: "charcuterie-jam-pairing",
    title: "The Art of the Charcuterie & Jam Pairing",
    category: "Hosting & Recipes",
    image: "/images/collection.jpg",
    excerpt:
      "Pair Strawberry Champagne and Bourbon Peach with artisan cheeses and savory crackers.",
    body: [
      "A well-set board is hospitality in miniature. Start with contrast: something sharp, something creamy, something crunchy, and a preserve that ties the table together.",
      "Strawberry Champagne jam loves brie, goat cheese, and toasted almonds. A spoonful beside a flute of sparkling wine is enough of a welcome.",
      "Bourbon Peach preserve leans into aged cheddar, smoked ham, and dark bread. The vanilla and whiskey notes make it a winter gift as easily as a summer picnic.",
      "Finish with pickled okra for acidity. The palate resets, and guests stay at the table a little longer — which is the whole point.",
    ],
  },
  {
    slug: "first-impressions",
    title: "First Impressions in the Digital & In-Person Era",
    category: "Etiquette & Poise",
    image: "/images/afternoon-tea.jpg",
    excerpt:
      "Posture, eye contact, and gracious communication remain a competitive advantage.",
    body: [
      "Screens taught us speed. Rooms still reward presence. The handshake, the pause before speaking, and the way you sit at a table still telegraph more than a profile ever will.",
      "For students, this is not old-fashioned dress-up. It is the skill of being taken seriously in interviews, internships, and first jobs.",
      "For professionals, executive presence is simply consistency: what you write, how you enter a room, and how you host a meal for a client.",
      "Queen E's training treats etiquette as leadership — a practice of attention, not performance.",
    ],
  },
];

export const FAQS = [
  {
    q: "Are your jams and confections made in small batches?",
    a: "Yes. Every jar is crafted in small batches with vine-ripened fruit and traditional family recipes.",
  },
  {
    q: "How do the jam-making & STEM etiquette classes work?",
    a: "We offer standalone jam-making STEM labs and combined classes that pair the science session with formal tea service and etiquette training.",
  },
  {
    q: "What is J.U.D.A.H.?",
    a: "J.U.D.A.H. is Queen E's leadership curriculum for students and professionals, also offered as a keynote. The curriculum is available to purchase in the shop.",
  },
  {
    q: "Can I book private etiquette or leadership coaching for my team?",
    a: "Yes. We design corporate leadership training, J.U.D.A.H. keynotes, and private workshops around your organization.",
  },
  {
    q: "What is the shelf life of your artisanal jams once opened?",
    a: "Unopened jars keep in a cool, dark place for up to 18 months. Once opened, refrigerate and enjoy within 4 to 6 weeks.",
  },
  {
    q: "How can retail stores stock Queen E's products?",
    a: "Apply through the Wholesale Portal. We review reseller details and send case pricing and catalog information.",
  },
  {
    q: "Do you ship orders nationwide?",
    a: "Yes. We ship gourmet preserves and pickled goods across the United States. You can also find jars in store at Bayou Stuf in Lacombe, LA. Digital curriculum does not include shipping.",
  },
  {
    q: "What should I bring to a jam-making STEM lab?",
    a: "Equipment, aprons, science materials, and ingredients are provided. Bring curiosity.",
  },
  {
    q: "Can I request a custom flavor or gift basket?",
    a: "Yes — for weddings, corporate gifting, or private events. Use the contact form to describe the occasion.",
  },
];
