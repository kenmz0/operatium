import {Router} from 'express';
import { pool } from '../config/bd.js';

export const router = Router();

router.get('/', async (req, res) =>{    
    const result = await pool.query('SELECT NOW()');
    res.json({
        status: 'OK',
        message: 'Servidor funciona correctamente',
        dbTime: result.rows[0]
    });
});



router.post('/', async (req, res) =>{    
    const recieveData = req.body
    const result = await pool.query('SELECT NOW()');
    res.json({
        status: 'OK',
        message: 'Servidor funciona correctamente',
        dbTime: result.rows[0],
        req: recieveData
    });
});
