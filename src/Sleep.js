class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getDataByID(id) {
    return this.sleepData.filter(obj => obj.userID === id)
  }

  getDataByDate(date) {
    return this.sleepData.filter(obj => obj.date === date)
  }

  findPropertyArray(id, property) {
    let userData = this.getDataByID(id);
    return userData.map(data => data[property]);
  }

  findHoursArray(id) {
    let userData = this.getDataByID(id);
    return userData.map(data => data.hoursSlept);
  }

  findQualityArray(id) {
    let userData = this.getDataByID(id);
    return userData.map(data => data.sleepQuality);
  }

  findHoursByWeek(id, date) {
    if (this.findHoursArray(id).length >= 7) {
      let endDateIndex = this.getDataByID(id).findIndex(obj => obj.date === date);
      return this.findHoursArray(id).slice(endDateIndex - 6);
    } else {
      return this.findHoursArray(id);
    }
  }

  findQualityByWeek(id, date) {
    if (this.findQualityArray(id).length >= 7) {
      let endDateIndex = this.getDataByID(id).findIndex(obj => obj.date === date);
      return this.findQualityArray(id).slice(endDateIndex - 6);
    } else {
      return this.findQualityArray(id);
    }
  }

  getAllUserIDs() {
    let users = this.sleepData.map(obj => obj.userID);
    let unique = users.filter((id, index, array) => array.indexOf(id) === index);
    return unique;
  }

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

  calculateAvgHours(id) {
    let userData = this.getDataByID(id);
    let hoursSum = this.findHoursArray(id).reduce((prev, curr) => {
      return prev += curr
    });
    let avgHours = hoursSum / userData.length;
    return Math.round(avgHours * 10) / 10;
  }

  calculateAllAvgHours() {
    let avgHours = this.sleepData.map(obj => obj.hoursSlept).reduce((prev, curr) => {
      return prev += curr
    }) / this.sleepData.length;
    return Math.round(avgHours * 10) / 10;
  }

  calculateAvgQuality(id) {
    let userData = this.getDataByID(id);
    let qualitySum = this.findQualityArray(id).reduce((prev, curr) => {
      return prev += curr
    });
    let avgQuality = qualitySum / userData.length;
    return Math.round(avgQuality * 10) / 10;
  }

  calculateAllAvgQuality() {
    let avgQuality = this.sleepData.map(obj => obj.sleepQuality).reduce((prev, curr) => {
      return prev += curr
    }) / this.sleepData.length;
    return Math.round(avgQuality * 10) / 10;
  }

  getHoursByDate(id, date) {
    return this.getDataByID(id).find(obj => obj.date === date).hoursSlept;
  }

  getQualityByDate(id, date) {
    return this.getDataByID(id).find(obj => obj.date === date).sleepQuality;
  }

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

module.exports = Sleep;