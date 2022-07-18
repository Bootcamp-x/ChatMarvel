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
const channelNameEmpty = document.querySelector(".message-error-empty");
const channelNameExists = document.querySelector(".channel-name-exists");
pushString.addEventListener("click", function (e) {
  if (stringInput.value) {
    let valido = createChannel(stringInput.value);
    loadChannel(stringInput.value);

    if (valido) {
      modalCreateChannel.style.display = "none";
      stringInput.value = "";
    } else {
      channelNameExists.style.display = "flex";
    }
  } else {
    channelNameEmpty.style.display = "flex";
  }
});
stringInput.addEventListener("input", function (e) {
  channelNameEmpty.style.display = "none";
});
stringInput.addEventListener("input", function (e) {
  channelNameExists.style.display = "none";
});
/* end of functionality of modal create and close channels*/
