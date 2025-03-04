import 'dotenv/config';
import express from 'express';
import { sequelize } from './models/index.js';
import umzug from './migrations/umzug.js';
import userController from './controllers/userController.js';

const app = express();
app.use(express.json());

app.post('/api/users/:userId/balance', userController.updateBalance);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await umzug.up();
    
    await sequelize.authenticate();
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer(); 