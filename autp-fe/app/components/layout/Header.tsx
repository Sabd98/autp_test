"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, User, ChevronDown, KeyRound, LogOut } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useAuthStore } from "@/app/store/useAuthStore";
import { ProfileModal } from "@/app/components/profile/ProfileModal";
import { ResetPasswordModal } from "@/app/components/profile/ResetPasswordModal";
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
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
            {isMobile ? (
             <Image
              src="/jasindo_logo.png"
              width={40}
              height={40}
              alt="Logo"
            />
            ) : (
              <Image
              src="/img_logo_jasindo.png"
              width={100}
              height={100}
              alt="Picture of the author"
            />
            )}
          
            <span className="text-muted-foreground font-medium text-sm hidden sm:inline">
              AUTP Portal
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 h-auto py-1 px-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <div className="w-6 h-6 bg-jasindo rounded-full flex items-center justify-center text-white shrink-0">
                <User size={14} />
              </div>
              <span className="text-xs font-semibold hidden md:inline text-foreground">
                {user?.name}
              </span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              {user?.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setProfileOpen(true)}>
              <User size={14} />
              Lihat Profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setResetPasswordOpen(true)}>
              <KeyRound size={14} />
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut size={14} />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
      <ResetPasswordModal open={resetPasswordOpen} onOpenChange={setResetPasswordOpen} />
    </>
  );
}
