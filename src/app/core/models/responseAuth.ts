export class AuthenticateResponse {
    Token!: string;
    Expires?: Date;
    CurrentUserId!: number;
    Role!: string;
    Message?: string;
  }