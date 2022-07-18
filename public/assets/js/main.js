// lógica central de la aplicación
let usernameString = localStorage.getItem("user")
loadChannels();
if (!usernameString) {
  window.location = "/";
}
else{
  let spanUsername = document.querySelector("#username")
  spanUsername.innerHTML = "@"+usernameString;
}