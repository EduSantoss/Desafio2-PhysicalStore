import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://Edusantoss:SENHA@cluster-desafio2.l9hdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-desafio2"; // Ajustar com minha conexao no dia !!

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};
