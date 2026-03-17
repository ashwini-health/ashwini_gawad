export function normalizePhone(input: string): string {
  return input.replace(/\D/g, "").slice(0, 15);
}

export function normalizeText(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

export function normalizeOptionalText(input: string | undefined | null): string | null {
  if (!input) {
    return null;
  }

  const normalized = normalizeText(input);
  return normalized.length > 0 ? normalized : null;
}
