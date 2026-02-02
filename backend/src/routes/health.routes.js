const { Router } = require('express');
const router = Router();

const pool = require('../config/bd');

router.get('/', async (req, res) =>{
     const result = await pool.query('SELECT NOW()');
    res.json({
        status: 'OK',
        message: 'Servidor funciona correctamente',
        dbTime: result.rows[0]
    });
});


module.exports = router