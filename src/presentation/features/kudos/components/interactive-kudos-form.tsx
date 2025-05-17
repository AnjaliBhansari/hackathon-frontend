import { useState, useEffect } from "react";
import { KudosCard } from "./kudos-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Category options with their display names and values
const KUDOS_CATEGORIES = [
  { label: "Well Done", value: "well-done" },
  { label: "Great Teamwork", value: "great-teamwork" },
  { label: "Innovation Champion", value: "innovation-champion" },
  { label: "Amazing Support", value: "amazing-support" },
  { label: "Leadership Excellence", value: "leadership-excellence" },
  { label: "Efficiency Expert", value: "efficiency-expert" },
  { label: "Above and Beyond", value: "above-and-beyond" },
  { label: "Positive Attitude", value: "positive-attitude" },
  { label: "Outstanding Achievement", value: "outstanding-achievement" },
  { label: "Magical Mindset", value: "magical-mindset" },
];

const TEAM_OPTIONS = [
  "Marketing Team",
  "Engineering Team",
  "Design Team",
  "Product Team",
  "Sales Team",
  "Customer Support",
];

interface InteractiveKudosFormProps {
  onSubmit: (data: {
    recipientName: string;
    teamName: string;
    category: string;
    message: string;
    templateId: string;
  }) => void;
}

export function InteractiveKudosForm({ onSubmit }: InteractiveKudosFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    categoryValue: "",
    recipientName: "",
    teamName: "",
    message: "",
  });
  const [recipientSuggestions, setRecipientSuggestions] = useState<string[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to fetch recipients - replace with actual API call
  const fetchRecipients = async (query: string) => {
    // TODO: Replace with actual API call
    const mockRecipients = [
      "Sarah Chen",
      "Samuel Brown",
      "Sophie Taylor",
      "Steve Wilson",
    ].filter((name) => name.toLowerCase().includes(query.toLowerCase()));
    setRecipientSuggestions(mockRecipients);
  };

  const handleRecipientSearch = (query: string) => {
    setFormData((prev) => ({ ...prev, recipientName: query }));
    if (query.length > 1) {
      fetchRecipients(query);
    } else {
      setRecipientSuggestions([]);
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    onSubmit({
      recipientName: formData.recipientName,
      teamName: formData.teamName,
      category: formData.categoryValue,
      message: formData.message,
      templateId: "1", // You might want to handle this differently
    });
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div
            className={`h-2 flex-1 rounded ${
              currentStep >= 1 ? "bg-primary" : "bg-gray-200"
            }`}
          />
          <div
            className={`h-2 flex-1 rounded ${
              currentStep >= 2 ? "bg-primary" : "bg-gray-200"
            }`}
          />
          <div
            className={`h-2 flex-1 rounded ${
              currentStep >= 3 ? "bg-primary" : "bg-gray-200"
            }`}
          />
          <div
            className={`h-2 flex-1 rounded ${
              currentStep >= 4 ? "bg-primary" : "bg-gray-200"
            }`}
          />
        </div>

        {/* Step 1: Category Selection */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Choose a Category</h2>
            <div className="grid grid-cols-2 gap-4">
              {KUDOS_CATEGORIES.map((category) => (
                <Button
                  key={category.value}
                  variant={
                    formData.categoryValue === category.value
                      ? "default"
                      : "outline"
                  }
                  className="h-24 flex flex-col items-center justify-center text-center p-4"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      category: category.label,
                      categoryValue: category.value,
                    }))
                  }
                >
                  <span className="text-2xl mb-2">★</span>
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Recipient Selection */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Recipient</h2>
            <div className="relative">
              <Input
                placeholder="Type recipient's name..."
                value={formData.recipientName}
                onChange={(e) => handleRecipientSearch(e.target.value)}
              />
              {recipientSuggestions.length > 0 && (
                <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                  {recipientSuggestions.map((name) => (
                    <button
                      key={name}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          recipientName: name,
                        }));
                        setRecipientSuggestions([]);
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Select
              value={formData.teamName}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, teamName: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {TEAM_OPTIONS.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Step 3: Message */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Write Your Message</h2>
            <Textarea
              placeholder="Write your kudos message here..."
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="h-32"
            />
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Review and Submit</h2>
            <p className="text-gray-600">
              Please review your kudos before submitting. Make sure all details
              are correct.
            </p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !formData.categoryValue) ||
                (currentStep === 2 &&
                  (!formData.recipientName || !formData.teamName)) ||
                (currentStep === 3 && !formData.message)
              }
              className="ml-auto"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="ml-auto"
            >
              {isLoading ? "Submitting..." : "Submit Kudos"}
            </Button>
          )}
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6">Preview</h2>
        <KudosCard
          category={formData.category || "Select a Category"}
          categoryValue={formData.categoryValue || "well-done"}
          recipientName={formData.recipientName || "Recipient Name"}
          teamName={formData.teamName || "Team Name"}
          message={formData.message || "Your message will appear here..."}
          senderName="You"
          date='Mar 11, 2025'
        />
      </div>
    </div>
  );
}
