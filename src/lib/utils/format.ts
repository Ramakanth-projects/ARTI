const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
];

/** Format an ISO timestamp as a short relative string, e.g. "3 hours ago". */
export function formatRelativeTime(
  value: string | number | Date,
  now: Date = new Date(),
): string {
  const target = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(target.getTime())) return "";

  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const seconds = (target.getTime() - now.getTime()) / 1000;

  for (const [unit, secondsInUnit] of RELATIVE_UNITS) {
    if (Math.abs(seconds) >= secondsInUnit || unit === "second") {
      return formatter.format(Math.round(seconds / secondsInUnit), unit);
    }
  }
  return "";
}

/** Truncate a string to a maximum length, appending an ellipsis when clipped. */
export function truncate(value: string, maxLength = 80): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}
