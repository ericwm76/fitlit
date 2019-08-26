class Hydration {
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
    // bug needs fixing - if propArray.length is greater than 7, but the date passed as an argument is one of the first 7 dates in the array, dateIndex - 6 will be a negative number.

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
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}