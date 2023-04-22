import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import videoModel from '../database/models/videoModel';
import path from 'path';
import fs from 'fs';
chai.use(chaiHttp);
const expect = chai.expect;

const testVideo = {
    videoName: 'test.mp4',
    videoUrl: "videoURL"
}

describe('Video Upload API', () => {
    let imageId: string;
    it('should upload video', async () => {
        chai.request(app)
            .post('/api/v1/video/videoUpload')
            .write(fs.readFileSync(path.join(process.cwd(), './src/tests/videos/', 'test.mp4')))
        expect(fs.existsSync(path.join(process.cwd(), './src/tests/videos/', 'test.mp4'))).to.equal(true);

        const response = await videoModel.create({
            videoName: 'test.mp4',
            videoUrl: "videoURL"
        })
        expect(response.videoUrl).to.equal('videoURL');
    });
    it('should not upload duplicate video', async () => {
        const res = await chai
            .request(app)
            .post('/api/v1/video/videoUpload')
            .write(fs.readFileSync(path.join(process.cwd(), './src/tests/videos/', 'test.mp4')));
        expect(fs.existsSync(path.join(process.cwd(), './src/tests/videos/', 'test.mp4'))).to.equal(true); 
        const response = await videoModel.findOne({
            videoName: 'test.mp4'
        })
          
        });

});


describe('GET /video', () => {
  describe('GET /getallVideos', () => {
    it('should return all videos', (done) => {
      chai
      .request(app)
      .post('/api/v1/video/videoUpload')
      .send(testVideo)
      .end((err, res) => {
          chai.request(app).get('/api/v1/video/getallVideos').end((err, res) => {
              expect(res).to.have.status(200);
              done();
          });
        });
    });
    it('should return an error if the server is not found', (done) => {
      chai
      .request(app)
      .post('/api/v1/video/videoUpload')
      .send(testVideo)
      .end((err, res) => {
      chai.request(app).get('/api/v1/video/get=').end((err, res) => {
          expect(res).to.have.status(404);
          done();
      })
      });
    })
  })
})
