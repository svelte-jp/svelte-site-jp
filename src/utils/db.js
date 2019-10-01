import { Pool } from 'pg';

// Uses `PG*` ENV vars
export const DB = new Pool();

export function query(text, values=[]) {
	return DB.query(text, values).then(r => r.rows);
}

export function find(text, values=[]) {
	return query(text, values).then(arr => arr[0]);
}
