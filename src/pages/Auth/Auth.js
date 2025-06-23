// src/pages/Auth/Auth.js
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import AuthLayout from "layouts/AuthLayout";
import LoginForm from "components/auth/LoginForm";
import RegisterForm from "components/auth/RegisterForm";
import { useSearchParams } from "react-router-dom";
import "./Auth.css";

const labels = ["Sign Up", "Login"];
const items = labels.map((label, index) => ({
  key: index + 1,
  label: label,
}));

const Auth = () => {
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
    <LoginForm/>
  ) : (
    <RegisterForm/>
  );

  return (
    <div id="auth">
      <AuthLayout menuComponent={menu} formComponent={children} />
    </div>
  );
};

export default Auth;
