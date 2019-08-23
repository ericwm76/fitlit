const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User')
const Sleep = require('../src/Sleep');
const sampleSleepData = require('../test/sleep-sample')

let sleep1, user;

beforeEach(() => {
  sleep1 = new Sleep(sampleSleepData);
  user = new User({
    "id": 2,
    "name": "Jarvis Considine",
    "address": "30086 Kathryn Port, Ciceroland NE 07273",
    "email": "Dimitri.Bechtelar11@gmail.com",
    "strideLength": 4.5,
    "dailyStepGoal": 5000,
    "friends": [
      9,
      18,
      24,
      19
    ]
  })
})

describe('Sleep', () => {
  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  })

  it('should take in user data', () => {
    expect(sleep1.data).to.eql(sampleSleepData);
  })

  it('should calculate a user\'s average number of hours slept per day, all time', () => {
    expect(sleep1.findAvg(sleep1.findPropArray(user.id, 'hoursSlept'))).to.equal(7.5)
  })

  it('should calculate a user\'s average sleep quality, all time', () => {
    expect(sleep1.findAvg(sleep1.findPropArray(user.id, 'sleepQuality'))).to.equal(3.5)
  })

  it('should return the number of hours a user slept on a given date', () => {
    expect(sleep1.findSingleValue(user.id, '2019/06/16', 'hoursSlept')).to.equal(7.5)
  })

  it('should return a user\'s sleep quality on a given date', () => {
    expect(sleep1.findSingleValue(user.id, '2019/06/16', 'sleepQuality')).to.equal(3.8)
  })

  it('should return the number of hours a user slept each day of a given week', () => {
    expect(sleep1.findWeekArray(user.id, '2019/06/22', 'hoursSlept')).to.eql([7.5, 5.7, 10.8, 9.6, 10.1, 4.3, 4.8]);
  })

  it('should return a user\'s sleep quality each day of a given week', () => {
    expect(sleep1.findWeekArray(user.id, '2019/06/22', 'sleepQuality')).to.eql([3.8, 3, 3.2, 2.5, 2.4, 4.8, 3.3]);
  })

  it('should return average sleep quality of all users, all time', () => {
    expect(sleep1.findAvg(sleep1.data.map(dataObj => dataObj.sleepQuality))).to.equal(3);
  })

  it('should find all users whose average sleep quality is greater than 3 for a given week', () => {
    expect(sleep1.findAvgQualityAbove3()).to.eql([ 2, 3, 5, 6, 7, 8 ])
  })

  it('should find the user who slept the greatest number of hours on a given date', () => {
    expect(sleep1.findMostHours('2019/06/20')).to.eql([2, 5]);
  })
})