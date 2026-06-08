const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const AUTH_STORAGE_KEY = "authUser";
const ACCESS_STORAGE_KEY = "access";

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

function parseResponse(response) {
  return response.text().then((text) => ({
    response,
    data: text ? JSON.parse(text) : null,
  }));
}

export function saveAuthSession({ access, username }) {
  if (access) {
    localStorage.setItem(ACCESS_STORAGE_KEY, access);
  }

  const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);
  const currentUser = rawUser ? JSON.parse(rawUser) : {};

  if (username) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ ...currentUser, username }));
  } else if (!currentUser.username) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
  }

  window.dispatchEvent(new Event("auth-change"));
}

export function getAuthSession() {
  const access = localStorage.getItem(ACCESS_STORAGE_KEY);
  const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);
  const user = rawUser ? JSON.parse(rawUser) : null;

  if (!access || !user?.username) {
    return null;
  }

  return {
    access,
    username: user.username,
  };
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-change"));
}

export async function refreshAccess() {
  const { response, data } = await parseResponse(
    await fetch(apiUrl("/api/users/token/refresh/"), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  if (!response.ok) {
    clearAuthSession();
    const error = new Error(getApiErrorMessage(data));
    error.data = data;
    throw error;
  }

  if (!data?.access) {
    clearAuthSession();
    throw new Error("Impossible de rafraîchir la session.");
  }

  saveAuthSession({ access: data.access });
  return data.access;
}

export async function apiRequest(path, options = {}) {
  const session = getAuthSession();
  const requestOptions = {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  if (session?.access && !requestOptions.headers.Authorization) {
    requestOptions.headers.Authorization = `Bearer ${session.access}`;
  }

  const { response, data } = await parseResponse(await fetch(apiUrl(path), requestOptions));

  if (!response.ok) {
    if (
      response.status === 401 &&
      !requestOptions._retry &&
      path !== "/api/users/token/refresh/" &&
      path !== "/api/users/token/"
    ) {
      try {
        const access = await refreshAccess();
        return apiRequest(path, {
          ...requestOptions,
          _retry: true,
          headers: {
            ...requestOptions.headers,
            Authorization: `Bearer ${access}`,
          },
        });
      } catch (refreshError) {
        clearAuthSession();
      }
    }

    const error = new Error(getApiErrorMessage(data));
    error.data = data;
    throw error;
  }

  return data;
}

export async function logout() {
  const session = getAuthSession();

  const response = await fetch(apiUrl("/api/users/logout/"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(session?.access ? { Authorization: `Bearer ${session.access}` } : {}),
    },
  });

  clearAuthSession();

  if (!response.ok) {
    const { data } = await parseResponse(response);
    const error = new Error(getApiErrorMessage(data));
    error.data = data;
    throw error;
  }
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
