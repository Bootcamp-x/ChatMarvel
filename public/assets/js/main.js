// lógica central de la aplicación
localStorage.clear();
saveChannel("general");
let message = {};
message.author = "pepe";
message.content = "hola mundo";
message.date = "10:33 am";
message.channel = "general";
saveMessage(message);

let channels = document.querySelectorAll(".channel");

channels.forEach((element) => {
  element.addEventListener("click", function (e) {
    const previos = document.querySelectorAll(".channel.-active");
    previos.forEach((element) => {
      element.classList.remove("-active");
    });

    const nameChannel = e.currentTarget.dataset.name;
    let channelsSelected = document.querySelectorAll(
      `[data-name="${nameChannel}"]`
    );
    channelsSelected.forEach((element) => {
      element.classList.add("-active");
    });
  });
});

function saveChannel(channel) {
  let valido = saveChannelLocally(channel);
  renderChannels();
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
    irc_channelsHTML += `<li data-name="${channelName}" class="channel irc">${channelName}</li>`;
    list_user_channelsHTML += `<li data-name="${channelName}" class="channel item">${channelName}</li>`;
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
