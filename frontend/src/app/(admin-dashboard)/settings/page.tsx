"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Key, Lock, Mail, Shield, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import Link from "next/link"
import { settingsApi } from "@/lib/settings-api"

interface PasswordFormData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function SettingsPage() {
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isNotifying, setIsNotifying] = useState(false)
  const [notifyProgress, setNotifyProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePasswordChange = (field: keyof PasswordFormData, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }))
  }

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const validatePasswordForm = (): string | null => {
    if (!passwordForm.oldPassword) return "Current password is required"
    if (!passwordForm.newPassword) return "New password is required"
    if (passwordForm.newPassword.length < 8) return "New password must be at least 8 characters"
    if (passwordForm.newPassword === passwordForm.oldPassword)
      return "New password must be different from current password"
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return "Passwords do not match"
    return null
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validatePasswordForm()
    if (validationError) {
      toast.error(validationError)
      return
    }

    setIsChangingPassword(true)

    try {
      await settingsApi.changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      })

      toast.success("Password changed successfully!")
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" })
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to change password")
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleNotifySubscribers = async () => {
    setIsNotifying(true)
    setNotifyProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setNotifyProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 15
        })
      }, 200)

      await settingsApi.notifySubscribers()

      clearInterval(progressInterval)
      setNotifyProgress(100)

      setTimeout(() => {
        setShowSuccess(true)
        toast.success("All subscribers have been notified successfully!")
        setTimeout(() => {
          setShowSuccess(false)
          setNotifyProgress(0)
        }, 3000)
      }, 500)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to notify subscribers")
      setNotifyProgress(0)
    } finally {
      setTimeout(() => setIsNotifying(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-100">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account security and system preferences</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Password Change Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-red-100">
                  <Key className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password to keep your account secure</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="oldPassword"
                        type={showPasswords.old ? "text" : "password"}
                        value={passwordForm.oldPassword}
                        onChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
                        placeholder="Enter your current password"
                        className="pr-10"
                        disabled={isChangingPassword}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("old")}
                        disabled={isChangingPassword}
                      >
                        {showPasswords.old ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                        placeholder="Enter your new password"
                        className="pr-10"
                        disabled={isChangingPassword}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("new")}
                        disabled={isChangingPassword}
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                        placeholder="Confirm your new password"
                        className="pr-10"
                        disabled={isChangingPassword}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("confirm")}
                        disabled={isChangingPassword}
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isChangingPassword} className="gap-2">
                    {isChangingPassword ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Changing Password...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Change Password
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Separator />

          {/* Notification Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Subscriber Notifications</CardTitle>
                  <CardDescription>Send lock update notifications to all subscribers</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">About Lock Update Notifications</h4>
                  <p className="text-sm text-blue-700">
                    This will send a notification to all active subscribers about system lock updates. The process may
                    take a few minutes depending on the number of subscribers.
                  </p>
                </div>

                {isNotifying && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Notifying subscribers...</span>
                        <span className="font-medium">{Math.round(notifyProgress)}%</span>
                      </div>
                      <Progress value={notifyProgress} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      Please don't close this page while notifications are being sent.
                    </p>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={handleNotifySubscribers}
                    disabled={isNotifying}
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    {isNotifying ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending Notifications...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        Notify All Subscribers
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Animation Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
              <div className="mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto animate-bounce" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">Operation completed successfully.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
