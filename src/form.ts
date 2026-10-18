import { getDictionary } from "./i18n";
import {
  CONTACT_FIELDS,
  isContactValid,
  validateContact,
  type ContactField,
} from "./lib/contactValidation";

export function initForm(): void {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!form) return;

  const submit = form.querySelector<HTMLButtonElement>("[data-submit]");
  const success = form.querySelector<HTMLElement>("[data-form-success]");
  let lastErrors: Partial<Record<ContactField, string>> = {};
  let sending = false;

  const setError = (field: ContactField, message: string): void => {
    if (message) lastErrors[field] = message;
    else delete lastErrors[field];

    const input = form.elements.namedItem(field);
    const holder = form.querySelector(`[data-error="${field}"]`);
    const wrap =
      input instanceof HTMLElement ? input.closest(".field, .checkbox") : null;
    wrap?.classList.toggle("is-invalid", Boolean(message));
    if (holder) holder.textContent = message;
  };

  const clearErrors = (): void => {
    CONTACT_FIELDS.forEach((field) => setError(field, ""));
  };

  const validate = (): boolean => {
    const dict = getDictionary().contact.errors;
    const data = new FormData(form);
    const errors = validateContact({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      consent:
        form.querySelector<HTMLInputElement>('[name="consent"]')?.checked ?? false,
    });

    CONTACT_FIELDS.forEach((field) => {
      const key = errors[field];
      setError(field, key ? dict[key] : "");
    });

    return isContactValid(errors);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (sending) return;
    success?.classList.remove("is-visible");
    if (success) success.textContent = "";
    if (!validate()) return;

    sending = true;
    const dict = getDictionary();
    if (submit) {
      submit.disabled = true;
      submit.textContent = dict.contact.sending;
    }

    window.setTimeout(() => {
      sending = false;
      if (submit) {
        submit.disabled = false;
        submit.textContent = getDictionary().contact.submit;
      }
      form.reset();
      clearErrors();
      if (success) {
        success.textContent = getDictionary().contact.success;
        success.classList.add("is-visible");
      }
    }, 700);
  });

  form.addEventListener("input", () => {
    success?.classList.remove("is-visible");
  });

  document.addEventListener("localechange", () => {
    const dict = getDictionary();
    if (submit && !sending) submit.textContent = dict.contact.submit;
    if (success?.classList.contains("is-visible")) {
      success.textContent = dict.contact.success;
    }
    if (CONTACT_FIELDS.some((field) => lastErrors[field])) validate();
  });
}
