import express from 'express';
import { router as healthRoutes } from './routes/health.routes.js'
import { router as users } from './routes/users.routes.js'
import { router as organization } from './routes/organization.routes.js'
import { router as memberships } from './routes/memberships.routes.js'
import { router as auth } from './routes/auth.routes.js'

export const app = express();

//middleware
app.use(express.json());
//rutas
app.use('/health', healthRoutes);
app.use('/auth', auth);
app.use('/users', users)
app.use('/organizations', organization)
app.use('/memberships', memberships)
