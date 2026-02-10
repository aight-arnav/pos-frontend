"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/commons/buttons/PrimaryButton";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      await signup({ email, password });
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="text-sm text-muted-foreground">
              Get started in just a few seconds
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <PrimaryButton
              className="w-full mt-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating account…" : "Sign up"}
            </PrimaryButton>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}