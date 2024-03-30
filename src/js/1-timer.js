import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const dataInput = document.querySelector('#datetime-picker');
const displayDays = document.querySelector('[data-days]');
const displayHours = document.querySelector('[data-hours]');
const displayMinutes = document.querySelector('[data-minutes]');
const displaySeconds = document.querySelector('[data-seconds]');
let userSelectedDate;

startBtn.addEventListener('click', startTimer);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        theme: 'dark',
        progressBarColor: '#FFFFFF',
        color: '#EF4040',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
});

function startTimer() {
  if (userSelectedDate) {
    startBtn.disabled = true;
    dataInput.disabled = true;
    let timerId = setInterval(() => {
      let remainTime = userSelectedDate.getTime() - Date.now();
      if (remainTime <= 0) {
        clearInterval(timerId);
        dataInput.disabled = false;
      } else {
        let convertTime = convertMs(remainTime);
        let formattedTime = addLeadingZero(convertTime);
        displayDays.innerHTML = formattedTime[0];
        displayHours.innerHTML = formattedTime[1];
        displayMinutes.innerHTML = formattedTime[2];
        displaySeconds.innerHTML = formattedTime[3];
      }
    }, 1000);
  }
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const allPartsOfDate = {};
  allPartsOfDate.days = Math.floor(ms / day);
  allPartsOfDate.hours = Math.floor((ms % day) / hour);
  allPartsOfDate.minutes = Math.floor(((ms % day) % hour) / minute);
  allPartsOfDate.seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return allPartsOfDate;
}

function addLeadingZero(obj) {
  const arrOfValues = Object.values(obj);
  for (let i = 0; i < arrOfValues.length; i++) {
    let str = arrOfValues[i].toString();
    if (str.length > 2) {
      arrOfValues[i] = str;
    } else {
      arrOfValues[i] = str.padStart(2, 0);
    }
  }
  return arrOfValues;
}
