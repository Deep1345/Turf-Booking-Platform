const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Server Basic Endpoints', () => {
  // Close database connection after tests to prevent memory leaks in Jest
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return 200 on base route /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Turf Booking API is running');
  });
});
