import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ApplicationPipelineValueError({ title }: { title: string }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-lg font-semibold">
        <span>--</span>
      </CardContent>
    </Card>
  );
}
