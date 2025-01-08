import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const inputRef = document.querySelector('#datetime-picker');
const timeValueArr = document.querySelectorAll(`.value`);

let userSelectedDate = null;
let timerInterval = null;
let isActive = false;

startBtn.disabled = true;
startBtn.addEventListener('click', handleStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate - new Date() < 0) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        titleColor: 'white',
        messageColor: 'white',
        timeout: false,
        backgroundColor: '#EF4040',
        transitionIn: 'fadeIn',
      });
      startBtn.disabled = true;
      startBtn.classList.remove('active-btn');
    } else {
      startBtn.disabled = false;
      startBtn.classList.add('active-btn');
    }
  },
};

flatpickr(inputRef, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function handleStartTimer() {
  if (isActive) {
    clearInterval(timerInterval);
  }

  isActive = true;
  startBtn.disabled = true;
  startBtn.classList.remove('active-btn');
  inputRef.disabled = true;
  inputRef.classList.add('disable-input');

  timerInterval = setInterval(() => {
    const startTime = Date.now();
    const differ = userSelectedDate - startTime;

    if (differ <= 0) {
      clearInterval(timerInterval);
      inputRef.disabled = false;
      inputRef.classList.remove('disable-input');
    }
    const convertedTime = convertMs(differ);

    timeValueArr[0].textContent = addLeadingZero(convertedTime.days);
    timeValueArr[1].textContent = addLeadingZero(convertedTime.hours);
    timeValueArr[2].textContent = addLeadingZero(convertedTime.minutes);
    timeValueArr[3].textContent = addLeadingZero(convertedTime.seconds);
  }, 1000);
}
