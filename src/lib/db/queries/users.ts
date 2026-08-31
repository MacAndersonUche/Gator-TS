import { eq, sql } from 'drizzle-orm';
import { users } from '../../../schema.js';
import { db } from '../index.js';

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
  const result = await db
    .select()
    .from(users)
    .where(sql`${users.name} = ${name}`);

  return result[0];
}

export async function getUsers() {
  const result = await db.select().from(users);

  return result;
}

export async function deleteAllUsers() {
  await db.delete(users);
}
