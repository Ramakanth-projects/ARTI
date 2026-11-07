import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, SparkleIcon } from "@/components/ui/icons";
import { allNavItems } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";

/**
 * Honest placeholder for a navigation module that is not built yet.
 *
 * Step 01 ships the shell and the information architecture only. This component
 * states that clearly instead of rendering fake controls or mock data that
 * would imply working functionality.
 */
export function ModulePlaceholder({ moduleId }: { moduleId: string }) {
  const item = allNavItems.find((entry) => entry.id === moduleId);
  const title = item?.label ?? "Module";
  const description =
    item?.description ?? "This module is planned for a later development step.";

  return (
    <div className="container-arti py-8 sm:py-10">
      <header className="flex flex-col gap-3">
        <Badge tone="brand" className="w-fit">
          <SparkleIcon className="size-3.5" />
          Planned module
        </Badge>
        <h1>{title}</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base">
          {description}
        </p>
      </header>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Not implemented in Step 01</CardTitle>
          <CardDescription>
            {siteConfig.name} is being delivered in individually verified steps.
            This step establishes the project foundation: the design system,
            responsive shell, Supabase wiring, deployment configuration and
            navigation architecture. The {title.toLowerCase()} capability itself
            arrives in a later step, so no placeholder interaction is offered
            here.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="outline">
          <HomeIcon className="size-4" />
          Back to workspace home
        </ButtonLink>
      </div>
    </div>
  );
}
