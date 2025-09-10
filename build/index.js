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
const initData_1 = require("./initData");
const db_1 = require("./db");
const app_1 = __importDefault(require("./app"));
require("./db");
const PORT = process.env.PORT || 3001;
if (process.argv.includes("--init-data")) {
    // Set init data
    (0, initData_1.initData)();
}
else {
    db_1.conn.sync({ force: false, alter: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
        // Open server
        app_1.default.listen(PORT, () => {
            console.log(`Server listening in port ${PORT}`);
        });
    }));
}
