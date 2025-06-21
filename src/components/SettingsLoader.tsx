// ex: components/SettingsLoader.tsx
"use client";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";

export function SettingsLoader() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !user?.id) return; // ✅ NE FAIT RIEN tant que user.id n'est pas dispo

    fetch(`/api/settings/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("User settings loaded:", data.userSettings);
      })
      .catch(console.error);
  }, [user?.id, isLoading]); // ✅ Attention à bien dépendre de user.id

  return null;
}
