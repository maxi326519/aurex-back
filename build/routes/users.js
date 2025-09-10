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
const users_1 = require("./controllers/users");
const verificacion_1 = require("./controllers/verificacion");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = req.body;
        const response = yield (0, users_1.setUser)(user);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        switch ((_a = error.errors) === null || _a === void 0 ? void 0 : _a[0].type) {
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
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, users_1.getAllUsers)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        yield (0, users_1.updateUser)(userData);
        res.status(200).json({ msg: "update user successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { disabled } = req.body;
        if (disabled === undefined) {
            throw new Error('The "disable" field is required in the request body');
        }
        yield (0, users_1.disableUser)(id, disabled);
        res.json({
            message: `User ${disabled ? "disabled" : "enabled"} successfully`,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error changing user status" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, users_1.deleteUser)(id);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
    }
}));
// Ruta para obtener vendedores con datos de empresa (solo administradores)
router.get("/sellers", verificacion_1.verificarAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellers = yield db_1.User.findAll({
            where: { rol: "Vendedor" },
            attributes: { exclude: ["password"] },
            include: [{
                    model: db_1.Business,
                    as: 'Business',
                    required: true // Solo incluir usuarios que tengan negocio
                }]
        });
        res.status(200).json(sellers);
    }
    catch (error) {
        console.error("Error getting sellers with business:", error);
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
