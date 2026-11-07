import type { NavSection } from "@/types";

/**
 * Navigation model for the ARTI shell.
 *
 * Every module below is a navigation placeholder for a later development step.
 * `planned: true` marks destinations whose functionality is not implemented in
 * Step 01; their routes render an explicit "planned" state rather than fake UI.
 */
export const navigationSections: NavSection[] = [
  {
    id: "workspace",
    label: "Workspace",
    items: [
      {
        id: "home",
        label: "Home",
        href: "/",
        description: "Overview of the ARTI workspace.",
      },
      {
        id: "chats",
        label: "Chats",
        href: "/chats",
        description: "Conversations with ARTI models.",
        planned: true,
      },
      {
        id: "pinned",
        label: "Pinned Messages",
        href: "/pinned",
        description: "Messages you have pinned for quick recall.",
        planned: true,
      },
    ],
  },
  {
    id: "creative",
    label: "Creative",
    items: [
      {
        id: "images",
        label: "Images",
        href: "/images",
        description: "Image generation and editing.",
        planned: true,
      },
      {
        id: "videos",
        label: "Videos",
        href: "/videos",
        description: "Video generation and composition.",
        planned: true,
      },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    items: [
      {
        id: "search",
        label: "Web Search",
        href: "/search",
        description: "Grounded answers from live web sources.",
        planned: true,
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        description: "Long-running work organised by project.",
        planned: true,
      },
      {
        id: "apps",
        label: "Software / Apps",
        href: "/apps",
        description: "Software development agents and generated apps.",
        planned: true,
      },
    ],
  },
  {
    id: "experimental",
    label: "Experimental",
    items: [
      {
        id: "games",
        label: "Games",
        href: "/games",
        description: "Interactive experiences built on ARTI.",
        planned: true,
      },
      {
        id: "magic",
        label: "Magic Mode",
        href: "/magic",
        description: "Experimental autonomous workflows.",
        planned: true,
      },
    ],
  },
];

/** Flattened lookup of every navigation destination, including the home route. */
export const allNavItems = navigationSections.flatMap((section) => section.items);
