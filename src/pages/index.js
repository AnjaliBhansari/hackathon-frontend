import { LoginForm } from "@/components/login-form";
// Home page placeholder
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Please sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}