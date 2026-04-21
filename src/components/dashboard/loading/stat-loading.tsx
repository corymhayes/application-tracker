import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatLoading({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card className="h-32 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {children}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        <Skeleton className="size-5" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
}
