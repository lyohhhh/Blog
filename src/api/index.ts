import request from "@/utils/http";

interface Request {
  "/api/article": null;
  "/api/categoty": null;
}

export function http<T extends keyof Request>(
  url: string,
  method = "get",
  data?: Request[T]
): Promise<{
  code: number;
  data: any;
  message: string;
}> {
  return request[method](url, data);
}
