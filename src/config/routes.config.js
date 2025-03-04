// src/config/routes.config.js
import { ROLE_USER, ROLE_ADMIN } from "config/permissions";
import Dashboard from "pages/Dashboard/Dashboard";
import HomePage from "pages/Home/HomePage";
import Auth from "pages/Auth/Auth";
import Unauthorized from "pages/Unauthorized";
import Space from "pages/SpacePage";
import EquipmentPage from "pages/EquipmentPage";
import SupportPage from "pages/Support";

export const ROUTES = {
  PUBLIC: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/auth",
      component: Auth,
    },
    {
      path: "/space",
      component: Space,
    },
    {
      path: "/equipment",
      component: EquipmentPage,
    },
    {
      path: "/support",
      component: SupportPage,
    },
  ],
  PRIVATE: [
    {
      path: "/dashboard",
      component: Dashboard,
      permissions: (params) => {
        const tab = params.get("tab");
        return tab === "summary" ? ROLE_ADMIN : ROLE_USER;
      },
      redirect: "/dashboard?tab=reservation",
    },
  ],
  ERROR: [
    {
      path: "/unauthorized",
      component: Unauthorized,
    },
  ],
};