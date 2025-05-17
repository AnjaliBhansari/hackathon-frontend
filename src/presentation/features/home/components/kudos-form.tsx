import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  TEAM_OPTIONS,
  CATEGORY_OPTIONS,
  KUDOS_TEMPLATES,
} from "../constants/options";
import { KudosPreview } from "./kudos-preview";

interface KudosFormProps {
  onSubmit: (data: {
    recipientName: string;
    teamName: string;
    category: string;
    message: string;
    templateId: string;
  }) => Promise<void>;
}

export function KudosForm({ onSubmit }: KudosFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    recipientName: "",
    teamName: "",
    category: "",
    message: "",
    templateId: "basic" as const,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      setError("Failed to create kudos");
    } finally {
      setLoading(false);
    }
  }

  const handleRecipientNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, recipientName: e.target.value });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, message: e.target.value });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Kudos</CardTitle>
          <CardDescription>
            Recognize and appreciate your colleagues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient's Name</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={handleRecipientNameChange}
                placeholder="Enter recipient's name"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Select
                value={formData.teamName}
                onValueChange={(value) =>
                  setFormData({ ...formData, teamName: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleMessageChange}
                placeholder="Write your message of appreciation..."
                required
                disabled={loading}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="templateId">Card Template</Label>
              <Select
                value={formData.templateId}
                onValueChange={(value: "basic") =>
                  setFormData({ ...formData, templateId: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {KUDOS_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Kudos"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Preview</h2>
        <KudosPreview {...formData} />
      </div>
    </div>
  );
}
