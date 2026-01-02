/**
 * Constants for the application
 * Centralized place for magic values, sizes, colors, etc.
 */

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
} as const;

export const BORDER_RADIUS = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "1rem",
  full: "9999px",
} as const;

export const CHART_DIMENSIONS = {
  bar: { width: 700, height: 320 },
  line: { width: 720, height: 320 },
  area: { width: 720, height: 320 },
  pie: { size: 320 },
  world: { width: 900, height: 480 },
  bullet: { width: 800, height: 240 },
  radar: { width: 600, height: 400 },
} as const;

export const COLORS = {
  primary: "#1976d2",
  light: "#90caf9",
  success: "#66bb6a",
  error: "#ef5350",
  warning: "#ffb74d",
} as const;

export const DATA_ATTRIBUTES = {
  chartDetail: "data-chart-detail",
  chartPlaceholder: "data-chart-placeholder",
} as const;

export const CHART_TYPES = ["bar", "line", "area", "pie", "world", "bullet", "radar"] as const;
export type ChartType = (typeof CHART_TYPES)[number];

export const FULL_CHART_ID = ["get-started", ...CHART_TYPES] as const;
export type ChartId = (typeof FULL_CHART_ID)[number];

export const NAV_LINKS = {
  showcase: "#showcase",
  features: "#features",
} as const;
