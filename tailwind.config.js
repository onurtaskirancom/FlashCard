/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Add any dark mode specific styles here if needed
      // For example, different background colors or text colors for dark mode
      // These will be applied when the 'dark' class is present on the html element
      backgroundColor: {
        dark: {
          DEFAULT: '#1a202c', // Example dark background
          card: '#2d3748',    // Example dark card background
        }
      },
      textColor: {
        dark: {
          DEFAULT: '#e2e8f0', // Example dark text
          muted: '#a0aec0',   // Example dark muted text
        }
      }
    },
  },
  plugins: [],
}
