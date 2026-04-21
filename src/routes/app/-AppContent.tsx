import type { Application } from "../../applicationSchema";
import { StatsLoading } from "@/components/dashboard/loading";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { api } from "@/lib/api";
import { authClient } from "@/worker/auth";
import { SignedIn } from "@neondatabase/neon-js/auth/react";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useState,
  lazy,
  Suspense,
} from "react";
import type { User } from "@/types/User";
import { DashboardErrorBoundary } from "@/components/dashboard-error-boundary";
import { SiteMark } from "@/components/branding/site-mark";
import { AppError } from "@/components/dashboard/app-error";
import { useQuery } from "@tanstack/react-query";
import DashboardView from "@/components/dashboard/view";

const SidebarLayout = lazy(() =>
  import("@/components/dashboard/sidebar/layout").then((m) => ({
    default: m.SidebarLayout,
  }))
);

/**
 *
 * @returns AppContent()
 */
export default function AppContent() {
  const [userData, setUserData] = useState<User>();
  const [selectedApplication, setSelectedApplication] = useState<
    Application | undefined
  >(undefined);

  const { data, status } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data } = await api.request("/api");

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid applications data received");
      }

      return data;
    },
  });

  const { data: stats, status: statsStatus } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { stats } = await api.request("/api/stats");

      if (!stats) {
        throw new Error("Invalid applications data received");
      }

      return stats;
    },
  });

  const handleClearSelection = useCallback(() => {
    setSelectedApplication(undefined);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await authClient.getSession();
        setUserData(data?.user);
      } catch (err) {
        console.error("Failed to load user data: ", err);
      }
    };

    getUser();
  }, []);

  return (
    <DashboardErrorBoundary>
      <SiteMark />
      <SignedIn>
        <ThemeProvider>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "16rem",
                "--sidebar-width-mobile": "20rem",
              } as CSSProperties
            }
            className="flex items-center justify-center"
          >
            <Suspense fallback={<StatsLoading />}>
              <SidebarLayout
                selectedApplication={selectedApplication}
                onClearSelection={handleClearSelection}
                userData={userData}
              />
            </Suspense>
            {status === "pending" || statsStatus === "pending" ? (
              <StatsLoading />
            ) : status === "error" || statsStatus === "error" ? (
              <AppError />
            ) : (
              <DashboardView
                data={data}
                stats={stats}
                setSelectedApplication={setSelectedApplication}
              />
            )}
          </SidebarProvider>
        </ThemeProvider>
      </SignedIn>
    </DashboardErrorBoundary>
  );
}
