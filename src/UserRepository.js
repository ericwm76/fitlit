class UserRepository {
  constructor(data) {
    this.data = data;
  }

  returnUserData(userID) {
    return this.data.find(user => user.id === userID);
  }

  avgStepGoal() {
    let stepTotal = this.data.reduce((prev, curr) => prev + curr.dailyStepGoal, 0);
    return stepTotal / this.data.length;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}