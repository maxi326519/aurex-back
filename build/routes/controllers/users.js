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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.disableUser = exports.updateUser = exports.getAllUsers = exports.setUser = void 0;
const UserTS_1 = require("../../interfaces/UserTS");
const db_1 = require("../../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const setUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.name)
        throw new Error("missing parameter (name)");
    if (!user.email)
        throw new Error("missing parameter (email)");
    if (!user.password)
        throw new Error("missing parameter (password)");
    const alreadyEmail = yield db_1.User.findOne({
        where: { email: user.email }, // Debes buscar por "email" en lugar de "name"
    });
    if (alreadyEmail)
        throw new Error("email already exists");
    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = yield bcrypt_1.default.hash(user.password, 10); // 10 es el costo del algoritmo
    // Crea un nuevo usuario con la contraseña hasheada
    const newUser = yield db_1.User.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
    return newUser;
});
exports.setUser = setUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield db_1.User.findAll({
        attributes: {
            exclude: ["password"],
        },
    });
    return allUsers;
});
exports.getAllUsers = getAllUsers;
const updateUser = (updateUser) => __awaiter(void 0, void 0, void 0, function* () {
    const rol = Object.values(UserTS_1.UserRol);
    // Verify paramenters
    if (!updateUser.name)
        throw new Error("missing 'name' parameter");
    if (!updateUser.rol)
        throw new Error("missing 'rol' parameter");
    if (!rol.includes(updateUser.rol))
        throw new Error("invalid rol");
    // Get the user
    const user = yield db_1.User.findByPk(updateUser.id);
    // Check if th euser exist
    if (!user)
        throw new Error("user not found");
    // Data to update
    let userToUpdate = updateUser;
    // If password exist add it to user
    if (updateUser.password) {
        userToUpdate.password = yield bcrypt_1.default.hash(updateUser.password, 10);
    }
    // User update
    yield user.update(userToUpdate);
});
exports.updateUser = updateUser;
const disableUser = (id, disabled) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findOne({
        where: { id: id },
    });
    if (user) {
        user.disabled = disabled;
        yield user.save();
    }
    else {
        throw new Error("User not found");
    }
});
exports.disableUser = disableUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    yield user.destroy();
    return { message: "Successfully deleted user" };
});
exports.deleteUser = deleteUser;
