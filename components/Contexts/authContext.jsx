import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

export const AccountContext = createContext();
export const JwtContext = createContext();
export const UserContext = createContext();

export function JwtMiddleware({ children }) {
  const router = useRouter();
  const [jwt, setJwt] = useState(null);
  const [profile, setProfile] = useState(null);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return; // Exit early if running on the server-side
    }

    const storedJwt = localStorage.getItem("jwt");
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    const isBaseRoute = router.pathname === "/";
    const isAdminRegisterRoute = router.pathname === "/admin-register";

    const hasValidToken = storedJwt && storedJwt !== "undefined";
    const hasValidProfile = storedProfile && storedProfile !== "undefined";

    if (isAdminRegisterRoute || (isBaseRoute && hasValidToken && hasValidProfile) || (!isBaseRoute && hasValidToken && hasValidProfile)) {
      if (hasValidToken) {
        const decodedToken = jwt_decode(storedJwt);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          handleExpiredToken();
        } else {
          setJwt(storedJwt);
          setProfile(storedProfile);
          redirectToDashboard();
        }
      } else {
        redirectToAdminRegister();
      }
    } else {
      redirectToHome();
    }
  }, [router]);

  const handleExpiredToken = () => {
    if (!redirected) {
      setRedirected(true);
      removeTokenAndProfile();
      redirectToHome();
    }
  };

  const redirectToHome = () => {
    if (!redirected) {
      setRedirected(true);
      router.push("/");
    }
  };

  const redirectToDashboard = () => {
    if (router.pathname === "/") {
      router.push("/dashboard");
    }
  };

  const redirectToAdminRegister = () => {
    if (router.pathname !== "/admin-register") {
      router.push("/admin-register");
    }
  };

  const removeTokenAndProfile = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("profile");
  };

  return (
    <JwtContext.Provider value={jwt}>
      <UserContext.Provider value={profile}>{children}</UserContext.Provider>
    </JwtContext.Provider>
  );
}
