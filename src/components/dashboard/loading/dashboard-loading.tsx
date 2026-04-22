import { SiteMark } from "../../branding/site-mark";
import { StatLoading } from "./stat-loading";
import {
  CalendarDotsIcon,
  EnvelopeSimpleOpenIcon,
  FileTextIcon,
  SpinnerBallIcon,
} from "@phosphor-icons/react";
import { ApplicationPipelineLoading } from "./application-pipeline-loading";
import { LoadingTable } from "./table";
import SidebarLoading from "./sidebar-loading";

export function DashboardLoading() {
  return (
    <div className="flex items-start h-screen justify-start gap-3 w-full pr-3">
      <SiteMark />
      {/* Sidebar Skeleton */}
      <SidebarLoading />

      {/* Main Content Skeleton */}
      <div className="flex flex-col h-full gap-3 w-full">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3 mt-3">
          <StatLoading title="Total this month">
            <CalendarDotsIcon size={16} weight="fill" />
          </StatLoading>
          <StatLoading title="In progress">
            <SpinnerBallIcon size={16} weight="fill" />
          </StatLoading>
          <StatLoading title="Response rate">
            <EnvelopeSimpleOpenIcon size={16} weight="fill" />
          </StatLoading>
          <StatLoading title="Total applications">
            <FileTextIcon size={16} weight="fill" />
          </StatLoading>
        </div>

        {/* Chart Skeleton */}
        <ApplicationPipelineLoading />

        {/* Table Skeleton */}
        <LoadingTable loadingState="loading" />
      </div>
    </div>
  );
}
