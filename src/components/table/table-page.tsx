// import type { Application } from "@/types/Application";
import { useMemo } from "react";
import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Application } from "@/applicationSchema";
import { TableIcon } from "@phosphor-icons/react";

interface TablePageProps {
  applications: Application[];
  onEdit: (application: Application) => void;
}

export function TablePage({ applications, onEdit }: TablePageProps) {
  const columns = useMemo(() => createColumns(onEdit), [onEdit]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TableIcon size={16} weight="fill" />
          Applications table
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={applications} />
      </CardContent>
    </Card>
  );
}
