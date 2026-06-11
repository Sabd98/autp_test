"use client";

import { useState } from "react";
import clsx from "clsx";
import { useResponsiveLayout } from "@/app/hooks/useResponsiveLayout";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isMobile } = useResponsiveLayout();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      <div className="flex flex-1 pt-16 relative">
        <Sidebar
          isMobile={isMobile}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* MAIN CONTENT AREA */}
        <main
          className={clsx(
            "flex-1 p-6 transition-all duration-300 min-w-0",
            !isMobile && isSidebarOpen && "ml-64"
          )}
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
