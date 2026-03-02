import { getPeople } from '@/lib/vault';
import styles from './contactos.module.css';
import { 
  Users, 
  Plus, 
  Search,
  MessageCircle,
  Mail
} from 'lucide-react';
import Link from 'next/link';

export default async function ContactosPage() {
  const people = await getPeople();

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Mis Contactos 👥</h1>
          <p className={styles.subtitle}>Personas clave en tu red y proyectos.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={20} />
          Nueva Persona
        </button>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input type="text" placeholder="Buscar personas..." />
        </div>
      </div>

      <div className={styles.grid}>
        {people.map((person: any) => (
          <Link href={`/contactos/${person.slug}`} key={person.slug} className={styles.card}>
            <div className={styles.avatar}>
              {person.title.charAt(0).toUpperCase()}
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{person.title}</h3>
              <div className={styles.meta}>
                <Users size={14} />
                <span>Contacto</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.actionBtn}><MessageCircle size={18} /></button>
              <button className={styles.actionBtn}><Mail size={18} /></button>
            </div>
          </Link>
        ))}
      </div>

      {people.length === 0 && (
        <div className={styles.empty}>
          <p>No hay contactos guardados.</p>
        </div>
      )}
    </div>
  );
}
