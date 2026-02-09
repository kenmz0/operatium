import { pool }  from '../config/bd.js' 

export const UserRepository = {
    getById: async (id) => {
        return await pool.query('select * from USERS where id = $1 returnign *', [id])
    },
    create: async (userData) => {
        const {first_name, last_name, password, phone_number} = userData;
        const values = [first_name, last_name, password, phone_number];
        const query ='insert into USERS (first_name , last_name ,email , password_hash , phone_number) values($1, $2, $,3 ,$4, 5$) returning *';
        return await pool.query(query, values);
    }
}

