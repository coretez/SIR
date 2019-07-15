require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const User = mongoose.model('User');
const Ticket = mongoose.model('Ticket');
const Artifact = mongoose.model('Artifact')
const agent = request.agent(app);

describe('User crud test', () => {
  it('should allow a user to be posted and credentials returned', (done) => {
    const userPost = {username: 'lukeJordan', password: 'fluencysecurity', 
    email: 'luke.jordan@fluencysecurity.com', groups: ['Intern']};
    agent.post('/api/users')
      .send(userPost)
      .expect(200)
      .end((err, results) => {
        //console.log(results);
        //results.body.read.should.not.equal(false);
        results.body.should.have.properties('username','password','email');
        done();
      }); 
  });

  afterEach((done) => {
    User.deleteMany({}).exec();
    Ticket.deleteMany({}).exec();
    Artifact.deleteMany({}).exec();
    done();
  });

  after((done)=>{
    mongoose.connection.close();
    app.server.close(done());
  });
});