import { Pool }  from 'pg';

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect()
    .then(() => console.log('[pool connect] Conectado a PostgreSQL'))
    .catch(err => console.error('Error de conexion', err));
