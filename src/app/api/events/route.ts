import { connection } from "next/server";

/**
 * Server-Sent Events foundation.
 *
 * This establishes the transport that later streaming features (model output,
 * generation progress, agent activity) will use. Step 01 deliberately streams
 * no AI content: it emits connection and heartbeat frames only, so the channel
 * can be verified end to end without pretending a feature exists.
 */

const HEARTBEAT_INTERVAL_MS = 15_000;
const MAX_DURATION_MS = 5 * 60_000;

type EventPayload = Record<string, unknown>;

function encodeEvent(event: string, data: EventPayload): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function GET(request: Request) {
  await connection();

  const encoder = new TextEncoder();
  const startedAt = Date.now();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;
      const timers: { heartbeat?: ReturnType<typeof setInterval> } = {};

      const cleanup = () => {
        if (closed) return;
        closed = true;
        if (timers.heartbeat) clearInterval(timers.heartbeat);
        try {
          controller.close();
        } catch {
          // Stream already closed by the client.
        }
      };

      const send = (event: string, data: EventPayload) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(encodeEvent(event, data)));
        } catch {
          closed = true;
        }
      };

      send("open", {
        channel: "arti-events",
        message: "Event stream established.",
        heartbeatIntervalMs: HEARTBEAT_INTERVAL_MS,
      });

      timers.heartbeat = setInterval(() => {
        if (Date.now() - startedAt > MAX_DURATION_MS) {
          send("close", { reason: "max_duration_reached" });
          cleanup();
          return;
        }
        send("heartbeat", { at: new Date().toISOString() });
      }, HEARTBEAT_INTERVAL_MS);

      request.signal.addEventListener("abort", cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      // Prevents proxy buffering from delaying event delivery.
      "X-Accel-Buffering": "no",
    },
  });
}
