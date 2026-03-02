'use client';

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
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
