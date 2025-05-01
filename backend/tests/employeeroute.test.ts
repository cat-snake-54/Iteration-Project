import express from 'express';
import request from 'supertest';
import Router from '../routes/employeeroute';
import Employee from '../models/employeemodel';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use('/', Router);

let mongoServer: MongoMemoryServer | undefined;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  await Employee.deleteMany();
});

describe('POST /employee route', () => {
  it('should call controller and return 200 with message', async () => {
    const newEmployee = {
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'engineer',
      age: 30,
    };

    const response = await request(app).post('/employee').send(newEmployee).expect(200);

    expect(response.text).toContain('Employee submitted!');
  });

  it('should return 500 if controller fails', async () => {
    const badEmployee = {
      firstName: 'OnlyName',
    };

    const response = await request(app).post('/employee').send(badEmployee).expect(500);

    expect(response.body).toHaveProperty('error');
  });
});
