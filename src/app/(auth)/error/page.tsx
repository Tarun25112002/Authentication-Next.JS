import { AuthCard } from "@/components/auth/auth-card";
import { FormError } from "@/components/auth/form-error";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <AuthCard
      title="Authentication Error"
      description="Oops! Something went wrong"
    >
      <div className="flex flex-col items-center space-y-4">
        <FormError message="An error occurred during authentication. Please try again." />
        <Link href="/login" className="w-full">
          <Button className="w-full">Back to login</Button>
        </Link>
      </div>
    </AuthCard>
  );
}
