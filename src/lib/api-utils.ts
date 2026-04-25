import { NextResponse } from "next/server";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
  timestamp?: string;
};

/**
 * Standard Success Response
 */
export function successResponse<T>(data: T, status = 200, extra = {}) {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    ...extra
  };
  return NextResponse.json(response, { status });
}

/**
 * Standard Error Response
 */
export function errorResponse(message: string, status = 500, errorName = "Internal Server Error") {
  const response: ApiResponse = {
    success: false,
    error: errorName,
    message,
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(response, { status });
}

/**
 * Try-Catch Wrapper for API Routes
 * Adheres to DRY by removing repetitive catch blocks
 */
export async function withErrorHandler(fn: () => Promise<NextResponse>) {
  try {
    return await fn();
  } catch (error: unknown) {
    console.error("API Error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return errorResponse(message, 500);
  }
}
