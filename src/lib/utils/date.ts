export function formatIST(iso: string | undefined) {
  if (!iso) return "";

  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}