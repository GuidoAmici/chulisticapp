import { getProjects, getStatusLabel } from '@/lib/vault';
import styles from './proyectos.module.css';
import { 
  FolderHeart, 
  Plus, 
  Search,
  Play,
  Pause,
  CheckCircle,
  Archive,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default async function ProyectosPage() {
  const projects = await getProjects();

  const statusIcons: Record<string, any> = {
    'active': { icon: Play, color: '#a8d5d5' },
    'paused': { icon: Pause, color: '#f9d5bb' },
    'complete': { icon: CheckCircle, color: '#22c55e' },
    'archived': { icon: Archive, color: '#94a3b8' },
  };

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Mis Proyectos 📂</h1>
          <p className={styles.subtitle}>Estructura tus objetivos y haz que sucedan.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={20} />
          Nuevo Proyecto
        </button>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input type="text" placeholder="Buscar proyectos..." />
        </div>
      </div>

      <div className={styles.grid}>
        {projects.map((project: any) => {
          const statusInfo = statusIcons[project.status || 'active'] || statusIcons.active;
          const StatusIcon = statusInfo.icon;

          return (
            <Link href={`/proyectos/${project.slug}`} key={project.slug} className={styles.card}>
              <div className={styles.cardHeader}>
                <div 
                  className={styles.statusBadge} 
                  style={{ backgroundColor: statusInfo.color + '15', color: statusInfo.color }}
                >
                  <StatusIcon size={14} />
                  <span>{getStatusLabel(project.status, 'project')}</span>
                </div>
              </div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <div className={styles.cardFooter}>
                <div className={styles.tags}>
                  {/* Tags removed for now as backend/frontend sync is simplified */}
                </div>
                <ArrowRight size={16} className={styles.arrow} />
              </div>
            </Link>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className={styles.empty}>
          <p>Aún no tienes proyectos activos. ¡Crea uno nuevo! 🚀</p>
        </div>
      )}
    </div>
  );
}
