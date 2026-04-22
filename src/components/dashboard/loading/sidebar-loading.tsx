import { Button } from "@/components/ui/button";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";

export default function SidebarLoading() {
  return (
    <div className="h-full bg-sidebar flex flex-col justify-between">
      <div className="flex flex-col gap-6 px-6">
        <div className="w-full flex justify-evenly mt-5">
          <img src="logo-alt.png" className="w-32" alt="job journal logo" />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Status</Label>
          <Select>
            <SelectTrigger className="w-full">&nbsp;</SelectTrigger>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Company</Label>
          <Input />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Job</Label>
          <Input />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Work Style</Label>
          <Select>
            <SelectTrigger className="w-full">&nbsp;</SelectTrigger>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Job Posting</Label>
          <Input />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Date Applied</Label>
          <Button
            variant="secondary"
            className="justify-start font-normal w-60 gap-2 border-input"
          >
            <CalendarIcon />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Date Response</Label>
          <Button
            variant="secondary"
            className="justify-start font-normal w-60 gap-2 border-input"
          >
            <CalendarIcon />
          </Button>
        </div>

        <div className="mt-6 flex gap-3">
          <Button type="submit" form="application-form">
            Submit
          </Button>
          <Button type="button" variant="outline">
            Clear
          </Button>
        </div>
      </div>

      {/*User info*/}
      <div className="h-18 w-full self-end border-t-input border-t"></div>
    </div>
  );
}
