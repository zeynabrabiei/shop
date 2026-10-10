export type ApiErrorCode =
  | "network"
  | "http"
  | "invalid-response"
  | "not-found";

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number | undefined;

  constructor(
    code: ApiErrorCode,
    message: string,
    options?: { status?: number; cause?: unknown },
  ) {
    super(
      message,
      options?.cause === undefined ? undefined : { cause: options.cause },
    );
    this.name = "ApiError";
    this.code = code;
    this.status = options?.status;
  }
}

/** Persian, user-safe message. Never exposes internal details. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.code) {
      case "network":
        return "ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.";
      case "not-found":
        return "موردی که دنبال آن بودید پیدا نشد.";
      case "invalid-response":
        return "پاسخ دریافتی از سرور معتبر نبود. لطفاً کمی بعد دوباره تلاش کنید.";
      case "http":
        return "سرور در حال حاضر پاسخگو نیست. لطفاً کمی بعد دوباره تلاش کنید.";
    }
  }
  return "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.";
}