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
const storages_1 = require("./controllers/storages");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storage = req.body;
        const newStorage = yield (0, storages_1.createStorage)(storage);
        res.status(200).json(newStorage);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storage = yield (0, storages_1.getAllStorage)();
        res.status(200).json(storage);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storage = req.body;
        const existingUserIds = yield (0, storages_1.updateStorage)(storage);
        res.status(200).json(existingUserIds);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, storages_1.deleteStorage)(id);
        res
            .status(200)
            .json({ message: `Storage with ID ${id} successfully removed.` });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.patch("/disable/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, storages_1.disableStorage)(id);
        res
            .status(200)
            .json({ message: `Storage with ID ${id} successfully disabled.` });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
