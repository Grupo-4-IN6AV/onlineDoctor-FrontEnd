export class UserModel {
  constructor(
      public id: string,
      public name: string,
      public surname: string,
      public username: string,
      public DPI: string,
      public NIT: string,
      public email: string,
      public phone: string,
      public password: string,
      public age: string,
      public gender: string,
      public role: string,
      public checked: boolean,
      public identifier: string,
  ){}
}
