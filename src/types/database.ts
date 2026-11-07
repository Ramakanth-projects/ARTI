/**
 * Database type surface.
 *
 * ARTI has no domain tables yet — Step 01 deliberately ships no schema. This
 * placeholder keeps the Supabase clients fully typed so feature modules can add
 * generated types later without changing their call sites.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
