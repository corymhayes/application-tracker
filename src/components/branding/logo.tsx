import { ReadCvLogoIcon } from "@phosphor-icons/react";

export function Logo() {
  return (
    <div className="flex items-center gap-1">
      <ReadCvLogoIcon weight="fill" size={20} />
      <h1 className="text-xl font-bold tracking-tight">JobJournal</h1>
    </div>
  );
}
