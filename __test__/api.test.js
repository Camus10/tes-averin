const request = require('supertest');
const app = require('../index');
const db = require('../src/database');

describe('CRUD Operations', () => {
  let createdDataId;

  it('should create new data', async () => {
    const response = await request(app)
      .post('/api/data')
      .send({ name: 'Test Data', description: 'This is a test data.' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('id');
    createdDataId = response.body.id;
  });

  it('should get all data', async () => {
    const response = await request(app)
      .get('/api/data');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get data by ID', async () => {
    const response = await request(app)
      .get(`/api/data/${createdDataId}`);
  
    expect(response.statusCode).toBe(200);
    // expect(response.body).toBeInstanceOf(Array); // Making sure response is array
    expect(response.body).toBeInstanceOf(Object); // Making sure response is object

    // Checking every object inside array if has property "id"
    const dataWithMatchingId = response.body.find(data => data.id === createdDataId);
    expect(dataWithMatchingId).toBeDefined(); // Making sure object "id" is matching
  });

  it('should update data by ID', async () => {
    const response = await request(app)
      .put(`/api/data/${createdDataId}`)
      .send({ name: 'Updated Data', description: 'This data has been updated.' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Data updated successfully');
  });

  it('should delete data by ID', async () => {
    const response = await request(app)
      .delete(`/api/data/${createdDataId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Data deleted successfully');
  });

  afterAll(async () => {
    // Close connection after testing
    await new Promise((resolve) => db.end(resolve));
    // db.end();
  });
});
