import express from 'express';
import mongoose from 'mongoose';
import Router from '../routes/employeeroute';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Employee from '../models/employeemodel';

const app = express();
app.use(express.json());
app.use('/api', Router);

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
  await Employee.deleteMany(); // clear data between tests
});

describe('POST /api/employee', () => {
  it('should create a new employee and return it', async () => {
    const newEmployee = {
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'Engineer',
      age: 30,
    };

    const response = await request(app).post('/api/employee').send(newEmployee).expect(200);

    expect(response.body).toMatchObject(newEmployee);
    expect(response.body).toHaveProperty('_id');
  });

  it('should return 500 if data is missing', async () => {
    const incompleteEmployee = {
      firstName: 'John',
      // missing lastName, role, and age
    };

    const response = await request(app).post('/api/employee').send(incompleteEmployee).expect(500);

    expect(response.body).toHaveProperty('error');
  });
});
