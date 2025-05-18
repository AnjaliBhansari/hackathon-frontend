import React, { useState } from "react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMAIL_REGEX } from "@/shared/constants/regex";
import { LoginUseCase } from "@/application/use-cases/auth/login";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth-repository-impl";
import Link from "next/link";

export function LoginForm1({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = (email: string, password: string): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }
    return isValid;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!validateForm(email, password)) {
      return;
    }
    setLoading(true);
    try {
      const authRepository = new AuthRepositoryImpl();
      const loginUseCase = new LoginUseCase(authRepository);
      const response = await loginUseCase.execute({ email, password });
      localStorage.setItem("userInfo", JSON.stringify(response));
      router.push("/");
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden bg-white/80 backdrop-blur-md">
        {/* Left Side: Illustration and Text */}
        <div className="hidden md:flex flex-col  justify-center items-center flex-1 p-10 bg-gradient-to-br from-[#f3e7fe] to-[#e3e6ff]">
          <img
            src="/assets/joy3.png"
            alt="Celebration"
            className="w-64 h-64 mb-8"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Spread positivity
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-xs">
            Recognition is the first step to appreciation.
          </p>
        </div>
        {/* Right Side: Login Card */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-md shadow-none border-none bg-transparent">
            <CardContent className="p-0">
              <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="flex flex-col items-center text-center mb-2">
                  <h1 className="text-2xl font-bold">
                    Welcome to Avesta Kudos
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your credentials to access your account
                  </p>
                </div>
                {error && (
                  <p className="text-sm text-destructive text-center">
                    {error}
                  </p>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    disabled={loading}
                  />
                  {emailError && (
                    <p className="text-sm text-destructive">{emailError}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={loading}
                  />
                  {passwordError && (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-violet-900 hover:bg-violet-800"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
