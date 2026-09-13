/** Client-safe helpers (no Node APIs) shared by server and client components. */
export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
