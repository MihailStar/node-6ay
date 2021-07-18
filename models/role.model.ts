import mongoose from 'mongoose';

type Type = {
  value: string;
};
type Role = Type & mongoose.Document;

const schema = new mongoose.Schema(
  {
    value: { type: String, default: 'USER', unique: true },
  },
  {
    versionKey: false,
  }
);
const Model = mongoose.model<Role>('Role', schema);

export { Role };
export default Model;
