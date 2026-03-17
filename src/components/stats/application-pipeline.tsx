import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ApplicationPipelineValue } from "./application-pipeline-value";
import type { Pipeline } from "@/types/Pipeline";

export function ApplicationPipeline({ status }: { status: Pipeline[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications pipeline</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="w-full h-4 flex mt-2 mb-8">
          <div
            className="bg-yellow-400"
            style={{ width: `${status[0].percentage}%` }}
          ></div>
          <div
            className="bg-purple-400"
            style={{ width: `${status[1].percentage}%` }}
          ></div>
          <div
            className="bg-blue-400"
            style={{ width: `${status[2].percentage}%` }}
          ></div>
          <div
            className="bg-indigo-400"
            style={{ width: `${status[3].percentage}%` }}
          ></div>
          <div
            className="bg-green-400"
            style={{ width: `${status[4].percentage}%` }}
          ></div>
          <div
            className="bg-red-400"
            style={{ width: `${status[5].percentage}%` }}
          ></div>
          <div
            className="bg-pink-400"
            style={{ width: `${status[6].percentage}%` }}
          ></div>
        </div>

        <div className="flex gap-5 w-full">
          {status.map((stat) => (
            <ApplicationPipelineValue title={stat.name} value={stat.value} />
          ))}
          {/*<ApplicationPipelineValue title= value={} />
          <ApplicationPipelineValue title="Recruiter Screen" value={0} />
          <ApplicationPipelineValue title="Technical Interview" value={1} />
          <ApplicationPipelineValue title="Final Interview" value={0} />
          <ApplicationPipelineValue title="Offer" value={0} />
          <ApplicationPipelineValue title="Rejected" value={5} />
          <ApplicationPipelineValue title="Withdrawn" value={0} />*/}
        </div>
      </CardContent>
    </Card>
  );
}
