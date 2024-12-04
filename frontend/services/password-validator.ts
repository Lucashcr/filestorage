export default class PasswordValidator {
  static validate(password: string): string | null {
    if (password.length < 8) {
      return "A senha precisa ter mais de 8 caracteres!";
    }
    if (!/[a-zA-Z]{1}/.test(password)) {
      return "A senha precisa conter pelo menos uma letra!";
    }
    if (!/\d{1}/.test(password)) {
      return "A senha precisa conter pelo menos um número!";
    }
    return null;
  }
}
