import EmailValidator from "@/services/email-validator";

const invalidEmails = [
  { email: "userexample.com", description: "Missing @ symbol" },
  { email: "user@.com", description: "Missing domain name" },
  { email: "user@", description: "Missing domain" },
  { email: "user@domain.", description: "Missing top-level domain" },
  { email: "user!@example.com", description: "Invalid character: '!'" },
  { email: "user#email@domain.com", description: "Invalid character: '#' in local part" },
  { email: "user@domain..com", description: "Consecutive dots in domain" },
  { email: ".user@example.com", description: "Dot at the start of local part" },
  { email: "user.@example.com", description: "Dot at the end of local part" },
  { email: "user..name@example.com", description: "Consecutive dots in local part" },
  { email: "user@example..com", description: "Consecutive dots in domain" },
  { email: "@example.com", description: "Missing local part" },
  { email: "user@.com", description: "Missing second-level domain" },
  { email: " user@example.com", description: "Leading space" },
  { email: "user@ example.com", description: "Space in domain" },
  { email: "user@example.com ", description: "Trailing space" },
  { email: "user@com", description: "Missing TLD" },
  { email: "user@localhost", description: "Non-FQDN domain" },
  { email: "user@domain.-com", description: "Hyphen at the start of domain" },
  { email: "user@domain.com.", description: "Dot at the end of domain" },
];

describe("Email validation", () => {
  invalidEmails.forEach(({ email, description }) => {
    test(`should invalidate '${email}' (${description})`, () => {
      expect(EmailValidator.validate(email)).toBe(false);
    });
  });

  test("should validate a correct email", () => {
    const validEmail = "user@example.com";
    expect(EmailValidator.validate(validEmail)).toBe(true);
  });
});
