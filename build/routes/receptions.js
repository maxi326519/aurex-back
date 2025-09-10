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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const verificacion_1 = require("./controllers/verificacion");
const express_1 = require("express");
const receptions_1 = require("./controllers/receptions");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
// Definir almacenamiento con nombre original + timestamp
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // carpeta donde se guardan
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const baseName = path_1.default.basename(file.originalname, ext);
        cb(null, `${baseName}-${Date.now()}${ext}`);
    },
});
// Filtrar tipos de archivo antes de guardar
const fileFilter = (req, file, cb) => {
    if (file.fieldname === "products") {
        // Solo Excel
        if (!file.originalname.match(/\.(xls|xlsx)$/)) {
            return cb(new Error("Products file must be .xls or .xlsx"));
        }
    }
    if (file.fieldname === "recipe") {
        // Solo PDF o imágenes
        if (!file.originalname.match(/\.(pdf|jpg|jpeg|png)$/)) {
            return cb(new Error("Recipe file must be .pdf, .jpg, .jpeg o .png"));
        }
    }
    cb(null, true);
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});
router.post("/", exports.upload.fields([
    { name: "products", maxCount: 1 },
    { name: "remittance", maxCount: 1 },
]), verificacion_1.verificarToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const _c = req.body, { user } = _c, data = __rest(_c, ["user"]);
        const files = req.files;
        const productsFile = (_a = files["products"]) === null || _a === void 0 ? void 0 : _a[0];
        const remittanceFile = (_b = files["remittance"]) === null || _b === void 0 ? void 0 : _b[0];
        if (!productsFile || !remittanceFile) {
            return res.status(400).json({
                error: "Both 'products' and 'remittance' files are required.",
            });
        }
        // Aquí puedes agregar validaciones adicionales para los archivos si es necesario
        if (!productsFile.originalname.match(/\.(xls|xlsx)$/)) {
            return res.status(400).json({
                error: "'products' file must be an Excel file (.xls or .xlsx).",
            });
        }
        if (!remittanceFile.originalname.match(/\.(pdf|jpg|jpeg|png)$/)) {
            return res.status(400).json({
                error: "'remittance' file must be a PDF or an image file (.jpg, .jpeg, .png).",
            });
        }
        const newReception = yield (0, receptions_1.createReception)(data, productsFile, remittanceFile, user === null || user === void 0 ? void 0 : user.userId);
        res.status(200).json(newReception);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { state } = req.query;
        console.log("State", state);
        const receptions = yield (0, receptions_1.getAllReceptions)(state);
        res.status(200).json(receptions);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _d = req.body, { user } = _d, data = __rest(_d, ["user"]);
        const updatedReception = yield (0, receptions_1.updateReception)(data);
        res.status(200).json(updatedReception);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, receptions_1.deleteReception)(id);
        res
            .status(200)
            .json({ message: `Reception with ID ${id} successfully removed.` });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
