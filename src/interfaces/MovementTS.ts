export interface MovementTS {
  id?: string;
  date: Date;
  tipo: MovementType;
  nombre: string;
  turno: Turno;
  nombreBilleteraVenta: string;
  nombreBilleteraPremio: string;
  montoVentasInicial: number;
  montoVentasFinal: number;
  montoPremiosInicial: number;
  montoPremiosFinal: number;
  fichasVendidas: number;
  premiosPagados: number;
  gananciaNeta: number;
  fichasAntes: number;
  fichasDespues: number;
  fichasReales: number;
  puntos: number;
  perdidos: number;
  BilleteraVentaId: string;
  BilleteraPremioId: string;
}

export enum Turno {
  ANY = "",
  MORNING = "Mañana",
  LATE = "Tarde",
  NIGHT = "Noche",
}

export enum MovementType {
  REGISTRO = "Registro",
  FIN_TURNO = "Fin del turno",
  SUMA = "Suma",
  RESTA = "Resta",
}
