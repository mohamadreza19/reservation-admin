import { AxiosAdapter } from "../adapters/axiosAdapter";
import { FetchAdapter } from "../adapters/fetchAdapter";
import type { HttpClient } from "../core/httpClient";

type Method =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "Post"
  | "POST"
  | "Get"
  | "GET"
  | "Put"
  | "PUT"
  | "Delete"
  | "DELETE"
  | "PATCH";

type ClientType = "axios" | "fetch";

interface ApiInstanceParams {
  url: string;
  method: Method;
  client?: ClientType;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  baseURL?: string;
  signal?: AbortSignal;
  responseType?: "arraybuffer" | "blob" | "json" | "text";
}

export const apiClientFactory = async <T>({
  url,
  method,
  client = "axios",
  data,
  params,
  headers = {},
  baseURL = process.env.NEXT_PUBLIC_API_URL,
  responseType,
}: ApiInstanceParams): Promise<T> => {
  let httpClient: HttpClient;
  // ----------------------------
  switch (client) {
    case "fetch":
      httpClient = new AxiosAdapter(baseURL);
      // httpClient = new FetchAdapter(baseURL);
      break;
    case "axios":
      httpClient = new AxiosAdapter(baseURL);
    default:
      httpClient = new AxiosAdapter(baseURL);
      break;
  }
  // ----------------------------

  httpClient.setHeaders({
    ...headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
  // ----------------------------

  let fullUrl = url;
  if (params && typeof params === "object") {
    const query = new URLSearchParams(params).toString();
    fullUrl += `?${query}`;
  }
  // ----------------------------

  switch (method.toLowerCase()) {
    case "get":
      return httpClient.get<T>(fullUrl, { responseType });
    case "post":
      return httpClient.post<T>(fullUrl, data);
    case "put":
      return httpClient.put<T>(fullUrl, data);
    case "patch":
      return httpClient.patch<T>(fullUrl, data);
    case "delete":
      return httpClient.delete<T>(fullUrl);
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
};
