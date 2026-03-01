import { getItem } from '@/lib/vault';
import styles from './detail.module.css';
import { ArrowLeft, Calendar, Tag, User, Clock } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function ContactDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const person = await getItem('people', slug);

  if (!person) {
    notFound();
  }

  // Extract Follow-ups for special rendering
  const followUpsMatch = person.content.match(/## Follow-ups\n([\s\S]*?)(?=\n##|$)/i);
  const followUps = followUpsMatch ? followUpsMatch[1].trim() : null;
  const remainingContent = followUps 
    ? person.content.replace(/## Follow-ups\n[\s\S]*?(?=\n##|$)/i, '').trim()
    : person.content;

  return (
    <div className="fade-in">
      <Link href="/contactos" className={styles.backLink}>
        <ArrowLeft size={18} />
        Regresar a Contactos
      </Link>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.avatar}>
            {person.title.charAt(0).toUpperCase()}
          </div>
          <h1 className={styles.title}>{person.title}</h1>
          <div className={styles.meta}>
            {person.frontmatter['last-contact'] && (
              <div className={styles.date}>
                <Calendar size={16} />
                <span>Último contacto: {person.frontmatter['last-contact']}</span>
              </div>
            )}
            {person.frontmatter.tags && (
              <div className={styles.tags}>
                {person.frontmatter.tags.map((tag: string) => (
                  <span key={tag} className={styles.tag}>
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {followUps && (
          <div className={styles.followUpsBox}>
            <div className={styles.followUpsHeader}>
              <Clock size={16} />
              <span>PENDIENTES / FOLLOW-UPS</span>
            </div>
            <div className={styles.followUpsContent}>
              <ReactMarkdown>{followUps}</ReactMarkdown>
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
