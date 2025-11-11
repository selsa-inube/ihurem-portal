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

export const formatMobileDate = (dateString: string): string => {
  if (!dateString) return "";

  const desktopFormat = /^(\d{1,2})\/([A-Za-zÁÉÍÓÚÑñáéíóú]{3})\/(\d{4})/i;

  const match = desktopFormat.exec(dateString);

  if (match) {
    const rawAbbr = match[2];
    const normalizeAccent = (s: string) =>
      s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const monthAbbr = normalizeAccent(rawAbbr).slice(0, 3);
    const year = match[3].slice(-2);

    const months: Record<string, string> = {
      ene: "01",
      feb: "02",
      mar: "03",
      abr: "04",
      may: "05",
      jun: "06",
      jul: "07",
      ago: "08",
      sep: "09",
      oct: "10",
      nov: "11",
      dic: "12",
    };

    const month = months[monthAbbr] || "00";
    return `${month}/${year}`;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString().slice(-2);

  return `${month}/${year}`;
};
