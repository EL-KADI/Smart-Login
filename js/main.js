var sigunUpBtn = document.querySelector(".signUp");
var nameInput = document.querySelector(".label-Name");
var logIn = document.querySelector(".log-in-f");
var logH = document.querySelector(".log-h");
var signH = document.querySelector(".sign-h");
var inputVluOfName = document.querySelector(".name");
var inputVluOfEmail = document.querySelector(".email");
var inputVluOfPass = document.querySelector(".pass");
var btnLogin = document.querySelector(".btn-login");
var btnSign = document.querySelector(".btn-Sign");
var errorOne = document.querySelector(".error-sign");
var errorTow = document.querySelector(".error-sign-tow");
var form = document.querySelector("form");
var welcomeContainer = document.querySelector(".welcome-container");
var welcomeContainerTow = document.querySelector(".welcome-container-tow");
var loginPage = document.querySelector(".login-page");
var logOut = document.querySelector(".hover-logout");

var inputList = JSON.parse(localStorage.getItem("inputs")) || [];

function addLocalInput() {
  var input = {
    name: inputVluOfName.value,
    email: inputVluOfEmail.value,
    pass: inputVluOfPass.value,
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    showError(errorTow, "The email address is incorrect.");
    return;
  }

  if (!/^.{9,}$/.test(input.pass)) {
    showError(errorTow, "The password must be at least 9 characters long.");
    return;
  }

  if (inputList.some((item) => item.email === input.email)) {
    showError(errorTow, "The email address is already registered.");
    return;
  }

  inputList.push(input);
  localStorage.setItem("inputs", JSON.stringify(inputList));

  hideError(errorTow);

  nameInput.classList.replace("d-block", "d-none");
  logH.classList.replace("d-block", "d-none");
  signH.classList.replace("d-none", "d-block");
  btnSign.classList.replace("d-block", "d-none");
  btnLogin.classList.replace("d-none", "d-block");

  inputVluOfName.value = "";
  inputVluOfEmail.value = "";
  inputVluOfPass.value = "";
}

function isValidLogin() {
  var inputEmail = inputVluOfEmail.value;
  var inputPass = inputVluOfPass.value;

  var user = inputList.find(
    (input) => input.email === inputEmail && input.pass === inputPass
  );

  if (user) {
    welcomeContainer.classList.remove("d-none");
    welcomeContainerTow.innerHTML = `<div class="row px-5">
        <div class="col-12 justify-content-center align-content-center align-items-center px-5 mt-5">
          <div class="inner bg-custom my-5 d-flex justify-content-center align-content-center w-75 m-auto flex-column">
            <div class="text-center">
              <h1 class="p-5 custom-font-h1 mb-3">Welcome ${user.name}</h1>
            </div>
          </div>
        </div>
      </div>`;
    loginPage.classList.add("d-none");
  } else {
    showError(errorOne, "The login credentials are incorrect.");
  }
}

function showError(element, message) {
  element.textContent = message;
  element.classList.replace("d-none", "d-block");
}

function hideError(element) {
  element.textContent = "";
  element.classList.replace("d-block", "d-none");
}

btnSign.addEventListener("click", function () {
  addLocalInput();
});

btnLogin.addEventListener("click", function () {
  isValidLogin();
});

sigunUpBtn.addEventListener("click", function () {
  nameInput.classList.replace("d-none", "d-block");
  logH.classList.replace("d-none", "d-block");
  signH.classList.replace("d-block", "d-none");
  btnSign.classList.replace("d-none", "d-block");
  btnLogin.classList.replace("d-block", "d-none");
  hideError(errorTow);
  hideError(errorOne);
});

logIn.addEventListener("click", function () {
  nameInput.classList.replace("d-block", "d-none");
  logH.classList.replace("d-block", "d-none");
  signH.classList.replace("d-none", "d-block");
  btnSign.classList.replace("d-block", "d-none");
  btnLogin.classList.replace("d-none", "d-block");
  hideError(errorOne);
  hideError(errorTow);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

logOut.addEventListener("click", function () {
  welcomeContainer.classList.add("d-none");
  welcomeContainerTow.classList.add("d-none");

  inputVluOfEmail.value = "";
  inputVluOfPass.value = "";
  errorOne.classList.add("d-none");

  loginPage.classList.replace("d-none", "d-block");
});
