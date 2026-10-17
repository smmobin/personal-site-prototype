import { getDictionary } from "./i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "subject" | "message" | "consent";

const FIELDS: Field[] = ["name", "email", "subject", "message", "consent"];

export function initForm(): void {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!form) return;

  const submit = form.querySelector<HTMLButtonElement>("[data-submit]");
  const success = form.querySelector<HTMLElement>("[data-form-success]");
  let lastErrors: Partial<Record<Field, string>> = {};
  let sending = false;

  const setError = (field: Field, message: string): void => {
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
    FIELDS.forEach((field) => setError(field, ""));
  };

  const validate = (): boolean => {
    const dict = getDictionary().contact.errors;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const consent =
      form.querySelector<HTMLInputElement>('[name="consent"]')?.checked ?? false;

    setError("name", name ? "" : dict.name);
    if (!email) setError("email", dict.email);
    else if (!EMAIL_RE.test(email)) setError("email", dict.emailInvalid);
    else setError("email", "");
    setError("subject", subject ? "" : dict.subject);
    if (!message) setError("message", dict.message);
    else if (message.length < 20) setError("message", dict.messageShort);
    else setError("message", "");
    setError("consent", consent ? "" : dict.consent);

    return FIELDS.every((field) => !lastErrors[field]);
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
    if (FIELDS.some((field) => lastErrors[field])) validate();
  });
}
