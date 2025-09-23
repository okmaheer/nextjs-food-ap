import sql from 'better-sqlite3';
const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new Error('Failed to fetch meals!');
  const query = db.prepare('SELECT * FROM meals');
  return query.all();
}

export function getMealBySlug(slug) {
  const query = db.prepare('SELECT * FROM meals WHERE slug = ?');
  return query.get(slug);
}