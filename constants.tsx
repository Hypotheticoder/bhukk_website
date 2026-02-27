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
  { name: "About Us", href: "#" },
  // { name: "Trust", href: "#" },
  { name: "Partner With Us", href: "#" },
  // { name: "Partnership", href: "#" },
  { name: "Delivery Partner", href: "#" },
  { name: "Contact Us", href: "#" },
];

export const FOOTER_SECTIONS = [
  {
    title: "ABOUT BHUKK",
    links: ["Our Story", "Careers", "Press", "Contact Us"],
  },
  {
    title: "FOR PARTNERS",
    links: ["Partner With Us", "B2B Solutions", "Delivery Partners"],
  },
  {
    title: "SUPPORT",
    links: ["Help Center", "Safety & Compliance", "FAQs", "Report an Issue"],
  },
  {
    title: "LEGAL",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
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
