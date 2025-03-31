import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
        <p className="mb-6">Desculpe, não conseguimos encontrar a página que você está procurando.</p>
        
        <div className="space-y-4">
          <div>
            <Link href="/" className="text-blue-500 hover:underline">
              Voltar para a página inicial
            </Link>
          </div>
          
          <div>
            <Link href="/login" className="text-blue-500 hover:underline">
              Ir para login
            </Link>
          </div>
          
          <div>
            <Link href="/registro" className="text-blue-500 hover:underline">
              Registrar-se
            </Link>
          </div>
          
          <div>
            <Link href="/test" className="text-blue-500 hover:underline">
              Testar autenticação
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 