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
exports.disableProduct = exports.deleteProduct = exports.updateProducts = exports.getAllProducts = exports.createProduct = void 0;
const db_1 = require("../../db");
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    // Create new product
    const newProduct = yield db_1.Product.create(productData);
    return newProduct;
});
exports.createProduct = createProduct;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.Product.findAll();
    return products;
});
exports.getAllProducts = getAllProducts;
const updateProducts = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield db_1.Product.findOne({
        where: { id: product.id },
    });
    if (response)
        yield response.update(product);
    else
        throw new Error("Product not found");
});
exports.updateProducts = updateProducts;
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.Product.findOne({ where: { id: productId } });
    if (!product)
        throw new Error("Product not found");
    yield product.destroy();
});
exports.deleteProduct = deleteProduct;
const disableProduct = (id, disabled) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.Product.findOne({
        where: { id: id },
    });
    if (product) {
        product.disabled = disabled;
        yield product.save();
    }
    else {
        throw new Error("Product not found");
    }
});
exports.disableProduct = disableProduct;
