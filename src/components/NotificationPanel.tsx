"use client";

import { useState } from "react";
import { Bell, Check } from "lucide-react";
import Toggle from "./Toggle";

interface Notification {
  id: number;
  message: string;
  time: string;
  type: "success" | "info" | "warning";
}

const notificationColors = {
  success: "bg-[#22c55e]",
  info: "bg-[#0066FF]",
  warning: "bg-[#f59e0b]",
};

interface NotificationPanelProps {
  notifications?: Notification[];
}

const defaultNotifications: Notification[] = [
  { id: 1, message: "Your call has been confirmed.", time: "1 hour ago", type: "success" },
  { id: 2, message: "You have a new message!", time: "1 hour ago", type: "info" },
  { id: 3, message: "Your subscription is expiring soon!", time: "2 hours ago", type: "warning" },
];

export default function NotificationPanel({ notifications = defaultNotifications }: NotificationPanelProps) {
  const [pushEnabled, setPushEnabled] = useState(false);

  return (
    <div className="bg-[#1a1a1a] border-3 border-white p-5 shadow-[4px_4px_0_0_#fff] w-full max-w-sm">
      <div className="mb-4">
        <h3 className="text-white font-bold text-lg">Notifications</h3>
        <p className="text-gray-400 text-sm">You have {notifications.length} unread messages.</p>
      </div>

      <div className="border-2 border-white p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-white" />
          <div>
            <p className="text-white font-semibold text-sm">Push Notifications</p>
            <p className="text-gray-400 text-xs">Send notifications to device.</p>
          </div>
        </div>
        <Toggle defaultChecked={pushEnabled} onChange={setPushEnabled} />
      </div>

      <div className="space-y-3 mb-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start gap-3">
            <div className={`w-2 h-2 mt-2 ${notificationColors[notification.type]}`} />
            <div>
              <p className="text-white text-sm">{notification.message}</p>
              <p className="text-gray-500 text-xs">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-[#0066FF] border-2 border-white py-3 text-white font-semibold flex items-center justify-center gap-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#fff] shadow-[4px_4px_0_0_#fff] transition-all">
        <Check className="w-4 h-4" />
        Mark all as read
      </button>
    </div>
  );
}

