"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children, currentUser }) {
  return (
    <AuthContext.Provider value={{ currentUser }}>
      <SessionProvider>{children}</SessionProvider>
    </AuthContext.Provider>
  );
}
