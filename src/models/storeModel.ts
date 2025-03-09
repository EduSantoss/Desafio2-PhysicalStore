import mongoose, { Schema, Document } from "mongoose";

export interface IStore extends Document {
  id: string;
  name: string;
  address: string;
  cep: string;
  latitude: number;
  longitude: number;
}

const StoreSchema = new Schema<IStore>({
  id: { type: String, required: true},  
  name: { type: String, required: true },
  address: { type: String, required: true },
  cep: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const Store =  mongoose.model<IStore>("Store", StoreSchema);
export default Store;
