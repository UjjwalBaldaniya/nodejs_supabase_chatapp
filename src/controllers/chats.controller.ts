import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

// Create or return existing 1:1 chat between req.user.id and user2
const createChat = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { user2 } = req.body;
    const user1 = req.user.id;

    if (!user2) throw new ApiError(400, "user2 is required");
    if (user1 === user2)
      throw new ApiError(400, "Can't create chat with yourself");

    // check existing (either direction)
    const { data: existing, error: exErr } = await req.supabase
      .from("chats")
      .select("*")
      .or(
        `and(user1.eq.${user1},user2.eq.${user2}),and(user1.eq.${user2},user2.eq.${user1})`
      )
      .limit(1);

    if (exErr)
      throw new ApiError(500, "Error checking existing chat", [exErr.message]);
    if (existing && existing.length > 0) {
      return res.status(200).json({
        statusCode: 200,
        data: { chat: existing[0] },
        message: "Chat already exists",
      });
    }

    const { data, error } = await req.supabase
      .from("chats")
      .insert([{ user1, user2 }])
      .select()
      .single();

    if (error) throw new ApiError(500, "Error creating chat", [error.message]);

    res
      .status(201)
      .json({ statusCode: 201, data: { chat: data }, message: "Chat created" });
  }
);

// List chats for the logged-in user
const getChatsForUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user.id;

    const { data, error } = await req.supabase
      .from("chats")
      .select("*")
      .or(`user1.eq.${userId},user2.eq.${userId}`)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw new ApiError(500, "Error fetching chats", [error.message]);

    res.json({
      statusCode: 200,
      data: { chats: data },
      message: "Chats fetched",
    });
  }
);

export { createChat, getChatsForUser };
