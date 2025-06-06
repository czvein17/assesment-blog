import React from "react";
import { useBlogs } from "../hooks/useBlogs";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useBlogs();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
