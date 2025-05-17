import { cn } from "@/shared/utils/cn";
import { KUDOS_TEMPLATES } from "../constants/options";

interface KudosPreviewProps {
  recipientName: string;
  teamName: string;
  category: string;
  message: string;
  templateId: string;
}

export function KudosPreview({
  recipientName,
  teamName,
  category,
  message,
  templateId,
}: KudosPreviewProps) {
  const template =
    KUDOS_TEMPLATES.find((t) => t.id === templateId) ?? KUDOS_TEMPLATES[0];

  return (
    <div className={cn("w-full transition-all", template.className)}>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">To: {recipientName}</h3>
          <p className="text-sm opacity-90">Team: {teamName}</p>
          <p className="text-sm opacity-90">Category: {category}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}
