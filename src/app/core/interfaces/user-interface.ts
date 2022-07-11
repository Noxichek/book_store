export interface IUser {
  email: string,
  password: string,
}

export interface IUserSession {
  user: IUser,
  sessionStartTime: string
}
