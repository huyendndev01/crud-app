import React from "react";

const UserContext = React.createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ email: "", auth: false });

  const loginContext = (email, token) => {
    setUser({
      email,
      auth: true,
    });
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser({
      email: "",
      auth: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
