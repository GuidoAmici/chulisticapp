'use client';

import { useSession } from 'next-auth/react';
import { useTheme } from '@/components/ThemeProvider';
import { User, Mail, ShieldCheck, Palette, AtSign, CheckCircle2 } from 'lucide-react';
import styles from './perfil.module.css';

export default function PerfilPage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  if (!session) return null;

  const fullName = session.user?.name || '';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || 'N/A';
  const lastName = nameParts.slice(1).join(' ') || 'N/A';
  const email = session.user?.email || 'N/A';
  const username = email.split('@')[0];

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <h1 className={styles.title}>Mi Perfil 👤</h1>
        <p className={styles.subtitle}>Gestiona tu cuenta y personaliza tu experiencia.</p>
      </header>

      <div className={styles.grid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <User size={20} />
            <h2>Información Personal</h2>
          </div>
          <div className={styles.card}>
            <div className={styles.field}>
              <span className={styles.label}>Nombre</span>
              <span className={styles.value}>{firstName}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Apellido</span>
              <span className={styles.value}>{lastName}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Nombre de usuario</span>
              <div className={styles.valueGroup}>
                <AtSign size={14} />
                <span className={styles.value}>{username}</span>
              </div>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Email</span>
              <div className={styles.valueGroup}>
                <Mail size={14} />
                <span className={styles.value}>{email}</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <ShieldCheck size={20} />
            <h2>Cuentas Vinculadas</h2>
          </div>
          <div className={styles.card}>
            <div className={styles.linkedAccount}>
              <div className={styles.accountInfo}>
                <img src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} />
                <div>
                  <span className={styles.accountName}>Google Account</span>
                  <span className={styles.accountStatus}>Conectado como {email}</span>
                </div>
              </div>
              <CheckCircle2 size={20} className={styles.connectedIcon} />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Palette size={20} />
            <h2>Personalización</h2>
          </div>
          <div className={styles.themeSelector}>
            <button 
              className={`${styles.themeOption} ${theme === 'light' ? styles.active : ''}`}
              onClick={() => setTheme('light')}
            >
              <div className={styles.themePreview} style={{ backgroundColor: '#fdfaf9' }}>
                <div style={{ backgroundColor: '#f0928d', width: '40%', height: '8px', borderRadius: '4px' }}></div>
              </div>
              <span>Chulistic Light</span>
            </button>
            <button 
              className={`${styles.themeOption} ${theme === 'new-haze' ? styles.active : ''}`}
              onClick={() => setTheme('new-haze')}
            >
              <div className={styles.themePreview} style={{ backgroundColor: '#1a1b26' }}>
                <div style={{ backgroundColor: '#bb9af7', width: '40%', height: '8px', borderRadius: '4px' }}></div>
              </div>
              <span>New Haze</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
