/* kick-off, functionality of modal create and close channels*/
const openModal = document.querySelector("#js-open-lb");
const modalCreateChannel = document.querySelector("#js-light-box");
const closeModal = document.querySelector("#js-close-lb");
openModal.addEventListener("click", function (e) {
  e.preventDefault();
  modalCreateChannel.style.display = "flex";
});
window.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target == window || e.target == closeModal) {
    closeModal.classList.toggle("closeModal");
    modalCreateChannel.style.display = "none";
    stringInput.value = "";
  }
});
const stringInput = document.querySelector(".name-channel");
const pushString = document.querySelector("#js-button-create-channel");
pushString.addEventListener("click", function (e) {
  if (stringInput.value) {
    //funcion de jaramillo
    let valido = saveChannel(stringInput.value);
    if (valido) {
      modalCreateChannel.style.display = "none";
      stringInput.value = "";
    } else {
      alert("canal existente");
    }
  } else {
    alert("nombre del canal vacio");
  }
});
/* end of functionality of modal create and close channels*/
