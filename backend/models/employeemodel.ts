import mongoose, { Schema, Document } from 'mongoose';

// Define type
type EmployeeType = {
  firstName: string;
  lastName: string;
  role: string;
  age: number;
};

// Extend Document to get Mongoose Document methods and metadata
type EmployeeDocument = EmployeeType & Document;

// Define schema
const employeeSchema = new Schema<EmployeeDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  age: { type: Number, required: true },
});

// Create model
const Employee = mongoose.model<EmployeeDocument>('Employee', employeeSchema);

export default Employee;
