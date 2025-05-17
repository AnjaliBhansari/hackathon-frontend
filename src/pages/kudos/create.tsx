import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KudosCreationForm } from "@/presentation/features/kudos/components/kudos-creation-form";

export default function CreateKudosPage() {
  const [open, setOpen] = useState(false);

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
    <div className="container max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Create Kudos</h1>
      <div className="flex justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Create New Kudos</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Kudos</DialogTitle>
            </DialogHeader>
            <KudosCreationForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
