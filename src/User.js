class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.address = user.address;
    this.email = user.email;
    this.strideLength = user.strideLength;
    this.dailyStepGoal = user.dailyStepGoal;
    this.friends = user.friends;
  }

  returnFirstName() {
    let fullName = this.name.split(' ');
    return fullName[0];
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}