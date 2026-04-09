import { Router } from 'express';
import { MembershipService } from '../services/membership.services.js';
import { StatusServices } from '../services/status.services.js';

export const router = Router();

router.get('/status', async (req, res) => {
    try {
        const status_list = StatusServices.getByType({ type: 'membership' })
        res.status(200).json({
            status: 'OK',
            message: 'Status returned',
            data: status_list
        });
    } catch (error) {

    }
});