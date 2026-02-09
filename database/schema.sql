CREATE TABLE Role (
  id_role SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  permission_level INTEGER NOT NULL CHECK (permission_level >= 0 AND permission_level <= 100)
);


INSERT INTO Role (name, description, permission_level)
values
('admin','administrador', 100),
  ('director', 'Director ejecutivo', 80),
  ('manager', 'Gerente de departamento', 60),
  ('staff', 'Personal general', 40),
  ('assistant', 'Asistente', 20);

CREATE TABLE Users (
  id_user UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  phone_number VARCHAR(25), 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_session_at TIMESTAMP WITH TIME ZONE,
  job_title VARCHAR(50)
);
CREATE TYPE organization_status AS ENUM ('active','inactive', 'suspended');

create table Organization (
id_org BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name	varchar(50),
description	varchar(100),
email	VARCHAR(255) NOT NULL unique,
id_owner integer not null,
telephone	varchar(25),
signin_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
status organization_status
)	

create table Team (
id_team	 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
id_team_template BIGINT,
id_org BIGINT not null,
name varchar(50),
created_at	timestamp  WITH TIME ZONE DEFAULT NOW(),
suspended_at	timestamp  WITH TIME zone,
status organization_status,
description	varchar(100),
 CONSTRAINT fk_team_org FOREIGN KEY (id_org) REFERENCES Organization(id_org),
 CONSTRAINT fk_team_template FOREIGN KEY (id_team_template) REFERENCES Team_Template(id_team_template)
)	

create table Team_Template(
id_team_template BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
name varchar(50),
description varchar(100),
create_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
status organization_status
)

CREATE TYPE task_status AS ENUM ('open','in_progress','done','cancelled');

create table Task(
id_task	 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
id_org	BIGINT NOT NULL,
created_by	UUID NOT NULL,
priority INTEGER default 1 CHECK (priority >= 1 AND priority <= 3),
created_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(), 
solve_at	TIMESTAMP WITH TIME ZONE,
max_solve_at TIMESTAMP WITH TIME ZONE,
title	varchar(100) not null,
description	varchar(200),
 CONSTRAINT fk_task_org FOREIGN KEY (id_org) REFERENCES Organization(id_org),
    CONSTRAINT fk_task_created_by FOREIGN KEY (created_by) REFERENCES Users(id_user)
)

create table Sub_Task(
id_subtask BIGINT generated always as identity primary key,
id_task_assign BIGINT not null,
id_parent_subtask	BIGINT,
created_by	UUID NOT NULL,
priority INTEGER default 1 CHECK (priority >= 1 AND priority <= 3),
created_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(), 
max_solve_at TIMESTAMP WITH TIME ZONE,
title	varchar(100) not null,
description	varchar(200),
constraint fk_subtask_taskassign foreign key (id_task_assign) references Task_Assignment(id_task_assign),
     CONSTRAINT fk_subtask_parent FOREIGN KEY (id_parent_subtask) 
        REFERENCES Sub_Task(id_subtask) 
        ON DELETE RESTRICT
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

create table Sub_Task_Assignment(
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
status organization_status,
    CONSTRAINT fk_user_org_user FOREIGN KEY (id_user) REFERENCES Users(id_user),
    CONSTRAINT fk_user_org_org FOREIGN KEY (id_org) REFERENCES Organization(id_org),
    CONSTRAINT fk_user_org_role FOREIGN KEY (id_role) REFERENCES Role(id_role)
)	
CREATE TYPE role_team AS ENUM ('leader','member');
create table User_Team(
id_user_team BIGINT generated always as identity primary key,
id_user	UUID not null,
id_team BIGINT not null,
role role_team,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
suspended_at TIMESTAMP WITH TIME zone,
status organization_status,
    CONSTRAINT fk_user_team_user FOREIGN KEY (id_user) REFERENCES Users(id_user),
    CONSTRAINT fk_user_team_team FOREIGN KEY (id_team) REFERENCES Team(id_team)
 )	

 