import { Response } from 'express';

export interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
  error?: {
    code: string;
    details: string[];
  };
}

export const sendResponse = (
  res: Response, 
  status: number, 
  message: string, 
  data: any = {}, 
  success: boolean = true,
  error?: { code: string; details: string[] }
) => {
  const response: ApiResponse = {
    success,
    message,
    data
  };

  if (!success && error) {
    response.error = error;
  }

  res.status(status).json(response);
};
