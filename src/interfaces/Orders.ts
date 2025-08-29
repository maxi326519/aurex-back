import { PoolCluster } from "mysql2/typings/mysql/lib/PoolCluster";
import { ProductTS } from "./ProductTS";

export interface Order {
  id?: string;
  date: Date;
  status: OrdersStatus;
  clicks: number;
  totalPrice: string;
  UserId?: string;
}

export interface OrderItem {
  id?: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
  orderId: string;
  productId: string;
  product?: ProductTS;
  post?: PoolCluster;
}

export enum OrdersStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}
