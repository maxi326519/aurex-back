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
exports.deletePost = exports.updatePost = exports.getAllPosts = exports.createPost = void 0;
const db_1 = require("../../db");
function createPost(post) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newPost = yield db_1.Post.create(Object.assign({}, post));
            return newPost;
        }
        catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    });
}
exports.createPost = createPost;
function getAllPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield db_1.Post.findAll();
            return posts;
        }
        catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    });
}
exports.getAllPosts = getAllPosts;
function updatePost(post) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [updatedRows] = yield db_1.Post.update(post, {
                where: { id: post.id },
            });
            if (updatedRows === 0) {
                throw new Error("Post not found or no changes made");
            }
        }
        catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    });
}
exports.updatePost = updatePost;
function deletePost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedRows = yield db_1.Post.destroy({
                where: { id: postId },
            });
            if (deletedRows === 0) {
                throw new Error("Post not found");
            }
            return { message: "Post deleted successfully" };
        }
        catch (error) {
            console.error("Error deleting post:", error);
            throw error;
        }
    });
}
exports.deletePost = deletePost;
