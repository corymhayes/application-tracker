import { authClient } from "../worker/auth";

export const api = {
  request: async (endpoint: string, options: RequestInit = {}) => {
    const { data } = await authClient.getSession();

    const token = data?.session?.token;

    if (!token) {
      throw new Error("No active session");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    try {
      const response = await fetch(`${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(
          error.message || `API Error: $response.status} ${response.statusText}`
        );
      }

      return response.json();
    } catch (err) {
      console.error(`API request failed: ${endpoint}`, err)
      throw err;
    }
  },
};
