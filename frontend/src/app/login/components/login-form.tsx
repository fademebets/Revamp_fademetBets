"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="border-none shadow-xl bg-white rounded-2xl">
        <CardHeader className="text-center space-y-4">
          {/* Logo Image */}
          <div className="flex justify-center">
            <Image
            width={90}
            height={90}
              src="/logo.png"
              alt="App Logo"
              className="h-14 w-14 rounded-full object-contain"
            />
          </div>

          <CardTitle className="text-3xl font-bold text-red-600">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-500">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-base text-gray-800">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="pl-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-base text-gray-800">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto text-sm text-red-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#D92A1B] hover:bg-[#1c1c1c] text-white h-12 text-base font-semibold"
                >
                  <LogIn className="mr-2 h-5 w-5" /> Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-500 text-red-600 hover:bg-red-50 h-12 text-base font-semibold"
                >
                  Login with Google
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-red-600 hover:underline font-medium">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
