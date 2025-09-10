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
exports.loginUser = exports.registerUser = void 0;
const UserTS_1 = require("../../interfaces/UserTS");
const users_1 = require("./users");
const db_1 = require("../../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (email, password, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        name: "Usuario",
        email,
        rol,
        password,
        status: rol === UserTS_1.UserRol.CLIENT
            ? UserTS_1.UserStatus.ACTIVE
            : rol === UserTS_1.UserRol.SELLER
                ? UserTS_1.UserStatus.WAITING
                : UserTS_1.UserStatus.WAITING,
    };
    console.log(user);
    const newUser = (0, users_1.setUser)(Object.assign({}, user));
    return newUser;
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Check parameneters
    if (!email)
        throw new Error("missin parameter 'email'");
    if (!password)
        throw new Error("missin parameter 'password'");
    // Search the user by email
    const userModel = yield db_1.User.findOne({ where: { email: email } });
    const userData = userModel === null || userModel === void 0 ? void 0 : userModel.dataValues;
    // Check if the user exist
    if (!userData)
        throw new Error("User not found");
    // Verify if the user is current available
    if (userData.status === UserTS_1.UserStatus.BLOCKED)
        throw new Error("This user is not allowed access");
    // Check the password with bcrypt
    const isPasswordValid = yield bcrypt_1.default.compare(password, userData.password);
    // Check if password exist
    if (!isPasswordValid)
        throw new Error("Incorrect password");
    // Generate the token
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey)
        throw new Error("Missing secret key");
    const token = jsonwebtoken_1.default.sign({ userId: userData.id }, secretKey, {
        expiresIn: "7d",
    });
    // Response with th user data and token
    return { token, user: userData };
});
exports.loginUser = loginUser;
