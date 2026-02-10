import { OrganizationRepository } from '../repositories/organization.repository';
import { Router } from 'express';

export const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await OrganizationRepository.getAll()
        res.status(200).json({
            status: 'OK',
            message: `Query OK, ${result.length} rows returned`,
            count: result.length,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await OrganizationRepository.getById(id)
        res.status(200).json({
            status: 'OK',
            message: 'Query OK, organization returned',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error: error.message
        });
    }
});


router.post('/', async (req, res) => {
    try {
        const userOrg = req.body
        const result = await OrganizationRepository.create(userOrg)
        res.status(201).json({
            status: 'OK',
            message: "organization created susccesfully",
            id: result
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error: error.message
        });
    }
});