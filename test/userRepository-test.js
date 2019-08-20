const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const sampleUserData = require('../test/users-sample');

describe('UserRepository', () => {
  it('should ensure testing is working', () => {
    expect(true).to.equal(true);
  });

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should hold user data', () => {
    let userRepo = new UserRepository(sampleUserData);
    expect(userRepo.data).to.equal(sampleUserData);
  });

  it('should return user data given a user id', () => {
    let userRepo = new UserRepository(sampleUserData);      
    expect(userRepo.returnUserData(3)).to.eql(sampleUserData[2]);
  });

  it('should calculate the average step goal of all users', () => {
    let userRepo = new UserRepository(sampleUserData);
    expect(userRepo.avgStepGoal()).to.equal(6400);
  });
});  
