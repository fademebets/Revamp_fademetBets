interface LoadingScreenProps {
  message?: string
  submessage?: string
}

export function LoadingScreen({
  message = "Welcome back!",
  submessage = "Redirecting you to your dashboard...",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 max-w-sm mx-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-red-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{message}</h3>
          <p className="text-sm text-gray-600">{submessage}</p>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
