"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, type ResetPasswordInput } from "@/lib/validation";
import { resetPassword } from "@/actions/auth.actions";
import { AuthCard } from "@/components/auth/auth-card";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ResetPasswordInput) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await resetPassword(values);

      if (result.error) {
        setError(result.error);
      }

      if (result.success && result.message) {
        setSuccess(result.message);
        form.reset();
      }
    });
  };

  return (
    <AuthCard
      title="Forgot Password?"
      description="Enter your email address and we'll send you a reset link"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john@example.com"
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>

          <Link href="/login">
            <Button variant="ghost" className="w-full" type="button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Button>
          </Link>
        </form>
      </Form>
    </AuthCard>
  );
}
