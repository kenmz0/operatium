import { OrganizationRepository } from "../repositories/organization.repository.js";
import { StatusRepository } from "../repositories/status.repository.js";

export const OrganizationService = {
    getTemplateRoles: async () => {
        const rolesTemplate = await OrganizationRepository.getTemplateRoles();
        if (!rolesTemplate) throw new Error('Data not found')

        return rolesTemplate
    },
    getStatus: async ()=> {
        const status = await StatusRepository.getStatusByType({ type: 'organization'});
        if (!status) throw new Error('Data not found')

        return status
    },
    getOrganizationProfile: async ({ idOrg }) => {
        const organization = await OrganizationRepository.getOrganizationProfileById({ idOrg })
        if (!organization) throw new Error('Organization not found')

        return organization
    },
    getRolesOrg: async ({ idOrg }) => {
        const rolesOrg = await OrganizationRepository.getRolesOrganization({ idOrg });
        if (!rolesOrg) throw new Error('Roles not found')

        return rolesOrg
    },
    getMemberProfile: async ({ idOrg, idUser }) => {
        const member = await OrganizationRepository.findOrganizationMember({ idOrg, idUser })
        if (!member) throw new Error('Member not found')

        return member
    },
    getMembers: async ({ idOrg }) => {
        const members = await OrganizationRepository.findOrganizationMembers({ idOrg })
        if (!members) throw new Error('Members not found')

        return members
    },
    createInvitation: async({idOrg,idUser})=>{
        const invitation = await OrganizationRepository.invite({ idOrg, idUser })
        if (!invitation) throw new Error('Invitation not created')

        return invitation
    },
    createRole: async (id_org, name, description, permission_level) => {
        const roleOrg = await OrganizationRepository.createRole({ id_org, name, description, permission_level });
        if (!roleOrg) throw new Error('Role not created');

        return roleOrg
    },
    create: async ({ name, description, email, id_owner, phone_number, id_status }) => {
        const organization = await OrganizationRepository.create({ name, description, email, id_owner, phone_number, id_status });
        if (!organization) throw new Error('Organization not created');

        return organization
    },
}