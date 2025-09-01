export interface OrderTS {
  id: string;
  date: Date;
  status: OrdersStatus;
  quantity: number;
  totalAmount: number;
  items?: OrderItemTS[];
}

export interface OrderItemTS {
  id: string;
  quantity: number;
  price: number;
  productId?: string;
  orderId?: string;
}

export enum OrdersStatus {
  PENDING = "Pendiente",
  PREPARED = "Preparado",
  COMPLETED = "Completado",
  CANCELED = "Cancelado",
}
