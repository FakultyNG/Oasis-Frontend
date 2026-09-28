import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oasis MedSpa Membership",
    short_name: "Oasis",
    description: "Membership, treatments and rewards from Oasis MedSpa.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/oasis-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/oasis-icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
