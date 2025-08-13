import { Wallets } from "../../db";

// Crear un nuevo Wallet
const createWallet = async (wallet: any) => {
  // Check values
  if (!wallet.name) throw new Error("missing parameter 'name'");
  if (!wallet.alias) throw new Error("missing parameter 'alias'");
  if (wallet.monto === undefined) throw new Error("missing parameter 'monto'");

  // Create a new Wallet
  const newWallet = await Wallets.create(wallet);

  return newWallet;
};

// Obtener todos los Wallets
const getAllWallets = async () => {
  const allWallets = await Wallets.findAll();
  return allWallets;
};

// Actualizar un Wallet existente
const updateWallet = async (updateWallet: any) => {
  // Check values
  if (!updateWallet.id) throw new Error("missing parameter 'id'");
  if (!updateWallet.name) throw new Error("missing parameter 'name'");
  if (!updateWallet.alias) throw new Error("missing parameter 'alias'");

  // Get the Wallet
  const wallet = await Wallets.findByPk(updateWallet.id);

  // Check if the Wallet exists
  if (!wallet) throw new Error("Wallet not found");

  // Update the Wallet
  await wallet.update(updateWallet);
};

// Eliminar un Wallet por ID
const deleteWallet = async (walletId: string) => {
  // Get the Wallet
  const wallet = await Wallets.findByPk(walletId);
  if (!wallet) throw new Error("Wallet not found");

  // Delete the Wallet
  await wallet.destroy();
};

export { createWallet, getAllWallets, updateWallet, deleteWallet };
