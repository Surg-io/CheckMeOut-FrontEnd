// src/components/RouteGenerator.js
import { useRoutes } from "react-router-dom";
import { ROUTES } from "config/routes.config";
import ProtectedRoute from "components/ProtectedRoute";

const RouteGenerator = () => {
  const generatedRoutes = useRoutes([
    ...ROUTES.PUBLIC.map((route) => ({
      path: route.path,
      element: <route.component />,
    })),
    ...ROUTES.PRIVATE.map((route) => ({
      path: route.path,
      element: (
        <ProtectedRoute
          component={route.component}
          requiredPermission={route.permissions}
          redirectPath={route.redirect}
        />
      ),
    })),
    ...ROUTES.ERROR.map((route) => ({
      path: route.path,
      element: <route.component />,
    })),
  ]);

  return generatedRoutes;
};

export default RouteGenerator;