import { getItem, getStatusLabel } from '@/lib/vault';
import styles from './detail.module.css';
import { ArrowLeft, Play, Pause, CheckCircle, Archive, FolderHeart } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getItem('project', slug);

  if (!project) {
    notFound();
  }

  const statusIcons: Record<string, any> = {
    'active': { icon: Play, color: '#a8d5d5' },
    'paused': { icon: Pause, color: '#f9d5bb' },
    'complete': { icon: CheckCircle, color: '#22c55e' },
    'archived': { icon: Archive, color: '#94a3b8' },
  };

  const statusInfo = statusIcons[project.status || 'active'] || statusIcons.active;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="fade-in">
      <Link href="/proyectos" className={styles.backLink}>
        <ArrowLeft size={18} />
        Regresar a Proyectos
      </Link>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge} style={{ backgroundColor: statusInfo.color + '20', color: statusInfo.color }}>
            <StatusIcon size={16} />
            <span>{getStatusLabel(project.status, 'project')}</span>
          </div>
          <h1 className={styles.title}>{project.title}</h1>
        </header>

        <div className={styles.content}>
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
