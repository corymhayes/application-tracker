import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export function ApplicationPipelineValueLoading({ title }: { title: string }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-lg font-semibold">
        <Skeleton className="size-5" />
      </CardContent>
    </Card>
  );
}
