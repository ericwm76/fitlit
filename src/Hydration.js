class Hydration {
  constructor(hydrationArray) {
    this.data = hydrationArray
  }

  findOuncesArray() {
    return this.data.map(obj => obj.numOunces);
  }

  calculateAvgHydration() {
    let ouncesSum = this.findOuncesArray().reduce((prev, curr) => {
      return prev += curr
    });
    let avgOunces = ouncesSum / this.data.length;
    return avgOunces;
  }

  findOuncesByDate(date) {
    return this.data.find(obj => obj.date === date).numOunces;
  }

  findOuncesByWeek(date) {
    if (this.findOuncesArray().length >= 7) {
      let endDateIndex = this.data.findIndex(obj => obj.date === date);
      return this.findOuncesArray().slice(endDateIndex - 6);
    } else {
      return this.findOuncesArray();
    }
  }
}

module.exports = Hydration;