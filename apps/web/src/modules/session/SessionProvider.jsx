import React, { useState, useEffect, useCallback } from "react";
import { useLoginMutation, useLogoutMutation } from "@/lib/api/auth";
import { emitter } from "@/lib/events";
import { SessionContext } from "./SessionContext";
import { QUERY_ME, useMeQuery } from "@/lib/api/user";
import { useQueryClient } from "@tanstack/react-query";

const CURRENT_PROFILE_KEY = "currentProfileId";

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState(null);
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useMeQuery();

  const loginMutation = useLoginMutation({
    onSuccess: ({ data }) => {
      const { success, accessToken, refreshToken, user } = data?.login || {};

      if (success) {
        const currentProfile = user.profiles[0];

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem(CURRENT_PROFILE_KEY, currentProfile._id);

        setIsLoggedIn(true);
        setCurrentProfileId(currentProfile._id);
        queryClient.invalidateQueries(QUERY_ME());

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
      localStorage.removeItem(CURRENT_PROFILE_KEY);
      setIsLoggedIn(false);
      setCurrentProfileId(null);
      emitter.emit("logout");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedProfileId = localStorage.getItem(CURRENT_PROFILE_KEY);
    setIsLoggedIn(!!token);
    if (storedProfileId) setCurrentProfileId(storedProfileId);

    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem(CURRENT_PROFILE_KEY);
      setIsLoggedIn(false);
      setCurrentProfileId(null);
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

  const resetSession = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem(CURRENT_PROFILE_KEY);
    setIsLoggedIn(false);
    setCurrentProfileId(null);
    emitter.emit("logout");
  };

  const getProfiles = useCallback(() => {
    return user?.profiles || [];
  }, [user]);

  const getCurrentProfile = useCallback(() => {
    return getProfiles().find((p) => p._id === currentProfileId) || null;
  }, [getProfiles, currentProfileId]);

  const setCurrentProfile = (profile) => {
    if (!profile?._id) return;
    localStorage.setItem(CURRENT_PROFILE_KEY, profile._id);
    setCurrentProfileId(profile._id);
  };

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn: isLoggedIn && !!user,
        isLoading,
        user,
        login,
        logout,
        resetSession,
        getProfiles,
        getCurrentProfile,
        setCurrentProfile,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
