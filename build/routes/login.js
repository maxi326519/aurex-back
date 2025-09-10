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
const login_1 = require("./controllers/login");
const db_1 = require("../db");
const verificacion_1 = require("./controllers/verificacion");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const result = yield (0, login_1.loginUser)(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        console.log(email, password, role);
        if (!email)
            throw new Error("missing parameter 'email'");
        if (!password)
            throw new Error("missing parameter 'password'");
        if (!role)
            throw new Error("missing parameter 'role'");
        const newUser = yield (0, login_1.registerUser)(email, password, role);
        res.status(200).json({ user: newUser });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
}));
router.post("/token", verificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        if (!user)
            throw new Error("User not found");
        const userData = yield db_1.User.findByPk(user.userId, {
            attributes: { exclude: ["password"] },
        });
        if (!userData)
            throw new Error("User not found");
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.put("/complete-registration", verificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userFromToken } = req.body;
        const { user: userData, business: businessData } = req.body;
        if (!userFromToken)
            throw new Error("User not found in token");
        // Buscar el usuario actual
        const currentUser = yield db_1.User.findByPk(userFromToken.userId);
        if (!currentUser)
            throw new Error("User not found");
        // Actualizar datos del usuario
        const updatedUser = yield currentUser.update({
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
            city: userData.city,
            state: userData.state,
            zipCode: userData.zipCode,
            rol: userData.rol,
        });
        let business = null;
        // Si es vendedor, crear o actualizar el negocio
        if (userData.rol === "Vendedor" && businessData) {
            business = yield db_1.Business.create({
                businessName: businessData.businessName,
                businessType: businessData.businessType,
                businessDescription: businessData.businessDescription,
                address: businessData.address,
                city: businessData.city,
                state: businessData.state,
                zipCode: businessData.zipCode,
                taxId: businessData.taxId,
                bankAccount: businessData.bankAccount,
                userId: currentUser.dataValues.id,
            });
            // Actualizar el businessId en el usuario
            yield updatedUser.update({ businessId: business.dataValues.id });
        }
        // Preparar respuesta
        const response = {
            user: {
                id: updatedUser.dataValues.id,
                name: updatedUser.dataValues.name,
                email: updatedUser.dataValues.email,
                photo: updatedUser.dataValues.photo,
                rol: updatedUser.dataValues.rol,
                status: updatedUser.dataValues.status,
                phone: updatedUser.dataValues.phone,
                address: updatedUser.dataValues.address,
                city: updatedUser.dataValues.city,
                state: updatedUser.dataValues.state,
                zipCode: updatedUser.dataValues.zipCode,
                businessId: updatedUser.dataValues.businessId,
            }
        };
        if (business) {
            response.business = business;
        }
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error completing registration:", error);
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
