import { pool } from '../config/bd.js'

export const UserRepository = {
    findFullProfileById: async ({ idUser }) => {
        const user_query = await pool.query(
            `select u.ID_USER, u.FIRST_NAME, u.LAST_NAME, u.EMAIL, u.PHONE_NUMBER, u.created_at, u.LAST_SESSION_AT from USERS u
             where u.ID_USER = $1`,
            [idUser]);
        return user_query.rows[0];
    },
    findPublicProfileById: async ({ idUser }) => {
        const user_query = await pool.query(`select u.ID_USER, concat(u.FIRST_NAME,' ',u.LAST_NAME) as fullname, u.EMAIL from USERS u  
            where u.ID_USER = $1`, [idUser]);
        return user_query.rows[0];
    },
    findPublicProfileByEmail: async ({ email }) => {
        const query = await pool.query(`select u.ID_USER, concat(u.FIRST_NAME,' ',u.LAST_NAME) as fullname, u.EMAIL from USERS u  
            where u.EMAIL = $1`, [email]);
        return query.rows[0]
    },
    findExistingEmail: async ({ email }) => {
        const query = await pool.query(`select exists (
                select 1 from users where email = $1) as "existing"`, [email]);
        return query.rows[0]
    },
    findInvitationsPending: async ({ idUser }) => {
        const query = await pool.query(`select * from INVITATIONS where status = 'pending' and id_user = $1`, [idUser])
        return query.rows
    },
    findAllInvitations: async ({ idUser }) => {
        const query = await pool.query(`select * from INVITATIONS where id_user = $1`, [idUser])
        return query.rows
    },
    updateInvitation: async ({ idUser, idInvitation, status }) => {
        const query = await pool.query(`update INVITATIONS set STATUS = $1, RESOLVE_AT = NOW() where ID_INVITATION = $2 and ID_USER = $3 and STATUS is distinct from $1 returning ID_INVITATION, STATUS `, [status, idInvitation, idUser])
        return query.rows[0]
    },
    create: async ({ first_name, last_name, email, password_hash, phone_number }) => {
        const values = [first_name, last_name, email, password_hash, phone_number];
        const query = 'insert into USERS (first_name , last_name , email , password_hash , phone_number) values($1, $2, $3 ,$4, $5) returning id_user';
        const user = await pool.query(query, values);
        return user.rows[0]
    }
}

