import express from 'express';
import {router as healthRoutes } from './routes/health.routes.js'
import {router as users} from './routes/users.routes.js'

export const app = express();

//middleware
app.use(express.json());
//rutas
app.use('/health', healthRoutes);
app.use('/users', users)
