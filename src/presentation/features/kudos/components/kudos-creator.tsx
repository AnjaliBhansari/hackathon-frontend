import { useState } from "react";
import { KudosTemplateCard } from "./kudos-template-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  ThumbsUp,
  Users,
  Lightbulb,
  Heart,
  Star,
  Zap,
  Target,
  Smile,
  Sparkles,
  Search,
} from "lucide-react";
import { CATEGORY_OPTIONS, TEAM_OPTIONS } from "../constants/options";

// Map icons to categories
const CATEGORY_ICONS = {
  "great-teamwork": <Users className="w-6 h-6" />,
  "innovation-champion": <Lightbulb className="w-6 h-6" />,
  "amazing-support": <Heart className="w-6 h-6" />,
  "leadership-excellence": <Star className="w-6 h-6" />,
  "efficiency-expert": <Zap className="w-6 h-6" />,
  "above-and-beyond": <Target className="w-6 h-6" />,
  "positive-attitude": <Smile className="w-6 h-6" />,
  "well-done": <ThumbsUp className="w-6 h-6" />,
  "outstanding-achievement": <Trophy className="w-6 h-6" />,
  "magical-mindset": <Sparkles className="w-6 h-6" />,
};

interface KudosCreatorProps {
  onSubmit: (data: {
    recipientName: string;
    teamName: string;
    category: string;
    message: string;
    templateId: string;
  }) => void;
}

export function KudosCreator({ onSubmit }: KudosCreatorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");
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
    setRecipientName(query);
    if (query.length > 1) {
      fetchRecipients(query);
    } else {
      setRecipientSuggestions([]);
    }
  };

  const handleSubmit = () => {
    if (!selectedCategory || !recipientName || !teamName || !message) return;

    setIsLoading(true);
    onSubmit({
      recipientName,
      teamName,
      category: selectedCategory,
      message,
      templateId: selectedCategory,
    });
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Category Selection */}
      {!selectedCategory ? (
        <>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Choose a Recognition Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {CATEGORY_OPTIONS.map((category) => (
              <KudosTemplateCard
                key={category.value}
                title={category.label}
                icon={
                  CATEGORY_ICONS[category.value as keyof typeof CATEGORY_ICONS]
                }
                categoryValue={category.value}
                onClick={() => setSelectedCategory(category.value)}
              >
                <div className="mt-4 min-h-[60px] flex items-center justify-center text-center">
                  <p className="text-sm opacity-90">
                    Click to create a {category.label.toLowerCase()} kudos
                  </p>
                </div>
              </KudosTemplateCard>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => setSelectedCategory(null)}
          >
            ← Choose Different Category
          </Button>

          <KudosTemplateCard
            title={
              CATEGORY_OPTIONS.find((c) => c.value === selectedCategory)
                ?.label || ""
            }
            icon={
              CATEGORY_ICONS[selectedCategory as keyof typeof CATEGORY_ICONS]
            }
            categoryValue={selectedCategory}
            isPreview
          >
            <div className="space-y-6 mt-6">
              {/* Recipient Search */}
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-white opacity-70" />
                  <Input
                    placeholder="Search recipient..."
                    value={recipientName}
                    onChange={(e) => handleRecipientSearch(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                </div>
                {recipientSuggestions.length > 0 && (
                  <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                    {recipientSuggestions.map((name) => (
                      <button
                        key={name}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-900"
                        onClick={() => {
                          setRecipientName(name);
                          setRecipientSuggestions([]);
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Team Selection */}
              <Select value={teamName} onValueChange={setTeamName}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_OPTIONS.map((team) => (
                    <SelectItem key={team.value} value={team.value}>
                      {team.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Message */}
              <Textarea
                placeholder="Write your kudos message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />

              <Button
                className="w-full bg-white/20 hover:bg-white/30 text-white"
                onClick={handleSubmit}
                disabled={!recipientName || !teamName || !message || isLoading}
              >
                {isLoading ? "Sending..." : "Send Kudos"}
              </Button>
            </div>
          </KudosTemplateCard>
        </div>
      )}
    </div>
  );
}
