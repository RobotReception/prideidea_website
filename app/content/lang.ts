export type Lang = "ar" | "en";
export const LANG_COOKIE = "pi-lang";

export function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}
