"use client";

import { useEffect } from "react";

/**
 * Global error boundary.
 *
 * Replaces the root layout when it fails, so it must render its own `<html>`
 * and `<body>`. Styles are applied inline to avoid depending on the layout's
 * stylesheet pipeline.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error("[ARTI] global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          backgroundColor: "#faf6ed",
          color: "#2a2420",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "28rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#9e3450",
              fontWeight: 600,
            }}
          >
            ARTI
          </p>
          <h1
            style={{
              fontSize: "1.6rem",
              margin: "0.75rem 0 0",
              fontWeight: 600,
            }}
          >
            The application failed to load
          </h1>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "#6b5f53",
            }}
          >
            An unexpected error occurred before the workspace could start. Retry
            the request to continue.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "1.75rem",
              minHeight: "2.75rem",
              padding: "0 1.25rem",
              border: "none",
              borderRadius: "0.5rem",
              backgroundColor: "#9e3450",
              color: "#fdfbf7",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
