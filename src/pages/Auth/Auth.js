// src/pages/Auth/Auth.js
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { AuthLayout } from "layouts";
import { LoginForm, RegisterForm } from "components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleRegister, handleLogin } from "services/Authentication";
import { login } from "utils/TokenUtils";
import { useNotification } from "context/NotificationContext";
import "./Auth.css";

const labels = ["Sign Up", "Login"];
const items = labels.map((label, index) => ({
  key: index + 1,
  label: label,
}));

const Auth = () => {
  const navigate = useNavigate();
  const showNotification = useNotification();

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialForm = searchParams.get("tab") || "signup";
  const [isLogin, setIsLogin] = useState(initialForm === "login");

  useEffect(() => {
    const tab = searchParams.get("tab");
    setIsLogin(tab === "login");
  }, [searchParams]);

  const handleMenuClick = (e) => {
    setSearchParams({ tab: e.key === "2" ? "login" : "signup" });
  };

  const handleLoginWithNotification = async (values) => {
    setLoading(true);
    try {
      const response = await handleLogin(values);
      if (response.success) {
        showNotification(
          "success",
          "You have logged in successfully.",
          "Redirecting...",
          500,
          () => {
            login(response.token, response.expiresIn, response.refreshToken);
          },
        );
      } else {
        console.log(response)
        showNotification(
          "error",
          "Login Failed",
          "Please check your credentials and try again.",
          0,
          null,
        );
      }
    } catch (error) {
      console.log("Login error: " + error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterWithNotification = async (values) => {
    setLoading(true);
    try {
      const response = await handleRegister(values);
      if (response.success){
        showNotification(
          "success",
          "You have signed up successfully.",
          "Redirecting...",
          500,
          () => navigate("/auth?tab=login"),
        );
      } else {
        showNotification(
          "error",
          "Registration Failed",
          error.message + "Please try again.",
          0,
          null,
        );
      }
    } catch (error) {
      console.log("Registration error: " + error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const menu = (
    <Menu
      className="login-form"
      mode="horizontal"
      items={items}
      onClick={handleMenuClick}
      selectedKeys={[isLogin ? "2" : "1"]}
    />
  );

  const children = isLogin ? (
    <LoginForm onFinish={handleLoginWithNotification} loading={loading} />
  ) : (
    <RegisterForm onFinish={handleRegisterWithNotification} />
  );

  return (
    <div id="auth">
      <AuthLayout menuComponent={menu} formComponent={children} />
    </div>
  );
};

export default Auth;
