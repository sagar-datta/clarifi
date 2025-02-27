import { useAuth } from "@clerk/nextjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWithAuth(
  endpoint: string,
  token: string | null,
  options: RequestInit = {}
) {
  try {
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
