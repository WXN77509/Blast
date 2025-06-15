import { Metadata } from "next";
import { SignInForm } from "./signInForm";
import screenImage from "@/img/screenImage.png";

export default function SignInPage() {
  return (
    <div
      style={{ backgroundImage: `url(${screenImage.src})` }}
      className="w-full min-h-screen p-4 flex items-center justify-center bg-no-repeat bg-center bg-cover"
    >
      <SignInForm />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Sign In",
  description: "Page of sign in"
};
