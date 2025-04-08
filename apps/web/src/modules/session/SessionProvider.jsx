import React, { useState, useEffect } from "react";
import { useLoginMutation, useLogoutMutation } from "@/lib/api/auth";
import { emitter } from "@/lib/events";
import { SessionContext } from "./SessionContext";
import { useMeQuery } from "@/lib/api/user";

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: me, isLoading } = useMeQuery();
  const user = me;

  const loginMutation = useLoginMutation({
    onSuccess: ({ data }) => {
      const { success, accessToken, refreshToken } = data?.login || {};

      if (success) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsLoggedIn(true);
        emitter.emit("login");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      emitter.emit("logout");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
    };

    emitter.on("logout", handleLogout);
    return () => emitter.off("logout", handleLogout);
  }, []);

  const login = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, user, login, logout, isLoading }}
    >
      {children}
    </SessionContext.Provider>
  );
};
