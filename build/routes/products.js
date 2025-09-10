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
const express_1 = require("express");
const products_1 = require("./controllers/products");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        console.log(productData);
        const newProduct = yield (0, products_1.createProduct)(productData);
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, products_1.getAllProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}));
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        yield (0, products_1.updateProducts)(product);
        res.status(200).json({ message: "Product updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, products_1.deleteProduct)(id);
        res
            .status(200)
            .json({ message: `Product with ID ${id} successfully removed.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { disabled } = req.body;
        if (disabled === undefined) {
            throw new Error('The "disable" field is required in the request body');
        }
        yield (0, products_1.disableProduct)(id, disabled);
        res.json({
            message: `Product ${disabled ? "disabled" : "enabled"} successfully`,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error changing product status" });
    }
}));
exports.default = router;
