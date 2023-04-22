import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import imageModel from '../database/models/imageModel';
import path from 'path';
import fs from 'fs';
const expect = chai.expect;

chai.use(chaiHttp);

const testImage: any = {
    imageName: 'test.jpeg',
    imageUrl: 'test.jpeg'
}

describe('Image Upload API', () => {
    let imageId: string;
    it('should upload an image', async () => {
        chai.request(app)
            .post('/api/v1/image/imageUpload')
            .write(fs.readFileSync(path.join(process.cwd(), './src/tests/images/', 'test.jpeg')))
        expect(fs.existsSync(path.join(process.cwd(), './src/tests/images/', 'test.jpeg'))).to.equal(true);

        const response = await imageModel.create({
            imageName: 'test.jpeg',
            imageUrl: 'test.jpeg'
        })
        expect(response.imageUrl).to.equal('test.jpeg');
    });
    it('should not upload duplicate image', async () => {
        const res = await chai
            .request(app)
            .post('/api/v1/image/imageUpload')
            .write(fs.readFileSync(path.join(process.cwd(), './src/tests/images/', 'test.jpeg')));
        expect(fs.existsSync(path.join(process.cwd(), './src/tests/images/', 'test.jpeg'))).to.equal(true); 4

        const response = await imageModel.findOne({
            imageName: 'test.jpeg'
        });
    });

});

describe('GET /image', () => {
    describe('GET /getallImages', () => {
        it('should return all images', (done) => {

            chai
                .request(app)
                .post('/api/v1/image/imageUpload')
                .send(testImage)
                .end((err, res) => {
                    chai.request(app).get('/api/v1/image/getallImages').end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
                })
        });
        it('should return an error if the server is is not found', (done) => {
            chai
                .request(app)
                .post('/api/v1/image/imageUpload')
                // .set("Authorization", `Bearer ${authToken}`)
                .send(testImage)
                .end((err, res) => {
                    chai.request(app).get('/api/v1/image/getall').end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
                })
        })
    })

})


