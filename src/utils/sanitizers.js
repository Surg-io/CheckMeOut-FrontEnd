// src/utils/sanitizers.js

/**
 * General sanitization utilities
 */

// Sanitize names (First/Last Name)
export const sanitizeName = (input) => {
  return input
    .trim()
    .replace(/[^a-zA-Z\s-]/g, "") // Allow only letters, spaces and hyphens
    .replace(/\s{2,}/g, " "); // Collapse multiple spaces
};

// Sanitize email addresses
export const sanitizeEmail = (email) => {
  return email
    .trim()
    .toLowerCase()
    .replace(/[&<>"'`]/g, "") // Remove dangerous characters
    .replace(/\s+/g, "") // Remove whitespace
    .substring(0, 254); // Enforce RFC max length
};

export const sanitizePassword = (password) => {
  const safePassword = password || "";
  return safePassword
    .replace(/[\n\t<>]/g, "")
    .substring(0, 64);
};

// Sanitize verification codes
export const sanitizeVerificationCode = (code) => {
  return code
    .replace(/\D/g, "") // Digits only
    .substring(0, 6); // 6-digit code max
};
