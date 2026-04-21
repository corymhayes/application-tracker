import { createFileRoute, redirect } from "@tanstack/react-router";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { authClient } from "@/worker/auth";
import { lazy, Suspense } from "react";
import { DashboardSkeleton } from "@/components/dashboard/loading/dashboard-loading";

const AppContent = lazy(() =>
  import("./-AppContent").then((m) => ({ default: m.default }))
);

export const Route = createFileRoute("/app/")({
  component: App,
  beforeLoad: async () => {
    const { data } = await authClient.getSession();

    if (!data?.session) {
      throw redirect({
        to: "/",
      });
    }
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <QueryErrorResetBoundary>
        {() => (
          <Suspense fallback={<DashboardSkeleton />}>
            <AppContent />
          </Suspense>
        )}
      </QueryErrorResetBoundary>
    </ErrorBoundary>
  );
}
