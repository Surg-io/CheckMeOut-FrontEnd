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

// Sanitize date components (Month/Day/Year)
export const sanitizeDateComponent = (input, type) => {
  const sanitized = input.replace(/\D/g, ""); // Keep digits only

  switch (type) {
    case "month":
      return sanitized
        .slice(0, 2)
        .replace(/^(0?[0-9]|1[0-2])$/, (m) => m.padStart(2, "0"));

    case "day":
      return sanitized
        .slice(0, 2)
        .replace(/^(0?[1-9]|[12][0-9]|3[01])$/, (d) => d.padStart(2, "0"));

    case "year":
      return sanitized.slice(0, 4).replace(/^(19|20)\d{2}$/, "$&"); // Validate 1900-2099 range

    default:
      return sanitized;
  }
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

// Sanitize passwords
export const sanitizePassword = (password) => {
  return password
    .replace(/[\n\t<>]/g, "") // Remove line breaks and angle brackets
    .substring(0, 64); // Enforce max length
};

// Validate major selection
export const sanitizeMajor = (input, validMajors) => {
  return validMajors.includes(input) ? input : "";
};

// Sanitize verification codes
export const sanitizeVerificationCode = (code) => {
  return code
    .replace(/\D/g, "") // Digits only
    .substring(0, 6); // 6-digit code max
};

/**
 * Composite sanitization functions
 */

// Full birthdate validation (combine Month/Day/Year)
export const sanitizeBirthdate = (month, day, year) => {
  const cleanMonth = sanitizeDateComponent(month, "month");
  const cleanDay = sanitizeDateComponent(day, "day");
  const cleanYear = sanitizeDateComponent(year, "year");

  if (!cleanYear || !cleanMonth || !cleanDay) return null;

  try {
    const isoDate = `${cleanYear}-${cleanMonth}-${cleanDay}`;
    new Date(isoDate); // Validate date validity
    return isoDate;
  } catch {
    return null;
  }
};

// Password confirmation validation
export const validatePasswordMatch = (password, confirmPassword) => {
  return sanitizePassword(password) === sanitizePassword(confirmPassword);
};
