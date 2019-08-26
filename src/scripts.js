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
$('#ounces').text(hydration.findSingleValue(user1.id, currentDate, 'numOunces'));



















})