import { WarningIcon } from "@phosphor-icons/react";

export function AppError() {
  return (
    <div className="flex items-center justify-center gap-3">
      <WarningIcon weight="fill" size={32} />
      <div className="bg-white/20 w-px h-10"></div>
      <p className="text-sm">
        Unable to load data
        <br />
        Please refresh to try again
      </p>
    </div>
  );
}
