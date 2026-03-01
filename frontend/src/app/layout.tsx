import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";

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
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ 
              marginLeft: '260px', 
              padding: '40px', 
              flex: 1,
              minHeight: '100vh',
              maxWidth: '1200px'
            }}>
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
