//Using strict mode here to avoid errors
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  //Fetching basic elements ,  will be available globaly
  const currentTimeDisplay = document.getElementById("current-time");
  const alarmTimeInput = document.getElementById("alarm-time");
  const setAlarmButton = document.getElementById("set-alarm-btn");
  const resetAlarmButton = document.getElementById("reset-alarm-btn");
  const alarmsList = document.getElementById("alarms-list");

  let alarmTime = null;
  let intervalId;

  function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    currentTimeDisplay.innerText = `${hours}:${minutes}:${seconds}`;
  }

  function checkAlarm() {
    const now = new Date();
    const currentTime = now.getTime();

    if (alarmTime !== null) {
      const alarmDateTime = new Date(now.toDateString() + " " + alarmTime);
      const alarmTimeMillis = alarmDateTime.getTime();

      if (currentTime >= alarmTimeMillis) {
        clearInterval(intervalId);
        alert("Time's up! Alarm triggered!");
      }
    }
  }

  function startClock() {
    intervalId = setInterval(function () {
      updateCurrentTime();
      checkAlarm();
    }, 1000);
  }

  function setAlarm() {
    alarmTime = alarmTimeInput.value;
    startClock();
  }

  function resetAlarm() {
    clearInterval(intervalId);
    alarmTime = null;
    document.getElementById("alarm-hr").value = "";
    document.getElementById("alarm-min").value = "";
    document.getElementById("alarm-sec").value = "";
    document.getElementById("alarm-sec").value = "";
    document.getElementById("alarm-ampm").value = "AM";
  }

  function createAlarmTimeString(hr, min, sec, ampm) {
    const timeString = `${String(hr).padStart(2, "0")}:${String(min).padStart(
      2,
      "0"
    )}:${String(sec).padStart(2, "0")} ${ampm}`;
    return timeString;
  }

  function addAlarmToList(alarmTimeString) {
    const li = document.createElement("li");
    //Adding List element with bootsrap class

    li.classList.add("list-group-item", "custom-list");
    const ptag = document.createElement("span");
    ptag.innerText = alarmTimeString;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "ml-2");

    deleteButton.addEventListener("click", function () {
      li.remove();
    });
    li.appendChild(ptag);
    li.appendChild(deleteButton);

    alarmsList.appendChild(li);
  }

  function setAlarm() {
    const hr = parseInt(document.getElementById("alarm-hr").value);
    const min = parseInt(document.getElementById("alarm-min").value);
    const sec = parseInt(document.getElementById("alarm-sec").value);
    const ampm = document.getElementById("alarm-ampm").value;

    const alarmTimeString = createAlarmTimeString(hr, min, sec, ampm);
    addAlarmToList(alarmTimeString);

    // Reset alarm input values
    document.getElementById("alarm-hr").value = "";
    document.getElementById("alarm-min").value = "";
    document.getElementById("alarm-sec").value = "";
  }

  //Setting operation on click of the buttons
  setAlarmButton.addEventListener("click", setAlarm);
  setAlarmButton.addEventListener("click", setAlarm);
  resetAlarmButton.addEventListener("click", resetAlarm);

  startClock();
});
