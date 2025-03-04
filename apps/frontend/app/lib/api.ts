import { useAuth } from "@clerk/nextjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWithAuth(
  endpoint: string,
  token: string | null,
  options: RequestInit = {}
) {
  try {
    // If no token, wait briefly and retry up to 3 times
    if (!token) {
      for (let i = 0; i < 3; i++) {
        console.log("No token, waiting and retrying...", i + 1);
        await wait(1000); // Wait 1 second between retries
        if (token) break;
      }
      if (!token) {
        throw new Error("No authentication token available");
      }
    }

    console.log("Making authenticated request...");
    console.log("Token present:", !!token);

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    console.log("Making request to:", `${API_URL}${endpoint}`);
    console.log("Request headers:", headers);

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("API Error:", error);
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("fetchWithAuth error:", error);
    throw error;
  }
}
