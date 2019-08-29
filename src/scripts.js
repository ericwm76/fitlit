const randomID = getRandomID();
const currentDate = '2019/07/20';
const userRepo = new UserRepository(userData);
let user = userRepo.returnUserData(randomID);
let user1 = new User(user);
let hydration = new Hydration(hydrationData);
let sleep = new Sleep(sleepData);
let activity = new Activity(activityData);

$('#profile').click(function() {$('#user-info').toggle()
});
$('#friends').click(function() {$('#friend-list').toggle()
});
$('#full-name').text(user1.name)
$('#address').text(user1.address)
$('#email').text(user1.email)
$('#user-name').text(user1.returnFirstName());
$('#todays-date').text(currentDate);
$('#user-step-goal').text(user1.dailyStepGoal);
$('#world-step-goal').text(userRepo.avgStepGoal());

$('#ounces').text(hydration.findSingleValue(user1.id, currentDate, 'numOunces'));

$('#hours').text(sleep.findSingleValue(user.id, currentDate, 'hoursSlept'));

$('#hours-all-time').text(sleep.findAvg(sleep.findPropArray(user.id, 'hoursSlept')));
$('#quality').text(sleep.findSingleValue(user.id, currentDate, 'sleepQuality'));

$('#quality-all-time').text(sleep.findAvg(sleep.findPropArray(user.id, 'sleepQuality')));
$('#steps').text(activity.findSingleValue(user.id, currentDate, 'numSteps'));
$('#miles').text(activity.findMilesWalked(user.id, currentDate, 'numSteps', user1.strideLength))
$('#stride-length').text(user1.strideLength)

$('#steps-worldwide-avg').text(activity.findAvg(activity.getDataByDate(currentDate).map(obj => obj.numSteps)))
$('#minutes').text(activity.findSingleValue(user.id, currentDate, 'minutesActive'));
$('#minutes-worldwide-avg').text(activity.findAvg(activity.getDataByDate(currentDate).map(obj => obj.minutesActive)))
$('#stairs').text(activity.findSingleValue(user.id, currentDate, 'flightsOfStairs'));

$('#stairs-worldwide-avg').text(activity.findAvg(activity.getDataByDate(currentDate).map(obj => obj.flightsOfStairs)))

function getRandomID () {
  return Math.floor(Math.random() * 50)
};

let dates = activity.findWeekArray(user1.id, currentDate, 'date');
console.log(dates)

function generateFriends (userFriends) {
  let friends = userFriends.map(friend => {
    let userFriend = new User(userRepo.returnUserData(friend));
    return ({
      id: userFriend.id,
      name: userFriend.name,
      stepGoal: userFriend.dailyStepGoal,
      stepsThisWeek: activity.findWeekArray(userFriend.id, currentDate, 'numSteps').reduce((acc, date) => {
          acc += date;
          return acc;
      })
    })
  })

  return friends;
}

let friendList = generateFriends(user1.friends)

function compareFriends () {

}