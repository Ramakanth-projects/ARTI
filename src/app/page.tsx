import { LazyArtiScene } from "@/components/three/lazy-arti-scene";
import { SupabaseStatusCard } from "@/components/ui/supabase-status-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckIcon,
  ChevronRightIcon,
  CubeIcon,
  DatabaseIcon,
  SparkleIcon,
} from "@/components/ui/icons";
import { navigationSections } from "@/lib/config/navigation";
import { getSupabaseConfigIssue } from "@/lib/config/env";
import { siteConfig } from "@/lib/config/site";

const FOUNDATION_ITEMS = [
  "Responsive application shell with a desktop sidebar and mobile drawer",
  "Wine Red and Light Sand design tokens with typography, spacing and elevation",
  "Supabase browser and server clients with validated environment configuration",
  "Next.js route handlers and a FastAPI service boundary for future AI work",
  "React Three Fiber scene wired up as the 3D foundation",
  "Installable PWA manifest and Vercel deployment configuration",
];

export default function HomePage() {
  return (
    <div className="container-arti flex flex-col gap-10 py-8 sm:py-10 lg:gap-12">
      <section className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col items-start gap-5">
          <Badge tone="brand">
            <SparkleIcon className="size-3.5" />
            {siteConfig.stage}
          </Badge>

          <h1 className="max-w-xl">A private AI workspace, built for two.</h1>

          <p className="max-w-xl text-base leading-relaxed text-foreground-muted">
            {siteConfig.name} stands for{" "}
            <strong className="font-semibold text-ink-800">
              {siteConfig.meaning.R}
            </strong>
            ,{" "}
            <strong className="font-semibold text-ink-800">
              {siteConfig.meaning.T}
            </strong>{" "}
            and{" "}
            <strong className="font-semibold text-ink-800">
              {siteConfig.meaning.AI}
            </strong>
            . This foundation release delivers the structure, design system and
            integration points that later AI features are built on.
          </p>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/projects">
              Explore the modules
              <ChevronRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href="#foundation" variant="outline">
              Review the foundation
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-sand-200 to-sand-100 shadow-card lg:max-w-none">
          <LazyArtiScene />
          <p className="absolute bottom-3 left-3 rounded-full bg-surface/80 px-3 py-1 text-[0.6875rem] font-medium text-ink-600 backdrop-blur">
            3D foundation · React Three Fiber
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="sr-only">Integration status</h2>
        <SupabaseStatusCard detail={getSupabaseConfigIssue()} />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <span className="grid size-10 place-items-center rounded-lg bg-wine-100 text-wine-700">
              <CubeIcon className="size-5" />
            </span>
            <CardTitle>Design foundation</CardTitle>
            <CardDescription>
              Wine Red primaries and Light Sand surfaces, expressed as design
              tokens rather than scattered values.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <span className="grid size-10 place-items-center rounded-lg bg-wine-100 text-wine-700">
              <DatabaseIcon className="size-5" />
            </span>
            <CardTitle>Data foundation</CardTitle>
            <CardDescription>
              Supabase clients for browser and server, with authentication-ready
              and storage-ready architecture.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <span className="grid size-10 place-items-center rounded-lg bg-wine-100 text-wine-700">
              <SparkleIcon className="size-5" />
            </span>
            <CardTitle>Feature-ready shell</CardTitle>
            <CardDescription>
              A responsive workspace prepared for chats, media, search, projects
              and agents in later steps.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card id="foundation" className="scroll-mt-24">
          <CardHeader>
            <CardTitle>What this step delivers</CardTitle>
            <CardDescription>
              Verified foundation work, with no AI features implemented yet.
            </CardDescription>
          </CardHeader>
          <ul className="flex flex-col gap-3 px-5 pb-6 sm:px-6">
            {FOUNDATION_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-wine-100 text-wine-700">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="leading-relaxed text-foreground-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Planned modules</CardTitle>
            <CardDescription>
              Every destination below exists as navigation only. Selecting one
              shows an explicit planned state.
            </CardDescription>
          </CardHeader>
          <div className="flex flex-col gap-5 px-5 pb-6 sm:px-6">
            {navigationSections.map((section) => (
              <div key={section.id} className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                  {section.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <Badge tone={item.planned ? "sand" : "brand"}>
                        {item.label}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
