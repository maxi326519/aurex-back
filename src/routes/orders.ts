import { Router, Request, Response } from "express";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "./controllers/orders";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    // Get order data
    const data = req.body;

    // Create order
    const response = await createOrder(data);

    // Return order
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    // Get all orders
    const response = await getAllOrders();

    // Return orders data
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/", async (req: Request, res: Response) => {
  try {
    // Get order data
    const data = req.body;

    // Update order
    await updateOrder(data);

    // Return confirmation
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    // Get order id
    const { id } = req.params;

    // Delete order by id
    await deleteOrder(id);

    // Return confirmation
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
