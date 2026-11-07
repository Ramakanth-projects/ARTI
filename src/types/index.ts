export type { Database, Json } from "./database";

/** A navigation destination exposed in the ARTI shell. */
export type NavItem = {
  /** Stable identifier, also used as the React key. */
  id: string;
  label: string;
  href: string;
  /** Short description shown in tooltips and the collapsed rail. */
  description: string;
  /** Marks a module that exists as navigation only in Step 01. */
  planned?: boolean;
};

/** A logical grouping of navigation destinations. */
export type NavSection = {
  id: string;
  label: string;
  items: NavItem[];
};

/** Generic async resource state used by foundation-level UI. */
export type AsyncStatus = "idle" | "loading" | "success" | "error";
