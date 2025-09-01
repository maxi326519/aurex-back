import { OrderTS } from "../../interfaces/OrdersTS";
import { Order } from "../../db";

async function createOrder(order: OrderTS) {
  try {
    const newOrder = await Order.create({ ...order });
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

async function getAllOrders() {
  try {
    const orders = await Order.findAll();
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

async function updateOrder(order: OrderTS) {
  try {
    const [updatedRows] = await Order.update(order, {
      where: { id: order.id },
    });

    if (updatedRows === 0) {
      throw new Error("Order not found or no changes made");
    }
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

async function deleteOrder(orderId: string) {
  try {
    const deletedRows = await Order.destroy({
      where: { id: orderId },
    });

    if (deletedRows === 0) {
      throw new Error("Order not found");
    }

    return { message: "Order deleted successfully" };
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}

export { createOrder, getAllOrders, updateOrder, deleteOrder };
