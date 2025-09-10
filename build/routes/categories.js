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
const categories_1 = require("./controllers/categories");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.body.name;
        const newCategory = yield (0, categories_1.createCategory)(category);
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, categories_1.getAllCategories)();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedCategoryName = req.body.name;
        const updatedCategory = yield (0, categories_1.updateCategory)(id, updatedCategoryName);
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, categories_1.deleteCategory)(id);
        res
            .status(200)
            .json({ message: `Category with ID ${id} successfully deleted.` });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
