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
exports.getMovements = exports.setMovements = void 0;
const db_1 = require("../../db");
const setMovements = (date, type, quantity, StockId, StorageId, ProductId, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!date) {
        throw new Error('The "date" parameter is required.');
    }
    const newMovements = yield db_1.Movements.create({
        date,
        type,
        quantity,
    });
    if (StockId) {
        const stock = yield db_1.Stock.findByPk(StockId);
        if (stock) {
            yield newMovements.setStock(stock);
        }
    }
    if (StorageId) {
        const storage = yield db_1.Storage.findByPk(StorageId);
        if (storage) {
            yield newMovements.setStorage(storage);
        }
    }
    if (ProductId) {
        const product = yield db_1.Product.findByPk(ProductId);
        if (product) {
            yield newMovements.setProduct(product);
        }
    }
    if (UserId) {
        const user = yield db_1.User.findByPk(UserId);
        if (user) {
            yield newMovements.setUser(user);
        }
    }
    return newMovements;
});
exports.setMovements = setMovements;
const getMovements = () => __awaiter(void 0, void 0, void 0, function* () {
    // Verify parameters and add the filters
    // Get movements
    const movements = db_1.Movements.findAll();
    // Return all Movements
    return movements;
});
exports.getMovements = getMovements;
