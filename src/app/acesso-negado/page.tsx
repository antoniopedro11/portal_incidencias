"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AcessoNegado() {
  const router = useRouter();

  // Redireciona para a página inicial após 5 segundos
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Acesso Negado</h1>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <p className="text-lg mb-4">
            Você não possui permissões necessárias para acessar esta área.
          </p>
          <p className="text-gray-600 mb-4">
            Esta seção é restrita a administradores do sistema.
            Caso acredite que deveria ter acesso, entre em contato com um administrador.
          </p>
          <p className="text-sm text-gray-500">
            Você será redirecionado para a página inicial em 5 segundos.
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
} 