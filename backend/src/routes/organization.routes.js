import { OrganizationRepository } from '../repositories/organization.repository';
import { Router } from 'express';

export const router = Router();

router.get('/', OrganizationRepository.getAll);

router.get('/:id', OrganizationRepository.getById);

router.post('/', OrganizationRepository.create);