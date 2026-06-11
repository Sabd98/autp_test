"use client";

import { useRouter } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuthStore } from "@/app/store/useAuthStore";
import Image from "next/image";

interface HeaderProps {
  isMobile: boolean;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function Header({
  isMobile,
  isSidebarOpen = true,
  onToggleSidebar,
}: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-border bg-white fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Button
          onClick={onToggleSidebar}
          variant="ghost"
          size="icon"
          aria-label="Toggle Sidebar"
          type="button"
        >
          {isMobile ? (
            isSidebarOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )
          ) : (
            <Menu size={20} />
          )}
        </Button>
        <div className="flex items-center gap-2">
          <Image
            src="/img_logo_jasindo.png"
            width={100}
            height={100}
            alt="Picture of the author"
          />
          <span className="text-muted-foreground font-medium text-sm hidden sm:inline">
            AUTP Portal
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-2 h-auto py-1 px-3"
        >
          <div className="w-6 h-6 bg-jasindo rounded-full flex items-center justify-center text-white flex-shrink-0">
            <User size={14} />
          </div>
          <span className="text-xs font-semibold hidden md:inline text-foreground">
            {user?.name}
          </span>
        </Button>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="icon"
          className="text-destructive hover:bg-destructive/10"
          title="Keluar Aplikasi"
          aria-label="Logout"
        >
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
}
