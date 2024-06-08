import { Salle } from "./salle";
import { User } from "./user";

  export class Reservation {
    _id?:number;
    Date!: Date;
    Time!: string;
    Salle?: Salle;  
    Status!: number;
    Comment?: string;
    SalleId?: string;  
    UserId?: string;  
    User?: User;  
  }
  