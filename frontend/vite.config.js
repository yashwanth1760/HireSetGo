import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// 👉 Vite ka setup hai React + Tailwind CSS ke liye
// ✅ Plugins me React & Tailwind use ho rahe hain
// ✅ "@" alias set kiya gaya hai taaki hum "@/components/..." jaisa short path use kar sakein instead of "../../"
// ✅ Ye config dev speed aur code organization dono ko improve karta hai

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
