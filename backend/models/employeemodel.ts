// Require mongoose
// need to install types
// TypeScript is not aware of the Node.js environment and its built-in functions, including require.

// To fix this issue, you need to install the type definitions for Node.js using the command npm i --save-dev @types/node
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  age: { type: Number, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
