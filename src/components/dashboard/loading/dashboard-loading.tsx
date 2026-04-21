import { Skeleton } from "@/components/ui/skeleton";
import { SiteMark } from "../../branding/site-mark";

export function DashboardSkeleton() {
  return (
    <div className="flex items-start h-screen justify-start gap-3 w-full p-3">
      <SiteMark />
      {/* Sidebar Skeleton */}
      <Skeleton className="h-full w-64" />

      {/* Main Content Skeleton */}
      <div className="flex flex-col h-full gap-3 w-full">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 self-stretch" />
          ))}
        </div>

        {/* Chart Skeleton */}
        <Skeleton className="h-64 w-full" />

        {/* Table Skeleton */}
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}
