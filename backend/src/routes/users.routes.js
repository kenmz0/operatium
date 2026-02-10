import { UserRepository } from '../repositories/user.repository.js';
import { Router } from 'express';
import { validateUserRegistration } from '../../middlewares/user.validation.js'

export const router = Router();

router.get('/', UserRepository.getAll);

router.get('/:id', UserRepository.getById);

router.post('/', validateUserRegistration, UserRepository.create);