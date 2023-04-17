import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mongoose from 'mongoose';
import videoModel from '../database/models/videoModel';

chai.use(chaiHttp);
const expect = chai.expect;

const testVideo = {
    videoName: 'test.mp4',
    videoUrl: "videoURL"
}

describe('Video', () => {
  beforeEach(async () => {
    await mongoose.connection.dropCollection('videos');
  });

  describe('POST /video', () => {
    it('should create a new video', (done) => {
      chai
        .request(app)
        .post('/video/videoUpload')
        .send(videoModel.create(testVideo))
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.not.have.property('password');
          done();
        });
    });
    it('should not create a new video', (done) => {
      chai
        .request(app)
        .post('/video/videoUpload')
        .send(testVideo)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('hould return an error if the server is down', (done) => {	
      chai
        .request(app)
        .post('/video/videoUpload')
        .send(testVideo)
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  })
})

describe('GET /video', () => {
  describe('GET /getallVideos', () => {
    it('should return all videos', (done) => {
      chai
      .request(app)
      .post('/video/videoUpload')
      .send(testVideo)
      .end((err, res) => {
          chai.request(app).get('/video/getallVideos').end((err, res) => {
              expect(res).to.have.status(200);
              done();
          });
        });
    });
    it('should return an error if the server is down', (done) => {
      chai
      .request(app)
      .post('/video/videoUpload')
      .send(testVideo)
      .end((err, res) => {
      chai.request(app).get('/video/getallVideos').end((err, res) => {
          expect(res).to.have.status(500);
          done();
      })
      });
    })
  })
})
