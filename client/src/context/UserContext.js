import { createContext, useState } from "react";

export const UserContext = createContext();

const initalState = {};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initalState);

  const createUserAndReceiveData = async (newUser) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUser.email,
          name: newUser.name,
          picture: newUser.picture,
          id: newUser.sub,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create or retrieve user data");
      }

      const userData = await response.json();

      setUser({
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, createUserAndReceiveData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
