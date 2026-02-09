CREATE TYPE organization_status AS ENUM ('active','inactive', 'suspended');

create table Organization (
id_org BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name	varchar(50),
description	varchar(100),
email	VARCHAR(255) NOT NULL unique,
id_owner integer not null,
telephone	varchar(25),
signin_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
status organization_status default 'active'
)

create table Team_Template(
id_team_template BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name varchar(50),
description varchar(100),
create_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

create table Team (
id_team	 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
id_team_template BIGINT,
id_org BIGINT not null,
name varchar(50),
created_at	timestamp  WITH TIME ZONE DEFAULT NOW(),
suspended_at	timestamp  WITH TIME zone,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
status organization_status default 'active',
description	varchar(100),
 CONSTRAINT fk_team_org FOREIGN KEY (id_org) REFERENCES Organization(id_org),
 CONSTRAINT fk_team_template FOREIGN KEY (id_team_template) REFERENCES Team_Template(id_team_template)
)	


create table Role_Template(
id_role_template BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name varchar(50) UNIQUE not null,
description TEXT,
create_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)

CREATE TABLE Role (
  id_role SERIAL PRIMARY KEY,
  id_org BIGINT not null,
  id_role_template BIGINT,
  name VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  permission_level INTEGER NOT NULL CHECK (permission_level >= 0 AND permission_level <= 100),
 	CONSTRAINT fk_role_org FOREIGN KEY (id_org) REFERENCES Organization(id_org),
 	CONSTRAINT fk_role_template FOREIGN KEY (id_role_template) REFERENCES Role_Template(id_role_template),
 	unique (id_role,id_org)
);

INSERT INTO Role_Template (name, description)
values
('admin','administrador'),
  ('director', 'Director ejecutivo'),
  ('manager', 'Gerente de departamento'),
  ('staff', 'Personal general'),
  ('assistant', 'Asistente');

CREATE TABLE Users (
  id_user UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  phone_number VARCHAR(25), 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_session_at TIMESTAMP WITH TIME ZONE
);


CREATE TYPE task_status AS ENUM ('open','in_progress','done','cancelled');

create table Task(
id_task	 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
id_org	BIGINT NOT NULL,
created_by	UUID NOT NULL,
priority INTEGER default 1 CHECK (priority >= 1 AND priority <= 3),
created_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
resolved_at	TIMESTAMP WITH TIME ZONE,
deadline TIMESTAMP WITH TIME ZONE,
title	varchar(100) not null,
description	varchar(200),
 CONSTRAINT fk_task_org FOREIGN KEY (id_org) REFERENCES Organization(id_org),
    CONSTRAINT fk_task_created_by FOREIGN KEY (created_by) REFERENCES Users(id_user)
)
create table Task_Assignment(
id_task_assign BIGINT generated always as identity primary key,
id_team	BIGINT,
assigned_to UUID,
assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
status task_status default 'in_progress',
reassigned_at TIMESTAMP WITH TIME ZONE, 
    CONSTRAINT fk_task_team FOREIGN KEY (id_team) REFERENCES Team(id_team),
    CONSTRAINT fk_task_assigned_to FOREIGN KEY (assigned_to) REFERENCES Users(id_user)
)

create table SubTask(
id_subtask BIGINT generated always as identity primary key,
id_task_assign BIGINT not null,
id_parent_subtask	BIGINT,
created_by	UUID NOT NULL,
priority INTEGER default 1 CHECK (priority >= 1 AND priority <= 3),
created_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
resolved_at	TIMESTAMP WITH TIME ZONE,
deadline TIMESTAMP WITH TIME ZONE,
title	varchar(100) not null,
description	varchar(200),
constraint fk_subtask_taskassign foreign key (id_task_assign) references Task_Assignment(id_task_assign),
     CONSTRAINT fk_subtask_parent FOREIGN KEY (id_parent_subtask) 
        REFERENCES SubTask(id_subtask) 
        ON DELETE RESTRICT
)


create table SubTask_Assignment(
id_sub_task_assign BIGINT generated always as identity primary key,
id_sub_tarea BIGINT not null,
id_team	BIGINT,
assigned_to UUID,
assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
status task_status default 'in_progress',
reassigned_at TIMESTAMP WITH TIME ZONE, 
    CONSTRAINT fk_sub_task_assigned_to FOREIGN KEY (assigned_to) REFERENCES Users(id_user),	
    CONSTRAINT fk_task_team FOREIGN KEY (id_team) REFERENCES Team(id_team)
)

create table User_Organization(
id_user_org	BIGINT generated always as identity primary key,
id_user	UUID not null,
id_org BIGINT not null,
id_role BIGINT not null,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
suspended_at TIMESTAMP WITH TIME zone,
status organization_status default 'active'
job_title VARCHAR(50),
    CONSTRAINT fk_user_org_user FOREIGN KEY (id_user) REFERENCES Users(id_user),
    CONSTRAINT fk_user_org_role FOREIGN KEY (id_role, id_org) REFERENCES Role(id_role, id_org) on delete cascade,
)

create index idx_user_org_org_id on user_organization(id_org)

CREATE TYPE role_team AS ENUM ('leader','member');

create table User_Team(
id_user_team BIGINT generated always as identity primary key,
id_user	UUID not null,
id_team BIGINT not null,
role role_team,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
suspended_at TIMESTAMP WITH TIME zone,
status organization_status default 'active'
    CONSTRAINT fk_user_team_user FOREIGN KEY (id_user) REFERENCES Users(id_user),
    CONSTRAINT fk_user_team_team FOREIGN KEY (id_team) REFERENCES Team(id_team)
 )	

 
 drop table User_Organization
 drop table user_team 
 drop table sub_task_assignment 
 drop table sub_task 
 drop table task_assignment 
 drop table task 
 drop table role
drop table users 
drop table team
drop table team_template 
drop table organization
 
 select * from users u 
 insert into users (first_name , last_name ,email , password_hash , phone_number , updated_at, last_session_at) 
 values('Raul', 'Gimenez', 'raul.gimenez@gmail.com', 'hash_sdasdasd', '87678687678', null,null) 

 
  select * from organization o 
 insert into organization (name , description , email , id_owner , telephone , status) 
 values('Ferreteria Palo Alto', 'vedemos hierro', 'raul.gimenez@gmail.com', 'uuid', '87678687678', 'active') 
 
 select * from "role" r 
 select * from role_template 
 insert into "role" (id_org , id_role_template, permission_level)
 values (1, 2, 80)
 
 select * from user_organization uo 
 insert into user_organization (id_user , id_org , id_role , status, job_title) 
 values(1, 1, 1, 'active', 'Director') 
 
 
 