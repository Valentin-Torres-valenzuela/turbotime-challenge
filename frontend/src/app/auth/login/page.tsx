"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { authService } from "@/services/auth.service";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ErrorMessage from "@/components/ErrorMessage";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      // Map email to username for standard DRF login if needed
      // but we will adjust backend to accept email
      await authService.login({
        username: data.email,
        password: data.password
      });
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="w-[384px] flex flex-col items-center space-y-[40px] text-center">
        <img
          src="/assets/cactus.png"
          alt="Cactus"
          className="h-[120px] w-auto object-contain"
        />
        <h1 className="text-[48px] font-bold font-serif text-[#88642A] leading-[100%]">
          Yay, You're Back!
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-[24px]">
          <div className="space-y-[16px]">
            <Input
              variant="auth"
              {...register("email")}
              placeholder="Email address"
              error={errors.email?.message}
            />
            <Input
              variant="auth"
              {...register("password")}
              type="password"
              placeholder="Password"
              error={errors.password?.message}
            />
          </div>
          
          <ErrorMessage message={error} />
          
          <Button variant="auth" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-[12px] font-normal font-sans text-[#957139]">
          <Link href="/auth/signup" className="underline decoration-1 underline-offset-0">
            Oops! I’ve never been here before
          </Link>
        </p>
      </div>
    </div>
  );
}
