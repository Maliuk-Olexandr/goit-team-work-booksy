import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form-footer');
const emailInput = document.querySelector('.email-input');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (!validateEmail(email)) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid email address.',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      iziToast.success({
        title: 'Success',
        message: 'Thank you for subscribing!',
        position: 'topRight',
        timeout: 3000,
      });
      emailInput.value = ''; // Clear the input field
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'There was an error processing your request. Please try again later.',
        position: 'topRight',
        timeout: 3000,
      });
    });
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// document.addEventListener('DOMContentLoaded', function () {
//   const navLinks = document.querySelectorAll('.nav-links-list .nav-link');

//   navLinks.forEach(link => {
//     link.addEventListener('click', function (e) {
//       e.preventDefault();
//       const targetURL = this.getAttribute('href');
//       window.location.href = targetURL;
//     });
//   });
// });
