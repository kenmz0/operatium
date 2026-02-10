import { pool } from '../config/bd.js'
import bcrypt from 'bcrypt'

export const UserRepository = {
    getAll: async (req, res) => {
        try {
            const result = await pool.query('select * from USERS');
            const count = result.rows.length;
            res.status(200).json({
                status: 'OK',
                message: `Query OK, ${count} rows returned`,
                count,
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
            const result = await pool.query('select * from USERS where ID_USER = $1', [id]);
            res.status(200).json({
                status: 'OK',
                message: 'Query OK, user returned',
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
            const {first_name, last_name, email, password, phone_numer } = req.body
            const salt = await bcrypt.genSalt(10);
            const password_hash = await bcrypt.hash(password, salt);
            const values = [first_name, last_name, email, password_hash, phone_numer];
            const query = 'insert into USERS (first_name , last_name , email , password_hash , phone_number) values($1, $2, $3 ,$4, $5) returning id_user';
            const result = await pool.query(query, values);
            res.status(201).json({
                status: 'OK',
                message: "user created susccesfully",
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

