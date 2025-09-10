import { createOrder, updateOrder } from "./controllers/orders";
import { Router } from "express";

const router = Router();

// Crear orden
router.post("/", createOrder);

// Actualizar orden
router.put("/:id", updateOrder);

export default router;
