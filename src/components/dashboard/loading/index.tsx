import { ApplicationPipelineLoading } from "./application-pipeline-loading";
import { LoadingTable } from "./loading";
import { StatLoading } from "./stat-loading";
import {
  CalendarDotsIcon,
  SpinnerBallIcon,
  EnvelopeSimpleOpenIcon,
  FileTextIcon,
} from "@phosphor-icons/react";

export function StatsLoading() {
  return (
    <div className="flex flex-col w-full gap-3 mt-4 px-3 self-start">
      <div className="flex justify-evenly gap-3">
        <StatLoading title="Total this month">
          <CalendarDotsIcon size={16} />
        </StatLoading>
        <StatLoading title="In progress">
          <SpinnerBallIcon size={16} />
        </StatLoading>
        <StatLoading title="Response rate">
          <EnvelopeSimpleOpenIcon size={16} />
        </StatLoading>
        <StatLoading title="Total applications">
          <FileTextIcon size={16} />
        </StatLoading>
      </div>
      <ApplicationPipelineLoading />
      <LoadingTable loadingState="loading" />
    </div>
  );
}
