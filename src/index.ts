import express, { RequestHandler} from "express";
import { connectDB } from "./config/database";
import storeRoutes from "./routes/storeRoutes";
// import locationRoutes from "./routes/locationRoutes";

const app = express();
const port = 3000; 

connectDB();

/////////////////////// MIDDLEWARES ////////////////////////

app.use((req, res, next) => {
    console.log("testandooo");
    next();
});
app.use(express.json());
// app.use('/api/locations', locationRoutes); 
app.use('/api/stores', storeRoutes);

// query no viacep


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);
});