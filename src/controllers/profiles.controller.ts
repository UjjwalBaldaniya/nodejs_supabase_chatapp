import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { supabase } from "../supabaseClient";
import { ApiResponse } from "../utils/ApiResponse";

const createProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { full_name, avatar_url, username, user_id } = req.body;

    if (!username || !full_name || !user_id) {
      throw new ApiError(400, "username, full_name and user_id are required");
    }

    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw new ApiError(500, "Error checking profile", [fetchError.message]);
    }

    if (existingProfile) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { profile: existingProfile },
            "Profile already exists"
          )
        );
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: user_id,
          username,
          full_name,
          avatar_url: avatar_url || "",
          status: "online",
        },
      ])
      .select()
      .single();

    if (error)
      throw new ApiError(500, "Error creating profile", [error.message]);

    return res
      .status(201)
      .json(
        new ApiResponse(201, { profile: data }, "Profile created successfully")
      );
  }
);

const getProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      throw new ApiError(500, "Failed to fetch profiles", [error.message]);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { profile: data }, "Profile fateched successfully")
      );
  }
);

export { createProfile, getProfile };
