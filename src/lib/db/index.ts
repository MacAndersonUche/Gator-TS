import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { readConfig } from '../../config.js';
import * as schema from '../../schema.js';

const config = readConfig();

export const connection = postgres(config!.db_url);

export const db = drizzle(connection, { schema });
