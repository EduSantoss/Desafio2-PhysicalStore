import mongoose from "mongoose";

const MONGO_URI = ""; // Ajustar com minha conexao no dia !!

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};
