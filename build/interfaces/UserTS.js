"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.UserRol = void 0;
var UserRol;
(function (UserRol) {
    UserRol["ADMIN"] = "Administrador";
    UserRol["DISPACHER"] = "Despachador";
    UserRol["SELLER"] = "Vendedor";
    UserRol["CLIENT"] = "Comprador";
})(UserRol = exports.UserRol || (exports.UserRol = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["WAITING"] = "En espera";
    UserStatus["ACTIVE"] = "Activo";
    UserStatus["BLOCKED"] = "Bloqueado";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
