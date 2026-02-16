import { UserRepository } from '../repositories/user.repository.js';
import { Router } from 'express';
import { validateUserRegistration } from '../../middlewares/user.validation.js'

export const router = Router();

router.get('/me', UserRepository.getOwnProfile);
router.get('/me/roles', UserRepository.getOwnRoles);

router.get('/:id', UserRepository.getById);
router.get('/:id/roles', UserRepository.getUserRoles);

router.post('/', validateUserRegistration, UserRepository.create);


