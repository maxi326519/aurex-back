import { Request, Response } from "express";
import { Router } from "express";
import {
  createMovement,
  getAllMovements,
  updateMovement,
  deleteMovement,
} from "./controllers/movements";

const router = Router();

// Crear un nuevo Movement
router.post("/movements", async (req: Request, res: Response) => {
  try {
    const { movement } = req.body;

    if (!movement) throw new Error("missing data movement");

    const response = await createMovement(movement);

    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    switch (error.errors?.[0].type) {
      case "unique violation":
        res.status(400).send({ error: error.errors[0].message });
        break;
      case "notNull Violation":
        res
          .status(500)
          .json({ error: `missing parameter (${error.errors[0].path})` });
        break;
      default:
        res.status(500).json({ error: error.message });
        break;
    }
  }
});

// Obtener todos los Movements
router.get("/movements", async (_, res: Response) => {
  try {
    const response = await getAllMovements();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un Movement existente
router.patch("/movements", async (req: Request, res: Response) => {
  try {
    const movementData = req.body;
    await updateMovement(movementData);
    res.status(200).json({ msg: "update movement successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un Movement por ID
router.delete("/movements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMovement(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting movement" });
  }
});

export default router;
