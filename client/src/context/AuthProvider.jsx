import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Start with null as the initial state
  const [loading, setLoading] = useState(true); // Add loading state

  const CheckUser = async () => {
    try {
      const response = await axios.get("/getUser", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response?.data?.user) {
        const user = response.data.user;
        setAuth({ user });
        console.log("user is:", user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching authentication state
    }
  };

  useEffect(() => {
    CheckUser();
  }, []);

  if (loading) {
    // Render a loading state or spinner while authentication state is being fetched
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
