"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import googleIcon from "@/icons/googleIcon.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "@/components/submit-button";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Github } from "lucide-react";
import { useState } from "react";

const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

type ProviderEnum = Parameters<typeof signIn.social>[0]["provider"];

export function SignInForm() {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    setEmailError(null);
    setPasswordError(null);

    await signIn.email(
      {
        email: values.email,
        password: values.password
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          const message = ctx.error.message.toLowerCase();

          if (ctx.error.status === 403) {
            toast.error("Please verify your email address");
          } else if (
            message.includes("user not found") ||
            message.includes("email")
          ) {
            setEmailError("No account found with this email.");
            toast.error("No account found with this email.");
          } else if (
            message.includes("incorrect password") ||
            message.includes("password")
          ) {
            setPasswordError("Incorrect password.");
            toast.error("Incorrect password.");
          } else {
            toast.error(ctx.error.message);
          }

          form.reset();
          router.refresh();
        }
      }
    );
  }

  async function signInWithProvider(provider: ProviderEnum) {
    await signIn.social(
      { provider: provider, callbackURL: "/" },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.error.message);
          router.refresh();
        }
      }
    );
  }

  return (
    <Card className="w-full max-w-lg flex flex-col items-center gap-3 shadow-[0_2px_2px_0_rgba(0,0,0,0.14),0_3px_1px_-2px_rgba(0,0,0,0.12),0_1px_5px_0_rgba(0,0,0,0.2)] hover:shadow-[0_16px_16px_0_rgba(0,0,0,0.14),0_12px_8px_-4px_rgba(0,0,0,0.12),0_8px_24px_0_rgba(0,0,0,0.2)]">
      <CardHeader className="mb-7 w-full flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription className="leading-4">
            Enter your email below to login to your account
          </CardDescription>
        </div>
        <CardAction>
          <Link
            href="/auth/sign-up"
            className={buttonVariants({ variant: "link" })}
          >
            Sign Up
          </Link>
        </CardAction>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-4"
        >
          <CardContent className="w-full">
            <div className="flex flex-col gap-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    {emailError ? (
                      <FormMessage>{emailError}</FormMessage>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    {passwordError ? (
                      <FormMessage>{passwordError}</FormMessage>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3 w-full">
            <SubmitButton type="submit" className="w-full">
              Login
            </SubmitButton>
          </CardFooter>
        </form>
      </Form>
      <div className="w-full px-6 flex gap-2">
        <Button
          variant="outline"
          className="w-[calc(50%-0.25rem)] inline-flex items-center gap-2 text-[12px] md:text-[14px]"
          onClick={() => signInWithProvider("google")}
        >
          <Image src={googleIcon} alt="Google icon" height={16} width={16} />
          Login with Google
        </Button>
        <Button
          variant="outline"
          className="w-[calc(50%-0.25rem)] inline-flex items-center gap-2 text-[12px] md:text-[14px]"
          onClick={() => signInWithProvider("github")}
        >
          <Github height={16} width={16} />
          Login with Github
        </Button>
      </div>
    </Card>
  );
}
