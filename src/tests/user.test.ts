import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mongoose from 'mongoose';
import { IUser, IUserSignup } from '../types/user';
import { IUserLogin } from '../types/user';
import User from '../database/models/user';
chai.use(chaiHttp);

const expect = chai.expect;

const testUser: IUserSignup = {
  _id: new mongoose.Types.ObjectId(),
  name: 'shemalucien',
  email: 'shemalucien5@gmail.com',
  password: 'shema',
  role: 'admin',
};

const loginCreds: IUserLogin = {
  email: 'shemalucien5@gmail.com',
  password: 'shema',
};

const invalidCreds: IUserLogin = {
  email: 'test@gmail.com',
  password: 'test',
};

let authToken: string = '';

describe('User Signup', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/user/signup')
        .send(testUser);

      expect(res).to.have.status(201);
      expect(res.body).to.not.have.property('password');
    });

    it('should return an error if the server throws an error', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/user/signu') // incorrect endpoint
        .send(testUser);

      expect(res).to.have.status(404);
    });

    it('should return 400 if email already exists', async () => {
      // Create a test user with a unique email
      const existingUser: IUser = await User.create(testUser);

      // Make a request to create a user with the same email as testUser
      const res = await chai
        .request(app)
        .post('/api/v1/user/signup')
        .send(testUser);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', 'Email already exists');
    });
  });
});

describe('User Login', () => {
  beforeEach(async () => {
    await mongoose.connection.dropCollection('users');
    await chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(testUser);
  });

  it('should return an auth token on successful login', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send(loginCreds)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should return an error if login credentials are invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send(invalidCreds)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message', 'Invalid email or password');
        done();
      });
  });
  it('should return an error if the path does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/logi')
      .send(invalidCreds)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      })
  });
});

describe('getUserProfile', () => {
  beforeEach(async () => {
    await mongoose.connection.dropCollection('users');
  });
  it('should return a user profile', async () => {

    await User.create(testUser);

    const res = await chai.request(app).get(`/api/v1/user/get-users/${testUser._id}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'User found');
  });

  it('should return an error message for an invalid user id', async () => {
    const res = await chai.request(app).get('/api/v1/user/invalidid');
    expect(res).to.have.status(404);
  });
});

describe('getUsers', () => {
  it('should return a list of users', async () => {
    const users = [
      {
        name: 'Test User 1',
        email: 'testuser1@example.com',
        password: 'password',
        role: 'user',
      },
      {
        name: 'Test User 2',
        email: 'testuser2@example.com',
        password: 'password',
        role: 'user',
      },
    ];
    await User.insertMany(users);

    const res = await chai.request(app).get('/api/v1/user/allUsers');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Users found');
    expect(res.body.users).to.have.lengthOf(2);
  });
});

