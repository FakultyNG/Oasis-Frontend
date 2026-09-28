import type { Metadata } from "next";
import { LoginScreen } from "@/components/auth/login-screen";
export const metadata: Metadata = { title: "Create Account" };
export default function SignupPage() { return <LoginScreen initialMode="signup" />; }
