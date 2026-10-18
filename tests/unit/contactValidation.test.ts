import { describe, expect, it } from "vitest";
import {
  isContactValid,
  validateContact,
  type ContactInput,
} from "../../src/lib/contactValidation";

const valid: ContactInput = {
  name: "Mobin Arya",
  email: "hello@example.com",
  subject: "collab",
  message: "This message is definitely longer than twenty characters.",
  consent: true,
};

describe("validateContact", () => {
  it("accepts a complete payload", () => {
    const errors = validateContact(valid);
    expect(errors).toEqual({});
    expect(isContactValid(errors)).toBe(true);
  });

  it("flags empty required fields", () => {
    const errors = validateContact({
      name: "  ",
      email: "",
      subject: "",
      message: "",
      consent: false,
    });
    expect(errors).toEqual({
      name: "name",
      email: "email",
      subject: "subject",
      message: "message",
      consent: "consent",
    });
  });

  it("rejects an invalid email before other email errors", () => {
    const errors = validateContact({ ...valid, email: "not-an-email" });
    expect(errors.email).toBe("emailInvalid");
  });

  it("rejects a short message", () => {
    const errors = validateContact({ ...valid, message: "too short" });
    expect(errors.message).toBe("messageShort");
  });
});
