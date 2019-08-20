const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const sampleUserData = require('../test/users-sample');

describe('UserRepository', function() {
  it('should ensure testing is working', function() {
    expect(true).to.equal(true)
  });

  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it('should return user data given a user id', function() {

  });

  it('should calculate the average step goal of all users', function() {

  });
});  
