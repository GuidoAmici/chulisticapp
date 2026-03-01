import { getTasks, getStatusLabel } from '@/lib/vault';
import styles from './tareas.module.css';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

export default async function TareasPage() {
  const tasks = await getTasks();
  
  const categories = [
    { id: 'pending', label: 'Pendientes', icon: Circle, color: '#f0928d' },
    { id: 'in-progress', label: 'En curso', icon: Clock, color: '#94bdbf' },
    { id: 'complete', label: 'Completadas', icon: CheckCircle2, color: '#22c55e' },
  ];

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <h1 className={styles.title}>Mis Tareas 📝</h1>
        <p className={styles.subtitle}>Organiza tus pendientes y alcanza tus metas.</p>
      </header>

      <div className={styles.categories}>
        {categories.map((cat) => {
          const catTasks = tasks.filter(t => t.status === cat.id);
          const Icon = cat.icon;

          return (
            <section key={cat.id} className={styles.category}>
              <div className={styles.categoryHeader}>
                <Icon size={20} style={{ color: cat.color }} />
                <h2>{cat.label}</h2>
                <span className={styles.count}>{catTasks.length}</span>
              </div>

              <div className={styles.taskList}>
                {catTasks.map((task) => (
                  <Link href={`/tareas/${task.slug}`} key={task.slug} className={styles.taskCard}>
                    <div className={styles.taskMain}>
                      <h3 className={styles.taskTitle}>{task.title}</h3>
                      {task.due && (
                        <div className={styles.taskDue}>
                          <AlertCircle size={14} />
                          <span>Vence el {task.due}</span>
                        </div>
                      )}
                    </div>
                    {task.frontmatter.tags && (
                      <div className={styles.tags}>
                        {task.frontmatter.tags.map((tag: string) => (
                          <span key={tag} className={styles.tag}>#{tag}</span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
                {catTasks.length === 0 && (
                  <p className={styles.empty}>No hay tareas aquí.</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
