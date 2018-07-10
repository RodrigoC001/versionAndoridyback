/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('app.js');
const { User } = require('models/index.js');
const sequelize = require('db.js')();

const agent = session(app);
const credentials = {
  email: 'valid@email.com',
  password: 'validPassword',
};

let user;

describe('AUTH routes probe', () => {
  it('responds with 200', () => agent.get('/auth/test').expect(200));
});

describe('AUTH routes', () => {
  after(() => sequelize.close());
  beforeEach(() =>
    User.sync({ force: true })
      .then(() => User.create(credentials))
      .then((newUser) => {
        user = newUser;
        return agent.post('/auth/login').send(credentials);
      }));
  describe('GET /auth/me', () => {
    it('responds with 200', () => agent.get('/auth/me').expect(200));
    it('responds the user who is logged in', () =>
      agent.get('/auth/me').expect((res) => {
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data).to.be.an('object');
        const { id } = res.body.data;
        expect(id).to.be.equal(1);
      }));
  });
});
