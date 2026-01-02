import packageJson from "../../package.json";

export const CHARTOON_VERSION = packageJson.dependencies.chartoon.replace("^", "v");
