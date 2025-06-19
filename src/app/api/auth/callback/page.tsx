"use client";

import { useEffect } from "react";

export default function OAuthCallback() {
  useEffect(() => {
    // Ici tu peux valider la session si besoin (optionnel)
    // Puis prévenir la fenêtre parente et fermer la popup
    if (window.opener) {
      window.opener.postMessage(
        { type: "oauth_success" },
        window.location.origin
      );
      window.close();
    }
  }, []);

  return <p>Finalizing authentication...</p>;
}
