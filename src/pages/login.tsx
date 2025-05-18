import { LoginForm1 } from "@/presentation/features/auth/components/login-form1";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm1 />
      </div>
    </div>
    // <div className="container flex h-screen w-screen flex-col items-center justify-center">
    //   <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    //     <LoginForm1 />
    //   </div>
    // </div>
  );
}
