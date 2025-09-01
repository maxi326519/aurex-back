import { User } from "./UserTS";

export interface AppointmentTS {
  id?: string;
  date: Date;
  type: string;
  state: AppointmentStatus;
  userId?: string;
  user?: Partial<User>;
}

export enum AppointmentStatus {
  PENDING = "Pendiente",
  RECEIVED = "Recibido",
  PICKED = "Pickeado",
  IN_REVIEW = "En revisión",
  COMPLETED = "Completado",
}
