function displayTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  var isAm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var timeString = hours + ":" + minutes + ":" + seconds + " " + isAm;

  var date = currentTime.toDateString();

  var clockElement = document.getElementById("clock");
  clockElement.innerHTML = timeString + "<br>" + date;
}

setInterval(displayTime, 1000); // Update the clock every second
