import { getDailyNote } from '@/lib/vault';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import styles from './diario.module.css';
import ReactMarkdown from 'react-markdown';

export default async function DiarioPage() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const note = await getDailyNote(today);
  
  return (
    <div className="fade-in">
      <header className={styles.header}>
        <h1 className={styles.title}>Mi Diario 📓</h1>
        <p className={styles.subtitle}>
          Planifica tu día y reflexiona sobre tus logros.
        </p>
      </header>

      <div className={styles.content}>
        <div className={styles.dateHeader}>
          <h2>{format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}</h2>
        </div>

        {note ? (
          <div className={styles.markdown}>
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Aún no has creado el plan para hoy.</p>
            <button className={styles.createBtn}>Crear Plan de Hoy</button>
          </div>
        )}
      </div>
    </div>
  );
}
