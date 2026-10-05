import { validateField } from "./validation.js";
export function initForm() {
  const form = document.querySelector("#contact-form");
  const button = form.querySelector('button[type="submit"]');
  const status = form.querySelector("#form-status");
  const fields = ["name", "email", "service", "message"].map((name) =>
    form.elements.namedItem(name),
  );
  const touched = new Set();
  let submitting = false;
  form.noValidate = true;
  button.disabled = false;
  const showError = (field) => {
    const error = validateField(field.name, field.value);
    document.querySelector(`#${field.name}-error`).textContent = error;
    field.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  };
  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      touched.add(field.name);
      showError(field);
    });
    field.addEventListener("input", () => {
      if (touched.has(field.name)) showError(field);
      if (!submitting) {
        status.textContent = "";
        delete status.dataset.state;
      }
    });
  });
  document.querySelectorAll("[data-service]").forEach((link) =>
    link.addEventListener("click", () => {
      form.elements.service.value = link.dataset.service;
      if (touched.has("service")) showError(form.elements.service);
    }),
  );
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting) return;
    fields.forEach((field) => touched.add(field.name));
    const invalid = fields.filter((field) => !showError(field));
    if (invalid.length) {
      status.dataset.state = "error";
      status.textContent = "Popraw oznaczone pola, aby sprawdzić zgłoszenie.";
      invalid[0].focus();
      return;
    }
    submitting = true;
    button.disabled = true;
    fields.forEach((field) => (field.readOnly = true));
    form.elements.service.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.dataset.state = "loading";
    status.textContent = "Sprawdzamy przykładowe zgłoszenie…";
    button.textContent = "Sprawdzanie…";
    try {
      // Lokalna demonstracja stanów formularza. Żadne dane nie opuszczają przeglądarki.
      await new Promise((resolve) => setTimeout(resolve, 650));
      if (new URLSearchParams(location.search).get("demo") === "error")
        throw new Error("Demo error");
      status.dataset.state = "success";
      status.textContent =
        "Demonstracja zakończona. Pola są poprawne — zgłoszenie nie zostało wysłane ani zapisane.";
      form.reset();
      touched.clear();
      fields.forEach((field) => field.removeAttribute("aria-invalid"));
    } catch {
      status.dataset.state = "error";
      status.textContent =
        "Nie udało się zakończyć demonstracji. Dane pozostają w formularzu. Spróbuj ponownie.";
    } finally {
      submitting = false;
      fields.forEach((field) => (field.readOnly = false));
      form.elements.service.disabled = false;
      form.removeAttribute("aria-busy");
      button.disabled = false;
      button.textContent = "Sprawdź zgłoszenie demo ↗";
    }
  });
}
