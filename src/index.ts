import express from "express";
import { connectDB } from "./config/database";
import storeRoutes from "./routes/storeRoutes";

const app = express();
const port = 3000; 

connectDB();

app.use(express.json());
app.use('/api', storeRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);
});