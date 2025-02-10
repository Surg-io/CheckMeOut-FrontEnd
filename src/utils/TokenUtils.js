export const validateToken = (token) => {
  const expiresAtStr = localStorage.getItem('expiresAt');
  if (!expiresAtStr) return false;
  const expiresAt = parseInt(expiresAtStr, 10);
  return Date.now() < expiresAt;
};