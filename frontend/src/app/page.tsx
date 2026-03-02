import styles from './page.module.css';
import { 
  getTasks, 
  getProjects, 
  getPeople, 
  getRecentActivity, 
  getStatusLabel 
} from '@/lib/vault';
import { 
  Calendar, 
  CheckCircle2, 
  FolderHeart, 
  Users,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default async function Dashboard() {
  const [tasks, projects, people, recent] = await Promise.all([
    getTasks(),
    getProjects(),
    getPeople(),
    getRecentActivity(5)
  ]);

  const todayTasks = tasks.filter((t: any) => t.status === 'pending' || t.status === 'in-progress');
  const activeProjects = projects.filter((p: any) => p.status === 'active');
  
  const stats = [
    { label: 'Tareas pendientes', value: todayTasks.length, icon: CheckCircle2, color: '#f0928d', href: '/tareas' },
    { label: 'Proyectos activos', value: activeProjects.length, icon: FolderHeart, color: '#a8d5d5', href: '/proyectos' },
    { label: 'Contactos', value: people.length, icon: Users, color: '#f9d5bb', href: '/contactos' },
  ];

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>¡Hola, Chula! ✨</h1>
          <p className={styles.subtitle}>
            Hoy es {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}. 
            ¡Vamos a organizar el día!
          </p>
        </div>
        <div className={styles.todayDate}>
          <Calendar size={20} />
          {format(new Date(), 'dd/MM/yyyy')}
        </div>
      </header>

      <section className={styles.statsGrid}>
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.label} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: stat.color + '20', color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
            <ArrowRight className={styles.statArrow} size={18} />
          </Link>
        ))}
      </section>

      <div className={styles.mainGrid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Próximas Tareas</h2>
            <Link href="/tareas" className={styles.viewAll}>Ver todas</Link>
          </div>
          <div className={styles.taskList}>
            {todayTasks.slice(0, 5).map((task: any) => (
              <div key={task.slug} className={styles.taskItem}>
                <div className={styles.taskCheckbox}></div>
                <div className={styles.taskContent}>
                  <span className={styles.taskTitle}>{task.title}</span>
                  {task.due && <span className={styles.taskDue}>Vence: {task.due}</span>}
                </div>
                <span className={`${styles.badge} ${styles[task.status as keyof typeof styles || 'pending']}`}>
                  {getStatusLabel(task.status, 'task')}
                </span>
              </div>
            ))}
            {todayTasks.length === 0 && (
              <p className={styles.empty}>¡No hay tareas pendientes! Disfruta tu tiempo. 🌸</p>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Actividad Reciente</h2>
          </div>
          <div className={styles.activityList}>
            {recent.map((item: any) => (
              <div key={item.slug} className={styles.activityItem}>
                <div className={styles.activityDot}></div>
                <div className={styles.activityInfo}>
                  <span className={styles.activityTitle}>{item.title}</span>
                  <span className={styles.activityType}>
                    {item.type === 'task' ? 'Tarea' : 
                     item.type === 'project' ? 'Proyecto' : 
                     item.type === 'person' ? 'Contacto' : 'Idea'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
