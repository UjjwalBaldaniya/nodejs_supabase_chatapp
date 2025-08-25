import "./config";
import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

// ✅ Enable CORS for Next.js frontend
app.use(
  cors({
    origin: "*", // Allow requests from Next.js app
    credentials: true, // Allow cookies & auth headers if needed
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the Supabase RLS-Protected API (TypeScript)!");
});

// routes import
import messageRouter from "./routes/messages.routes";

// route declaration
app.use("/messages", messageRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
