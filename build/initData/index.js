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
exports.initData = void 0;
const db_1 = require("../db");
const UserTS_1 = require("../interfaces/UserTS");
const readline_1 = __importDefault(require("readline"));
const bcrypt = require("bcrypt");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function initData() {
    return __awaiter(this, void 0, void 0, function* () {
        rl.question("Are you sure you want to run this function? This will delete the database and load backup (yes/no): ", (answer) => __awaiter(this, void 0, void 0, function* () {
            if (answer.toLowerCase() === "yes") {
                yield loadData()
                    .then(() => {
                    console.log("Data loaded successfully!");
                    rl.close();
                })
                    .catch((error) => {
                    console.error("Error al cargar datos iniciales:", error);
                    rl.close();
                });
            }
            else {
                console.log("Initialization aborted by the user");
                rl.close();
            }
        }));
    });
}
exports.initData = initData;
function createUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const initUsers = [
            {
                email: "admin@mipanel.online",
                rol: UserTS_1.UserRol.ADMIN,
                status: UserTS_1.UserStatus.ACTIVE,
                password: yield bcrypt.hash("123qwe", 10),
            },
            {
                email: "comprador@mipanel.online",
                rol: UserTS_1.UserRol.CLIENT,
                status: UserTS_1.UserStatus.ACTIVE,
                password: yield bcrypt.hash("123qwe", 10),
            },
            {
                email: "vendedor@mipanel.online",
                rol: UserTS_1.UserRol.SELLER,
                status: UserTS_1.UserStatus.ACTIVE,
                password: yield bcrypt.hash("123qwe", 10),
            },
            {
                email: "vendedor2@mipanel.online",
                rol: UserTS_1.UserRol.SELLER,
                status: UserTS_1.UserStatus.WAITING,
                password: yield bcrypt.hash("123qwe", 10),
            },
        ];
        for (const user of initUsers) {
            try {
                yield db_1.User.create(Object.assign(Object.assign({}, user), { name: user.email.split("@")[0] }));
            }
            catch (error) {
                console.log("Error to create user:", user.email);
            }
        }
    });
}
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Creating tables...");
        yield db_1.conn.sync({ force: true });
        yield createUsers();
    });
}
