import { pool } from '../config/bd.js'

export const OrganizationRepository = {
    getAll: async (req, res) => {
        try {
            const result = await pool.query('select * from ORGANIZATION');
            res.status(200).json({
                status: 'OK',
                message: `Query OK, ${result.length} rows returned`,
                count: result.length,
                data: result.rows,
            });
        } catch (error) {
            res.status(500).json({
                status: "Fail",
                error: error.message
            });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const result = await pool.query('select * from ORGANIZATION where ID_ORG = $1', [id]);
            res.status(200).json({
                status: 'OK',
                message: 'Query OK, organization returned',
                data: result.rows[0],
            });
        } catch (error) {
            res.status(500).json({
                status: "Fail",
                error: error.message
            });
        }
    },
    create: async (req, res) => {
        try {
            const userOrg = req.body
            const { name, description, email, id_owner, telephone } = userOrg;
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
        } catch (error) {
            res.status(500).json({
                status: "Fail",
                error: error.message
            });
        }
    }
}

