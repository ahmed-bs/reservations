import { Customer } from "./customer";
import { User } from "./user";

export enum AppointmentType {
    Dépôt = 'Dépôt',
    Essayage = 'Essayage'
  }
  
  export enum AppointmentStatus {
    EnCours = 'EnCours',
    Terminé = 'Terminé',
    Annulé = 'Annulé',
    Reporté = 'Reporté'
  }
  
  export class Appointment {
    id!: number;
    type!: AppointmentType;
    date!: Date;
    time!: string; 
    customer!: Customer;
    status!: AppointmentStatus;
    comment!: string;
    purchase!: boolean;
    deposit!: boolean;
    customerId!: number;
    userId!: number;
    user!: User;
  }
  