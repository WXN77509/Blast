"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import googleIcon from "@/icons/googleIcon.png";
import discordIcon from "@/icons/discordIcon.png";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type ProviderEnum = Parameters<typeof authClient.signIn.social>[0]["provider"];

export function SignInForm() {
  async function signInWithProvider(provider: ProviderEnum) {
    try {
      const res = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        disableRedirect: true
      });

      if ("url" in res && typeof res.url === "string") {
        window.open(res.url, "_blank", "width=500,height=600");
      } else {
        toast.error("No redirection links received.");
      }
    } catch (error) {
      toast.error((error as Error).message || "Connection error.");
    }
  }

  return (
    <Card className="w-full max-w-lg flex flex-col items-center gap-8 shadow-[0_16px_16px_0_rgba(0,0,0,0.14),0_12px_8px_-4px_rgba(0,0,0,0.12),0_8px_24px_0_rgba(0,0,0,0.2)] hover:shadow-[0_2px_2px_0_rgba(0,0,0,0.14),0_3px_1px_-2px_rgba(0,0,0,0.12),0_1px_5px_0_rgba(0,0,0,0.2)]">
      <CardHeader className="flex flex-col w-full">
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <div className="w-full px-6">
        <Separator className="w-full" />
      </div>

      <CardContent className="w-full flex flex-col gap-3">
        <Button variant="outline" onClick={() => signInWithProvider("google")}>
          <Image src={googleIcon} alt="Google icon" height={16} width={16} />
          Login with Google
        </Button>
        <Button variant="outline" onClick={() => signInWithProvider("github")}>
          <Github height={16} width={16} />
          Login with Github
        </Button>
        <Button variant="outline" onClick={() => signInWithProvider("discord")}>
          <Image src={discordIcon} alt="discord icon" height={16} width={16} />
          Login with Discord
        </Button>
      </CardContent>

      <CardFooter className="text-sm text-gray-500 flex justify-center items-center gap-1.5 px-4 py-2 select-none">
        By continuing, you agree to xAI&apos;s{" "}
        <Link
          href=""
          className="text-blue-600 font-semi-bold hover:underline ml-1"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href=""
          className="text-blue-600 font-semi-bold hover:underline ml-1"
        >
          Privacy Policy.
        </Link>
      </CardFooter>
    </Card>
  );
}
