import { PostsTS } from "../../interfaces/PostsTS";
import { Post } from "../../db";

async function createPost(post: PostsTS) {
  try {
    const newPost = await Post.create({ ...post });
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

async function getAllPosts() {
  try {
    const posts = await Post.findAll();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

async function updatePost(post: PostsTS) {
  try {
    const [updatedRows] = await Post.update(post, {
      where: { id: post.id },
    });

    if (updatedRows === 0) {
      throw new Error("Post not found or no changes made");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

async function deletePost(postId: string) {
  try {
    const deletedRows = await Post.destroy({
      where: { id: postId },
    });

    if (deletedRows === 0) {
      throw new Error("Post not found");
    }

    return { message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

export { createPost, getAllPosts, updatePost, deletePost };
