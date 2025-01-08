import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import checkmarkicon from '../img/check-mark.svg';
import closeicon from '../img/left-close.svg';

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  form.reset();

  onCreatePromise(delay, state)
    .then(value =>
      iziToast.success({
        message: `Fulfilled promise in ${value}ms`,
        position: 'topRight',
        titleColor: 'white',
        messageColor: 'white',
        timeout: false,
        backgroundColor: '#59A10D',
        iconUrl: checkmarkicon,
      })
    )
    .catch(error =>
      iziToast.error({
        message: `Rejected promise in ${error}ms`,
        position: 'topRight',
        iconUrl: closeicon,
        titleColor: 'white',
        messageColor: 'white',
        timeout: false,
        backgroundColor: '#EF4040',
      })
    );
});

function onCreatePromise(delay, state) {
  if (!state) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a state.',
      position: 'topRight',
      iconUrl: closeicon,
      titleColor: 'white',
      messageColor: 'white',
      timeout: false,
      backgroundColor: '#EF4040',
    });
    return Promise.reject();
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
