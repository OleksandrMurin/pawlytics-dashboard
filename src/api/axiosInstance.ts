// src/api/axiosInstance.ts
import axios, { AxiosError, AxiosResponse } from "axios";

// Интерфейсы для токенов
interface TokenResponse {
  access: string;
  refresh: string;
}

interface RefreshResponse {
  access: string;
}

// Создаем axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const TokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refresh_token");
  },

  setTokens: (tokens: TokenResponse): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
  },

  setAccessToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("access_token", token);
  },

  clearTokens: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  hasValidTokens: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!(TokenManager.getAccessToken() && TokenManager.getRefreshToken());
  },
};

// Функция для обновления токенов
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = TokenManager.getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post<RefreshResponse>(
      "http://localhost:8000/api/auth/refresh/",
      { refresh: refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    const newAccessToken = response.data.access;
    TokenManager.setAccessToken(newAccessToken);

    return newAccessToken;
  } catch (error) {
    // Refresh токен тоже истек
    TokenManager.clearTokens();
    // Перенаправляем на логин
    window.location.href = "/auth/login";
    return null;
  }
};

// Request interceptor - добавляем access токен
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = TokenManager.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - обрабатываем истечение токенов !!!!!!!!!!!!!СОМНИТЕЛЬНО!!!!!!!!!!!!!!!!
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any; // ← добавили as any

    // Проверяем, что это ошибка 401 (Unauthorized)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // ← теперь TypeScript не ругается

      try {
        // Пытаемся обновить access токен
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          // Обновляем заголовок в оригинальном запросе
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Повторяем оригинальный запрос с новым токеном
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Если обновление не удалось
        TokenManager.clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { TokenManager };
