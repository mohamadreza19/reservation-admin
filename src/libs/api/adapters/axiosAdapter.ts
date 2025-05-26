// src/services/adapters/AxiosAdapter.ts
import axios, {
  AxiosHeaders,
  AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import type { HttpClient } from "../core/httpClient";
import Cookies from "universal-cookie";
import { setLoading } from "@/libs/shared-components";
import { ErrorHandlerContext } from "../core/error-handling/ErrorHandlerContext";
import { ServerErrorHandler } from "../core/error-handling/strategies/ServerErrorHandler";
import { errorStrategyRegistry } from "../core/error-handling/errorStrategyRegistry";

export class AxiosAdapter implements HttpClient {
  private instance: AxiosInstance;
  private customHeaders: Record<string, string> = {};
  private static activeRequests = 0;
  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL, //review
      headers: { "Content-Type": "application/json" },
    });

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        AxiosAdapter.activeRequests++;

        setLoading(true);

        const token = localStorage.getItem("token");
        const cookies = new Cookies();
        const storedToken = cookies.get("accessToken");
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        const headers = AxiosHeaders.from(config.headers || {});

        if (storedToken) {
          headers.set("Authorization", `Bearer ${storedToken}`);
        }

        // Object.entries(this.customHeaders).forEach(([key, value]) => {
        //   headers.set(key, value);
        // });
        return config;
      },
      (error) => {
        setLoading(false); // Emit loading state as false on error
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        console.log(response);
        setLoading(false);
        return response;
      },
      (error: any) => {
        console.log(error);

        setLoading(false);

        const context = new ErrorHandlerContext(new ServerErrorHandler()); // default
        const strategy = errorStrategyRegistry.find((entry) =>
          entry.match(error)
        );
        if (strategy) {
          context.setStrategy(strategy.handler);
          context.handle(error);
        }

        if (axios.isCancel(error)) {
          console.log("❌ درخواست لغو شد:", error.message);
        } else if (error.response?.status === 401) {
          console.warn("🚫 خطای احراز هویت 401");
        } else if (error.response?.status === 500) {
          console.error("💥 خطای سرور");
        }
        return Promise.reject(error);
      }
    );
  }

  setHeaders(headers: Record<string, string>): void {
    this.customHeaders = headers;
  }

  get<T>(url: string, config?: any): Promise<T> {
    return this.instance.get<T>(url, config).then((res) => res.data);
  }

  post<T, D = unknown>(url: string, data?: D, config?: any): Promise<T> {
    return this.instance.post<T>(url, data, config).then((res) => res.data);
  }

  put<T, D = unknown>(url: string, data?: D, config?: any): Promise<T> {
    return this.instance.put<T>(url, data, config).then((res) => res.data);
  }

  delete<T>(url: string, config?: any): Promise<T> {
    return this.instance.delete<T>(url, config).then((res) => res.data);
  }
}
