import { useState } from "react";
import jwt from "jwt-decode";

export default function useRole() {
  const getInitialRole = () => {
    const token = localStorage.getItem("token");

    if (!token) return false;

    const { email } = jwt(token);
    const isAdmin = String(email).includes("@admin");
    return isAdmin;
  };

  const [isAdmin, setIsAdmin] = useState(getInitialRole());

  const saveIsAdmin = () => {
    const token = localStorage.getItem("token");

    if (!token) return false;

    const { email } = jwt(token);
    const isAdmin = String(email).includes("@admin");
    setIsAdmin(isAdmin);
  };

  return { isAdmin, saveIsAdmin };
}
