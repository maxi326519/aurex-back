import { Router, Request, Response } from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "./controllers/posts";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    // Get post data
    const data = req.body;

    // Create post
    const response = await createPost(data);

    // Return post
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    // Get all data
    const response = await getAllPosts();

    // Return posts data
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/", async (req: Request, res: Response) => {
  try {
    // Get post data
    const data = req.body;

    // Update post
    await updatePost(data);

    // Return confirmation
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    // Get post id
    const { id } = req.params;

    // Delete post by id
    await deletePost(id);

    // Return confirmation
    res.status(200).json({ msg: "Delete successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
