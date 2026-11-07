/** Central brand and application identity for ARTI. */

export const siteConfig = {
  name: "ARTI",
  fullName: "Artificial Intelligence",
  meaning: {
    R: "Ramakanth",
    T: "Tejasree",
    AI: "Artificial Intelligence",
  },
  tagline: "A private AI workspace for Ramakanth and Tejasree.",
  description:
    "ARTI is a private, premium AI platform built exclusively for Ramakanth and Tejasree.",
  /** Brand palette. Kept intentionally to two colours plus a warm neutral. */
  themeColor: "#9e3450",
  backgroundColor: "#faf6ed",
  colors: {
    wineRed: "#9e3450",
    lightSand: "#faf6ed",
  },
  owners: ["Ramakanth", "Tejasree"],
  version: "0.1.0",
  stage: "Step 01 — Project Foundation",
} as const;

export type SiteConfig = typeof siteConfig;
