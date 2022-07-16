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
        almacenarUser(usernameValue)
        window.location = 'main.html';
    } else {
        console.log("vacio");
    }
});



function almacenarUser(user) {
    localStorage.setItem("User", user);


}
