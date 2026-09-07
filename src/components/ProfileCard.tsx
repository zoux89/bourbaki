"use client";

import { Github, Mail, Globe } from "lucide-react";

interface SocialLink {
  icon: "github" | "email" | "website";
  url: string;
  label: string;
}

interface ProfileCardProps {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  socials?: SocialLink[];
}

const iconMap = {
  github: Github,
  email: Mail,
  website: Globe,
};

export default function ProfileCard({
  name,
  title,
  bio,
  avatar,
  socials = [],
}: ProfileCardProps) {
  return (
    <div className="bg-[#1a1a1a] border-3 border-white shadow-[4px_4px_0_0_#fff] p-6">
      <div className="flex flex-col items-center text-center mb-6">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 border-3 border-white mb-4 object-cover"
          />
        ) : (
          <div className="w-24 h-24 border-3 border-white mb-4 bg-[#0066FF] flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
        <p className="text-[#0066FF] font-semibold mb-3">{title}</p>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{bio}</p>
      </div>

      {socials.length > 0 && (
        <div className="flex justify-center gap-3 flex-wrap">
          {socials.map((social, index) => {
            const Icon = iconMap[social.icon];
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-[#0066FF] transition-colors group"
                title={social.label}
              >
                <Icon className="w-5 h-5 text-white" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

