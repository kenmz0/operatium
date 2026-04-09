import 'dotenv/config'
import { app } from './app.js';
import { StatusServices } from './services/status.services.js'
const PORT = process.env.PORT || 3000;


await StatusServices.loadAll();
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
