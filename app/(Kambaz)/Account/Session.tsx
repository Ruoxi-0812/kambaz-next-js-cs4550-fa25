"use client";

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (_err) {
      dispatch(setCurrentUser(null));
    }
    setPending(false);
  };
  

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) {
    return null; // or loading spinner
  }

  return children;
}
