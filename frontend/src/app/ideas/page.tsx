import { getRecentActivity } from '@/lib/vault';
import styles from './ideas.module.css';
import { 
  Lightbulb, 
  Plus, 
  Search,
  ArrowRight,
  Tag
} from 'lucide-react';
import Link from 'next/link';

export default async function IdeasPage() {
  const allItems = await getRecentActivity(100);
  const ideas = allItems.filter((i: any) => i.type === 'idea');

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Mis Ideas 💡</h1>
          <p className={styles.subtitle}>Captura pensamientos y conceptos antes de que se escapen.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={20} />
          Nueva Idea
        </button>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input type="text" placeholder="Buscar ideas..." />
        </div>
      </div>

      <div className={styles.grid}>
        {ideas.map((idea: any) => (
          <Link href={`/ideas/${idea.slug}`} key={idea.slug} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.badge}>
                <Lightbulb size={14} />
                <span>Idea</span>
              </div>
            </div>
            <h3 className={styles.ideaTitle}>{idea.title}</h3>
            <div className={styles.cardFooter}>
              <div className={styles.tags}>
                {/* Tags removed for now as backend/frontend sync is simplified */}
              </div>
              <ArrowRight size={16} className={styles.arrow} />
            </div>
          </Link>
        ))}
      </div>

      {ideas.length === 0 && (
        <div className={styles.empty}>
          <p>Aún no has capturado ninguna idea. ¡Empieza ahora! ✨</p>
        </div>
      )}
    </div>
  );
}
