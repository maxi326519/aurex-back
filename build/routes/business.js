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
const business_1 = require("./controllers/business");
const verificacion_1 = require("./controllers/verificacion");
const router = (0, express_1.Router)();
// Crear un nuevo negocio
router.post("/", verificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const businessData = req.body;
        const response = yield (0, business_1.createBusiness)(businessData);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        switch ((_b = (_a = error.errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) {
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
}));
// Obtener todos los negocios
router.get("/", verificacion_1.verificarToken, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, business_1.getAllBusinesses)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Obtener negocio por ID
router.get("/:id", verificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, business_1.getBusinessById)(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Obtener negocio por ID de usuario
router.get("/user/:userId", verificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const response = yield (0, business_1.getBusinessByUserId)(userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Actualizar negocio
router.patch("/", verificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const businessData = req.body;
        yield (0, business_1.updateBusiness)(businessData);
        res.status(200).json({ msg: "Business updated successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Eliminar negocio
router.delete("/:id", verificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, business_1.deleteBusiness)(id);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting business" });
    }
}));
exports.default = router;
