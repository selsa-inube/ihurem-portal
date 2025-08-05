export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export function formatWithOffset(date: Date) {
  const iso = new Date(date).toISOString();
  const [datePart] = iso.split("Z");
  return `${datePart}-05:00`;
}
