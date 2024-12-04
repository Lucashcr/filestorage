import PasswordValidator from "@/services/password-validator";

describe("Password validator", () => {
  test("Should validate password successfully", () => {
    const password = "123asd456qwe789";
    const message = PasswordValidator.validate(password);
    expect(message).toBeNull();
  });

  test("Should validate password with special chars successfully", () => {
    const password = "123asd!@#";
    const message = PasswordValidator.validate(password);
    expect(message).toBeNull();
  });

  test("Should not validate password smaller than 8 chars successfully", () => {
    const password = "123asd!";
    const message = PasswordValidator.validate(password);
    expect(message).not.toBeNull();
  });

  test("Should not validate only number password successfully", () => {
    const password = "123456789";
    const message = PasswordValidator.validate(password);
    expect(message).not.toBeNull();
  });

  test("Should not validate only letter password successfully", () => {
    const password = "asdqwezxc";
    const message = PasswordValidator.validate(password);
    expect(message).not.toBeNull();
  });
});
