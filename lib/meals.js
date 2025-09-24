import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'fs';
const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split('.').pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream('public/images/meals/' + filename);
  stream.write(Buffer.from(await meal.image.arrayBuffer()),(error) => {
    if (error) {
      console.error('Error writing file:', error);
    } else {
      console.log('File written successfully');
    }
  });
  meal.image = '/images/meals/' + filename;
    console.log(meal);
const stmt = db.prepare(`
  INSERT INTO meals (
    slug,
    title,
    image,
    summary,
    instructions,
    creator,
    creator_email
  ) VALUES (
    @slug,
    @title,
    @image,
    @summary,
    @instructions,
    @creator,
    @creator_email
  )
`); 

}