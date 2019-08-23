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

  findPropArray(id, prop) {
    let dataObjs = this.getDataByID(id);
    return dataObjs.map(data => data[prop]);
  }

  // findMilesWalked(id, date, stride) {
  //   let stepsByDate = this.getDataByDate(date).find(obj => obj.userID === id).numSteps;

  //   return Math.round(((stepsByDate * stride) / 5280) * 100) / 100; 
  // }

  findSingleValue(id, date, prop) {
    return this.getDataByID(id).find(dataObj => dataObj.date === date)[prop];
  }

  findMilesWalked(id, date, prop, stride) {
    let steps = this.findSingleValue(id, date, prop);
    return Math.round(((steps * stride) / 5280) * 100) / 100;
  }

  // This should all be done by findSingleValue()
    // findMinutesActive(id, date) {
    //   return this.getDataByDate(date).find(obj => obj.userID === id).minutesActive;
    // }

  findWeekArray(id, date, prop) {
    let propArray = this.findPropArray(id, prop);
    let dateIndex = this.getDataByID(id).findIndex(dataObj => dataObj.date === date);

    if (propArray.length >= 7) {
      return propArray.slice(dateIndex - 6, dateIndex + 1);
    } else {
      return propArray;
    }
  }

  // findWeeklyMinutesActive(id, date) {
  //   let minutesArray = this.findPropertyArray(id, 'minutesActive');
  //   if (minutesArray.length >= 7) {
  //     return minutesArray.slice(minutesArray.length - 7);
  //   } else {
  //     return minutesArray;
  //   }
  // }
  findWeekAvg(id, date, prop) {
    let weekArr = this.findWeekArray(id, date, prop);
    return Math.round(this.findAvg(weekArr));
  }
  // findAvgWeeklyMinutesActive(id, date) {
  //   return Math.round(this.findWeeklyMinutesActive(id, date).reduce((prev, curr) => prev += curr) / 7) 
  // }
  hitGoal(id, date, prop, goal) {
    let steps = this.findSingleValue(id, date, prop);
    if (steps >= goal) {
      return 'You hit your goal!';
    } else {
      return 'Almost!';
    }
  }
  // hitStepGoal(id, date, goal) {
  //   let stepsByDate = this.getDataByDate(date).find(obj => obj.userID === id).numSteps;

  //   if (stepsByDate >= goal) {
  //     return 'You hit your step goal!';
  //   } else {
  //     return 'Almost!';
  //   }
  // }

  hitWeeklyGoals(id, date, goal) {
    let days = [];
    this.getDataByID(id).forEach(obj => {
      if (obj.numSteps >= goal) {
        days.push(obj.date);
      }
    })
    return days;
  }

  findMaxOneUser(id, prop) {
    let propArray = this.findPropArray(id, prop);
    return Math.max(...propArray);
  }
  // findStairRecord(id, property) {
  //   let stairsArray = this.findPropertyArray(id, property);
  //   return Math.max(...stairsArray);
  // }

  // findAvg(array) {
  //   return Math.round(array.reduce((prev, curr) => prev += curr) / array.length) 
  // }
  findAvg(array) {
    let avg = array.reduce(((prev, curr) => prev += curr), 0) / array.length;
    return Math.round(avg);
  }
}

module.exports = Activity;