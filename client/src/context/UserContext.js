import { createContext, useState, useCallback } from "react";

export const UserContext = createContext();

const initialState = {};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const updateUserContext = useCallback((userData) => {
    setUser({
      email: userData.email,
      name: userData.name,
      location: userData.location,
      picture: userData.picture,
      id: userData.id,
      recipe: userData.recipes,
      following: userData.following,
      followers: userData.followers,
      savedRecipes: userData.savedRecipes,
    });
  }, []);

  const createUserAndReceiveData = async (newUser) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUser.email,
          name: newUser.name,
          location: newUser.location || "",
          picture: newUser.picture || "",
          id: newUser.sub,
          recipes: newUser.recipes || [],
          following: newUser.following || [],
          followers: newUser.followers || [],
          savedRecipes: newUser.savedRecipes || [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create or retrieve user data");
      }

      const userData = await response.json();

      updateUserContext(userData.data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, createUserAndReceiveData, updateUserContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
