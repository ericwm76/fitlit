const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const sampleUserData = require('../test/users-sample');

describe('User', () => {

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should hold a user\'s data', () => {
    let user1 = new User({ 
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        3,
        5
      ]
    });
    
    expect(user1.name).to.equal('Luisa Hane');
  });

    it('should return a user\'s first name', () => {
    let user1 = new User({ 
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        3,
        5
      ]
    });
    
    expect(user1.returnFirstName()).to.equal('Luisa');
  });






});