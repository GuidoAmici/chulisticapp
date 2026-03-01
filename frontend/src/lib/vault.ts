const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export interface VaultItem {
  id: string;
  slug: string;
  title: string;
  type: 'task' | 'project' | 'person' | 'idea' | 'daily';
  status?: string;
  content: string;
  due?: string;
}

export async function getTasks() {
  const res = await fetch(`${BACKEND_URL}/items?type=task`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${BACKEND_URL}/items?type=project`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function getPeople() {
  const res = await fetch(`${BACKEND_URL}/items?type=person`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function getRecentActivity(limit = 5) {
  const res = await fetch(`${BACKEND_URL}/items`, { cache: 'no-store' });
  if (!res.ok) return [];
  const items = await res.json();
  return items.slice(0, limit);
}

export const getStatusLabel = (status: string | undefined, type: string) => {
  if (!status) return 'Sin estado';
  
  const translations: Record<string, string> = {
    'pending': 'Pendiente',
    'in-progress': 'En curso',
    'complete': 'Completada',
    'cancelled': 'Cancelada',
    'active': 'Activo',
    'paused': 'Pausado',
    'archived': 'Archivado'
  };

  return translations[status] || status;
};
