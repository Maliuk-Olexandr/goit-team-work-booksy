document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".email-form-footer");
    const emailInput = document.querySelector(".email-input");
 
    form.addEventListener("submit", function (e) {
      e.preventDefault();
 
      const email = emailInput.value.trim();
 
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
 
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          alert("Thank you for signing up!");
          form.reset();
        })
        .catch((error) => {
          console.error("Error submitting the form:", error);
          alert("Something went wrong. Please try again later.");
        });
    });
  });
 
 
 
  document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links-list .nav-link');
 
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetURL = this.getAttribute('href');
        window.location.href = targetURL;
      });
    });
  });