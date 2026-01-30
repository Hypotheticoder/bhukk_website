import React from "react";
import { Wine, Store, Truck, MapPin } from "lucide-react";

export const COLORS = {
  primary: "#E23744",
  dark: "#1C1C1C",
  grey: "#696969",
  lightGrey: "#F8F8F8",
};

export const NAV_LINKS = [
  { name: "Home", href: "#" },
  // { name: "Trust", href: "#" },
  { name: "Add Store", href: "#" },
  // { name: "Partnership", href: "#" },
  { name: "Delivery Partner", href: "#" },
  { name: "Contact Us", href: "#" },
];

export const FOOTER_SECTIONS = [
  {
    title: "ABOUT BHUKK",
    links: [
      "Who We Are",
      "Blog",
      "Work With Us",
      "Investor Relations",
      "Report Fraud",
      "Contact Us",
    ],
  },
  {
    title: "BHUKKVERSE",
    links: ["Bhukk", "Feeding India", "Hyperpure", "Bhukkland"],
  },
  {
    title: "FOR STORES",
    links: ["Partner With Us", "Apps For You"],
  },
  {
    title: "LEARN MORE",
    links: ["Privacy", "Security", "Terms", "Sitemap"],
  },
];

export const FEATURES = [
  {
    title: "beverages Delivery",
    description: "Premium alcohol from verified vendors delivered fast",
    image: "/assets/delivery.png",
    icon: <Wine className="w-6 h-6" />,
  },
  {
    title: "Partner With Bhukk",
    description: "Increase sales for beverages stores & distributors",
    image: "/assets/partner.png",
    icon: <Store className="w-6 h-6" />,
  },
  {
    title: "Fast & Safe Logistics",
    description: "Trained partners with full compliance",
    image: "/assets/logistics.png",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    title: "Hyperlocal Availability",
    description: "City-wide legal alcohol delivery",
    image: "/assets/location.png",
    icon: <MapPin className="w-6 h-6" />,
  },
];
