import { KudosCreator } from "@/presentation/features/kudos/components/kudos-creator";

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
    <div className="container max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Create Kudos</h1>
      <KudosCreator onSubmit={handleSubmit} />
    </div>
  );
}
