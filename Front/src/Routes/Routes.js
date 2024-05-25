import React, { useEffect, useState } from "react";
import AdministratorRoutes from "./AdministratorRoutes";
import InternshipCoordinatorRoutes from "./InternshipCoordinatorRoutes";
import SupervisorRoutes from "./SupervisorRoutes";
import InternRoutes from "./InternRoutes";
import PublicRoutes from "./PublicRoutes";

export default function Render() {
  const user = localStorage.getItem("user");
  const [userRole, setUserRole] = useState(user?.role);
  

  useEffect(() => {
    if (user) {
      const { role } = JSON.parse(user);
      setUserRole(role);
    }
  }, [user]);

  if (user === null) {
    return <PublicRoutes />;
  }

  switch (userRole) {
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
