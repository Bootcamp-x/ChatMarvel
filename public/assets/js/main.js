// lógica central de la aplicación
// localStorage.clear();

function insertarHora() {
  let d = new Date();
  let hora24 = d.getHours();
  let hora12 = hora24 % 12;
  hora12 = (hora12 < 10 ? "0" : "") + hora12;
  let min = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  let horaActual;
  if (hora24 < 12) {
    horaActual = hora12 + ":" + min + " am";
  } else {
    horaActual = hora12 + ":" + min + " pm";
  }
  console.log(horaActual);
  return horaActual;
}

loadChannels();
let generalChannels = document.querySelectorAll(".general");
generalChannels.forEach((tab) => {
  tab.classList.add("-active");
});
renderMessages("general");

function loadChannels() {
  if (!getChannel("general")) {
    saveChannel("general");
  }
  renderChannels();
  let channels = document.querySelectorAll(".channel");
  channels.forEach((channel) => {
    addEventListenerChannel(channel);
  });
}
function addEventListenerChannel(channelHTML) {
  channelHTML.addEventListener("click", function (e) {
    const previos = document.querySelectorAll(".channel.-active");
    previos.forEach((channelHTML) => {
      channelHTML.classList.remove("-active");
    });

    const nameChannel = e.currentTarget.dataset.name;
    selectsTabs(nameChannel);
  });
}
function selectsTabs(channel) {
  let tabs = document.querySelectorAll("." + channel);
  tabs.forEach((channelHTML) => {
    channelHTML.classList.add("-active");
    renderMessages(channel);
  });
}

function saveChannel(channel) {
  let valido = saveChannelLocally(channel);
  loadChannels();
  return valido;
}

function renderChannels() {
  let channels = getSavedChannels();
  let irc_channelsHTML = "";
  let list_user_channelsHTML = "";
  let irc_channels = document.getElementById("irc-channels");
  let list_user_channels = document.getElementById("list-user-channels");
  for (let key in channels) {
    let channelName = channels[key].name;
    irc_channelsHTML += `<li data-name="${channelName}" class="channel irc ${channelName}">${channelName}</li>`;
    list_user_channelsHTML += `<li data-name="${channelName}" class="channel item ${channelName}">${channelName}</li>`;
  }

  irc_channels.innerHTML = irc_channelsHTML;
  list_user_channels.innerHTML = list_user_channelsHTML;
}
function getSavedChannels() {
  let channels = localStorage.getItem("channels");
  if (channels == null) {
    saveLocalStorage("channels", []);
    channels = "[]";
  }
  return JSON.parse(channels);
}
function saveChannelLocally(channelName) {
  let channels = getSavedChannels();
  if (channels.find((channel) => channel.name == channelName)) {
    return false;
  }
  channels.push({ name: channelName, messages: [] });
  saveLocalStorage("channels", channels);
  return true;
}

let publish = document.querySelector("#js-add-user-message");

publish.addEventListener("click", function (e) {
  let inputUserMessage = document.querySelector("#js-input-user-message");
  let content = inputUserMessage.value;
  let message = {};
  if (!content) return;
  message.content = content;
  message.channel = document.querySelector(".channel.-active").innerHTML;
  message.author = localStorage.getItem("User");
  message.date = insertarHora();
  saveMessage(message);
  inputUserMessage.value = "";
});

function saveMessage(message) {
  let channels = getSavedChannels();
  channels.forEach((channel) => {
    if (channel.name == message.channel) {
      channel.messages.push(message);
      let actualChannelName = channel.name;
      saveLocalStorage("channels", channels);
      renderMessages(actualChannelName);
    }
  });
}

function saveLocalStorage(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

function renderMessages(channelName) {
  let { messages } = getChannel(channelName);
  let js_messages_view = document.querySelector("#js-messages-view");
  let js_messages_viewHTML = "";
  messages.forEach((message) => {
    js_messages_viewHTML += `<li class="look-disabled message">[${message.date}] <span class="username">@${message.author}</span> ${message.content} </li>`;
  });
  js_messages_view.innerHTML = js_messages_viewHTML;
}

function getChannel(channelName) {
  return getSavedChannels().find((channel) => channel.name == channelName);
}
