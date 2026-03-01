import { getItem } from '@/lib/vault';
import styles from './detail.module.css';
import { ArrowLeft, Lightbulb, Tag } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function IdeaDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const idea = await getItem('ideas', slug);

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
          <div className={styles.icon}>
            <Lightbulb size={32} />
          </div>
          <h1 className={styles.title}>{idea.title}</h1>
          {idea.frontmatter.tags && (
            <div className={styles.tags}>
              {idea.frontmatter.tags.map((tag: string) => (
                <span key={tag} className={styles.tag}>
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className={styles.content}>
          <ReactMarkdown>{idea.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
