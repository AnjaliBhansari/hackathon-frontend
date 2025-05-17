import { KudosForm } from "@/presentation/features/kudos/components/kudos-form";

export default function CreateKudosPage() {
  const handleSubmit = async (data: {
    recipientName: string;
    teamName: string;
    category: string;
    message: string;
    templateId: string;
  }) => {
    // TODO: Implement kudos creation logic
    console.log("Creating kudos:", data);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Create Kudos</h1>
      <KudosForm onSubmit={handleSubmit} />
    </div>
  );
}
