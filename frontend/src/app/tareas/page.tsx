import { getTasks, getStatusLabel } from '@/lib/vault';
import styles from './tareas.module.css';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar,
  Plus,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default async function TareasPage() {
  const tasks = await getTasks();

  const statusIcons: Record<string, any> = {
    'pending': { icon: Circle, color: '#f0928d' },
    'in-progress': { icon: Clock, color: '#94bdbf' },
    'complete': { icon: CheckCircle2, color: '#22c55e' },
  };

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Mis Tareas 📝</h1>
          <p className={styles.subtitle}>Gestiona tu día y mantén el enfoque.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={20} />
          Nueva Tarea
        </button>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input type="text" placeholder="Buscar tareas..." />
        </div>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Todas</button>
          <button className={styles.tab}>Pendientes</button>
          <button className={styles.tab}>Completadas</button>
        </div>
      </div>

      <div className={styles.grid}>
        {tasks.map((task: any) => {
          const statusInfo = statusIcons[task.status || 'pending'] || statusIcons.pending;
          const StatusIcon = statusInfo.icon;

          return (
            <Link href={`/tareas/${task.slug}`} key={task.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div 
                  className={styles.statusBadge} 
                  style={{ backgroundColor: statusInfo.color + '15', color: statusInfo.color }}
                >
                  <StatusIcon size={14} />
                  <span>{getStatusLabel(task.status, 'task')}</span>
                </div>
                {task.due && (
                  <div className={styles.dueDate}>
                    <Calendar size={14} />
                    <span>{task.due}</span>
                  </div>
                )}
              </div>
              <h3 className={styles.taskTitle}>{task.title}</h3>
              <div className={styles.cardFooter}>
                <div className={styles.tags}>
                   {/* Tags removed for now as backend/frontend sync is simplified */}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {tasks.length === 0 && (
        <div className={styles.empty}>
          <p>No hay tareas que mostrar. ¡Añade una nueva!</p>
        </div>
      )}
    </div>
  );
}
