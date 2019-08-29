const randomID = getRandomID();
const currentDate = '2019/07/20';
const userRepo = new UserRepository(userData);
let user = userRepo.returnUserData(randomID);
let user1 = new User(user);
let hydration = new Hydration(hydrationData);
let sleep = new Sleep(sleepData);
let activity = new Activity(activityData);
let dates = activity.findWeekArray(user1.id, currentDate, 'date');
let friendList = generateFriends(user1.friends)

populateDates();
populateWeekData(hydration, 'numOunces', 'ounces')
populateWeekData(sleep, 'hoursSlept', 'hours')
populateWeekData(sleep, 'sleepQuality', 'quality')
populateWeekData(activity, 'numSteps', 'steps')
populateWeekData(activity, 'minutesActive', 'minutes')
populateWeekData(activity, 'flightsOfStairs', 'stairs')

$('#profile').click(function() {
  $('#aside-left').toggle()
});
$('#friends').click(function() {
  $('#aside-right').toggle()
});
$('#full-name').text(user1.name)
$('#address').text(user1.address)
$('#email').text(user1.email)
$('#user-name').text(user1.returnFirstName());
$('#todays-date').text(currentDate);
$('#user-step-goal').text(user1.dailyStepGoal);
$('#world-step-goal').text(userRepo.avgStepGoal());
$('#friend-1-name').text(friendList[0].name)
$('#friend-1-goal').text(friendList[0].stepGoal)
$('#friend-1-steps').text(friendList[0].stepsThisWeek)
$('#friend-2-name').text(friendList[1].name)
$('#friend-2-goal').text(friendList[1].stepGoal)
$('#friend-2-steps').text(friendList[1].stepsThisWeek)
$('#friend-3-name').text(friendList[2].name)
$('#friend-3-goal').text(friendList[2].stepGoal)
$('#friend-3-steps').text(friendList[2].stepsThisWeek)
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
$('#moon-distance').text(sleep.findSingleValue(user.id, currentDate, 'hoursSlept') * 2288);
$('#moon-miles').text(Math.round(6786 / (activity.findMilesWalked(user.id, currentDate, 'numSteps', user1.strideLength))))
$('#rocket-height').text(Math.round((activity.findSingleValue(user.id, currentDate, 'flightsOfStairs') / 34) * 100));

function getRandomID () {
  return Math.floor(Math.random() * 50)
}

function populateDates () {
  dates.forEach((date, i) => {
    $(`.date-${i + 1}`).text(dates[i] + ':')
  })
}

function populateWeekData (instance, prop, propID) {
  let weekArray = instance.findWeekArray(user1.id, currentDate, prop);
  weekArray.forEach((date, i) => {
  $(`#${propID}-day-${i + 1}`).text(weekArray[i])
  })
}

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