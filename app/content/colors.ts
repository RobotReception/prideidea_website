import colors from "./colors.json";

const block = (tokens: Record<string, string>) =>
  Object.entries(tokens).map(([name, value]) => `--c-${name}:${value}`).join(";");

// Light is the default palette; dark applies when <html data-theme="dark">.
export const colorVariables = `:root{${block(colors.light)}}:root[data-theme="dark"]{${block(colors.dark)}}`;
