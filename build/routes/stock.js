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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stock_1 = require("./controllers/stock");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { user } = _a, stock = __rest(_a, ["user"]);
        const newStock = yield (0, stock_1.createStock)(stock, user === null || user === void 0 ? void 0 : user.userId);
        res.status(200).json(newStock);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}));
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stock = yield (0, stock_1.getStock)();
        res.status(200).json(stock);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}));
router.get("/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const stock = yield (0, stock_1.getStockByProductId)(productId);
        res.status(200).json(stock);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}));
router.patch("/ingress", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { StockId, quantity, user } = req.body;
        console.log(StockId, quantity, user);
        const updatedStock = yield (0, stock_1.setIngress)(StockId, quantity, user === null || user === void 0 ? void 0 : user.userId);
        res.status(200).json(updatedStock);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
}));
router.patch("/egress", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { StockId, quantity, user } = req.body;
        const updatedStock = yield (0, stock_1.setEgress)(StockId, quantity, user === null || user === void 0 ? void 0 : user.userId);
        res.status(200).json(updatedStock);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}));
router.patch("/transfer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, quantity, StockId, StorageId, user } = req.body;
        console.log(date, quantity, StockId, StorageId, user);
        const result = yield (0, stock_1.setTransfer)(date, quantity, StockId, StorageId, user === null || user === void 0 ? void 0 : user.userId);
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
}));
exports.default = router;
