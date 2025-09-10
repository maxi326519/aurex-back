"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.conn = exports.Reception = exports.OrderItem = exports.Order = exports.Post = exports.Business = exports.User = exports.Storage = exports.Stock = exports.Product = exports.Movements = exports.Categories = void 0;
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
require("dotenv").config();
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
const options = {
    dialect: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    logging: false,
    native: false,
    dialectOptions: {
        allowPublicKeyRetrieval: true,
    },
};
const sequelize = new sequelize_1.Sequelize(options);
const basename = path_1.default.basename(__filename);
// Leer todos los archivos de la carpeta models y agregarlos al arreglo modelDefiners
const modelDefiners = [];
fs_1.default.readdirSync(__dirname + "/models")
    /*   .map((file) => {
      console.log("File:", file);
      return file;
    }) */
    .filter((file) => file.indexOf(".") !== 0 &&
    file !== basename &&
    (file.slice(-3) === ".ts" || file.slice(-3) === ".js"))
    .forEach((file) => {
    const modelDefiner = require(path_1.default.join(__dirname + "/models", file)).model;
    modelDefiners.push(modelDefiner);
});
// Agregar todos los modelos definidos al objeto sequelize.models
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize, sequelize_1.DataTypes);
}
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
_a = sequelize.models, exports.Categories = _a.Categories, exports.Movements = _a.Movements, exports.Product = _a.Product, exports.Stock = _a.Stock, exports.Storage = _a.Storage, exports.User = _a.User, exports.Business = _a.Business, exports.Post = _a.Post, exports.Order = _a.Order, exports.OrderItem = _a.OrderItem, exports.Reception = _a.Reception;
exports.Categories.hasMany(exports.Product);
exports.Product.belongsTo(exports.Categories);
exports.Product.hasMany(exports.Stock);
exports.Product.hasMany(exports.Movements);
exports.Stock.belongsTo(exports.Storage);
exports.Stock.belongsTo(exports.Product);
exports.Stock.hasMany(exports.Movements);
exports.Storage.hasMany(exports.Stock);
exports.Storage.hasMany(exports.Movements);
exports.Business.belongsTo(exports.User);
exports.User.hasMany(exports.Movements);
exports.User.hasMany(exports.Reception);
exports.User.hasOne(exports.Business);
exports.Movements.belongsTo(exports.User);
exports.Movements.belongsTo(exports.Storage);
exports.Movements.belongsTo(exports.Stock);
exports.Movements.belongsTo(exports.Product);
exports.Order.hasMany(exports.OrderItem, { foreignKey: "orderId", as: "items" });
exports.OrderItem.belongsTo(exports.Order, { foreignKey: "orderId" });
exports.Post.belongsTo(exports.Product, { foreignKey: "productId", as: "product" });
exports.OrderItem.belongsTo(exports.Product, { foreignKey: "productId", as: "product" });
exports.Product.hasMany(exports.OrderItem, { foreignKey: "productId", as: "orderItems" });
exports.Reception.belongsTo(exports.User);
exports.conn = sequelize;
exports.models = sequelize.models;
