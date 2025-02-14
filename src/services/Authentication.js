// src/services/Authentication.js
import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleRegister = async (value) => {
  const payload = {
    LN: value.lastName,
    FN: value.firstName,
    Email: value.email,
    Password: value.password,
    Major: value.major,
    DOB: value.birthday,
  };

  return handleApiRequest(() =>
    apiClient.post("/register", payload, { withCredentials: false })
  );
};

export const handleLogin = async (values) => {
  return handleApiRequest(() =>
    apiClient.post("/login", values, { withCredentials: false })
  );
};