"use client"

import { useState, useEffect } from "react"
import { User, Lock, Shield, Camera, Eye, EyeOff, Smartphone, Mail, Phone, MapPin, Save, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useProfileStore } from "@/store/user-profile-store";
import { profileApi } from "@/lib/user-profile-api";

export default function ProfilePage() {
  const { user, isLoading, fetchProfile, updateProfile } = useProfileStore()

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  })

  // Password states
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  // UI states
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isUnsubscribed, setIsUnsubscribed] = useState(false)


  // Load profile data on component mount
  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      })
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setIsUpdating(true)
    try {
      await updateProfile(formData)
      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleChangePassword = async () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in both password fields")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    setIsChangingPassword(true)
    try {
      await profileApi.changePassword({ newPassword: passwordData.newPassword })
      toast.success("Password changed successfully!")
      setPasswordData({ newPassword: "", confirmPassword: "" })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to change password")
    } finally {
      setIsChangingPassword(false)
    }
  }

  const getInitials = () => {
    if (!user) return "U"
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
  }

  const getFullName = () => {
    if (!user) return "User"
    return `${user.firstName || ""} ${user.lastName || ""}`.trim()
  }



  const handleToggle = (value: boolean) => {
    if (isUnsubscribed) {
      toast.error("Subscription is already cancelled.")
      return
    }
    if (value) {
      setDialogOpen(true)
    }
  }

  const handleUnsubscribe = async () => {
    try {
      await profileApi.unsubscribe()
      toast.success("Your subscription has been cancelled.")
      setIsUnsubscribed(true)
      setSmsNotifications(true) // keep it ON
      setDialogOpen(false)
    } catch (err: any) {
      toast.error(err.message)
      setDialogOpen(false)
    }
  }
  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Profile Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage your account settings, security preferences, and personal information.
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            size="sm"
            onClick={handleSaveProfile}
            disabled={isUpdating}
            className="h-8 gap-1 px-5 bg-[#D92A1B] text-white hover:bg-red-700 transition-colors duration-300 ease-in-out"
          >
            <Save className="h-3.5 w-3.5" />
            <span className="xs:inline">{isUpdating ? "Saving..." : "Save Changes"}</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-md bg-blue-50">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <p className="text-sm text-muted-foreground">Update your personal details and contact information.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={user?.email || ""}
                        className="pl-10"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    placeholder="123 Main St, City, State 12345"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="pl-10 min-h-[80px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password Security */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-md bg-red-50">
                <Lock className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Password & Security</CardTitle>
                <p className="text-sm text-muted-foreground">Update your password and manage security settings.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains at least one number</li>
                  <li>• Contains at least one special character</li>
                </ul>
              </div>
              <Button
                onClick={handleChangePassword}
                disabled={isChangingPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                className="w-full bg-[#D92A1B] text-white hover:bg-red-700"
              >
                {isChangingPassword ? "Changing Password..." : "Change Password"}
              </Button>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-md bg-green-50">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
                className="data-[state=checked]:bg-green-600"
              />
            </CardHeader>
            {twoFactorEnabled && (
              <CardContent className="space-y-4">
                <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center">
                  <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="font-medium mb-2">Scan QR Code</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use your authenticator app to scan this QR code and set up 2FA.
                  </p>
                  <Button variant="outline" size="sm">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Setup Authenticator App
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input id="verificationCode" placeholder="Enter 6-digit code" maxLength={6} />
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Profile Sidebar */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-background">
                    <AvatarImage src="/user-avatar.png" alt="Profile" />
                    <AvatarFallback className="bg-red-500 text-white text-xl font-semibold">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>

                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{getFullName()}</h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.subscriptionStatus === "active" ? "Premium Member" : "Free Member"}
                  </p>
                  <Badge variant="secondary" className="mt-2 bg-red-50 text-red-700">
                    {user?.subscriptionStatus === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Account Type</span>
                  <Badge className="bg-red-500 hover:bg-red-600">
                    {user?.subscriptionStatus === "active" ? "Premium" : "Expired"}
                  </Badge>
                </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm">Subscription End Date</span>
                  <span className="text-sm text-muted-foreground">
                    {user?.subscriptionEndDate
                      ? new Date(user.subscriptionEndDate).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                      : 'N/A'}
                  </span>
                </div>

                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Verified</span>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ID Verified</span>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Verified
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={(value) => {
                      if (!value) {
                        toast.error('You cannot disable email notifications.');
                        return;  // Do not change state
                      }
                      setEmailNotifications(value);
                    }}
                    className="data-[state=checked]:bg-red-500"
                  />

                </div>
                <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-sm font-medium">Subscription Cancel</span>
          <p className="text-xs text-muted-foreground">Cancel your Subscription</p>
        </div>
        <Switch
          checked={smsNotifications}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-red-500"
        />
      </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure you want to cancel your subscription?</DialogTitle>
      <p className="text-sm text-muted-foreground mt-2">
        By canceling, you'll lose access to all premium features, including exclusive content, priority support, and future updates.
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        We’d be sad to see you go. If there’s anything we can improve, let us know — your feedback matters!
      </p>
    </DialogHeader>
    <DialogFooter className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={() => setDialogOpen(false)}>
        Keep Subscription
      </Button>
      <Button className="bg-red-500 hover:bg-red-600" onClick={handleUnsubscribe}>
        Yes, Cancel It
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </>
  )
}
