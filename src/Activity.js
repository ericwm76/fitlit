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

  findAvg(array) {
    let avg = array.reduce(((prev, curr) => prev += curr), 0) / array.length;
    return Math.round(avg);
  }

  findWeekAvg(id, date, prop) {
    let weekArr = this.findWeekArray(id, date, prop);
    return Math.round(this.findAvg(weekArr));
  }

  findMaxOneUser(id, prop) {
    let propArray = this.findPropArray(id, prop);
    return Math.max(...propArray);
  }

  findMilesWalked(id, date, prop, stride) {
    let steps = this.findSingleValue(id, date, prop);
    return Math.round(((steps * stride) / 5280) * 100) / 100;
  }

  hitGoal(id, date, prop, goal) {
    let steps = this.findSingleValue(id, date, prop);
    if (steps >= goal) {
      return 'You hit your goal!';
    } else {
      return 'Almost!';
    }
  }

  hitWeeklyGoals(id, date, goal) {
    let days = [];
    this.getDataByID(id).forEach(obj => {
      if (obj.numSteps >= goal) {
        days.push(obj.date);
      }
    })
    return days;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}