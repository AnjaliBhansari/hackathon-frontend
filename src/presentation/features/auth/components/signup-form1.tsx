import React, { useState } from "react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignUpUseCase } from "@/application/use-cases/auth/signup";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth-repository-impl";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function SignUpForm1({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [roleError, setRoleError] = useState("");

  const validateForm = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
  ): boolean => {
    let isValid = true;
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setRoleError("");
    if (!name || name.trim().length < 2) {
      setNameError("Name must be at least 2 characters long");
      isValid = false;
    }
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
    } else if (!PASSWORD_REGEX.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
    if (!role) {
      setRoleError("Please select a role");
      isValid = false;
    }
    return isValid;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const role = formData.get("role") as string;
    if (!validateForm(name, email, password, confirmPassword, role)) {
      return;
    }
    setLoading(true);
    const userData = { name, email, password, role };
    try {
      const authRepository = new AuthRepositoryImpl();
      const signUpUseCase = new SignUpUseCase(authRepository);
      const response = await signUpUseCase.execute(userData);
      localStorage.setItem("userInfo", JSON.stringify(response));
      router.push("/");
    } catch (error) {
      setError("Failed to create account");
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
        <div className="hidden md:flex flex-col justify-center items-center flex-1 p-10 bg-gradient-to-br from-[#f3e7fe] to-[#e3e6ff]">
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
        {/* Right Side: Signup Card */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-md shadow-none border-none bg-transparent">
            <CardContent className="p-0">
              <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="flex flex-col items-center text-center mb-2">
                  <h1 className="text-2xl font-bold">
                    Create your Avesta Kudos account
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your details to create your account
                  </p>
                </div>
                {error && (
                  <p className="text-sm text-destructive text-center">
                    {error}
                  </p>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    disabled={loading}
                  />
                  {nameError && (
                    <p className="text-sm text-destructive">{nameError}</p>
                  )}
                </div>
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
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    disabled={loading}
                  />
                  {confirmPasswordError && (
                    <p className="text-sm text-destructive">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" required disabled={loading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team-lead">Team Lead</SelectItem>
                      <SelectItem value="team-member">Team Member</SelectItem>
                    </SelectContent>
                  </Select>
                  {roleError && (
                    <p className="text-sm text-destructive">{roleError}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-violet-900 hover:bg-violet-800"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Login
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
