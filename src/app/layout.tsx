import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { authOptions } from '@/lib/auth';
import AssistenteVirtual from '@/components/assistente-virtual';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from '@/components/providers/auth-provider';
import { NavMenu } from '@/components/NavMenu';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portal de Incidências',
  description: 'Portal de gestão de incidências',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NavMenu />
            <main>{children}</main>
            <Footer />
            <AssistenteVirtual />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 