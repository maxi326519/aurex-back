"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTransfer = exports.setEgress = exports.setIngress = exports.getStockByProductId = exports.getStock = exports.createStock = void 0;
const db_1 = require("../../db");
const MovementTS_1 = require("../../interfaces/MovementTS");
const movements_1 = require("../controllers/movements");
const createStock = (stock, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new stock register
    const newStock = yield db_1.Stock.create(Object.assign({}, stock));
    // Bind the new stock with the product
    const product = yield db_1.Product.findByPk(stock.ProductId);
    if (!product)
        throw new Error("Product not found");
    yield newStock.setProduct(product);
    // Update product amount
    yield product.update({
        totalStock: Number(product.dataValues.totalStock) +
            Number(stock.amount),
    });
    // Create the movement
    const newMovement = yield (0, movements_1.setMovements)(new Date(), MovementTS_1.MovementsType.entrada, stock.amount, newStock.dataValues.id, "", product.dataValues.id, userId);
    /*
    if (StorageId) {
      // Bind the new stock with the storage
      const storage = await Storage.findByPk(StorageId);
      if (!storage) throw new Error("Storage not found");
      await newStock.setStorage(storage);
    } */
    // Return the new Stock and Movement
    return {
        Stock: newStock,
        Product: product,
        Movement: newMovement,
    };
});
exports.createStock = createStock;
const getStock = () => {
    const response = db_1.Stock.findAll();
    return response;
};
exports.getStock = getStock;
const getStockByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = db_1.Stock.findAll({
        where: { ProductId: productId },
    });
    return response;
});
exports.getStockByProductId = getStockByProductId;
const setIngress = (StockId, quantity, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check parameters
    if (!StockId)
        throw new Error("missing parameter: StockId");
    if (!quantity)
        throw new Error("missing parameter: quantity");
    // Get the tock, add the amount and save
    const stock = yield db_1.Stock.findByPk(StockId);
    if (!stock)
        throw new Error(`Stock not found`);
    stock.quantity = Number(stock.quantity) + Number(quantity);
    yield stock.save();
    // Get and update product amount
    const product = yield db_1.Product.findOne({
        where: { id: stock.dataValues.ProductId },
    });
    if (!product)
        throw new Error("Product not found");
    product.amount = Number(product.amount) + Number(quantity);
    yield product.save();
    // Create the movement
    const movement = yield (0, movements_1.setMovements)(new Date(), MovementTS_1.MovementsType.entrada, quantity, stock.dataValues.id, stock.dataValues.StorageId, stock.dataValues.ProductId, userId);
    // Return the updated stock and the new movement
    return {
        Stock: stock,
        Product: product,
        Movement: movement,
    };
});
exports.setIngress = setIngress;
const setEgress = (StockId, quantity, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check parameters
    if (!StockId)
        throw new Error("missing parameter: StockId");
    if (!quantity)
        throw new Error("missing parameter: quantity");
    // Get the tock, check quantity and subtract the amount
    const stock = yield db_1.Stock.findByPk(StockId);
    if (!stock)
        throw new Error(`Stock not found`);
    if (stock.quantity < Number(quantity))
        throw new Error("Insufficient Stock");
    stock.quantity = Number(stock.quantity) - Number(quantity);
    yield stock.save();
    // Get and update product amount
    const product = yield db_1.Product.findOne({
        where: { id: stock.dataValues.ProductId },
    });
    if (!product)
        throw new Error("Product not found");
    product.amount = Number(product.amount) - Number(quantity);
    yield product.save();
    // Create the ingress movement
    const movement = yield (0, movements_1.setMovements)(new Date(), MovementTS_1.MovementsType.salida, quantity, stock.dataValues.id, stock.dataValues.StorageId, stock.dataValues.ProductId, userId);
    // Return the updated stock and the new movement
    return {
        Stock: stock,
        Product: product,
        Movement: movement,
    };
});
exports.setEgress = setEgress;
const setTransfer = (date, quantity, StockId, StorageId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Check parameters
    if (!date)
        throw new Error("missing parameter: date");
    if (!((_a = new Date(date)) === null || _a === void 0 ? void 0 : _a.getTime()))
        throw new Error("invalid date");
    if (!StorageId.egress)
        throw new Error("missing parameter: ingress storage");
    if (!StorageId.ingress)
        throw new Error("missing parameter: egress storage");
    if (StorageId.egress === StorageId.ingress)
        throw new Error("the storages cannot be the same");
    // Get the esgress Storage
    const egressStock = yield db_1.Stock.findByPk(StockId);
    // Check if Storage exist, and is enough quantity in stock
    if (!egressStock)
        throw new Error("Egress stock not found");
    if (Number(egressStock.quantity) < Number(quantity))
        throw new Error("Insufficient stock");
    // Get the esgress Storage
    let ingressStock = yield db_1.Stock.findOne({
        where: {
            StorageId: StorageId.ingress,
            ProductId: egressStock.ProductId,
        },
    });
    // Check if the stock in this storage already exist
    if (ingressStock) {
        // Add new amounts
        ingressStock.quantity = Number(ingressStock.quantity) + Number(quantity);
        yield ingressStock.save();
    }
    else {
        // Else create it
        ingressStock = yield db_1.Stock.create({
            StorageId: StorageId.ingress,
            ProductId: egressStock.ProductId,
            quantity: Number(quantity),
        });
    }
    // Subtract the quantity and save
    egressStock.quantity = Number(egressStock.quantity) - Number(quantity);
    yield egressStock.save();
    // Create the egress movement
    const egressMovement = yield (0, movements_1.setMovements)(new Date(date), MovementTS_1.MovementsType.salida, Number(quantity), egressStock.id, StorageId.egress, egressStock.ProductId, userId);
    // Create the ingress movement
    const ingressMovement = yield (0, movements_1.setMovements)(new Date(date), MovementTS_1.MovementsType.entrada, Number(quantity), ingressStock.id, StorageId.ingress, egressStock.ProductId, userId);
    // Return the Stocks and movements
    return {
        Stocks: {
            egress: egressStock,
            ingress: ingressStock,
        },
        Movements: {
            egress: egressMovement,
            ingress: ingressMovement,
        },
    };
});
exports.setTransfer = setTransfer;
