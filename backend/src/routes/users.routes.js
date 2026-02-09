import { UserRepository } from '../repositories/user.repository.js';
import {Router} from 'express';

export const router = Router();

router.get('/', async (req, res) =>{
    const userData = {

    }
     //const result = UserRepository.create(userData) 
    res.json({
        status: 'OK',
        message: 'Servidor funciona correctamente',
        dbTime: result.rows[0]
    });
});