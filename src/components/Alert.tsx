"use client";

import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

interface AlertProps {
  variant?: "success" | "warning" | "error" | "info";
  title: string;
  description?: string;
}

const variants = {
  success: {
    icon: CheckCircle,
    bg: "bg-[#0066FF]",
    iconColor: "text-[#22c55e]",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-[#f59e0b]",
    iconColor: "text-black",
  },
  error: {
    icon: XCircle,
    bg: "bg-[#ef4444]",
    iconColor: "text-white",
  },
  info: {
    icon: Info,
    bg: "bg-[#0066FF]",
    iconColor: "text-white",
  },
};

export default function Alert({ variant = "success", title, description }: AlertProps) {
  const { icon: Icon, bg, iconColor } = variants[variant];

  return (
    <div
      className={`${bg} border-3 border-white p-4 flex items-start gap-3 shadow-[4px_4px_0_0_#fff]`}
    >
      <Icon className={`${iconColor} w-5 h-5 mt-0.5 flex-shrink-0`} />
      <div className="flex flex-col gap-1">
        <span className="font-bold text-white text-sm">{title}</span>
        {description && (
          <span className="text-white/90 text-sm">{description}</span>
        )}
      </div>
    </div>
  );
}

