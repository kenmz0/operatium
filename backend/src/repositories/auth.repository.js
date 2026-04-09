import { pool } from '../config/bd.js';

export const AuthRepository = {
    findUserCredetentialByEmail: async ({ email}) => { 
        const query = await pool.query(`select u.ID_USER, u.EMAIL, u.PASSWORD_HASH from USERS u where u.EMAIL = $1`, [email]);
        return query.rows[0]
    },
    findExistingEmail: async ({ email }) => {
        const query = await pool.query(`select exists (
                select 1 from users where email = $1) as "existing"`, [email]);
        return query.rows[0]
    },
}
