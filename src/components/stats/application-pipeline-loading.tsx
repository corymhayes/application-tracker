import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ApplicationPipelineValueLoading } from "./application-pipeline-value-loading";
import { Skeleton } from "../ui/skeleton";

export function ApplicationPipelineLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications pipeline</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="w-full h-6 flex mt-2 mb-8">
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="flex gap-5 w-full">
          <ApplicationPipelineValueLoading title="Applied" />
          <ApplicationPipelineValueLoading title="Recruiter Screen" />
          <ApplicationPipelineValueLoading title="Initial Interview" />
          <ApplicationPipelineValueLoading title="Technical Interview" />
          <ApplicationPipelineValueLoading title="Final Interview" />
          <ApplicationPipelineValueLoading title="Offer" />
          <ApplicationPipelineValueLoading title="Rejected" />
          <ApplicationPipelineValueLoading title="Withdrawn" />
        </div>
      </CardContent>
    </Card>
  );
}
