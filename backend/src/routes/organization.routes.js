import { Router } from 'express';
import { OrganizationService } from '../services/organization.services.js';

export const router = Router();

router.get('/roles', async (req, res) => {
    try {
        const roles = await OrganizationService.getTemplateRoles()
        res.status(200).json({
            status: 'OK',
            message: 'Roles returned',
            data: roles
        });
    } catch (error) {

    }
});
router.get('/status', async (req, res) => {
    try {
        const status = await OrganizationService.getStatus();
        res.status(200).json({
            status: 'OK',
            message: 'Status returned',
            data: status
        });
    } catch (error) {
        res.status(404).json({
            error
        })
    }
});
router.get('/:idOrg', async (req, res) => {
    try {
        const { idOrg } = req.params;
        const organization = await OrganizationService.getOrganizationProfile({ idOrg })
        res.status(200).json({
            status: 'OK',
            message: 'Organization profile returned',
            data: {
                ...organization
            }
        });
    } catch (error) {

    }
});

router.get('/:idOrg/roles', async (req, res) => {
    try {
        const { idOrg } = req.params;
        const organizationRole = await OrganizationService.getRolesOrg({ idOrg })
        res.status(201).json({
            status: 'OK',
            message: "Role created susccesfully",
            data: {
                ...organizationRole
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error: error.message
        });
    }
});


router.get('/:idOrg/members', async (req, res) => {
    try {
        const { idOrg } = req.params;
        const members = await OrganizationService.getMembers({ idOrg })
        res.status(201).json({
            status: 'OK',
            message: "Members returned",
            data: {
                ...members
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error: error.message
        });
    }
});

router.get('/:idOrg/members/:idUser', async (req, res) => {
    try {
        const { idOrg, idUser } = req.params;
        const member = await OrganizationService.
            res.status(201).json({
                status: 'OK',
                message: "Members returned",
                data: {
                    ...member
                }
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
        const { name, description, email, id_owner, phone_number, id_status } = req.body
        const organization = await OrganizationService.create({ name, description, email, id_owner, phone_number, id_status })
        res.status(201).json({
            status: 'OK',
            message: "Organization created susccesfully",
            data: {
                ...organization
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error: error.message
        });
    }
});

router.post('/:idOrg/roles', async (req, res) => {
    try {
        const { id_org, name, description, permission_level } = req.body;
        const organizationRole = await OrganizationService.createRole({ id_org, name, description, permission_level })
        res.status(201).json({
            status: 'OK',
            message: "Role created susccesfully",
            data: {
                ...organizationRole
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error: error.message
        });
    }
});
router.post('/:idOrg/invitations', async (req, res) => {
    try {
        const { idOrg } = req.params;
        const { idUser} = req.body
        const member = await OrganizationService.createInvitation({ idOrg, idUser })
        res.status(201).json({
            status: 'OK',
            message: "Member invitated",
            data: {
                ...member
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            error: error.message
        });
    }
});

//created membership for fit in context this one 
//router.patch('/:id_org/members/:id_user', OrganizationRepository.updateRole);




