"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children, initialUser }) {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user && !currentUser) {
      getCurrentUser(session).then((user) => {
        console.log("authcontext", user, session);
        if (user) {
          setCurrentUser(user);
        } else {
          toast.error("An error occurred, please sign in again.");
          router.push("/");
        }
      });
    }
  }, [currentUser, session]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function AuthProvider({ children, initialUser }) {
  return (
    <SessionProvider>
      <AuthContextProvider initialUser={initialUser}>
        {children}
      </AuthContextProvider>
    </SessionProvider>
  );
}

export default AuthProvider;
