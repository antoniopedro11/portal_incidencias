import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Portal de Incidências. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link 
              href="/termos"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Termos de Uso
            </Link>
            <Link 
              href="/privacidade"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Política de Privacidade
            </Link>
            <Link 
              href="/suporte"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Suporte
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 