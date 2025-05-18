import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { KudosCreationForm } from "@/presentation/features/kudos/components/kudos-creation-form";
import { useKudos } from "@/hooks/useKudos";

interface KudosModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onKudosCreated?: () => void;
}

export function KudosModal({ open, setOpen, onKudosCreated }: KudosModalProps) {
  const { refreshKudos } = useKudos();

  const handleSubmit = async (data: {
    userId: number;
    createdByUserId: number;
    teamName: string;
    category: string;
    message: string;
  }) => {
    try {
      // Refresh the kudos list
      await refreshKudos();
      // Notify parent component
      onKudosCreated?.();
      // Close the dialog
      setOpen(false);
    } catch (error) {
      console.error('Error refreshing kudos:', error);
    }
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
