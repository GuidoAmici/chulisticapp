import { getItem } from '@/lib/vault';
import styles from './detail.module.css';
import { ArrowLeft, User, Clock } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function PersonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = await getItem('person', slug);

  if (!person) {
    notFound();
  }

  return (
    <div className="fade-in">
      <Link href="/contactos" className={styles.backLink}>
        <ArrowLeft size={18} />
        Regresar a Contactos
      </Link>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <User size={16} />
            <span>Contacto</span>
          </div>
          <h1 className={styles.title}>{person.title}</h1>
        </header>

        <div className={styles.content}>
          <ReactMarkdown>{person.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
