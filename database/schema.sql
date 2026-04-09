
CREATE TABLE Users (
  id_user UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  phone_number VARCHAR(25), 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_session_at TIMESTAMP WITH TIME zone 
);

create type status_type as enum ('organization', 'team', 'task', 'membership', 'invitation')

create table status (
id_status uuid PRIMARY KEY DEFAULT gen_random_uuid(),
type status_type not null,
nombre VARCHAR(20) not null,
color_label varchar(20) not null,
description TEXT,
created_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

insert into status (type, nombre, color_label) 
values 
('organization', 'active', '#0000ff'),('organization','inactive','#ff0000'),('organization','suspended', '#ffde21'),
('team', 'active', '#0000ff'),('team','inactive','#00ff00'),('team','suspended', '#ffde21'),
('task', 'stand_by', '#ffde21'),('task', 'in_progress','#0000ff'),('task', 'done', '#00ff00'),('task', 'cancelled','#ff0000'), ('task', 'reassigned', '#333333'),
('membership', 'active', '#0000ff'),('membership','inactive','#ff0000'),('membership','pending', '#ffde21'),('membership','rejected', '#572364'),('membership','expired', '#333333'),
('invitation', 'accepted', '#0000ff'),('invitation','pending', '#ffde21'),('invitation','rejected', '#572364'),('invitation','expired', '#333333');

select * from status

create table Organizations (
id_org UUID PRIMARY KEY DEFAULT gen_random_uuid(),
id_owner UUID not null,
id_status uuid not null,
name	varchar(50),
description	varchar(100),
email	VARCHAR(255) NOT NULL unique,
phone_number	varchar(25),
signin_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
CONSTRAINT fk_user_org FOREIGN KEY (id_owner) REFERENCES Users(id_user),
CONSTRAINT fk_org_status FOREIGN KEY (id_status) REFERENCES Status(id_status)
)

create table Teams (
id_team	 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
id_org UUID not null,
id_status uuid not null,
name varchar(50),
created_at	timestamp  WITH TIME ZONE DEFAULT NOW(),
suspended_at	timestamp  WITH TIME zone,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
description	varchar(100),
 CONSTRAINT fk_team_org FOREIGN KEY (id_org) REFERENCES Organizations(id_org),
CONSTRAINT fk_team_status FOREIGN KEY (id_status) REFERENCES Status(id_status)
 )	


CREATE TABLE Roles (
  id_role UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) not null,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO ROLEs (name, description)
values
  ('owner', 'Director ejecutivo'),
('admin','administrador'),
  ('supervisor', 'supervisor'),
  ('member', 'miembro');

select n.nspname as enum_schema,  
       t.typname as enum_name,  
       e.enumlabel as enum_value
from pg_type t 
   join pg_enum e on t.oid = e.enumtypid  
   join pg_catalog.pg_namespace n ON n.oid = t.typnamespace;


create table Tasks(
id_task	 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
id_org	UUID NOT NULL,
id_parent_task	UUID,
created_by	UUID NOT NULL,
priority INTEGER default 1 CHECK (priority >= 1 AND priority <= 3),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
created_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
due_by TIMESTAMP WITH TIME ZONE,
title	varchar(100) not null,
description	varchar(200),
 CONSTRAINT fk_task_org FOREIGN KEY (id_org) REFERENCES Organizations(id_org),
    CONSTRAINT fk_task_created_by FOREIGN KEY (created_by) REFERENCES Users(id_user),
    CONSTRAINT fk_task_parent FOREIGN KEY (id_parent_task) 
        REFERENCES Tasks(id_task) 
        ON DELETE RESTRICT
)

create table Task_Assignments(
id_task_assign UUID PRIMARY KEY DEFAULT gen_random_uuid(),
id_team	UUID,
assigned_to UUID,
id_status uuid not null,
assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
started_at TIMESTAMP WITH TIME zone,
resolved_at	TIMESTAMP WITH TIME ZONE,
reassigned_at TIMESTAMP WITH TIME ZONE, 
    CONSTRAINT fk_task_team FOREIGN KEY (id_team) REFERENCES Teams(id_team),
    CONSTRAINT fk_task_assigned_to FOREIGN KEY (assigned_to) REFERENCES Users(id_user),
    CONSTRAINT fk_task_status FOREIGN KEY (id_status) REFERENCES Status(id_status)
)


create table invitations(
id_invitation UUID PRIMARY KEY DEFAULT gen_random_uuid(),
id_user	UUID not null,
id_org UUID not null,
id_status uuid not null,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
resolve_at TIMESTAMP WITH TIME zone,
expired_date TIMESTAMP WITH TIME zone,
CONSTRAINT fk_invitation_user FOREIGN KEY (id_user) REFERENCES Users(id_user),
    CONSTRAINT fk_invitation_org FOREIGN KEY (id_org) references Organizations(id_org),
    CONSTRAINT fk_invitation_status FOREIGN KEY (id_status) REFERENCES Status(id_status)

);

create table Memberships(
id_membership	UUID PRIMARY KEY DEFAULT gen_random_uuid(),
id_user	UUID not null,
id_org UUID not null,
id_role UUID not null,
id_status uuid not null ,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
suspended_at TIMESTAMP WITH TIME zone,
job_title VARCHAR(50),
    CONSTRAINT fk_user_org_user FOREIGN KEY (id_user) REFERENCES Users(id_user),
    CONSTRAINT fk_membership_status FOREIGN KEY (id_status) REFERENCES Status(id_status)
)

create index idx_membership_org_id on memberships(id_org)

CREATE TYPE role_team AS ENUM ('leader','member');

create table User_Team_assigments(
id_user_team UUID PRIMARY KEY DEFAULT gen_random_uuid(),
id_user	UUID not null,
id_team UUID not null,
id_status uuid not null,
role role_team default 'member',
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
suspended_at TIMESTAMP WITH TIME zone,
    CONSTRAINT fk_user_team_assigments_user FOREIGN KEY (id_user) REFERENCES Users(id_user),
    CONSTRAINT fk_user_team_assigments_team FOREIGN KEY (id_team) REFERENCES Teams(id_team),
    CONSTRAINT fk_user_team_assigments_status FOREIGN KEY (id_status) REFERENCES Status(id_status)
 );	

create or replace function fn_tr_membership_owner()
returns trigger as $$
declare 
	id_role_owner uuid;
	id_status_active uuid;
begin
	select id_role into id_role_owner from roles r where r."name" = 'owner';
	select id_status into id_status_active from status s where s."type" = 'membership' and s.nombre = 'active';

	insert into memberships (id_user , id_org , id_role , id_status, job_title)
	values (new.id_owner, new.id_org, id_role_owner, id_status_active, 'owner');
	
	return new;
end
$$ language plpgsql

create trigger trigger_membership_owner 
	after insert on organizations
	for each row
	execute function fn_tr_membership_owner()
 
  
drop table invitations;
 drop table memberships;
 drop table user_team_assigments;
drop table task_assignments; 
	 drop table tasks ;
 drop table roles;
drop table teams; 
drop table organizations;
drop table status;
drop table users ;
 
select * from status s where s."type" = 'organization' and s.nombre = 'active'

 select * from users u where u.ID_USER = '285dc44c-4c1e-4b9c-828d-9faa991c30a5';
 
select u.ID_USER, u.FIRST_NAME, u.LAST_NAME, u.EMAIL, u.PHONE_NUMBER, u.created_at, u.LAST_SESSION_AT, json_agg(json_build_object('id_role', coalesce(r.id_role), 'name', coalesce(r.name), 'since', coalesce(uo.created_at), 'job_title', coalesce(uo.job_title))) as roles from USERS u
left join user_organization uo on uo.id_user = u.id_user 
left join "role" r on r.id_role  = uo.id_role    
and uo.status = 'active'
group by u.id_user 
where u.ID_USER = '9370031e-196e-44d1-b534-2c5b8ab05250'
  select * from organizations o 
 insert into organization (name , description , email , id_owner , phone_number , status) 
 values('Ferreteria Palo Alto', 'vedemos hierro', 'raul.gimenez@gmail.com', 'f032059e-3c83-4433-970b-398b4bb80850', '87678687678', 'active') 
 
 select * from roles r 
 select * from status 
 
select * from invitations
 insert into invitations (id_user , id_org , created_at, expired_date) 
 values('285dc44c-4c1e-4b9c-828d-9faa991c30a5', 'f5e3b4bf-3619-45dd-96c0-de64c8e4a0a6', '2026-02-17 14:22:56.107 -0500', '2026-02-24 14:22:56.107 -0500') 

 update INVITATIONS 
 set STATUS = 'pending' 
 where ID_INVITATION = '372886cd-557c-4ee2-a04c-4b5cf318aeeb' and ID_USER = '285dc44c-4c1e-4b9c-828d-9faa991c30a5' and STATUS is distinct from 'pending' returning ID_INVITATION, STATUS 
 
select * from memberships m 
 insert into memberships (id_user , id_org , id_role , status, job_title) 
 values(1, 1, 1, 'active', 'Director') 
 
 select concat(u.first_name,' ',u.last_name), u.email, u.phone_number , uo.job_title, uo.created_at, r."name" as Role from user_organization uo 
 left join users u on u.id_user = uo.id_user 
 left join "role" r on r.id_org = uo.id_org 
 where uo.status = 'active' and r.status = 'active'
 
select exists (
select 1 from users where email = 'reikenny@mail.com') as "email"


select * from user_organization uo where uo.id_user = '285dc44c-4c1e-4b9c-828d-9faa991c30a5' and uo.status = 'pending' 

 
select r.id_role, r."name" , r.description , uo.created_at , r.id_org , r.permission_level, uo.job_title from "role" r inner join user_organization uo on uo.id_role = r.id_role
where r.status = 'active' and uo.status = 'active' and uo.id_user = 
 

update user_organization uo set status = 'active' where uo.id_user_org = 
