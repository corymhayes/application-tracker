import { ApplicationPipelineLoading } from "@/components/dashboard/loading/application-pipeline-loading";
import { DashboardLoading } from "@/components/dashboard/loading/dashboard-loading";
import { LoadingTable } from "@/components/dashboard/loading/table";
// import { StatLoading } from "@/components/dashboard/loading/stat-loading";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Loading State Gallery</h1>

      <div>
        <h2>Stat Loading</h2>
        <div className="grid grid-cols-4 gap-3">
          {/*{Array.from({ length: 4 }).map((_, i) => (
            <StatLoading title="test"></StatLoading>
          ))}*/}
        </div>
      </div>

      <div>
        <h2>Table Loading</h2>
        <LoadingTable loadingState="loading" />
      </div>

      <div>
        <h2>Pipeline Loading</h2>
        <ApplicationPipelineLoading />
      </div>

      <div>
        <h2>Dashboard Skeleton</h2>
        <DashboardLoading />
      </div>
    </div>
  );
}
