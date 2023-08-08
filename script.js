"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Fetching basic elements, will be available globally
  const currentTimeDisplay = document.getElementById("current-time");
  const startStopwatchButton = document.getElementById("start-stopwatch-btn");
  const stopStopwatchButton = document.getElementById("stop-stopwatch-btn");
  const resetStopwatchButton = document.getElementById("reset-stopwatch-btn");

  let startTime = null;
  let accumulatedTime = 0;
  let intervalId;

  // Update the current time display
  function updateCurrentTime(time) {
    const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(time % 1000).padStart(3, "0");
    currentTimeDisplay.innerText = `${minutes}:${seconds}:${milliseconds}`;
  }

  // Start the stopwatch
  function startStopwatch() {
    if (startTime === null) {
      startTime = new Date().getTime();
      intervalId = setInterval(updateStopwatchTime, 100);
    }
  }

  // Stop the stopwatch
  function stopStopwatch() {
    clearInterval(intervalId);
    intervalId = null;
    accumulatedTime += new Date().getTime() - startTime;
    startTime = null;
  }

  // Reset the stopwatch
  function resetStopwatch() {
    clearInterval(intervalId);
    intervalId = null;
    startTime = null;
    accumulatedTime = 0;
    updateCurrentTime(0);
  }

  // Update the stopwatch time
  function updateStopwatchTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = accumulatedTime + currentTime - startTime;
    updateCurrentTime(elapsedTime);
  }

  // Set operation on click of the buttons
  startStopwatchButton.addEventListener("click", startStopwatch);
  stopStopwatchButton.addEventListener("click", stopStopwatch);
  resetStopwatchButton.addEventListener("click", resetStopwatch);
});
