"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
// Import Routes
const verificacion_1 = require("./routes/controllers/verificacion");
const login_1 = __importDefault(require("./routes/login"));
const users_1 = __importDefault(require("./routes/users"));
const receptions_1 = __importDefault(require("./routes/receptions"));
const storage_1 = __importDefault(require("./routes/storage"));
const products_1 = __importDefault(require("./routes/products"));
const categories_1 = __importDefault(require("./routes/categories"));
const storage_2 = __importDefault(require("./routes/storage"));
const stock_1 = __importDefault(require("./routes/stock"));
const movements_1 = __importDefault(require("./routes/movements"));
const posts_1 = __importDefault(require("./routes/posts"));
const orders_1 = __importDefault(require("./routes/orders"));
const business_1 = __importDefault(require("./routes/business"));
const path_1 = __importDefault(require("path"));
// Ceate app
const app = (0, express_1.default)();
// Cors options
const corsOptions = {
    origin: [
        "https://aurex.mipanel.online",
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    credentials: true,
    methods: "GET, PATCH, POST, OPTIONS, PUT, DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, authorization",
};
// app config
app.options("*", (0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use((0, morgan_1.default)("dev"));
app.use("/api/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
app.use("/api/sesion", login_1.default);
app.use("/api/users", verificacion_1.verificarToken, users_1.default);
app.use("/api/receptions", verificacion_1.verificarToken, receptions_1.default);
app.use("/api/products", verificacion_1.verificarToken, products_1.default);
app.use("/api/storages", verificacion_1.verificarToken, storage_1.default);
app.use("/api/categories", verificacion_1.verificarToken, categories_1.default);
app.use("/api/storages", verificacion_1.verificarToken, storage_2.default);
app.use("/api/stock", verificacion_1.verificarToken, stock_1.default);
app.use("/api/movements", verificacion_1.verificarToken, movements_1.default);
app.use("/api/posts", verificacion_1.verificarToken, posts_1.default);
app.use("/api/orders", verificacion_1.verificarToken, orders_1.default);
app.use("/api/business", verificacion_1.verificarToken, business_1.default);
// Implementar un protocolo de HTTPS de Security
// Error catching endware.
app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
exports.default = app;
