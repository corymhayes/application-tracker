import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ApplicationPipelineValue } from "./application-pipeline-value";

export function ApplicationPipeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications pipeline</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="w-full h-4 flex mt-2 mb-8">
          <div className="w-[67%]  bg-yellow-400 rounded-l-full"></div>
          <div className="w-[0%]  bg-purple-400"></div>
          <div className="w-[12%]  bg-blue-400"></div>
          <div className="w-[0%]  bg-indigo-400"></div>
          <div className="w-[0%]  bg-green-400"></div>
          <div className="w-[42%]  bg-red-400 rounded-r-full"></div>
          <div className="w-[0%]  bg-pink-400"></div>
        </div>

        <div className="flex gap-5 w-full">
          <ApplicationPipelineValue title="Applied" value={12} />
          <ApplicationPipelineValue title="Recruiter Screen" value={0} />
          <ApplicationPipelineValue title="Technical Interview" value={1} />
          <ApplicationPipelineValue title="Final Interview" value={0} />
          <ApplicationPipelineValue title="Offer" value={0} />
          <ApplicationPipelineValue title="Rejected" value={5} />
          <ApplicationPipelineValue title="Withdrawn" value={0} />
        </div>
      </CardContent>
    </Card>
  );
}
