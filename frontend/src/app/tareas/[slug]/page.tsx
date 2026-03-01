import { getItem, getStatusLabel } from '@/lib/vault';
import styles from './detail.module.css';
import { ArrowLeft, Calendar, Tag, CheckCircle2, Clock, Circle } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function TaskDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const task = await getItem('task', slug);

  if (!task) {
    notFound();
  }

  const statusIcons: Record<string, any> = {
    'pending': { icon: Circle, color: '#f0928d' },
    'in-progress': { icon: Clock, color: '#94bdbf' },
    'complete': { icon: CheckCircle2, color: '#22c55e' },
  };

  const statusInfo = statusIcons[task.status || 'pending'] || statusIcons.pending;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="fade-in">
      <Link href="/tareas" className={styles.backLink}>
        <ArrowLeft size={18} />
        Regresar a Tareas
      </Link>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <div className={styles.badge} style={{ backgroundColor: statusInfo.color + '20', color: statusInfo.color }}>
              <StatusIcon size={16} />
              <span>{getStatusLabel(task.status, 'task')}</span>
            </div>
            {task.due && (
              <div className={styles.date}>
                <Calendar size={16} />
                <span>Vence: {task.due}</span>
              </div>
            )}
          </div>
          <h1 className={styles.title}>{task.title}</h1>
        </header>

        <div className={styles.content}>
          <ReactMarkdown>{task.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
