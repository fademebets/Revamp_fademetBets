import { LoginForm } from "./components/login-form"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-white overflow-hidden">

      {/* Red radial gradient ellipse */}
      <div className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-red-600 opacity-20 blur-3xl" />
      <div className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-red-700 opacity-20 blur-2xl" />

      {/* Login card container */}
      <div className="w-full max-w-lg z-10">
        <LoginForm />
      </div>
    </div>
  )
}
