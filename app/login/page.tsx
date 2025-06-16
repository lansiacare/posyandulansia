"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [userType, setUserType] = useState<string>("user")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple validation
    if (!email || !password) {
      setError("Silakan isi email dan password.")
      setIsLoading(false)
      return
    }

    // Simulate login process
    setTimeout(() => {
      try {
        // Demo users for testing
        const demoUsers: Record<string, { name: string; role: string; email: string; locationId?: number }> = {
          "john@user.com": { name: "John Doe", role: "user", email: "john@user.com" },
          "kader@posyandu.com": { name: "Dr. Sari Kader", role: "kader", email: "kader@posyandu.com", locationId: 1 },
          "admin@admin.com": { name: "Admin User", role: "admin", email: "admin@admin.com" },
        }

        const user = demoUsers[email]

        if (user && user.role === userType) {
          // Save to localStorage
          localStorage.setItem("user", JSON.stringify(user))

          // Redirect based on role
          if (user.role === "kader") {
            window.location.href = "/kader-dashboard"
          } else if (user.role === "admin") {
            window.location.href = "/admin-dashboard"
          } else {
            window.location.href = "/"
          }
        } else {
          setError("Email atau password tidak valid untuk tipe akun yang dipilih.")
        }
      } catch (error) {
        console.error("Login error:", error)
        setError("Terjadi kesalahan. Silakan coba lagi.")
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }

  const handleGoogleLogin = (type: string): void => {
    setIsLoading(true)

    setTimeout(() => {
      try {
        const user =
          type === "kader"
            ? { name: "Dr. Google Kader", role: "kader", email: "google.kader@example.com", locationId: 1 }
            : { name: "John Google", role: "user", email: "john.google@example.com" }

        localStorage.setItem("user", JSON.stringify(user))

        if (type === "kader") {
          window.location.href = "/kader-dashboard"
        } else {
          window.location.href = "/"
        }
      } catch (error) {
        console.error("Google login error:", error)
        setError("Terjadi kesalahan saat login dengan Google.")
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">LC</span>
            </div>
            <CardTitle className="text-2xl">Masuk ke Lansia Care</CardTitle>
            <CardDescription>Masuk untuk mengakses layanan Posyandu Lansia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label>Tipe Akun</Label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      userType === "user" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value="user"
                      checked={userType === "user"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Pengguna Umum</div>
                      <div className="text-xs text-gray-500">Lansia & Keluarga</div>
                    </div>
                  </label>
                  <label
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      userType === "kader" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value="kader"
                      checked={userType === "kader"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Kader Posyandu</div>
                      <div className="text-xs text-gray-500">Petugas Kesehatan</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={userType === "user" ? "john@user.com" : "kader@posyandu.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            <Separator />

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleGoogleLogin("user")}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Masuk sebagai Pengguna Umum
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleGoogleLogin("kader")}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Masuk sebagai Kader
              </Button>
            </div>

            <div className="text-center text-sm">
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Daftar di sini
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
