// lógica central de la aplicación
loadChannels();
if (!localStorage.getItem("user")) {
  window.location = "/";
}
