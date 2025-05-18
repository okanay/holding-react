export const extractErrorMessages = (errors) => {
  let messages = [];
  for (const key in errors) {
    const error = errors[key];
    if (error) {
      if (error.message && typeof error.message === "string") {
        // Doğrudan message varsa ekle
        messages.push(error.message);
      } else if (typeof error === "object" && !Array.isArray(error)) {
        // İç içe nesne ise recursive olarak çağır
        messages = messages.concat(extractErrorMessages(error));
      } else if (Array.isArray(error)) {
        // Eğer dizi içinde hatalar varsa (örneğin array field'larda)
        error.forEach((item) => {
          if (item && typeof item === "object") {
            messages = messages.concat(extractErrorMessages(item));
          }
        });
      }
      // react-hook-form bazen root hatası verebilir array/object fieldlar için
      else if (
        error.root &&
        error.root.message &&
        typeof error.root.message === "string"
      ) {
        messages.push(error.root.message);
      }
    }
  }
  // Tekrarlanan mesajları kaldır
  return [...new Set(messages)];
};
