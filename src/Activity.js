class Activity {
  constructor(data) {
    this.data = data;
  }

  getDataByID(id) {
    return this.data.filter(obj => obj.userID === id)
  }

  getDataByDate(date) {
    return this.data.filter(obj => obj.date === date)
  }

  findPropertyArray(id, property) {
    let activityData = this.getDataByID(id);
    return activityData.map(data => data[property]);
  }

  findMilesWalked(id, date, stride) {
    let stepsByDate = this.getDataByDate(date).find(obj => obj.userID === id).numSteps;

    return Math.round(((stepsByDate * stride) / 5280) * 100) / 100; 
  }

  findMinutesActive(id, date) {
    return this.getDataByDate(date).find(obj => obj.userID === id).minutesActive;
  }

  findWeeklyMinutesActive(id, date) {
    let minutesArray = this.findPropertyArray(id, 'minutesActive');
    if (minutesArray.length >= 7) {
      return minutesArray.slice(minutesArray.length - 7);
    } else {
      return minutesArray;
    }
  }

  findAvgWeeklyMinutesActive(id, date) {
    return Math.round(this.findWeeklyMinutesActive(id, date).reduce((prev, curr) => prev += curr) / 7) 
  }

  hitStepGoal(id, date, goal) {
    let stepsByDate = this.getDataByDate(date).find(obj => obj.userID === id).numSteps;

    if (stepsByDate >= goal) {
      return 'You hit your step goal!';
    } else {
      return 'Almost!';
    }
  }

  hitWeeklyStepsGoals(id, date, goal) {
    let days = [];
    this.getDataByID(id).forEach(obj => {
      if (obj.numSteps >= goal) {
        days.push(obj.date);
      }
    })
    return days
  }

  findStairRecord(id, property) {
    let stairsArray = this.findPropertyArray(id, property);
    return Math.max(...stairsArray);
  }

  findAvg(array) {
    return Math.round(array.reduce((prev, curr) => prev += curr) / array.length) 
  }
}

module.exports = Activity;