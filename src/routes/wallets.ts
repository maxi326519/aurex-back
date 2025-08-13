import { Request, Response } from "express";
import { Router } from "express";
import {
  createWallet,
  getAllWallets,
  updateWallet,
  deleteWallet,
} from "./controllers/wallets";

const router = Router();

// Crear un nuevo Wallet
router.post("/wallets", async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;
    
    if (!wallet) throw new Error("missing data wallet");
    
    const response = await createWallet(wallet);
    
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

// Obtener todos los Wallets
router.get("/wallets", async (_, res: Response) => {
  try {
    const response = await getAllWallets();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un Wallet existente
router.patch("/wallets", async (req: Request, res: Response) => {
  try {
    const walletData = req.body;
    await updateWallet(walletData);
    res.status(200).json({ msg: "update wallet successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un Wallet por ID
router.delete("/wallets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteWallet(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting wallet" });
  }
});

export default router;
