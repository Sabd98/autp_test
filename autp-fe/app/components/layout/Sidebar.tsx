"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, ShieldAlert, Users } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";

interface SidebarProps {
  isMobile: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard Monitoring", icon: LayoutDashboard },
  { href: "/dashboard/claims", label: "Data Klaim AUTP", icon: FileText },
  { href: "/dashboard/validation", label: "Validasi Klaim", icon: ShieldAlert },
  { href: "/dashboard/users", label: "Kelola Pengguna", icon: Users },
];

export default function Sidebar({
  isMobile,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname === href) return true;
    // For /dashboard, don't match child routes like /dashboard/validation
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/";
    }
    // For other routes, allow matching child paths
    return pathname.startsWith(href + "/");
  };

  return (
    <>
      <aside
        className={clsx(
          "fixed top-16 bottom-0 left-0 text-sidebar-foreground z-40 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-xl",
          "bg-sidebar border-r border-sidebar-border",
          isMobile
            ? isOpen
              ? "w-64 translate-x-0"
              : " -translate-x-full"
            : isOpen
              ? "w-64"
              : "w-16",
        )}
      >
        <nav className="flex flex-col gap-1 p-3 overflow-hidden whitespace-nowrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Button
                key={item.href}
                variant="ghost"
                className={clsx(
                  "flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg font-medium w-full transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
                asChild
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <Icon size={20} className="flex-shrink-0" />
                  <span className={clsx(!isOpen && "hidden")}>
                    {item.label}
                  </span>
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border overflow-hidden whitespace-nowrap text-center">
          <p
            className={clsx(
              "text-xs text-sidebar-foreground/70 transition-opacity",
              !isOpen && "hidden",
            )}
          >
            &copy; {new Date().getFullYear()} Sabda Avicenna
          </p>
          {!isOpen && (
            <Image src="/jasindo_logo.png" width={40} height={40} alt="Logo" />
          )}
        </div>
      </aside>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 pt-16 cursor-pointer"
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}
    </>
  );
}
