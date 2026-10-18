export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MESSAGE_MIN_LENGTH = 20;

export type ContactField = "name" | "email" | "subject" | "message" | "consent";

export const CONTACT_FIELDS: ContactField[] = [
  "name",
  "email",
  "subject",
  "message",
  "consent",
];

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
};

export type ContactErrorKey =
  | "name"
  | "email"
  | "emailInvalid"
  | "subject"
  | "message"
  | "messageShort"
  | "consent";

export type ContactErrors = Partial<Record<ContactField, ContactErrorKey>>;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (!name) errors.name = "name";

  if (!email) errors.email = "email";
  else if (!EMAIL_RE.test(email)) errors.email = "emailInvalid";

  if (!subject) errors.subject = "subject";

  if (!message) errors.message = "message";
  else if (message.length < MESSAGE_MIN_LENGTH) errors.message = "messageShort";

  if (!input.consent) errors.consent = "consent";

  return errors;
}

export function isContactValid(errors: ContactErrors): boolean {
  return CONTACT_FIELDS.every((field) => !errors[field]);
}
