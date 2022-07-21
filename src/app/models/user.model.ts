export class UserModel {
  constructor(
      public id: string,
      public name: string,
      public surname: string,
      public username: string,
      public password: string,
      public phone: string,
      public email: string,
      public role: string,
      public checked: boolean,
      public identifier: string,
      public gender: string
  ){}
}
