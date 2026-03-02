import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "Chulistic - Tu Cerebro Digital",
  description: "Una forma visual y bonita de organizar tu vida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <ThemeProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <div style={{ display: 'flex' }}>
      {!isAuthPage && <Sidebar />}
      <main style={{ 
        marginLeft: isAuthPage ? '0' : '260px', 
        padding: isAuthPage ? '0' : '40px', 
        flex: 1,
        minHeight: '100vh',
        maxWidth: isAuthPage ? 'none' : '1200px'
      }}>
        {children}
      </main>
    </div>
  );
}
