import type {
  IDecodeEDIRequest,
  IGenerateEDIRequest,
  IEDIDecodeResponse,
  IEDIGenerateResponse,
} from "../types/cargo";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type IRequestData = IDecodeEDIRequest | IGenerateEDIRequest;
type IResponseData = IEDIDecodeResponse | IEDIGenerateResponse;

interface IRequestOptions extends RequestInit {
  data?: IRequestData;
}

interface IRequestError extends Error {
  status?: number;
  data?: IResponseData;
}

async function request<T>(
  endpoint: string,
  options: IRequestOptions = {}
): Promise<T> {
  const { data, headers: customHeaders, ...customConfig } = options;

  const config = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    }

    const error = new Error(
      responseData.message || "Request failed"
    ) as IRequestError;
    error.status = response.status;
    error.data = responseData;
    throw error;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error");
  }
}

export const http = {
  get: <T>(endpoint: string, options?: IRequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data: IRequestData, options?: IRequestOptions) =>
    request<T>(endpoint, { ...options, method: "POST", data }),

  put: <T>(endpoint: string, data: IRequestData, options?: IRequestOptions) =>
    request<T>(endpoint, { ...options, method: "PUT", data }),

  delete: <T>(endpoint: string, options?: IRequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
