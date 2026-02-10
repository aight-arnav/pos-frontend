export function truncate(
  value: string | null | undefined,
  maxLength = 50
) {
  if (!value) return "—";
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength) + "...";
}