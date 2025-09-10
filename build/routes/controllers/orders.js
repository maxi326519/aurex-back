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
exports.updateOrder = exports.createOrder = void 0;
const db_1 = require("../../db");
// Crear una nueva orden con items
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { date, status, quantity, supplier, totalAmount, items } = req.body;
    const t = yield ((_a = db_1.Order.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
    try {
        // Crear orden
        const order = yield db_1.Order.create({ date, status, quantity, supplier, totalAmount }, { transaction: t });
        // Crear los items de la orden
        if (Array.isArray(items)) {
            const orderItems = items.map((item) => ({
                orderId: order.dataValues.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));
            yield db_1.OrderItem.bulkCreate(orderItems, { transaction: t });
        }
        yield (t === null || t === void 0 ? void 0 : t.commit());
        return res.status(201).json({ message: "Orden creada con éxito", order });
    }
    catch (error) {
        yield (t === null || t === void 0 ? void 0 : t.rollback());
        console.error("❌ Error al crear la orden:", error);
        return res.status(500).json({ error: "Error al crear la orden" });
    }
});
exports.createOrder = createOrder;
// Actualizar orden y sus items
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const { date, status, quantity, supplier, totalAmount, items } = req.body;
    const t = yield ((_b = db_1.Order.sequelize) === null || _b === void 0 ? void 0 : _b.transaction());
    try {
        // Buscar la orden
        const order = yield db_1.Order.findByPk(id, { transaction: t });
        if (!order) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }
        // Actualizar datos de la orden
        yield order.update({ date, status, quantity, supplier, totalAmount }, { transaction: t });
        if (Array.isArray(items)) {
            // Borrar items anteriores
            yield db_1.OrderItem.destroy({ where: { orderId: id }, transaction: t });
            // Insertar nuevos items
            const orderItems = items.map((item) => ({
                orderId: id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));
            yield db_1.OrderItem.bulkCreate(orderItems, { transaction: t });
        }
        yield (t === null || t === void 0 ? void 0 : t.commit());
        return res.json({ message: "Orden actualizada con éxito", order });
    }
    catch (error) {
        yield (t === null || t === void 0 ? void 0 : t.rollback());
        console.error("❌ Error al actualizar la orden:", error);
        return res.status(500).json({ error: "Error al actualizar la orden" });
    }
});
exports.updateOrder = updateOrder;
