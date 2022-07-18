function loadChannels() {
  if (!getChannel("general")) {
    createChannel("general");
  }
  renderChannels();
  loadChannel("general");
}
function addEventListenerChannel(channelHTML) {
  channelHTML.addEventListener("click", function (e) {
    const previos = document.querySelectorAll(".channel.-active");
    previos.forEach((channelHTML) => {
      channelHTML.classList.remove("-active");
    });

    const nameChannel = e.currentTarget.dataset.name;
    loadChannel(nameChannel);
  });
}
function loadChannel(channel) {
  let tabs = document.querySelectorAll("." + channel);
  tabs.forEach((channelHTML) => {
    channelHTML.classList.add("-active");
    renderMessages(channel);
  });
}

function createChannel(channelName) {
  let newChannel = { name: channelName, messages: [] };
  let successfulSave = saveChannel(newChannel);
  if (successfulSave) {
    renderChannels();
    loadChannel(channelName);
  }
  return successfulSave;
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
  let tabs = document.querySelectorAll(".channel");
  tabs.forEach((tab) => addEventListenerChannel(tab));
}
function getSavedChannels() {
  let channels = localStorage.getItem("channels");
  if (channels == null) {
    saveLocalStorage("channels", []);
    channels = "[]";
  }
  return JSON.parse(channels);
}
function saveChannel(newChannel) {
  let channels = getSavedChannels();
  if (channels.find((channel) => channel.name == newChannel.name)) {
    return false;
  }
  channels.push(newChannel);
  saveLocalStorage("channels", channels);
  return true;
}
function getChannel(channelName) {
  return getSavedChannels().find((channel) => channel.name == channelName);
}
