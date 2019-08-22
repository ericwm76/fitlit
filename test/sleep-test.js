const chai = require('chai');
const expect = chai.expect;

const Sleep = require('../src/Sleep');
const sampleSleepData = require('../test/sleep-sample')

describe('Sleep', () => {
  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  })

  it('should take in user data', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.sleepData).to.eql(sampleSleepData);
  })

  it('should calculate a user\'s average number of hours slept per day, all time', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.calculateAvgHours(1)).to.equal(7.9)
  })

  it('should calculate a user\'s average sleep quality, all time', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.calculateAvgQuality(1)).to.equal(2.7)
  })

  it('should return the number of hours a user slept on a given date', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.getHoursByDate(1, '2019/06/16')).to.equal(4.1)
    
  })

  it('should return a user\'s sleep quality on a given date', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.getQualityByDate(1, '2019/06/16')).to.equal(3.8)
  })

  it('should return the number of hours a user slept each day of a given week', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.findHoursByWeek(1, '2019/06/22')).to.eql([4.1, 8, 10.4, 10.7, 9.3, 7.8, 7]);
  })

  it('should return a user\'s sleep quality each day of a given week', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.findQualityByWeek(1, '2019/06/22')).to.eql([3.8, 2.6, 3.1, 1.2, 1.2, 4.2, 3]);
  })

  it('should return average sleep quality of all users, all time', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.calculateAllAvgQuality()).to.equal(3);    
  })

  it('should find all users whose average sleep quality is greater than 3 for a given week', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.findAvgQualityAbove3()).to.eql([ 2, 3, 5, 6, 7, 8 ])
  })

  it('should find the user who slept the greatest number of hours on a given date', () => {
    const sleep1 = new Sleep(sampleSleepData);
    expect(sleep1.findMostHours('2019/06/20')).to.eql([2, 5]);
  })
})