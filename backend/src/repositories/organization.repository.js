import { pool } from '../config/bd.js'

export const OrganizationRepository = {
    getTemplateRoles: async () => {
        const rolesTemplate = await pool.query('select ID_ROLE, NAME, DESCRIPTION from ROLES');
        return rolesTemplate.rows
    },
    getOrganizationProfileById: async ({ idOrg }) => {
        const organization = await pool.query('select * from ORGANIZATION where ID_ORG = $1', [idOrg]);
        return organization.rows[0]
    },
    findOrganizationUserProfileById: async ({ idUser, idOrg }) => {
        const user_query = await pool.query(`select u.ID_USER, concat(u.FIRST_NAME,' ',u.LAST_NAME) as fullname, u.EMAIL, u.PHONE_NUMBER from USERS u
            left join USER_ORGANIZATION uo on uo.ID_USER = u.ID_USER 
            left join ROLE r on r.ID_ORG = uo.ID_ORG   
            where u.ID_USER = $1 and uo.STATUS = 'active' and r.STATUS = 'active' and uo.ID_ORG = $2
            group by u.ID_USER `, [idUser, idOrg]);
        return user_query.rows[0];
    },
    getRolesOrganization: async ({ idOrg }) => {
        const rolesOrg = await pool.query(`select * from ROLE where ID_ORG = $1`, [idOrg])
        return rolesOrg.rows
    },
    findOrganizationMembers: async ({ idOrg }) => {
        const membersOrg = await pool.query(` select concat(u.FIRST_NAME,' ',u.LAST_NAME), u.EMAIL, u.PHONE_NUMBER , uo.JOB_TITLE, uo.CREATED_AT, r.NAME as role from USER_ORGANIZATION uo 
        left join USERS u on u.ID_USER = uo.ID_USER 
        left join ROLE r on r.ID_ORG = uo.ID_ORG 
        where uo.STATUS = 'active' and r.STATUS = 'active' uo.ID_ORG = $1`, [idOrg])
        return membersOrg.rows
    },
    findOrganizationMember: async ({ idOrg, idUser }) => {
        const member = await pool.query(` select concat(u.FIRST_NAME,' ',u.LAST_NAME), u.EMAIL, u.PHONE_NUMBER , uo.JOB_TITLE, uo.CREATED_AT, r.NAME as role from USER_ORGANIZATION uo 
        left join USERS u on u.ID_USER = uo.ID_USER 
        left join ROLE r on r.ID_ORG = uo.ID_ORG 
        where uo.STATUS = 'active' and r.STATUS = 'active' uo.ID_ORG = $1 and u.ID_USER = $2`, [idOrg, idUser])
        return member.rows[0]
    },
    createRole: async ({ id_org, name, description, permission_level }) => {
        const values = [id_org, name, description, permission_level];
        const query = 'insert into ROLE (ID_ORG , NAME, DESCRIPTION, PERMISSION_LEVEL) values ($1, $2, $3, $4) returning ID_ROLE';
        const roleOrg = await pool.query(query, values)
        return roleOrg.rows[0]
    },
    invite: async ({ idOrg, idUser }) => {
        const invitation = await pool.query(
            `insert into INVITATIONS (ID_USER , ID_ORG) values($1, $2) returning ID_INVITATION`,
            [idOrg, idUser]);
        return invitation.rows[0]
    },
    create: async ({ name, description, email, id_owner, phone_number, id_status }) => {
        const query = 'insert into ORGANIZATIONS (NAME , DESCRIPTION, EMAIL , ID_OWNER , PHONE_NUMBER, ID_STATUS ) values($1, $2, $3 ,$4, $5, $6) returning ID_ORG';
        const values = [name, description, email, id_owner, phone_number, id_status]
        const organization = await pool.query(query, values);
        return organization.rows[0]
    },
    updateRole: async (req, res) => {
        try {
            const result = await pool.query('select * from ORGANIZATION');
            res.status(200).json({
                status: 'OK',
                message: `Query OK, ${result.length} rows returned`,
                count: result.length,
                data: result.rows,
            });
        } catch (error) {
            res.status(500).json({
                status: "Fail",
                error: error.message
            });
        }
    },
}

