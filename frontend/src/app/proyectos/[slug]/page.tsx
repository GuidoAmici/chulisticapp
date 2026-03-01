import { getItem, getStatusLabel } from '@/lib/vault';
import styles from './detail.module.css';
import { ArrowLeft, Play, Pause, CheckCircle, Archive, Tag, FolderHeart } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = await getItem('projects', slug);

  if (!project) {
    notFound();
  }

  const statusIcons: Record<string, any> = {
    'active': { icon: Play, color: '#a8d5d5' },
    'paused': { icon: Pause, color: '#f9d5bb' },
    'complete': { icon: CheckCircle, color: '#22c55e' },
    'archived': { icon: Archive, color: '#b2bec3' },
  };

  const statusInfo = statusIcons[project.status || 'active'] || { icon: FolderHeart, color: '#f0928d' };
  const StatusIcon = statusInfo.icon;

  // Extract Next Action for special rendering
  const nextActionMatch = project.content.match(/## Next Action\n([\s\S]*?)(?=\n##|$)/i);
  const nextAction = nextActionMatch ? nextActionMatch[1].trim() : null;
  const remainingContent = nextAction 
    ? project.content.replace(/## Next Action\n[\s\S]*?(?=\n##|$)/i, '').trim()
    : project.content;

  return (
    <div className="fade-in">
      <Link href="/proyectos" className={styles.backLink}>
        <ArrowLeft size={18} />
        Regresar a Proyectos
      </Link>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <div className={styles.badge} style={{ backgroundColor: statusInfo.color + '20', color: statusInfo.color }}>
              <StatusIcon size={16} />
              <span>{getStatusLabel(project.status, 'project')}</span>
            </div>
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          {project.frontmatter.tags && (
            <div className={styles.tags}>
              {project.frontmatter.tags.map((tag: string) => (
                <span key={tag} className={styles.tag}>
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {nextAction && (
          <div className={styles.nextActionBox}>
            <div className={styles.nextActionHeader}>
              <Play size={16} />
              <span>PRÓXIMO PASO</span>
            </div>
            <div className={styles.nextActionContent}>
              <ReactMarkdown>{nextAction}</ReactMarkdown>
            </div>
          </div>
        )}

        <div className={styles.content}>
          <ReactMarkdown>{remainingContent}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
