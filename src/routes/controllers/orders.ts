import { Request, Response } from "express";
import { Order, OrderItem } from "../../db";

// Crear una nueva orden con items
export const createOrder = async (req: Request, res: Response) => {
  const { date, status, quantity, supplier, totalAmount, items } = req.body;

  const t = await Order.sequelize?.transaction();
  try {
    // Crear orden
    const order = await Order.create(
      { date, status, quantity, supplier, totalAmount },
      { transaction: t }
    );

    // Crear los items de la orden
    if (Array.isArray(items)) {
      const orderItems = items.map((item: any) => ({
        orderId: order.dataValues.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      await OrderItem.bulkCreate(orderItems, { transaction: t });
    }

    await t?.commit();
    return res.status(201).json({ message: "Orden creada con éxito", order });
  } catch (error) {
    await t?.rollback();
    console.error("❌ Error al crear la orden:", error);
    return res.status(500).json({ error: "Error al crear la orden" });
  }
};

// Actualizar orden y sus items
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, status, quantity, supplier, totalAmount, items } = req.body;

  const t = await Order.sequelize?.transaction();
  try {
    // Buscar la orden
    const order = await Order.findByPk(id, { transaction: t });
    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    // Actualizar datos de la orden
    await order.update(
      { date, status, quantity, supplier, totalAmount },
      { transaction: t }
    );

    if (Array.isArray(items)) {
      // Borrar items anteriores
      await OrderItem.destroy({ where: { orderId: id }, transaction: t });

      // Insertar nuevos items
      const orderItems = items.map((item: any) => ({
        orderId: id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      await OrderItem.bulkCreate(orderItems, { transaction: t });
    }

    await t?.commit();
    return res.json({ message: "Orden actualizada con éxito", order });
  } catch (error) {
    await t?.rollback();
    console.error("❌ Error al actualizar la orden:", error);
    return res.status(500).json({ error: "Error al actualizar la orden" });
  }
};
