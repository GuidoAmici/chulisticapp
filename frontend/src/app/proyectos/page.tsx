import { getProjects, getStatusLabel } from '@/lib/vault';
import styles from './proyectos.module.css';
import { FolderHeart, Play, Pause, CheckCircle, Archive } from 'lucide-react';
import Link from 'next/link';

export default async function ProyectosPage() {
  const projects = await getProjects();
  
  const statusIcons: Record<string, any> = {
    'active': { icon: Play, color: '#a8d5d5' },
    'paused': { icon: Pause, color: '#f9d5bb' },
    'complete': { icon: CheckCircle, color: '#22c55e' },
    'archived': { icon: Archive, color: '#b2bec3' },
  };

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <h1 className={styles.title}>Mis Proyectos 📁</h1>
        <p className={styles.subtitle}>Gestiona tus sueños y proyectos a largo plazo.</p>
      </header>

      <div className={styles.grid}>
        {projects.map((project) => {
          const statusInfo = statusIcons[project.status || 'active'] || { icon: FolderHeart, color: '#f0928d' };
          const StatusIcon = statusInfo.icon;
          
          // Try to find "Next Action" in body
          const nextActionMatch = project.content.match(/## Next Action\s+(.+)/i);
          const nextAction = nextActionMatch ? nextActionMatch[1] : null;

          return (
            <Link href={`/proyectos/${project.slug}`} key={project.slug} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.statusBadge} style={{ backgroundColor: statusInfo.color + '20', color: statusInfo.color }}>
                  <StatusIcon size={16} />
                  <span>{getStatusLabel(project.status, 'project')}</span>
                </div>
              </div>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              
              {nextAction && (
                <div className={styles.nextAction}>
                  <span className={styles.nextLabel}>Próximo paso:</span>
                  <p className={styles.nextText}>{nextAction}</p>
                </div>
              )}
              
              <div className={styles.cardFooter}>
                {project.frontmatter.tags && (
                  <div className={styles.tags}>
                    {project.frontmatter.tags.map((tag: string) => (
                      <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
