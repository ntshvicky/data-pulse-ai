/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // adjust these globs to wherever your .tsx files live
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
