import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/shadcn/card";

interface KudosTemplateProps {
  title: string;
  icon: React.ReactNode;
  categoryValue: string;
  isSelected?: boolean;
  onClick?: () => void;
  isPreview?: boolean;
  children?: React.ReactNode;
}

// Define unique styles for each category
const CATEGORY_STYLES = {
  "Great Teamwork": {
    bgGradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-blue-400",
    shadowColor: "shadow-blue-200",
  },
  "Innovation Champion": {
    bgGradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-purple-400",
    shadowColor: "shadow-purple-200",
  },
  "Amazing Support": {
    bgGradient: "bg-gradient-to-r from-teal-500 to-emerald-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-teal-400",
    shadowColor: "shadow-teal-200",
  },
  "Leadership Excellence": {
    bgGradient: "bg-gradient-to-r from-amber-500 to-orange-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-amber-400",
    shadowColor: "shadow-amber-200",
  },
  "Efficiency Expert": {
    bgGradient: "bg-gradient-to-r from-green-500 to-lime-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-green-400",
    shadowColor: "shadow-green-200",
  },
  "above and beyond": {
    bgGradient: "bg-gradient-to-r from-red-500 to-rose-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-red-400",
    shadowColor: "shadow-red-200",
  },
  "positive attitude": {
    bgGradient: "bg-gradient-to-r from-yellow-400 to-amber-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-yellow-400",
    shadowColor: "shadow-yellow-200",
  },
  "Well Done": {
    bgGradient: "bg-gradient-to-r from-violet-500 to-purple-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-violet-400",
    shadowColor: "shadow-violet-200",
  },
  "outstanding achievement": {
    bgGradient: "bg-gradient-to-r from-fuchsia-500 to-pink-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-fuchsia-400",
    shadowColor: "shadow-fuchsia-200",
  },
  "Magical Mindset": {
    bgGradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
    iconColor: "text-white",
    textColor: "text-white",
    borderColor: "border-indigo-400",
    shadowColor: "shadow-indigo-200",
  },
};

export function KudosTemplateCard({
  title,
  icon,
  categoryValue,
  isSelected = false,
  onClick,
  isPreview = false,
  children,
}: KudosTemplateProps) {
  const styles =
    CATEGORY_STYLES[categoryValue as keyof typeof CATEGORY_STYLES] ||
    CATEGORY_STYLES["Well Done"];

  return (
    <Card
      className={cn(
        "relative p-6 cursor-pointer transition-all duration-200 border-2 shadow-lg hover:shadow-xl",
        styles.bgGradient,
        isSelected ? "ring-4 ring-white ring-opacity-60" : "hover:scale-105",
        isPreview ? "w-full" : "w-[280px]",
        styles.borderColor,
        styles.shadowColor
      )}
      onClick={onClick}
    >
      <div className={cn("absolute top-4 right-4", styles.iconColor)}>
        {icon}
      </div>
      <div className={cn("text-lg font-semibold mb-4", styles.textColor)}>
        {title}
      </div>
      <div className={cn(styles.textColor, "opacity-90")}>{children}</div>
    </Card>
  );
}
