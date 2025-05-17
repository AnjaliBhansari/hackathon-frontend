import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KudosCreationForm } from "@/presentation/features/kudos/components/kudos-creation-form";

interface KudosModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function KudosModal({ open, setOpen }: KudosModalProps) {
  const handleSubmit = async (data: {
    userId: number;
    createdByUserId: number;
    teamName: string;
    category: string;
    message: string;
  }) => {
    // Just close the dialog after successful submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Kudos</DialogTitle>
        </DialogHeader>
        <KudosCreationForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
