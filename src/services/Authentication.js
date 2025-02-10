// src/services/Authentication.js
import { apiClient } from "@root/utils/ApiUtils";

export const handleRegister = async (value) => {
  const payload = {
    LN: value.lastName,
    FN: value.firstName,
    Email: value.email,
    Password: value.password,
    Major: value.major,
    DOB: value.birthday,
  };

  try {
    const data = await apiClient.post("/register", payload, {
      withCredentials: false,
    });
    return data;
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
};

export const handleLogin = async (values) => {
  if (!values?.Email || !values?.password) {
    throw new Error("Email and password are required");
  }

  try {
    const loginResponse = await apiClient.post("/login", values, {
      withCredentials: false,
    });
    if (!loginResponse.success) {
      throw new Error(loginResponse.message || "Login failed");
    }
    return {
      token: loginResponse.token,
      expiresIn: loginResponse.expiresIn,
      refreshToken: loginResponse.refreshToken
    };
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};
