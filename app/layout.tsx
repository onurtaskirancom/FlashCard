'use client'; // Required for useState and useEffect

import { Inter } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

// Static metadata can still be defined, but title might be dynamic if needed
// export const metadata: Metadata = {
//   title: "Flashcard App",
//   description: "Learn new words with flashcards",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState('dark'); // Default to dark

  useEffect(() => {
    const storedTheme = localStorage.getItem('flashcard-theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      // If no theme is stored, default to dark and store it
      localStorage.setItem('flashcard-theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('flashcard-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <html lang="en" className={theme}>
      <head>
        {/* You can add more head elements here if needed */}
        <title>İngilizce-Türkçe Flashcard</title>
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-800 text-black dark:text-gray-100`}>
        <div className="min-h-screen flex flex-col">
          <header className="p-4 sm:p-6 md:p-8 flex justify-between items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 shadow-md">
            <h1 className="text-xl sm:text-2xl font-semibold">Flashcard App</h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </header>
          <main className="flex-grow flex items-center justify-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
