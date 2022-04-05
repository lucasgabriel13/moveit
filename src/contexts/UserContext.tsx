import Cookies from "js-cookie";
import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  user: string;
  avatar: string;
  getInfoUser: (username: string) => Promise<void>;
}

interface UserData {
  name: string;
  avatar_url: string;
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState("");

  async function getInfoUser(username: string) {
    try {
      const { data } = await api.get<UserData>(`/${username}`);

      if (data) {
        setUser(data.name);
        setAvatar(data.avatar_url);

        const userData = {
          name: data.name,
          avatar_url: data.avatar_url,
        };

        Cookies.set("user", userData);

        Router.push("/home");
      }
    } catch (err) {
      toast.error("Usuário não encontrado!");
    }
  }

  return (
    <UserContext.Provider value={{ user, avatar, getInfoUser }}>
      {children}
    </UserContext.Provider>
  );
}
