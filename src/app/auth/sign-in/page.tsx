import { Metadata } from "next";
import { SignInForm } from "./signInForm";

export default function SignInPage() {
  return (
    <div className="w-full min-h-screen p-4 flex items-center justify-center">
      <SignInForm />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Sign In",
  description: "Page of sign in"
};
