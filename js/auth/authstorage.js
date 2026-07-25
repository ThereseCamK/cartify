const AUTH_KEY = "cartify_auth";

export function saveAuth(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function getAuth() {
  const storedUser = localStorage.getItem(AUTH_KEY);

  if (!storedUser) {
    return null;
  }

  return JSON.parse(storedUser);
}

export function isLoggedIn() {
    
  return Boolean(getAuth()?.accessToken);
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
