import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  let [users, setUsers] = useState(null);

  let getUser = async (token) => {
    let res = await axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("get", getUser);
    if (res.status === 200) {
      // localStorage.setItem("token", token);
      if (res.data[0]?.errors.message === "Unauthenticated.") {
        console.log("Not log in");
        return;
      }
      setUsers(res.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsers(null);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ users, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
