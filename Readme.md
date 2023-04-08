# Alarm Clock

## Analog Clock
_Created with CSS Completely_
Used Vanilla JavaScript's SetInterval() and Date() function to complete the functionality of the clock

## Digital Clock
Created Different Blocks for - Hour, Mins, Secs, and Period (AM/PM)
The same Vanialla JavaScript's SetInterval and Date() function were used to maintain the functionality of the clock

## Showing Day and Date
_Show is format - "Day, Month Date"_
Used JavaScript's Date() function and getMonth(), getDay(), getDate() inbuilt methods to fetch the correct day and date


### Use Of SetInterval()
Used SetInterval() function after every 1000 milliseconds to update the time in both analog and digital clock.

### Use of External Resources
-- Used https://fonts.google.com/ for font's used in this project.
-- Used https://uigradients.com/ for the linear gradiants styles.
-- Used https://fontawesome.com/ for icons and favicon of the page.

## Basic functionalities 
-- Fully working Analog and Digital Clock.
-- Date and Day in "Day, Month Date" format.
-- Form to submit the alarm time.
-- Form contains input for Hour, Mins, Secs, and Description and a dropdown for period (AM/PM) selection. And a submit button to submit the form.
-- A List of all alarms created by user.
-- Alert - when the time of alarm created by user matches the current time in clock
-- Ability to delete the alarm, and once deleted that alarm won't alert the user
-- As the Description is not mandatory to be input, so creating custom label when description is empty.

## Hosting 
-- This website is hosted on GitHub and Netlify.
-- GitHub Link -- https://imshubsoni.github.io/Alarm-Clock-Project/
-- Netlify Link -- https://shubham-alarm-clock-project.netlify.app/

### Future Improvements
--- Currently the alarms created by user refreshes once the use refersh the page. So, to implement database and set the list to be static so it doesn't refresh away when user reloads.
