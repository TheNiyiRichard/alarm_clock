'use strict'

function updateClock() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
  }

  function setAlarm() {
    let hourInput = document.getElementById('hourInput').value;
    let minuteInput = document.getElementById('minuteInput').value;

    // Validation
    if (!isValidInput(hourInput) || !isValidInput(minuteInput)) {
      showFeedback('Please enter a valid hour and minute.');
      return;
    }

    let alarmTime = new Date();
    alarmTime.setHours(parseInt(hourInput, 10));
    alarmTime.setMinutes(parseInt(minuteInput, 10));
    alarmTime.setSeconds(0);

    let currentTime = new Date();

    if (alarmTime <= currentTime) {
      showFeedback('Invalid input. Please set the alarm time in the future.');
      return;
    }

    let timeDiff = alarmTime - currentTime;

    setTimeout(function() {
      playAlarmSound();
      showFeedback('Alarm! It\'s time!');
    }, timeDiff);

    showFeedback('Alarm set successfully!');
  }

  function playAlarmSound() {
    let alarmSound = document.getElementById('alarmSound');
    alarmSound.play();
  }

  function isValidInput(input) {
    return /^\d+$/.test(input) && parseInt(input, 10) >= 0;
  }

  function showFeedback(message) {
    let feedbackModal = document.getElementById('feedback-modal');
    feedbackModal.textContent = message;
    feedbackModal.style.display = 'block';

    setTimeout(function() {
      feedbackModal.style.display = 'none';
    }, 3000); 
  }

  setInterval(updateClock, 1000);
  updateClock();