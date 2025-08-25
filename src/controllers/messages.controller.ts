import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

// Get all messages
const getMessages = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { data, error } = await req.supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(50);

    if (error)
      throw new ApiError(500, "Error fetching messages", [error.message]);

    res.status(200).json({
      statusCode: 200,
      data: { messages: data },
      message: "Messages fetched successfully",
    });
  }
);

// Create a new message
const createMessage = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { content } = req.body;
    const { id: user_id } = req.user;

    if (!user_id || !content) {
      throw new ApiError(400, "user_id and content are required");
    }

    const { data, error } = await req.supabase
      .from("messages")
      .insert([{ user_id, content }])
      .select()
      .single(); // Fetch the inserted row directly

    if (error)
      throw new ApiError(500, "Error creating message", [error.message]);

    res.status(201).json({
      statusCode: 201,
      data: { message: data },
      message: "Message created successfully",
    });
  }
);

export { getMessages, createMessage };
