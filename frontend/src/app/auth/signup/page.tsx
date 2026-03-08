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

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(data);
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        {/* Placeholder for Cat Illustration */}
        <div className="mx-auto h-32 w-32 bg-[#EFE7DB]/30 rounded-full flex items-center justify-center text-[#846E54] font-bold text-lg">
          🐱
        </div>
        
        <h1 className="text-5xl font-serif text-[#2D2D2D]">Yay, New Friend!</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("username")}
            placeholder="Username"
            error={errors.username?.message}
          />
          <Input
            {...register("email")}
            type="email"
            placeholder="Email address"
            error={errors.email?.message}
          />
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            error={errors.password?.message}
          />
          
          {error && <p className="text-sm text-red-500">{error}</p>}
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        
        <p className="text-sm text-[#846E54]">
          <Link href="/auth/login" className="hover:underline">
            We're already friends!
          </Link>
        </p>
      </div>
    </div>
  );
}
