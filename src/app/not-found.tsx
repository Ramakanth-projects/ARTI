/**
 * Global 404 page.
 *
 * Rendered inside the root layout, so the ARTI shell and navigation remain
 * available and the user can recover without a browser back button.
 */
import { ButtonLink } from "@/components/ui/button";
import { HomeIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="container-arti flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-display text-6xl font-semibold text-wine-600 sm:text-7xl">
        404
      </p>
      <h1 className="mt-4 text-2xl sm:text-3xl">This page does not exist</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground-muted">
        The destination you requested is not part of the ARTI workspace. It may
        belong to a module planned for a later development step.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/">
          <HomeIcon className="size-4" />
          Return home
        </ButtonLink>
      </div>
    </div>
  );
}
