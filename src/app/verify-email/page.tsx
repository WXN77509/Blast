"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // On récupère l’éventuel message d’erreur dans l’URL (?error=...)
  const error = searchParams.get("error");
  const success = searchParams.get("success");

  // Tu peux aussi gérer un état de chargement ou de confirmation
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      if (error === "invalid_token") {
        setMessage("Le lien de vérification est invalide ou a expiré.");
      } else {
        setMessage(`Erreur lors de la vérification : ${error}`);
      }
    } else if (success) {
      setMessage("Votre adresse email a bien été vérifiée !");
    } else {
      setMessage("Merci de vérifier votre adresse email.");
    }
  }, [error, success]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Vérification de l’email</h1>
      {message ? (
        <p className="text-center text-lg">{message}</p>
      ) : (
        <p className="text-center text-lg">Chargement...</p>
      )}
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => router.push("/auth/sign-in")}
      >
        Retour à la connexion
      </button>
    </main>
  );
}
