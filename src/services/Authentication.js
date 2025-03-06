// src/services/Authentication.js
import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleRegister = async (values) => {
  const dateOfBirth = new Date(values.birthday.year, values.birthday.month - 1, values.birthday.day);
  const payload = {
    lastName: values.lastName,
    firstName: values.firstName,
    email: values.email,
    password: values.password,
    major: values.major,
    dateOfBirth: dateOfBirth,
    code: values.code
  };
  return handleApiRequest(() =>
    apiClient.post("/api/register-user", payload, { withCredentials: false })
  );
};

export const handleLogin = async (values) => {
  const payload = {
    Username: values.Email,
    Password: values.password,
  };
  return handleApiRequest(() =>
    apiClient.post("/api/login", payload, { withCredentials: false })
  );
};

export const handleGetCode = async (values) => {
  return handleApiRequest(() =>
    apiClient.post("/api/register-code", {email: values}, { withCredentials: false })
  );
}