import mongoose, { Schema, Document } from "mongoose";

export interface IStore extends Document {
  name: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  latitude: number;
  longitude: number;
}

const StoreSchema = new Schema<IStore>({ 
  name: { type: String, required: true },
  cep: { type: String, required: true },
  logradouro: { type: String, required: true },
  complemento: { type: String, required: true},
  bairro: { type: String, required: true},
  localidade: { type: String, required: true},
  uf: { type: String, required: true},
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const Store =  mongoose.model<IStore>("Store", StoreSchema);
export default Store;
