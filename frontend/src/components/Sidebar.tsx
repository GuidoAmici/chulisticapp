'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  FolderHeart, 
  Users, 
  Lightbulb, 
  Calendar,
  Plus,
  LogOut,
  User
} from 'lucide-react';
import styles from './Sidebar.module.css';
import QuickCapture from './QuickCapture';
import { signOut, useSession } from 'next-auth/react';

const NAV_ITEMS = [
  { label: 'Tablero', href: '/', icon: LayoutDashboard },
  { label: 'Tareas', href: '/tareas', icon: CheckCircle2 },
  { label: 'Proyectos', href: '/proyectos', icon: FolderHeart },
  { label: 'Contactos', href: '/contactos', icon: Users },
  { label: 'Ideas', href: '/ideas', icon: Lightbulb },
  { label: 'Diario', href: '/diario', icon: Calendar },
  { label: 'Perfil', href: '/perfil', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div style={{ backgroundColor: 'var(--accent)', padding: '6px', borderRadius: '10px' }}>
            🌸
          </div>
          <span>Chulistic</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <button className={styles.quickCapture} onClick={() => setIsCaptureOpen(true)}>
            <Plus size={20} />
            Captura Rápida
          </button>

          {session?.user && (
            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                {session.user.image && (
                  <img src={session.user.image} alt="User" className={styles.avatar} />
                )}
                <span className={styles.userName}>{session.user.name}</span>
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: '/auth/signin' })} 
                className={styles.logoutBtn}
                title="Cerrar Sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </aside>

      <QuickCapture isOpen={isCaptureOpen} onClose={() => setIsCaptureOpen(false)} />
    </>
  );
}
