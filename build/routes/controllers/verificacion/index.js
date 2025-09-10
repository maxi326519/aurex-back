"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarAdmin = exports.verificarRol = exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
console.log(secretKey);
if (!secretKey) {
    throw new Error("The secret key is not defined in the environment variables.");
}
const verificarToken = (req, res, next) => {
    var _a;
    try {
        // Get token to header
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        // Check token
        if (!token)
            throw new Error("Token not provided");
        // Decode info in th token
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // Add user data to req with the next function
        req.body.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
};
exports.verificarToken = verificarToken;
const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        try {
            const { user } = req.body;
            if (!user) {
                return res.status(401).json({ error: "User not found in token" });
            }
            if (!rolesPermitidos.includes(user.rol)) {
                return res.status(403).json({
                    error: `Access denied. Required roles: ${rolesPermitidos.join(", ")}`
                });
            }
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    };
};
exports.verificarRol = verificarRol;
const verificarAdmin = verificarRol(["Administrador"]);
exports.verificarAdmin = verificarAdmin;
