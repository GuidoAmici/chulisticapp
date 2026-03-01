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
  Plus
} from 'lucide-react';
import styles from './Sidebar.module.css';
import QuickCapture from './QuickCapture';

const NAV_ITEMS = [
  { label: 'Tablero', href: '/', icon: LayoutDashboard },
  { label: 'Tareas', href: '/tareas', icon: CheckCircle2 },
  { label: 'Proyectos', href: '/proyectos', icon: FolderHeart },
  { label: 'Contactos', href: '/contactos', icon: Users },
  { label: 'Ideas', href: '/ideas', icon: Lightbulb },
  { label: 'Diario', href: '/diario', icon: Calendar },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);

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

        <button className={styles.quickCapture} onClick={() => setIsCaptureOpen(true)}>
          <Plus size={20} />
          Captura Rápida
        </button>
      </aside>

      <QuickCapture isOpen={isCaptureOpen} onClose={() => setIsCaptureOpen(false)} />
    </>
  );
}
