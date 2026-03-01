import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import styles from './ideas.module.css';
import { Lightbulb, Tag } from 'lucide-react';
import Link from 'next/link';

const VAULT_PATH = process.env.VAULT_PATH || '';

async function getIdeas() {
  try {
    const fullPath = path.join(VAULT_PATH, 'ideas');
    const files = await fs.readdir(fullPath);
    const ideas = await Promise.all(files.filter(f => f.endsWith('.md')).map(async f => {
      const content = await fs.readFile(path.join(fullPath, f), 'utf8');
      const { data } = matter(content);
      return {
        slug: f.replace('.md', ''),
        title: data.title || f.replace('.md', ''),
        tags: data.tags || []
      };
    }));
    return ideas;
  } catch (e) {
    return [];
  }
}

export default async function IdeasPage() {
  const ideas = await getIdeas();
  
  return (
    <div className="fade-in">
      <header className={styles.header}>
        <h1 className={styles.title}>Mis Ideas 💡</h1>
        <p className={styles.subtitle}>Captura chispazos de creatividad e inspiración.</p>
      </header>

      <div className={styles.grid}>
        {ideas.map((idea) => (
          <Link href={`/ideas/${idea.slug}`} key={idea.slug} className={styles.card}>
            <div className={styles.cardIcon}>
              <Lightbulb size={24} />
            </div>
            <h2 className={styles.ideaTitle}>{idea.title}</h2>
            {idea.tags.length > 0 && (
              <div className={styles.tags}>
                {idea.tags.map((tag: string) => (
                  <span key={tag} className={styles.tag}>
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
        {ideas.length === 0 && (
          <p className={styles.empty}>Aún no has guardado ninguna idea. ¡Empieza a capturar!</p>
        )}
      </div>
    </div>
  );
}
