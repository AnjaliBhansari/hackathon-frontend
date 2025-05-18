import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
import { KudosCard } from "./kudos-card";
import { useUsers } from "@/hooks/useUsers";
import { KudosService } from "@/services/kudos.service";
import { useToast } from "@/hooks/use-toast";
import { TEAM_OPTIONS } from "@/presentation/features/kudos/constants/options";
import { getUserInfo } from "@/utils/auth";

const CATEGORIES = [
  { value: "great-teamwork", label: "Great Teamwork" },
  { value: "innovation-champion", label: "Innovation Champion" },
  { value: "amazing-support", label: "Amazing Support" },
  { value: "leadership-excellence", label: "Leadership Excellence" },
  { value: "efficiency-expert", label: "Efficiency Expert" },
  { value: "above-and-beyond", label: "Above and Beyond" },
  { value: "positive-attitude", label: "Positive Attitude" },
  { value: "well-done", label: "Well Done" },
  { value: "outstanding-achievement", label: "Outstanding Achievement" },
  { value: "magical-mindset", label: "Magical Mindset" },
];

interface KudosCreationFormProps {
  onSubmit: (data: {
    userId: number;
    createdByUserId: number;
    teamName: string;
    category: string;
    message: string;
  }) => void;
}

export function KudosCreationForm({ onSubmit }: KudosCreationFormProps) {
  const [formData, setFormData] = useState({
    recipientName: "",
    teamName: "",
    category: "",
    message: "",
  });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { users, loading, searchQuery, setSearchQuery } =
    useUsers(isSearchFocused);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!selectedUserId) {
      toast({
        title: "Error",
        description: "Please select a recipient",
        variant: "destructive",
      });
      return;
    }

    if (!formData.teamName || !formData.category || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const userInfo = localStorage.getItem("userInfo");
      const createdByUserId = userInfo ? JSON.parse(userInfo).id : null;
      if (!createdByUserId) {
        throw new Error("User not logged in");
      }

      const kudosService = KudosService.getInstance();
      const kudosData = {
        userId: selectedUserId,
        createdByUserId,
        teamName: formData.teamName,
        category: CATEGORIES.find((c) => c.value === formData.category)?.label || formData.category,
        message: formData.message,
      };

      console.log("Making API call with data:", kudosData);

      const response = await kudosService.createKudos(kudosData);
      console.log("API Response:", response);

      toast({
        title: "Success",
        description: "Kudos created successfully!",
        variant: "default",
      });

      // Reset form
      setFormData({
        recipientName: "",
        teamName: "",
        category: "",
        message: "",
      });
      setSelectedUserId(null);
      setSearchQuery("");

      // Call the original onSubmit for any additional handling
      onSubmit(kudosData);
    } catch (error) {
      console.error("Error creating kudos:", error);
      toast({
        title: "Error",
        description: "Failed to create kudos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-8 min-h-[500px] h-full">
      {/* Form Section */}
      <div className="space-y-6 h-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient's Name</Label>
            <div className="relative" ref={dropdownRef}>
              <Input
                id="recipientName"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Type to search recipient..."
                className="w-full"
              />
              {showDropdown && searchQuery.length >= 2 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border">
                  {loading ? (
                    <div className="p-2 text-sm text-gray-500">Loading...</div>
                  ) : users.length > 0 ? (
                    <div className="max-h-60 overflow-auto">
                      {users.map((user) => (
                        <div
                          key={user.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleChange("recipientName", user.name);
                            setSelectedUserId(Number(user.id));
                            setSearchQuery(user.name);
                            setShowDropdown(false);
                            setIsSearchFocused(false);
                          }}
                        >
                          {user.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2 text-sm text-gray-500">
                      No users found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Select
              value={formData.teamName}
              onValueChange={(value) => handleChange("teamName", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {TEAM_OPTIONS.map((team) => (
                  <SelectItem key={team.value} value={team.label}>
                    {team.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
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
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Write your message here..."
              required
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Kudos"}
          </Button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="flex h-full w-full">
        <Card className="h-full w-full flex items-center justify-center">
          <KudosCard
            category={
              CATEGORIES.find((c) => c.value === formData.category)?.label ||
              "Preview"
            }
            categoryValue={
              CATEGORIES.find((c) => c.value === formData.category)?.label ||
              "Well Done"
            }
            recipientName={formData.recipientName || "Preview"}
            teamName={formData.teamName || "Team"}
            message={formData.message || "Your message will appear here"}
            creator={{ name: (getUserInfo()?.name || "Admin") }}
            date={new Date().toISOString()}
          />
        </Card>
      </div>
    </div>
  );
}
