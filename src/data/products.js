import PropTypes from "prop-types";
import bulbasaurImg from "../assets/cards/bulbasaur.jpg";
import cinccinoImg from "../assets/cards/cinccino.jpg";
import laprasImg from "../assets/cards/lapras.jpg";
import lillipupImg from "../assets/cards/lillipup.jpg";
import mausholdImg from "../assets/cards/maushold.jpg";
import meowthImg from "../assets/cards/meowth.jpg";
import pikachuImg from "../assets/cards/pikachu.jpg";
import piplupImg from "../assets/cards/piplup.jpg";
import scorbunnyImg from "../assets/cards/scorbunny.jpg";
import snivyImg from "../assets/cards/snivy.jpg";
import torkoalImg from "../assets/cards/torkoal.jpg";
import zapdosImg from "../assets/cards/zapdos.jpg";

export const categories = ["Fire", "Water", "Electric", "Grass", "Normal"];

export const products = [
  {
    id: "zapdos",
    name: "Zapdos",
    price: 4280,
    salePrice: 3590,
    category: "Electric",
    hp: 120,
    rarity: "Illustration Rare",
    image: zapdosImg,
    summary: "Illustration Rare Zapdos, full-art electric legendary.",
    description:
      "A striking Illustration Rare featuring Zapdos surrounded by a dramatic storm. The card has sharp corners, a clean surface, and vibrant artwork that fills the entire card. Available at a discounted price while stocks last.",
    stock: 2,
  },
  {
    id: "torkoal",
    name: "Torkoal",
    price: 640,
    category: "Fire",
    hp: 110,
    rarity: "Illustration Rare",
    image: torkoalImg,
    summary: "Illustration Rare Torkoal with full-card fire artwork.",
    description:
      "This Illustration Rare Torkoal features detailed artwork showcasing its coal-filled shell. With 130 HP and a warm fire-themed design, it is a great addition to any Fire-type collection.",
    stock: 11,
  },
  {
    id: "snivy",
    name: "Snivy",
    price: 520,
    category: "Grass",
    hp: 70,
    rarity: "Illustration Rare",
    image: snivyImg,
    summary: "Illustration Rare Snivy, a full-art grass starter.",
    description:
      "An Illustration Rare featuring Snivy in a bright and detailed natural setting. The artwork covers the card beautifully, making it an excellent choice for collectors who enjoy Grass-type starter Pokémon.",
    stock: 14,
  },
  {
    id: "scorbunny",
    name: "Scorbunny",
    price: 580,
    category: "Fire",
    hp: 60,
    rarity: "Illustration Rare",
    image: scorbunnyImg,
    summary: "Illustration Rare Scorbunny, pack-fresh full art.",
    description:
      "This Illustration Rare Scorbunny features lively artwork highlighting the energetic Fire-type starter. The card has a glossy, pack-fresh appearance with no visible creases.",
    stock: 12,
  },
  {
    id: "lillipup",
    name: "Lillipup",
    price: 390,
    category: "Normal",
    hp: 60,
    rarity: "Illustration Rare",
    image: lillipupImg,
    summary: "Illustration Rare Lillipup, stored flat in a sleeve.",
    description:
      "An Illustration Rare featuring Lillipup in a charming full-art scene. The card has been stored flat since it was pulled, helping keep the artwork and edges in excellent condition.",
    stock: 16,
  },
  {
    id: "meowth",
    name: "Meowth",
    price: 450,
    category: "Normal",
    hp: 60,
    rarity: "Illustration Rare",
    image: meowthImg,
    summary: "Illustration Rare Meowth with a bright full-art print.",
    description:
      "This Illustration Rare Meowth features a bright and colorful full-art illustration. The print remains vibrant and the corners are well preserved, making it a great addition to a Pokémon collection.",
    stock: 13,
  },
  {
    id: "cinccino",
    name: "Cinccino",
    price: 870,
    category: "Normal",
    hp: 100,
    rarity: "Illustration Rare",
    image: cinccinoImg,
    summary: "Illustration Rare Cinccino in near-mint shape.",
    description:
      "An Illustration Rare featuring Cinccino in a detailed full-art scene. The card is in near-mint condition with clean edges and no visible dents, making it a strong choice for collectors.",
    stock: 6,
  },
  {
    id: "bulbasaur",
    name: "Bulbasaur",
    price: 760,
    salePrice: 590,
    category: "Grass",
    hp: 70,
    rarity: "Illustration Rare",
    image: bulbasaurImg,
    summary: "Illustration Rare Bulbasaur, on sale.",
    description:
      "This Illustration Rare Bulbasaur features a colorful full-art illustration of the classic Grass-type starter. The card is clean, lies flat, and is currently available at a discounted price.",
    stock: 9,
  },
  {
    id: "maushold",
    name: "Maushold",
    price: 1340,
    category: "Normal",
    hp: 70,
    rarity: "Illustration Rare",
    image: mausholdImg,
    summary: "Illustration Rare Maushold, a full family scene.",
    description:
      "An Illustration Rare featuring the entire Maushold family in a detailed and charming scene. The card has a crisp surface with no visible scratches and is a fun addition to any collection.",
    stock: 4,
  },
  {
    id: "piplup",
    name: "Piplup",
    price: 540,
    category: "Water",
    hp: 70,
    rarity: "Illustration Rare",
    image: piplupImg,
    summary: "Illustration Rare Piplup with a glossy full-art finish.",
    description:
      "This Illustration Rare Piplup features a glossy full-art illustration with bright colors and even centering. A great collectible for fans of the Water-type starter.",
    stock: 15,
  },
  {
    id: "lapras",
    name: "Lapras",
    price: 2460,
    salePrice: 1990,
    category: "Water",
    hp: 110,
    rarity: "Illustration Rare",
    image: laprasImg,
    summary: "Illustration Rare Lapras, sleeved and on sale.",
    description:
      "An Illustration Rare featuring Lapras in a beautiful full-art water-themed scene. The card has been kept sleeved to help maintain its clean surface and is currently available at a discounted price.",
    stock: 3,
  },
  {
    id: "pikachu",
    name: "Pikachu",
    price: 3180,
    salePrice: 2690,
    category: "Electric",
    hp: 190,
    rarity: "Illustration Rare",
    image: pikachuImg,
    summary: "Illustration Rare Pikachu, on sale.",
    description:
      "This Illustration Rare Pikachu features a vibrant full-art illustration with 60 HP. The corners are well preserved and the print remains bright. Currently offered at a discounted price.",
    stock: 5,
  },
];

export const productPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  hp: PropTypes.number.isRequired,
  rarity: PropTypes.string.isRequired,
  salePrice: PropTypes.number,
  image: PropTypes.string,
  summary: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
});

export function findProduct(productId) {
  return products.find((product) => product.id === productId) ?? null;
}
