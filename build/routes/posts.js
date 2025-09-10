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
const express_1 = require("express");
const posts_1 = require("./controllers/posts");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get post data
        const data = req.body;
        // Create post
        const response = yield (0, posts_1.createPost)(data);
        // Return post
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all data
        const response = yield (0, posts_1.getAllPosts)();
        // Return posts data
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.patch("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get post data
        const data = req.body;
        // Update post
        yield (0, posts_1.updatePost)(data);
        // Return confirmation
        res.status(200).json({ msg: "Updated successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get post id
        const { id } = req.params;
        // Delete post by id
        yield (0, posts_1.deletePost)(id);
        // Return confirmation
        res.status(200).json({ msg: "Delete successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
