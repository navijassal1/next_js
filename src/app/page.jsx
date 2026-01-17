import Image from "next/image";
import Link from "next/link";

export default function SocialAppLanding() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-50 via-white to-purple-50 dark:from-black dark:via-gray-900 dark:to-black font-sans">
      <main className="flex flex-col items-center justify-center text-center px-6 py-32 sm:px-16">
        {/* App Logo */}
        <Image
          className="dark:invert mb-8"
          src="/next.svg"
          alt="InstaClone Logo"
          width={120}
          height={30}
          priority
        />

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">
          Welcome to InstaClone
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mb-10">
          Share your moments, connect with friends, and explore amazing posts. 
          Sign up now to start posting, liking, and commenting on your favorite content!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/signup"
            className="px-8 py-3 rounded-full bg-green-600 text-white font-semibold text-lg transition hover:bg-green-700"
          >
            Sign Up
          </Link>

          <Link
            href="/login"
            className="px-8 py-3 rounded-full border-2 border-green-600 text-green-600 font-semibold text-lg transition hover:bg-green-50 dark:hover:bg-gray-800 dark:hover:text-green"
          >
            Login
          </Link>
        </div>

        {/* Optional Footer / Info */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-12">
          Learn more about building social apps with{" "}
          <a
            href="https://nextjs.org"
            className="text-green-600 dark:text-green-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
          .
        </p>
      </main>
    </div>
  );
}
