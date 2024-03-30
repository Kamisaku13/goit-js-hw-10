import iziToast from 'izitoast';

const form = document.querySelector('.form');
const delayInput = form.elements.delay;
const stateInput = form.elements.state;

form.addEventListener('submit', sendForm);

function sendForm(evt) {
    evt.preventDefault();

    const delay = Number(delayInput.value.trim());
    const state = stateInput.value;

    makePromise({ delay, state })
        .then(delay => {
            iziToast.success({
                message: `Fulfilled promise in ${delay}ms`,
                theme: 'dark',
                progressBarColor: '#FFFFFF',
                color: '#59A10D',
                position: 'topRight',
            });
        })
        .catch(delay => {
            iziToast.error({
                message: `Rejected promise in ${delay}ms`,
                theme: 'dark',
                progressBarColor: '#FFFFFF',
                color: '#EF4040',
                position: 'topRight',
            });
        });
    form.reset();
}

function makePromise({ delay, state }) {
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
