const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration');
const User = require('../src/User')
const hydrationSampleData = require('../test/hydration-sample');

let hydration, user;

beforeEach(() => {
  hydration = new Hydration(hydrationSampleData);
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

describe('Hydration', () => {
  it('should be a function', () => {
    expect(Hydration).to.be.a('function')
  })

  it('should take in user data', () => {
    expect(hydration.data).to.eql(hydrationSampleData);
  })

  it('should calculate the average fluid ounces consumed per day for all time', () => {
    expect(hydration.findAvg(hydration.findPropArray(user.id, 'numOunces'))).to.equal(71)
  })

  it('should return the ounces consumed on a specific date', () => {
    expect(hydration.findSingleValue(user.id, '2019/06/17', 'numOunces')).to.equal(96)
  })

  it('should return the last week of ounces consumed', () => {
    expect(hydration.findWeekArray(user.id, '2019/06/22', 'numOunces')).to.eql([91, 96, 70, 76, 71, 27, 58])
  })
})