$(document).ready(() => {
const currentDate = '2019/06/20';
const userRepo = new UserRepository(userData);
let user = userRepo.returnUserData(9);
let user1 = new User(user);
let hydration = new Hydration(hydrationData);
let sleep = new Sleep(sleepData);
let activity = new Activity(activityData);

// Should I be pulling from the actual datasets, or from the sample data I created?

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



















})