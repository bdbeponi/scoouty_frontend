import { FaBiking } from "react-icons/fa";

export const navigation = [
  {
    name: "Home",
    href: "/",
    icon: null,
    subMenu: null,
  },
  {
    name: "Scooty Brand",
    href: "/scooties",
    subMenu: [
      // These are default static items; they will be replaced dynamically from API if available
      { name: "Honda", models: 12, href: "/scooty/honda" },
      { name: "TVS", models: 10, href: "/scooty/tvs" },
      { name: "Yamaha", models: 8, href: "/scooty/yamaha" },
      { name: "Suzuki", models: 6, href: "/scooty/suzuki" },
      { name: "Hero", models: 5, href: "/scooty/hero" },
    ],
  },
  {
    name: "About Us",
    href: "/about-us",
    icon: null,
    subMenu: null,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    icon: null,
    subMenu: null,
  },
];
