export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function calculateAtsScore(scores: Record<string, number>): number {
  const weights: Record<string, number> = {
    formatting: 0.12,
    keywords: 0.15,
    grammar: 0.1,
    readability: 0.1,
    sections: 0.1,
    skills: 0.12,
    experience: 0.12,
    education: 0.08,
    achievements: 0.06,
    actionVerbs: 0.05,
  };

  return Math.round(
    Object.entries(scores).reduce((total, [key, score]) => {
      return total + score * (weights[key] || 0.1);
    }, 0),
  );
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
