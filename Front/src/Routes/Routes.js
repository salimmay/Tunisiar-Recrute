import React from "react";
import { useUser } from "../components/contexts/AuthProvider";
import AdministratorRoutes from "./AdministratorRoutes";
import InternshipCoordinatorRoutes from "./InternshipCoordinatorRoutes";
import SupervisorRoutes from "./SupervisorRoutes";
import InternRoutes from "./InternRoutes";
import PublicRoutes from "./PublicRoutes";

export default function Render() {
  const user = useUser();

  if (user) {
    switch (user.role) {
      case "administrator":
        return <AdministratorRoutes />;
      case "internship coordinator":
        return <InternshipCoordinatorRoutes />;
      case "supervisor":
        return <SupervisorRoutes />;
      case "intern":
        return <InternRoutes />;
      default:
        return <PublicRoutes />;
    }
  }
  return <PublicRoutes />;
}
