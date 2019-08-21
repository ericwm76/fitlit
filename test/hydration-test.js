const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration');
const sampleHydrationData = require('../test/hydration-sample');

describe('Hydration', () => {

  it('should be a function', () => {
    expect(Hydration).to.be.a('function')
  })

  it('should take in one user\'s data', () => {
    const hydration1 = new Hydration(sampleHydrationData);

    expect(hydration1.data).to.eql(sampleHydrationData);
  })

  it('should calculate the average fluid ounces consumed per day for all time', () => {
    const hydration1 = new Hydration(sampleHydrationData);
    expect(hydration1.calculateAvgHydration()).to.equal(66.5)
  })

  it('should return the ounces consumed on a specific date', () => {
    const hydration1 = new Hydration(sampleHydrationData);
    expect(hydration1.findOuncesByDate('2019/06/17')).to.equal(47)
  })

  it('should return the last week of ounces consumed', () => {
    const hydration1 = new Hydration(sampleHydrationData);
    expect(hydration1.findOuncesByWeek('2019/06/25')).to.eql([85, 42, 87, 94, 84, 39, 75])
  })
})