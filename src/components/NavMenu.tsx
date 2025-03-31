"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function NavMenu() {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isAdmin = session?.user?.role === "ADMIN";

  const isActivePath = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e links principais */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center"
            >
              <Logo size={32} />
              <span className="ml-2 text-lg font-bold hidden sm:block">Portal de Incidências</span>
            </Link>
            <div className="ml-10 hidden md:flex space-x-2">
              <Link 
                href="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActivePath("/dashboard") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/incidencias" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActivePath("/incidencias") 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Incidências
              </Link>
              <Link 
                href="/incidencias/nova" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/incidencias/nova" 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Nova Incidência
              </Link>
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActivePath("/admin") 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  Painel Admin
                </Link>
              )}
            </div>
          </div>

          {/* Menu do usuário */}
          <div className="relative flex items-center">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Botão móvel */}
            <div className="md:hidden flex items-center mx-4">
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground focus:outline-none"
                aria-label="Menu principal"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Botão do perfil */}
            <div>
              <button
                type="button"
                className="flex items-center text-sm rounded-full focus:outline-none"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
                </div>
                <span className="ml-2 hidden sm:block font-medium truncate max-w-[100px]">
                  {session?.user?.name || session?.user?.email?.split("@")[0]}
                </span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1 text-muted-foreground" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>

            {/* Menu dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div 
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="px-4 py-2 text-sm text-muted-foreground border-b">
                    Conectado como<br />
                    <span className="font-medium text-foreground">
                      {session?.user?.email}
                    </span>
                  </div>
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
                    role="menuitem"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/incidencias" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
                    role="menuitem"
                  >
                    Minhas Incidências
                  </Link>
                  <Link 
                    href="/incidencias/nova" 
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
                    role="menuitem"
                  >
                    Nova Incidência
                  </Link>
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
                      role="menuitem"
                    >
                      Painel Admin
                    </Link>
                  )}
                  <div className="border-t border-border">
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted" 
                      role="menuitem"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu móvel (versão expandida) */}
      <div className="hidden md:hidden px-2 pt-2 pb-4">
        <Link 
          href="/dashboard" 
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActivePath("/dashboard") 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          Dashboard
        </Link>
        <Link 
          href="/incidencias" 
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActivePath("/incidencias") 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          Incidências
        </Link>
        <Link 
          href="/incidencias/nova" 
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            pathname === "/incidencias/nova" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          Nova Incidência
        </Link>
        {isAdmin && (
          <Link 
            href="/admin" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActivePath("/admin") 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            Painel Admin
          </Link>
        )}
      </div>
    </nav>
  );
} 