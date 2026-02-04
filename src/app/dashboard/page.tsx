import { requireAuth } from "@/actions/session.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { logout } from "@/actions/auth.actions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await requireAuth();

  async function handleLogout() {
    "use server";
    await logout();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session.user?.name}!
            </p>
          </div>
          <form action={handleLogout}>
            <Button variant="outline">Sign Out</Button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Name
                </p>
                <p className="text-lg">{session.user?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-lg">{session.user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Role
                </p>
                <p className="text-lg capitalize">
                  {session.user?.role || "user"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
              <CardDescription>Current account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Status
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Email Verified
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  Yes
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
