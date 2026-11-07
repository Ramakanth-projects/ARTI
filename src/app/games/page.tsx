import type { Metadata } from "next";

import { ModulePlaceholder } from "@/components/layout/module-placeholder";

export const metadata: Metadata = {
  title: "Games",
  description: "Planned ARTI module. Not implemented in Step 01.",
};

export default function Page() {
  return <ModulePlaceholder moduleId="games" />;
}
