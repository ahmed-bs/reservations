// src/app/models/user.model.ts

export enum Role {
    Vendeuse = 'Vendeuse',
    Admin = 'Admin'
  }
  
  export class User {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    role!: Role;
  }
  