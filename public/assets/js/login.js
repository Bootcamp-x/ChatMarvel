// lógica para el login

let $username = document.getElementById("js-input-username");
let buttonEnter = document.getElementById("js-button-loggin");

//checkUser();

buttonEnter.addEventListener("click", function (event) {
  event.preventDefault();
  let usernameValue = $username.value;
  if (usernameValue) {
    console.log(usernameValue);
    //guardar username en local storage
  } else {
    console.log("vacio");
  }
});
