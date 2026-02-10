import { pool } from '../config/bd.js'

export const OrganizationRepository = {
    getAll: async () => {
        const result = await pool.query('select * from ORGANIZATION');
        return result.rows;
    },
    getById: async (id) => {
        const result = await pool.query('select * from ORGANIZATION where ID_ORG = $1', [id]);
        return result.rows[0];
    },
    create: async (userData) => {
        const { name, description, email, id_owner, telephone } = userData;
        // ? status should have a default value setting on 'active' in database
        const status = 'active'
        const query = 'insert into ORGANIZATION (NAME , DESCRIPTION, EMAIL , ID_OWNER , TELEPHONE , STATUS) values($1, $2, $3 ,$4, $5, $6) returning id_org';
        const values = [name, description, email, id_owner, telephone, status]
        const result = await pool.query(query, values);
        res.status(201).json({
            status: 'OK',
            message: "organization created susccesfully",
            id: result.rows[0]
        });
        return result.rows[0]
    }
}

