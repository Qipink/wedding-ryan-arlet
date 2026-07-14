import React from "react";
import { motion } from "motion/react";
import { Home, Calendar, Image as ImageIcon, Mail, MessageSquare } from "lucide-react";

interface FloatingNavbarProps {
  activeTab: string;
  scrollToSection: (id: string) => void;
}

export default function FloatingNavbar({ activeTab, scrollToSection }: FloatingNavbarProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "acara", label: "Acara", icon: Calendar },
    { id: "gallery", label: "Galeri", icon: ImageIcon },
    { id: "rsvp", label: "RSVP", icon: Mail },
    { id: "wish", label: "Ucapan", icon: MessageSquare },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-brand-bg/95 backdrop-blur-md p-1.5 rounded-full border border-brand-outline-variant shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex items-center gap-1 sm:gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`relative p-3 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group ${
                isActive
                  ? "text-white scale-110 shadow-md"
                  : "text-brand-outline hover:text-brand-primary hover:bg-brand-surface-container/50"
              }`}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <Icon className="w-5 h-5 stroke-[2.2px] relative z-10" />
              
              {isActive && (
                <motion.span
                  layoutId="activeTabPill"
                  className="absolute inset-0 rounded-full bg-brand-primary"
                  style={{ zIndex: 5 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              {isActive && (
                <motion.span
                  layoutId="activeTabDot"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-white"
                  style={{ zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-brand-primary text-white text-[10px] font-bold py-1 px-2.5 rounded-md shadow-md pointer-events-none whitespace-nowrap z-50">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
