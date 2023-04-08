const hourHand = document.getElementById('clockHandHour');
const minHand = document.getElementById('clockHandMin');
const secHand = document.getElementById('clockHandSec');

const hourBox = document.getElementById('clockHourBox');
const minBox = document.getElementById('clockMinBox');
const secBox = document.getElementById('clockSecBox');
const periodBox = document.getElementById('clockPeriodBox');

const todayDate = document.getElementById('todayDate');

const submitButton = document.getElementById('submitButton');

const alarmHourInput = document.getElementById('alarmHourInput');
const alarmMinsInput = document.getElementById('alarmMinsInput');
const alarmSecsInput = document.getElementById('alarmSecsInput');
const alarmPeriodInput = document.getElementById('alarmPeriodInput');
const alarmDescriptionInput = document.getElementById('alarmDescriptionInput');

var currentTimeStamp;
var alarmTimes = [];
var alarmDescriptions = [];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var alarmDescCounter = 1;

// Set Interval function each second, which will update time every second -- setCurrentTimeForClock 
//-- which will set time for both analog and digital clock
// Another Set Interval function -- which will check for all alarms and hit the alert if time matches alarm's time
setInterval(setCurrentTimeForClock,1000);
setInterval(checkAndAlertAlarm,1000);

// Function to set the Time for both clocks
function setCurrentTimeForClock() {
	// Fetch the current Date time using Date();
	let currentTime = new Date();

	// now fetch the time in seconds, mins and hours, so that we can move clock hands
	let currentTimeSeconds = makeTwoDigit(currentTime.getSeconds());
	let currentTimeMins = makeTwoDigit(currentTime.getMinutes());
	let currentTimeHours = makeTwoDigit(currentTime.getHours());

	// Fetch Day and month
	let currentDay = weekDays[currentTime.getDay()];
	let currentMonth = months[currentTime.getMonth()];
	let currentDate = currentTime.getDate();

	// rotate the clock hands accordingly --
	var secHandRotationDegree = 90 + ((currentTimeSeconds / 60) * 360);
	var minHandRotationDegree = 90 + ((currentTimeMins / 60) * 360) + ((currentTimeSeconds / 60) * 6);
	var hourHandRotationDegree = 90 + ((currentTimeHours / 12) * 360) + ((currentTimeMins / 60) * 30);
	
	// If time goes past 12, convert it to PM and Display only 1-12 format
	if(currentTimeHours < 12){
		periodBox.innerHTML = "AM";
	} else if(currentTimeHours > 12){
		currentTimeHours = makeTwoDigit(currentTimeHours - 12);
		periodBox.innerHTML = "PM";
	}

	// If time is 00 -- show 12
	if(currentTimeHours == "00"){
		currentTimeHours = "12";
	}

	// Set Digital Clock
	hourBox.innerHTML = currentTimeHours;
	minBox.innerHTML = currentTimeMins;
	secBox.innerHTML = currentTimeSeconds;
	
	// Set Analog Clock
	hourHand.style.transform = "rotate(" + hourHandRotationDegree + "deg)";
	minHand.style.transform = "rotate(" + minHandRotationDegree + "deg)";
	secHand.style.transform = "rotate(" + secHandRotationDegree + "deg)";

	// Set Day and Date
	let dateTextContent = `${currentDay}, ${currentMonth} ${currentDate}`;
	todayDate.innerHTML = dateTextContent;

	// Set the timestamp each second
	// This will be used to check the alarms
	currentTimeStamp = `${currentTimeHours}:${currentTimeMins}:${currentTimeSeconds} ${periodBox.innerHTML}`;
	console.log(currentTimeStamp);
}

// Make the digits as two if only one digit is their -- like convert `1` to `01`
function makeTwoDigit(currentTime) {
	if(currentTime < 10 && currentTime.toString().length < 2) {
		return "0" + currentTime;
	}
	return currentTime;
}

// EXTRA -- Click type animation on Submit Button
submitButton.addEventListener('click', function(){
	submitButton.style.transform = "translate(0rem,0.5rem)";
	setTimeout(function(){
		submitButton.style.transform = "translate(0rem,0rem)";
	},200);
});

// Create a li tag and append it to list whenever form is submitted
function createAlarm(event) {
	// Alarms Times Format 
	var alarmTime = makeTwoDigit(alarmHourInput.value) + ":" + makeTwoDigit(alarmMinsInput.value) + ":" + makeTwoDigit(alarmSecsInput.value) + " " + ((alarmPeriodInput.value).toUpperCase());

	// Push the alarm time to array
	// It will be used later to check if alarm time is equals to current time and then hit the Alert
	alarmTimes.push(alarmTime);

	// If Description is empty then put - Alarm 1.... Alarm 2.. etc
	var alarmDescription;
	if(alarmDescriptionInput.value == ""){
		alarmDescriptionInput.value = "Alarm " + alarmDescCounter;
		alarmDescCounter++;
	}

	alarmDescriptions.push(alarmDescriptionInput.value);

	// Create Li Tage with class = "alarm-list-item"
	let li = document.createElement('li');
	li.classList.add('alarm-list-item');

	// Create span tag for showing time - with class = "alarm-list-time"
	// And append it to Li
	let timeSpan = document.createElement('span');
	timeSpan.classList.add('alarm-list-time');
	let timeSpanTextNode = document.createTextNode(alarmTime);
	timeSpan.appendChild(timeSpanTextNode);
	li.appendChild(timeSpan);

	// Create span tag for showing Description - with class = "alarm-list-description"
	// And append it to Li
	let descSpan = document.createElement('span');
	descSpan.classList.add('alarm-list-description');
	let descSpanTextNode = document.createTextNode(alarmDescriptionInput.value);
	descSpan.appendChild(descSpanTextNode);
	li.appendChild(descSpan);

	// Create span tag for delete button - with class = "alarm-list-delete"
	// Create an onclick function = "deleteTheAlarm()" -- which will be used to delete the item and alarm
	// And append it to Li
	let deleteButton= document.createElement('span');
	deleteButton.classList.add('alarm-list-delete');
	deleteButton.setAttribute('onclick','deleteTheAlarm(this);')
	let deleteButtonITag = document.createElement('i');
	deleteButtonITag.classList.add('fa-regular');
	deleteButtonITag.classList.add('fa-square-minus');
	deleteButton.appendChild(deleteButtonITag);
	li.appendChild(deleteButton);

	// Fetch and current list and append the newly created alarm to that list
	const alarmList = document.getElementById('alarmList');
	alarmList.appendChild(li);

	// Set all the inputs to null
	alarmHourInput.value = '';
	alarmMinsInput.value = '';
	alarmSecsInput.value = '';
	alarmDescriptionInput.value = '';

	// Return false so that page doesn't reload
	return false;
}

// Function to delete the alarm
function deleteTheAlarm(e) {
	debugger;
	// Delete from AlarmTimes array so that alarm doesn't alert
	var alarmTimeToDelete = e.parentElement.firstChild.innerHTML;
	var indexToBeDeleted = alarmTimes.findIndex(alarm => alarm == alarmTimeToDelete);
	alarmTimes.splice(indexToBeDeleted,1);
	
	// Now Deleting the alarm from List
	e.parentElement.parentElement.removeChild(e.parentElement);
}

// Function to check and alert the alarms
function checkAndAlertAlarm(){
	var index = 0;
	for(let time of alarmTimes){
		if(time == currentTimeStamp){
			alert(`Alarm Alert: ${alarmDescriptions[index]}`);
		}
		index++;
	}
}
