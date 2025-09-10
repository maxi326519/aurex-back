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
exports.getBusinessByUserId = exports.deleteBusiness = exports.updateBusiness = exports.getBusinessById = exports.getAllBusinesses = exports.createBusiness = void 0;
const db_1 = require("../../db");
const createBusiness = (businessData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!businessData.businessName)
        throw new Error("missing parameter (businessName)");
    if (!businessData.businessType)
        throw new Error("missing parameter (businessType)");
    if (!businessData.address)
        throw new Error("missing parameter (address)");
    if (!businessData.city)
        throw new Error("missing parameter (city)");
    if (!businessData.state)
        throw new Error("missing parameter (state)");
    if (!businessData.zipCode)
        throw new Error("missing parameter (zipCode)");
    if (!businessData.taxId)
        throw new Error("missing parameter (taxId)");
    if (!businessData.bankAccount)
        throw new Error("missing parameter (bankAccount)");
    if (!businessData.userId)
        throw new Error("missing parameter (userId)");
    // Verificar que el usuario existe
    const user = yield db_1.User.findByPk(businessData.userId);
    if (!user)
        throw new Error("User not found");
    // Verificar que el usuario no tenga ya un negocio
    const existingBusiness = yield db_1.Business.findOne({
        where: { userId: businessData.userId }
    });
    if (existingBusiness)
        throw new Error("User already has a business");
    const newBusiness = yield db_1.Business.create(businessData);
    return newBusiness;
});
exports.createBusiness = createBusiness;
const getAllBusinesses = () => __awaiter(void 0, void 0, void 0, function* () {
    const allBusinesses = yield db_1.Business.findAll({
        include: [{
                model: db_1.User,
                as: 'User',
                attributes: ['id', 'name', 'email', 'rol', 'status']
            }]
    });
    return allBusinesses;
});
exports.getAllBusinesses = getAllBusinesses;
const getBusinessById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const business = yield db_1.Business.findByPk(id, {
        include: [{
                model: db_1.User,
                as: 'User',
                attributes: ['id', 'name', 'email', 'rol', 'status']
            }]
    });
    if (!business)
        throw new Error("Business not found");
    return business;
});
exports.getBusinessById = getBusinessById;
const updateBusiness = (businessData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!businessData.id)
        throw new Error("missing parameter (id)");
    const business = yield db_1.Business.findByPk(businessData.id);
    if (!business)
        throw new Error("Business not found");
    yield business.update(businessData);
    return business;
});
exports.updateBusiness = updateBusiness;
const deleteBusiness = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const business = yield db_1.Business.findByPk(id);
    if (!business)
        throw new Error("Business not found");
    yield business.destroy();
    return { message: "Business deleted successfully" };
});
exports.deleteBusiness = deleteBusiness;
const getBusinessByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const business = yield db_1.Business.findOne({
        where: { userId },
        include: [{
                model: db_1.User,
                as: 'User',
                attributes: ['id', 'name', 'email', 'rol', 'status']
            }]
    });
    if (!business)
        throw new Error("Business not found for this user");
    return business;
});
exports.getBusinessByUserId = getBusinessByUserId;
