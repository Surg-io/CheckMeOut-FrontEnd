export const getToken = () => localStorage.getItem("token");

export const validateToken = () => {
  const expiresAtStr = localStorage.getItem('expiresAt');
  if (!expiresAtStr) return false;
  const expiresAt = parseInt(expiresAtStr, 10);
  return Date.now() < expiresAt;
};

export const persistTokenData = (token, expiresIn) => {
  const expiresAt = Date.now() + expiresIn * 1000;
  localStorage.setItem("token", token);
  localStorage.setItem("expiresAt", String(expiresAt));
};

export const clearTokenData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
};

export const login = async (token, expiresIn) => {
  const calculatedExpiresAt = Date.now() + expiresIn * 1000;
  persistTokenData(token, calculatedExpiresAt.toString());
  window.location.href = "/dashboard?tab=summary";
};

export const logout = () => {
  clearTokenData();
  window.location.href = "/auth?tab=login";
};

