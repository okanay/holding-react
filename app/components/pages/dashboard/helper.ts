export const slugify = (text: string): string => {
  if (!text) return "";

  return (
    text
      .toLowerCase()
      .trim()
      // Türkçe karakterleri değiştir
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      // Diğer özel karakterleri ve boşlukları değiştir
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-") // Boşlukları tire ile değiştir
      .replace(/-+/g, "-")
  ); // Birden fazla tireyi tekli tireye dönüştür
};
