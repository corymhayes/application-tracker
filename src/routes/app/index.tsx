import type { Application } from "../../applicationSchema";
import { SidebarLayout } from "@/components/sidebar/layout";
import { ApplicationPipeline } from "@/components/stats/application-pipeline";
import { ApplicationPipelineLoading } from "@/components/stats/application-pipeline-loading";
import { LoadingStats } from "@/components/stats/loading";
import { StatBoxes } from "@/components/stats/stat-boxes";
import { LoadingTable } from "@/components/table/loading";
import { TablePage } from "@/components/table/table-page";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { api } from "@/lib/api";
import { authClient } from "@/worker/auth";
import { SignedIn } from "@neondatabase/neon-js/auth/react";
import {
  CalendarDotsIcon,
  EnvelopeSimpleOpenIcon,
  FileTextIcon,
  SpinnerBallIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { type CSSProperties, useCallback, useEffect, useState } from "react";
import type { User } from "@/types/User";
import { DashboardErrorBoundary } from "@/components/dashboard-error-boundary";
import { ErrorBoundary } from "@/components/error-boundary";
import { SiteMark } from "@/components/branding/site-mark";

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

function AppContent() {
  const [userData, setUserData] = useState<User>();

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

  const [selectedApplication, setSelectedApplication] = useState<
    Application | undefined
  >(undefined);

  const handleEdit = useCallback((application: Application) => {
    setSelectedApplication(application);
  }, []);

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
            <SidebarLayout
              selectedApplication={selectedApplication}
              onClearSelection={handleClearSelection}
              userData={userData}
            />
            {status === "pending" || statsStatus === "pending" ? (
              <div className="flex flex-col w-full gap-3 mt-4 px-3 self-start">
                <div className="flex justify-evenly gap-3">
                  <LoadingStats title="Total this month">
                    <CalendarDotsIcon size={16} />
                  </LoadingStats>
                  <LoadingStats title="In progress">
                    <SpinnerBallIcon size={16} />
                  </LoadingStats>
                  <LoadingStats title="Response rate">
                    <EnvelopeSimpleOpenIcon size={16} />
                  </LoadingStats>
                  <LoadingStats title="Total applications">
                    <FileTextIcon size={16} />
                  </LoadingStats>
                </div>
                <ApplicationPipelineLoading />
                <LoadingTable loadingState="loading" />
              </div>
            ) : status === "error" || statsStatus === "error" ? (
              <div className="flex items-center justify-center gap-3">
                <WarningIcon weight="fill" size={32} />
                <div className="bg-white/10 w-px h-10"></div>
                <p className="text-sm">
                  Unable to load data
                  <br />
                  Please refresh to try again
                </p>
              </div>
            ) : (
              <div className="flex flex-col w-full gap-3 mt-4 px-3 self-start">
                <div className="flex justify-evenly gap-3">
                  <StatBoxes
                    title="Total this month"
                    stat={stats.applications_in_month.numberOfApps}
                    lastMonth={stats.applications_in_month.percentageChange}
                    showChange
                  >
                    <CalendarDotsIcon size={16} weight="fill" />
                  </StatBoxes>
                  <StatBoxes
                    title="In progress"
                    stat={stats.in_progress.inProgress}
                    lastMonth={stats.in_progress.percentageChange}
                    showChange
                  >
                    <SpinnerBallIcon size={16} weight="fill" />
                  </StatBoxes>
                  <StatBoxes
                    title="Response rate"
                    stat={Math.floor(stats.response_rate.currentResponses)}
                    lastMonth={stats.response_rate.percentageChange}
                    percentage
                    showChange
                  >
                    <EnvelopeSimpleOpenIcon size={16} weight="fill" />
                  </StatBoxes>
                  <StatBoxes title="Total applications" stat={data.length}>
                    <FileTextIcon size={16} weight="fill" />
                  </StatBoxes>
                </div>
                <ApplicationPipeline status={stats.pipeline} />
                <TablePage applications={data} onEdit={handleEdit} />
              </div>
            )}
          </SidebarProvider>
        </ThemeProvider>
      </SignedIn>
    </DashboardErrorBoundary>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryErrorResetBoundary>{() => <AppContent />}</QueryErrorResetBoundary>
    </ErrorBoundary>
  );
}

export default App;
