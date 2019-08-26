class Sleep {
  constructor(data) {
    this.data = data;
  }

  getDataByID(id) {
    return this.data.filter(obj => obj.userID === id)
  }

  getDataByDate(date) {
    return this.data.filter(obj => obj.date === date)
  }

  findSingleValue(id, date, prop) {
    return this.getDataByID(id).find(dataObj => dataObj.date === date)[prop];
  }

  findPropArray(id, prop) {
    let dataObjs = this.getDataByID(id);
    return dataObjs.map(data => data[prop]);
  }

  findWeekArray(id, date, prop) {
    let propArray = this.findPropArray(id, prop);
    let dateIndex = this.getDataByID(id).findIndex(dataObj => dataObj.date === date);

    if (propArray.length >= 7) {
      return propArray.slice(dateIndex - 6, dateIndex + 1);
    } else {
      return propArray;
    }
  }

  calculateAvgQuality(id) {
    let userData = this.getDataByID(id);
    let qualitySum = this.findQualityArray(id).reduce((prev, curr) => {
      return prev += curr
    });
    let avgQuality = qualitySum / userData.length;
    return Math.round(avgQuality * 10) / 10;
  }

  findAvg(array) {
    let avg = array.reduce(((prev, curr) => prev += curr), 0) / array.length;
    return Math.round(avg * 10) / 10;
  }

  findWeekAvg(id, date, prop) {
    let weekArr = this.findWeekArray(id, date, prop);
    return Math.round(this.findAvg(weekArr));
  }

  findMaxOneUser(id, prop) {
    let propArray = this.findPropArray(id, prop);
    return Math.max(...propArray);
  }

  findQualityArray(id) {
    let userData = this.getDataByID(id);
    return userData.map(data => data.sleepQuality);
  }

  getAllUserIDs() {
    let users = this.data.map(obj => obj.userID);
    let unique = users.filter((id, index, array) => array.indexOf(id) === index);
    return unique;
  }

  // Needs refactoring
  findAvgQualityAbove3() {
    let users = [];
    let userAvgs = this.getAllUserIDs().map(id => this.calculateAvgQuality(id));

    for (let i = 0; i < userAvgs.length; i++) {
      if (userAvgs[i] > 3) {
        users.push(i + 1);
      }
    }
    return users;
  }

// Needs refactoring
  findMostHours(date) {
    let users = [];
    let hours = this.getDataByDate(date).map(obj => obj.hoursSlept);
    let maxTime = Math.max(...hours);

    for (let i = 0; i < hours.length; i++) {
      if (hours[i] === maxTime) {
        users.push(i + 1);
      }
    }
    return users;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}