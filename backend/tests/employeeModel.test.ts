import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Employee from '../models/employeemodel';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Employee.deleteMany();
});

describe('Employee Model', () => {
  it('should create and save a valid employee', async () => {
    const validEmployee = new Employee({
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'Engineer',
      age: 30,
    });

    const savedEmployee = await validEmployee.save();
    expect(savedEmployee._id).toBeDefined();
    expect(savedEmployee.firstName).toBe('Jane');
  });

  it('should throw validation error if required fields are missing', async () => {
    const invalidEmployee = new Employee({ firstName: 'John' }); // missing lastName, role, age

    let error = null;
    try {
      await invalidEmployee.save();
    } catch (err: any) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors).toHaveProperty('lastName');
    expect(error.errors).toHaveProperty('role');
    expect(error.errors).toHaveProperty('age');
  });
});
