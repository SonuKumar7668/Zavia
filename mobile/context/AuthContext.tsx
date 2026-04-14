import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    setUserToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUserToken(null);
  };

  // const checkLogin = async () => {
  //   const token = await AsyncStorage.getItem("token");
  //   setUserToken(token);
  //   setLoading(false);
  // };

  useEffect(() => {
      const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setUserToken(token);
    } catch (e) {
      console.log("Storage error:", e);
    } finally {
      setLoading(false);
    }
  };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};