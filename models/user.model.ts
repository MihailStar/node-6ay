import mongoose from 'mongoose';

interface Type {
  username: string;
  password: string;
  roles: string[];
}
interface User extends Type, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
  },
  {
    versionKey: false,
  }
);
const Model = mongoose.model<User>('User', schema);

export { User };
export default Model;
