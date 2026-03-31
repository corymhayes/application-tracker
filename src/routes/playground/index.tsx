import { createFileRoute } from "@tanstack/react-router";
import ForgotPassword from "@/components/auth/forgot-password";

export const Route = createFileRoute("/playground/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPassword />;
}
