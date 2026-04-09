import { Router } from 'express';
import { AuthService } from '../services/auth.services.js';

export const router = Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const login = await AuthService.login({email,password})
        res.status(200).json({
            status: 'OK',
            message: `login succesfully`,
            data: login,
        });
    } catch (error) {
        res.status(error.message === 'Credentialsnot valid' ? 404 : 500).json({ status: 'Fail', error: error.message });
    }

});