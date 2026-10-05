export const serviceValues = ["laptop", "desktop", "business", "other"];
export function validateField(name, value) {
  const text = String(value ?? "").trim();
  if (name === "name") {
    if (text.length < 2) return "Podaj imię — co najmniej 2 znaki.";
    if (text.length > 80) return "Imię może mieć maksymalnie 80 znaków.";
  }
  if (name === "email") {
    if (!text) return "Podaj adres e-mail.";
    if (text.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text))
      return "Podaj poprawny adres, np. jan@example.com.";
  }
  if (name === "service" && !serviceValues.includes(text))
    return "Wybierz rodzaj usługi.";
  if (name === "message") {
    if (text.length < 15) return "Opisz problem w co najmniej 15 znakach.";
    if (text.length > 2000) return "Opis może mieć maksymalnie 2000 znaków.";
  }
  return "";
}
