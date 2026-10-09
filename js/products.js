/* Product catalog. Edit prices/availability here AND in worker/catalog.js (the server re-checks prices). Set soldOut:true to hide the Add button. */
window.PRODUCTS = [
 {
  "id": "four-oz-specialty",
  "name": "4 oz Specialty Jar",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "A small 4 oz jar, ideal for sampling or gifting.",
  "sizes": [
   {
    "label": "4 oz",
    "cents": 350,
    "soldOut": false
   }
  ]
 },
 {
  "id": "apple",
  "name": "Apple Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Crisp seasonal apples cooked into a sweet-tart spread. Good on toast, in oatmeal, or baked into something.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   },
   {
    "label": "12 oz",
    "cents": 1000,
    "soldOut": false
   }
  ]
 },
 {
  "id": "blackberry",
  "name": "Blackberry Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Ripe blackberries, small batch.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   },
   {
    "label": "12 oz",
    "cents": 1000,
    "soldOut": false
   }
  ]
 },
 {
  "id": "blueberry-ginger",
  "name": "Blueberry Ginger Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Ripe blueberries with a little zesty ginger. Nice with breakfast or a snack.",
  "sizes": [
   {
    "label": "Regular",
    "cents": 700,
    "soldOut": false
   }
  ]
 },
 {
  "id": "blueberry-peppered",
  "name": "Blueberry Peppered Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Sweet blueberries with a touch of pepper. Try it on cheese and crackers or a charcuterie board.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   }
  ]
 },
 {
  "id": "braxtons-blueberry-bliss",
  "name": "Braxton's Blueberry Bliss",
  "category": "Jams",
  "image": "/images/products/blueberry.jpg",
  "description": "Fresh, ripe blueberries for toast, scones, or a spoonful on its own.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   },
   {
    "label": "12 oz",
    "cents": 1000,
    "soldOut": false
   }
  ]
 },
 {
  "id": "daring-n-dill",
  "name": "Daring n Dill",
  "category": "Pickled goods",
  "image": "/images/jar-placeholder.jpg",
  "description": "Pickled vegetables with a dill bite.",
  "sizes": [
   {
    "label": "Regular",
    "cents": 1000,
    "soldOut": false
   }
  ]
 },
 {
  "id": "jalapeno-pepper",
  "name": "Jalapeño Pepper Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Zesty and spicy. Use it as a dip or a marinade.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   }
  ]
 },
 {
  "id": "peach",
  "name": "Peach Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "A fan favorite: juicy peaches for toast, pancakes, or baking.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   },
   {
    "label": "12 oz",
    "cents": 1000,
    "soldOut": false
   }
  ]
 },
 {
  "id": "peppered",
  "name": "Peppered Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Our original: sweet peppers and jalapeños, mild heat. Great on sandwiches and charcuterie boards.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   },
   {
    "label": "12 oz",
    "cents": 1000,
    "soldOut": false
   }
  ]
 },
 {
  "id": "pickled-cucumbers",
  "name": "Pickled Cucumbers",
  "category": "Pickled goods",
  "image": "/images/jar-placeholder.jpg",
  "description": "Classic dill pickles from fresh cucumbers, dill, and savory spices.",
  "sizes": [
   {
    "label": "16 oz",
    "cents": 1500,
    "soldOut": false
   }
  ]
 },
 {
  "id": "pineapple-ginger",
  "name": "Pineapple Ginger Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "A tropical jam with a ginger kick.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   }
  ]
 },
 {
  "id": "pineapple-mango-pepper",
  "name": "Pineapple Mango Pepper Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Pineapple and mango with a little pepper heat. Try it glazed on chicken or on a cheese board.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   }
  ]
 },
 {
  "id": "poppin-sweet-peppers",
  "name": "Poppin Sweet Peppers",
  "category": "Pickled goods",
  "image": "/images/jar-placeholder.jpg",
  "description": "Candied jalapeños: sweet cane sugar, spicy peppers, and our own blend.",
  "sizes": [
   {
    "label": "Regular",
    "cents": 700,
    "soldOut": false
   }
  ]
 },
 {
  "id": "raspberry",
  "name": "Raspberry Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Juicy raspberries for toast, waffles, or ice cream.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   },
   {
    "label": "12 oz",
    "cents": 1000,
    "soldOut": true
   }
  ]
 },
 {
  "id": "spencers-strawberry",
  "name": "Spencer's Strawberry SweeTTness",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Sun-ripened strawberries, cooked slowly. Good on toast, waffles, or straight from the jar.",
  "sizes": [
   {
    "label": "Small 8 oz",
    "cents": 700,
    "soldOut": false
   },
   {
    "label": "Large 12 oz",
    "cents": 1000,
    "soldOut": false
   }
  ]
 },
 {
  "id": "strawberry-mango",
  "name": "Strawberry Mango Jam",
  "category": "Jams",
  "image": "/images/jar-placeholder.jpg",
  "description": "Strawberries and mango for toast, yogurt, or a tropical charcuterie board.",
  "sizes": [
   {
    "label": "8 oz",
    "cents": 700,
    "soldOut": false
   },
   {
    "label": "12 oz",
    "cents": 1000,
    "soldOut": false
   }
  ]
 },
 {
  "id": "sweet-and-savory",
  "name": "Sweet and Savory Pickles",
  "category": "Pickled goods",
  "image": "/images/jar-placeholder.jpg",
  "description": "Fresh cucumbers, dill, and a hint of sugar. Good on sandwiches, burgers, and boards.",
  "sizes": [
   {
    "label": "12 oz",
    "cents": 1000,
    "soldOut": false
   },
   {
    "label": "16 oz",
    "cents": 1500,
    "soldOut": false
   }
  ]
 },
 {
  "id": "tart-n-tangy",
  "name": "Tart n Tangy Pickles",
  "category": "Pickled goods",
  "image": "/images/jar-placeholder.jpg",
  "description": "Bold spices and heat alongside classic dill.",
  "sizes": [
   {
    "label": "12 oz",
    "cents": 1000,
    "soldOut": true
   },
   {
    "label": "16 oz",
    "cents": 1500,
    "soldOut": false
   }
  ]
 },
 {
  "id": "wilderness-wild-n-free",
  "name": "Wilderness / Wild n Free",
  "category": "Pickled goods",
  "image": "/images/jar-placeholder.jpg",
  "description": "16 oz, 9 major ingredients, holistically packed and formulated.",
  "sizes": [
   {
    "label": "16 oz",
    "cents": 1800,
    "soldOut": false
   }
  ]
 }
];
