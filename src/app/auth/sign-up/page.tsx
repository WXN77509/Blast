import { Metadata } from "next";
import { SignUpForm } from "./signUpForm";
import screenImage from "@/img/screenImage.png";

export default function SignUpPage() {
  return (
    <div
      style={{ backgroundImage: `url(${screenImage.src})` }}
      className="w-full min-h-screen p-4 flex items-center justify-center bg-no-repeat bg-center bg-cover"
    >
      <SignUpForm />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Page of sign up"
};
