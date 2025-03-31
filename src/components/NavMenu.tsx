"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";

export function NavMenu() {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "admin";

  const isActivePath = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  return (
    <div className="sticky top-0 z-50 bg-background border-b">
      <div className="flex h-16 items-center px-4 shadow-sm">
        <nav className="flex items-center space-x-6 text-base font-medium">
          <div className="font-bold text-xl">Portal de Incidências</div>
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Dashboard
          </Link>
          <Link
            href="/incidencias"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Minhas Incidências
          </Link>
          <Link
            href="/incidencias/nova"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Nova Incidência
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="transition-colors hover:text-foreground/80 text-foreground/60 font-bold"
            >
              Admin
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {session ? (
            <UserNav />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" passHref>
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/registro" passHref>
                <Button variant="default" size="sm">
                  Registrar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 