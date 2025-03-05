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
        await wait(1000); // Wait 1 second between retries
        if (token) break;
      }
      if (!token) {
        throw new Error("No authentication token available");
      }
    }

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
