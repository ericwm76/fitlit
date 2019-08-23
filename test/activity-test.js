const chai = require('chai');
const expect = chai.expect;

const Activity = require('../src/Activity');
const User = require('../src/User')
const sampleActivityData = require('../test/activity-sample')

let active, user;

beforeEach(() => {
  active = new Activity(sampleActivityData);
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

describe('Activity', () => {
  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  })

  it('should return the miles a user has walked based on their number of steps on a given day', () => {
    expect(active.findMilesWalked(user.id, '2019/06/22', user.strideLength)).to.equal(3.07)
  })

  it('should return the number of minutes a user was active on a given day', () => {
    expect(active.findMinutesActive(user.id, '2019/06/22')).to.equal(124);
  })

  it('should return the number of minutes a user was active in a given week', () => {
    expect(active.findWeeklyMinutesActive(user.id, '2019/06/22')).to.eql([220, 65, 181, 243, 74, 174, 124]);
  })

  it('should return the average minutes a user was active in a given week', () => {
    expect(active.findAvgWeeklyMinutesActive(user.id, '2019/06/22')).to.equal(154);
  })

  it('should tell whether a user hit their step goal on a given day', () => {
    expect(active.hitStepGoal(user.id, '2019/06/22', 3000)).to.equal('You hit your step goal!');
    expect(active.hitStepGoal(user.id, '2019/06/22', user.dailyStepGoal)).to.equal('Almost!');
  })

  it('should find all the days where a user exceeded their step goal', () => {
    expect(active.hitWeeklyStepsGoals(user.id, '2019/06/22', user.dailyStepGoal)).to.eql(['2019/06/17', '2019/06/19', '2019/06/20', '2019/06/21']);
  })

  it('should find a user\'s all-time stair climbing record', () => {
    expect(active.findStairRecord(user.id, 'flightsOfStairs')).to.equal(44)
  })

  it('should find the average number of stairs climbed for a specific date, all users', () => {
    expect(active.findAvg)

  })

  it('should find the average number of steps taken for a specific date, all users', () => {

  })

  it('should find the average number of minutes active for a specific date, all users', () => {

  })
})