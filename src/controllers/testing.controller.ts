import { ApiError } from '../utils/ApiError';
import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const getTesting = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.supabase) {
    throw new ApiError(500, 'Supabase client not found');
  }

  const { data, error } = await req.supabase.from('testing').select('*');

  if (error) {
    throw new ApiError(500, 'Error fetching data', [error.message]);
  }

  res.status(200).json({
    statusCode: 200,
    data: { user: req.user?.email, data },
    message: 'Testing get successfully',
  });
});

export {getTesting}