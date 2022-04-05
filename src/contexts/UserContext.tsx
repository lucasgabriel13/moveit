import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  user: string;
  avatar: string;
  getInfoUser: (username: string) => Promise<void>;
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");


  async function getInfoUser(username: string) {
    const { data } = await api.get(`/${username}`);

    if (data) {
      setUser(data.name);
      setAvatar(data.avatar_url);

      const userData = {
        name: data.name,
        avatar_url: data.avatar_url,
      };

      Cookies.set("user", userData);
    }
  }

  return (
    <UserContext.Provider value={{ user, avatar, getInfoUser }}>
      {children}
    </UserContext.Provider>
  );
}
