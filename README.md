# Todo Organizacional

Una aplicación fullstack para la gestión de tareas organizacionales con jerarquía determinada por la estructura de la organización y los equipos. Permite crear, asignar y gestionar tareas de manera jerárquica, con roles de usuario, invitaciones y membresías.

## Características

### Gestión de Usuarios
- Registro y autenticación de usuarios
- Perfiles públicos y privados
- Gestión de sesiones

### Organizaciones
- Creación de organizaciones con propietarios
- Estados de organización (activa, inactiva, suspendida)
- Gestión de miembros con roles (owner, admin, supervisor, member)

### Equipos
- Creación de equipos dentro de organizaciones
- Asignación de usuarios a equipos con roles (leader, member)
- Estados de equipo

### Membresías e Invitaciones
- Sistema de invitaciones para unirse a organizaciones
- Gestión de membresías con estados (activa, pendiente, rechazada, expirada)
- Roles organizacionales

### Tareas (En Desarrollo)
- Creación de tareas con jerarquía (tareas padre-hijo)
- Asignación a equipos o usuarios individuales
- Estados de tarea (stand_by, in_progress, done, cancelled, reassigned)
- Prioridades (1-3)
- Fechas límite
- Comentarios y observaciones

## Tecnologías

### Backend
- **Node.js** con **Express.js**
- **PostgreSQL** como base de datos
- **JWT** para autenticación
- **bcrypt** para hashing de contraseñas
- **express-validator** para validación de datos

### Base de Datos
- Esquema relacional con tablas para usuarios, organizaciones, equipos, tareas, asignaciones, invitaciones, membresías y roles
- Triggers y funciones para automatizar procesos (ej. asignar rol de owner al crear organización)

### Frontend
- Pendiente de desarrollo

## Estructura del Proyecto

```
/
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── app.js              # Configuración de Express
│   │   ├── server.js           # Punto de entrada del servidor
│   │   ├── config/
│   │   │   └── bd.js           # Configuración de base de datos
│   │   ├── middlewares/        # Middlewares de autenticación y validación
│   │   ├── repositories/       # Capa de acceso a datos
│   │   ├── routes/             # Definición de rutas API
│   │   ├── services/           # Lógica de negocio
│   │   └── utils/              # Utilidades (JWT)
│   └── database/
│       └── schema.sql          # Esquema de base de datos
├── frontend/                   # Pendiente
└── README.md
```

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- PostgreSQL
- npm o yarn

### Backend

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd noname/backend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura la base de datos:**
   - Crea una base de datos PostgreSQL
   - Ejecuta el script `database/schema.sql` para crear las tablas
   - Configura las variables de entorno en un archivo `.env`:
     ```
     DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_db
     JWT_SECRET=tu_secreto_jwt
     PORT=3000
     ```

4. **Ejecuta el servidor:**
   - Modo desarrollo: `npm run dev`
   - Producción: `npm start`

El servidor se ejecutará en `http://localhost:3000`

## API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario

### Usuarios
- `GET /users/me` - Obtener perfil propio (requiere auth)
- `GET /users/me/invitations` - Obtener invitaciones (requiere auth)
- `PATCH /users/me/invitations/:id` - Responder a invitación (requiere auth)
- `GET /users/:id` - Perfil público de usuario

### Organizaciones
- `GET /organizations/roles` - Obtener roles disponibles
- `GET /organizations/status` - Obtener estados disponibles
- `GET /organizations/:id` - Perfil de organización
- `GET /organizations/:id/members` - Miembros de organización
- `GET /organizations/:id/roles` - Roles en organización

### Membresías
- Endpoints para gestión de membresías (en desarrollo)

### Salud
- `GET /health` - Verificar estado del servidor

## Estados del Proyecto

- [x] Base de backend implementada
- [x] Autenticación y usuarios
- [x] Organizaciones y equipos
- [x] Membresías e invitaciones
- [ ] Tareas y asignaciones
- [ ] Frontend

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Autor

Kenny Muñiz

## Licencia

ISC
