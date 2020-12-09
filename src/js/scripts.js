/* eslint-disable */

document.addEventListener("DOMContentLoaded", () => {
  //TOGGLE MENU MOBILE
  const toggleMobile = document.querySelector(".menu__mobile");
  const hideNavMobile = document.querySelector(".btn__close--mobile");
  const navToToggle = document.querySelector(".nav__toogle");

  toggleMobile.addEventListener("mousedown", () => {
    navToToggle.classList.toggle("show__menu");
  });

  hideNavMobile.addEventListener("mousedown", () => {
    navToToggle.classList.remove("show__menu");
  });

  //TOGGLE LOGIN
  const toggleLogin = document.querySelector("#login__btn");
  const loginToToggle = document.querySelector(".login");

  toggleLogin.addEventListener("mousedown", () => {
    loginToToggle.classList.toggle("login--open");
  });

  //INPUT PASSWORD SHOW/HIDE
  const password = "password";
  const textPassword = "text";

  const passwordIcon = document.querySelector(".login__preview");
  const passwordField = document.querySelector("#password");
  const eyeIcon = document.querySelector(".fas");

  eyeIcon.classList.add("fa-eye");

  function togglePassword() {
    if (passwordField.type === password) {
      passwordField.type = textPassword;

      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = password;

      eyeIcon.classList.add("fa-eye");
      eyeIcon.classList.remove("fa-eye-slash");
    }
  }

  passwordIcon.addEventListener("click", togglePassword);
});
