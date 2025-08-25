import { Request, Response, NextFunction } from "express";
import { getUserClient } from "../supabaseClient";

interface AuthenticatedRequest extends Request {
  supabase?: any;
  user?: any;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  const supabase = getUserClient(token);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.supabase = supabase;
  req.user = user;
  next();
};

export default authMiddleware;
export type { AuthenticatedRequest };
