"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("./controllers/orders");
const express_1 = require("express");
const router = (0, express_1.Router)();
// Crear orden
router.post("/", orders_1.createOrder);
// Actualizar orden
router.put("/:id", orders_1.updateOrder);
exports.default = router;
