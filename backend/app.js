import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();

app.use(cors());
app.use(express.json()); 



app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Route not found',
  });
});

export default app;
