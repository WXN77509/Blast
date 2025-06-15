"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import googleIcon from "@/icons/googleIcon.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";
import { Separator } from "@/components/ui/separator";

const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters."
    })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name can only contain letters and spaces"
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(12, {
      message: "The password must contain at least 12 characters"
    })
    .regex(/[A-Z]/, {
      message: "The password must contain at least one capital letter"
    })
    .regex(/[a-z]/, {
      message: "The password must contain at least one lower case letter"
    })
    .regex(/[0-9]/, {
      message: "The password must contain at least one number"
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "The password must contain at least one special character"
    })
});

export function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    await signUp.email(
      {
        email: values.email,
        name: values.name,
        password: values.password
      },
      {
        onSuccess: () => {
          toast.success("Check your email to verify your account.");
          router.push("/auth/check-email");
        },
        onError: () => {
          toast.error("Something went wrong.");
          form.reset();
          router.refresh();
        }
      }
    );
  }

  async function goToSignIn() {
    router.push("/auth/sign-in");
  }

  return (
    <Card className="w-full max-w-lg flex flex-col items-center gap-6 shadow-[0_2px_2px_0_rgba(0,0,0,0.14),0_3px_1px_-2px_rgba(0,0,0,0.12),0_1px_5px_0_rgba(0,0,0,0.2)] hover:shadow-[0_16px_16px_0_rgba(0,0,0,0.14),0_12px_8px_-4px_rgba(0,0,0,0.12),0_8px_24px_0_rgba(0,0,0,0.2)]">
      <CardHeader className="w-full flex flex-col gap-1.5">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email, password and name below to create your account.
        </CardDescription>
      </CardHeader>
      <div className="w-full flex flex-col gap-6 px-6">
        <CardAction className="w-full flex gap-4">
          <Button
            variant="outline"
            className="w-[calc(50%-0.5rem)] inline-flex items-center gap-2"
            onClick={() => goToSignIn()}
          >
            <Image src={googleIcon} alt="Google icon" height={16} width={16} />
            Google
          </Button>
          <Button
            variant="outline"
            className="w-[calc(50%-0.5rem)] inline-flex items-center gap-2"
            onClick={() => goToSignIn()}
          >
            <Github height={16} width={16} />
            Github
          </Button>
        </CardAction>
        <span className="w-full flex flex-row gap-2 justify-center items-center text-muted-foreground text-sm">
          <Separator className="flex-1" />
          OR CONTINUE WITH
          <Separator className="flex-1" />
        </span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-4"
        >
          <CardContent className="w-full">
            <div className="flex flex-col gap-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Blast Dev" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    <FormMessage />
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
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3 w-full">
            <SubmitButton type="submit" className="w-full">
              Create account
            </SubmitButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
