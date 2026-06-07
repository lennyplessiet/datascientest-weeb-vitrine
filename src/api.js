const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const AUTH_STORAGE_KEY = "authUser";

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(getApiErrorMessage(data));
    error.data = data;
    throw error;
  }

  return data;
}

export function saveAuthSession({ access, refresh, username }) {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ username }));
  window.dispatchEvent(new Event("auth-change"));
}

export function getAuthSession() {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);
  const user = rawUser ? JSON.parse(rawUser) : null;

  if (!access || !user?.username) {
    return null;
  }

  return {
    access,
    refresh,
    username: user.username,
  };
}

export function clearAuthSession() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-change"));
}

function getApiErrorMessage(data) {
  if (!data) {
    return "Une erreur est survenue.";
  }

  if (typeof data === "string") {
    return data;
  }

  if (data.detail || data.error || data.message) {
    return data.detail || data.error || data.message;
  }

  const firstField = Object.keys(data)[0];
  const firstValue = data[firstField];

  if (Array.isArray(firstValue)) {
    return `${firstField}: ${firstValue.join(" ")}`;
  }

  return "Une erreur est survenue.";
}
