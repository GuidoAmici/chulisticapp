import { getPeople } from '@/lib/vault';
import styles from './contactos.module.css';
import { Users, Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

export default async function ContactosPage() {
  const people = await getPeople();
  
  return (
    <div className="fade-in">
      <header className={styles.header}>
        <h1 className={styles.title}>Mis Contactos 👥</h1>
        <p className={styles.subtitle}>Cuida tus relaciones y mantén el contacto.</p>
      </header>

      <div className={styles.grid}>
        {people.map((person) => (
          <Link href={`/contactos/${person.slug}`} key={person.slug} className={styles.card}>
            <div className={styles.avatar}>
              {person.title.charAt(0).toUpperCase()}
            </div>
            <h2 className={styles.name}>{person.title}</h2>
            
            {person.frontmatter['last-contact'] && (
              <div className={styles.lastContact}>
                <Calendar size={14} />
                <span>Último contacto: {person.frontmatter['last-contact']}</span>
              </div>
            )}
            
            <div className={styles.footer}>
              {person.frontmatter.tags && (
                <div className={styles.tags}>
                  {person.frontmatter.tags.map((tag: string) => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
