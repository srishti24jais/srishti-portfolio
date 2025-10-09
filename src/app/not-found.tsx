import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
          >
            <Home size={20} className="group-hover:scale-110 transition-transform" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl backdrop-blur-sm"
          >
            <ArrowLeft size={20} className="group-hover:scale-110 transition-transform" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
}
