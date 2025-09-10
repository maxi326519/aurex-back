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
exports.deleteCategory = exports.updateCategory = exports.getAllCategories = exports.createCategory = void 0;
const db_1 = require("../../db");
const createCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    if (!category) {
        throw new Error("The category name cannot be empty.");
    }
    const newCategory = yield db_1.Categories.create({ name: category });
    return newCategory;
});
exports.createCategory = createCategory;
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield db_1.Categories.findAll();
    return categories;
});
exports.getAllCategories = getAllCategories;
const updateCategory = (categoryId, updatedCategoryName) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield db_1.Categories.findOne({ where: { id: categoryId } });
    if (!category) {
        throw new Error("Category not found");
    }
    category.name = updatedCategoryName;
    yield category.save();
    console.log(`Category with ID ${categoryId} successfully updated.`);
    return category;
});
exports.updateCategory = updateCategory;
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield db_1.Categories.findOne({ where: { id: categoryId } });
    if (!newCategory) {
        throw new Error("Category not found");
    }
    yield newCategory.destroy();
    console.log(`Category with ID ${newCategory} successfully deleted.`);
});
exports.deleteCategory = deleteCategory;
