import { useState, useEffect } from "react";
import api from "../lib/axios.ts";
import { DEMO_USER } from "../config/constants.ts";
import { User } from "../types.ts";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/users/me");
        setUser(data);
      } catch (e) {
        console.log("using user hook error", e);
        setUser(DEMO_USER);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, setUser, loading };
};
