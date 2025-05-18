import { SignUpForm1 } from "@/presentation/features/auth/components/signup-form1";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignUpForm1 />
      </div>
    </div>
  );
}
