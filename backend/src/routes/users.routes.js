import { UserService } from '../services/user.services.js'
import { Router } from 'express';
import { validateInvitations } from '../../middlewares/invitation.validation.js';
import { validateUserRegistration } from '../../middlewares/user.validation.js'

export const router = Router();

//id is used now, but id must come form jwt not params
router.get(
    '/:idUser/me',
    async (req, res) => {
        try {
            const { idUser } = req.params;
            const user = await UserService.getOwnProfile({ idUser });
            res.status(200).json({
                status: 'OK',
                message: `Data profile user returned`,
                data: user,
            });
        } catch (error) {
            res.status(error.message === 'User not found' ? 404 : 500).json({ status: 'Fail', error: error.message });
        }
    });

router.get(
    '/:idUser/me/invitations',
    validateInvitations,
    async (req, res) => {
        try {
            const { idUser } = req.params;
            const history = req.query.history;
            const invitations = await UserService.getInvitations({ idUser, history })
            res.status(200).json({
                status: 'OK',
                message: `Invitations ${history == "true" ? 'historial' : 'pending'} returned`,
                data: invitations,
            });
        } catch (error) {
            res.status(error.message === 'Invitations not found' ? 404 : 500).json({ status: 'Fail', error: error.message });
        }
    });

router.get('/:idUser', async (req, res) => {
    try {
        const { idUser } = req.params;
        const user = await UserService.getPublicProfile({ idUser })
        res.status(200).json({
            status: 'OK',
            message: `Public profile user returned`,
            data: user,
        });
    } catch (error) {
        res.status(error.message === 'User not found' ? 404 : 500).json({ status: 'Fail', error: error.message });
    }
});

router.patch(
    '/:idUser/me/invitations/:idInvitation',
    async (req, res) => {
        try {

            const { idUser, idInvitation } = req.params;
            const { status } = req.body;
            const updateInvitation = await UserService.respondInvitation({ idUser, idInvitation, status })
            res.status(200).json({
                status: 'OK',
                message: `Invitation status updated`,
                data: updateInvitation
            });
        } catch (error) {
            res.status(error.message === 'Invitation not found' ? 404 : 500).json({ status: 'Fail', error: error.message });
        }
    });

router.post(
    '/',
    validateUserRegistration,
    async (req, res) => {
        try {
            const { first_name, last_name, email, password, phone_number } = req.body;
            const { userId } = await UserService.createUser({ first_name, last_name, email, password, phone_number });
            res.status(200).json({
                status: 'OK',
                message: "User created susccesfully",
                user: {
                    id: userId
                }
            });
        } catch (error) {
            res.status(error.message === 'User not created' ? 404 : 500).json({ status: 'Fail', error: error.message });
        }
    });


