import { pool } from '../config/bd.js'

export const StatusRepository = {
    getAllStatus: async () => {
        const status = await pool.query(`select ID_STATUS, NOMBRE, DESCRIPTION, COLOR_LABEL, TYPE from STATUS`,);
        return status.rows
    },
    getStatusByType: async ({ type }) => {
        const status = await pool.query(`select ID_STATUS, NOMBRE, DESCRIPTION, COLOR_LABEL from STATUS where TYPE = $1`, [type]);
        return status.rows
    }
}