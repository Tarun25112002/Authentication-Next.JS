"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "@/actions/auth.actions";
import { AuthCard } from "@/components/auth/auth-card";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const result = await verifyEmail(token);

      if (result.error) {
        setError(result.error);
      }

      if (result.success && result.message) {
        setSuccess(result.message);
      }
    } catch {
      setError("Something went wrong!");
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AuthCard
      title="Email Verification"
      description="Confirming your email address"
    >
      <div className="flex flex-col items-center space-y-4">
        {!success && !error && (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              Verifying your email...
            </span>
          </div>
        )}

        <FormError message={error} />
        <FormSuccess message={success} />

        {(success || error) && (
          <Link href="/login" className="w-full">
            <Button className="w-full">Back to login</Button>
          </Link>
        )}
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
