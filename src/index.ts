import './config';
import express from 'express';

const app = express();
const port = 4000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Welcome to the Supabase RLS-Protected API (TypeScript)!');
});

// routes import
import testingRouter from './routes/testing.routes'

// route declaration
app.use('/testing', testingRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
