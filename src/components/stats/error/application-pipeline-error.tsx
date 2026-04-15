import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ApplicationPipelineValueError } from "./application-pipeline-value-error";

export function ApplicationPipelineError() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications pipeline</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="w-full h-6 flex mt-2 mb-8">
          <div className="h-6 w-full bg-secondary"></div>
        </div>
        <div className="flex gap-5 w-full">
          <ApplicationPipelineValueError title="Applied" />
          <ApplicationPipelineValueError title="Recruiter Screen" />
          <ApplicationPipelineValueError title="Initial Interview" />
          <ApplicationPipelineValueError title="Technical Interview" />
          <ApplicationPipelineValueError title="Final Interview" />
          <ApplicationPipelineValueError title="Offer" />
          <ApplicationPipelineValueError title="Rejected" />
          <ApplicationPipelineValueError title="Withdrawn" />
        </div>
      </CardContent>
    </Card>
  );
}
