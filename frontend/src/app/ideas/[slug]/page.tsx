import { getItem } from '@/lib/vault';
import styles from './detail.module.css';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function IdeaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = await getItem('idea', slug);

  if (!idea) {
    notFound();
  }

  return (
    <div className="fade-in">
      <Link href="/ideas" className={styles.backLink}>
        <ArrowLeft size={18} />
        Regresar a Ideas
      </Link>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <Lightbulb size={16} />
            <span>Idea</span>
          </div>
          <h1 className={styles.title}>{idea.title}</h1>
        </header>

        <div className={styles.content}>
          <ReactMarkdown>{idea.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
