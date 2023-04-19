import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mongoose from 'mongoose';
import { IUserSignup } from '../types/user';
import { IUserLogin } from '../types/user';

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
    await mongoose.connection.dropCollection('users');
  });

  describe('POST /signup', () => {
    it('should create a new user', (done) => {
      chai
        .request(app)
        .post('/api/v1//user/signup')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.not.have.property('password');
          done();
        });
    });

    it('should return an error if email is already in use', (done) => {
      chai
        .request(app)
        .post('/api/v1/user/signup')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message', 'Email already exists');
          done();
        });
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
        authToken = res.body.token;
        done();
      });
  });

  it(' should return an error if login credentials are invalid', (done) => {
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
});
