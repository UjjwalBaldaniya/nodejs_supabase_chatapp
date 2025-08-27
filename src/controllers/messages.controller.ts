import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const getMessages = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const chatId = (req.query.chatId || req.body.chatId) as string;
    if (!chatId) throw new ApiError(400, "chatId is required");

    const { data: chat, error: chatErr } = await req.supabase
      .from("chats")
      .select("*")
      .eq("id", chatId)
      .single();

    if (chatErr || !chat) throw new ApiError(404, "Chat not found");
    if (chat.user1 !== req.user.id && chat.user2 !== req.user.id)
      throw new ApiError(403, "Not authorized");

    const { data, error } = await req.supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (error)
      throw new ApiError(500, "Error fetching messages", [error.message]);

    res.json({
      statusCode: 200,
      data: { messages: data },
      message: "Messages fetched successfully",
    });
  }
);

const createMessage = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { content, chatId } = req.body;
    const user_id = req.user.id;

    if (!chatId || !content)
      throw new ApiError(400, "chatId and content are required");

    const { data: chat, error: chatErr } = await req.supabase
      .from("chats")
      .select("*")
      .eq("id", chatId)
      .single();
    if (chatErr || !chat) throw new ApiError(404, "Chat not found");
    if (chat.user1 !== user_id && chat.user2 !== user_id)
      throw new ApiError(403, "Not authorized");

    const { data, error } = await req.supabase
      .from("messages")
      .insert([{ chat_id: chatId, user_id, content }])
      .select()
      .single();

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
