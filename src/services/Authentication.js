// src/services/Authentication.js
import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleRegister = async (values) => {
  const payload = {
    LN: values.lastName,
    FN: values.firstName,
    Email: values.email,
    Password: values.password,
    Major: values.major,
    DOB: values.birthday,
    Code: values.confirm
  };
  return handleApiRequest(() =>
    apiClient.post("/register", payload, { withCredentials: false })
  );
};

export const handleLogin = async (values) => {
  const payload = {
    username: values.Email,
    password: values.password,
  };
  return handleApiRequest(() =>
    apiClient.post("/login", payload, { withCredentials: false })
  );
};

export const handleGetCode = async (values) => {
  return handleApiRequest(() =>
    apiClient.post("/getregistercode", {Email: values}, { withCredentials: false })
  );
}