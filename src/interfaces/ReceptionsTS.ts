import { ProductTS } from "./ProductTS";
import { User } from "./UserTS";

export interface ReceptionTS {
  id?: string;
  date: Date;
  state: ReceptionStatus;
  excel: string;
  remittance: string;
  products?: ProductTS[];
  userId?: string;
  user?: Partial<User>;
}

export enum ReceptionStatus {
  ANY = "",
  PENDING = "Pendiente",
  RECEIVED = "Aprobado",
  IN_REVIEW = "En revisión",
  COMPLETED = "Completado",
}
