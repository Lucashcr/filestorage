const emailRegex = /^(([^<>()[\]\\.,;:\s!@#"]+(\.[^<>()[\]\\.,;:\s!@#"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class EmailValidator {
  static validate(email: string): boolean {
    return emailRegex.test(email);
  }
}
