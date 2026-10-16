const dishes = [
  {
    id: "doro-wot",
    name: "Doro Wot",
    price: 420,
    summary: "A rich Ethiopian chicken stew seasoned with berbere and served with injera.",
    description: "Slow-cooked chicken, berbere, onions and spices come together in this classic Ethiopian dish.",
    image: "/images/doro-wot.jfif",
    alt: "Doro Wot Ethiopian chicken stew"
  },
  {
    id: "tibs",
    name: "Tibs",
    price: 390,
    summary: "Tender sauteed meat with vegetables and Ethiopian spices.",
    description: "Tibs is sauteed meat cooked with vegetables, herbs and warm Ethiopian spices.",
    image: "/images/tibs.jfif",
    alt: "Ethiopian Tibs with sauteed meat and vegetables"
  },
  {
    id: "buna",
    name: "Buna",
    price: 120,
    summary: "Traditional Ethiopian coffee prepared for a rich and aromatic cup.",
    description: "Freshly prepared Ethiopian coffee with a deep aroma and traditional character.",
    image: "/images/buna.jpeg",
    alt: "Traditional Ethiopian Buna coffee"
  }
];

export function getDishes() {
  return dishes;
}

export function getDish(id) {
  return dishes.find((dish) => dish.id === id);
}
