// lógica central de la aplicación

let channels = document.querySelectorAll(".channel");

channels.forEach((element) => {
    element.addEventListener("click", function (e){
        const previos = document.querySelectorAll(".channel.-active")
        previos.forEach((element) => {
          element.classList.remove("-active");
        });

    const nameChannel = e.currentTarget.dataset.name;
    let channelsSelected = document.querySelectorAll(`[data-name="${nameChannel}"]`);
    channelsSelected.forEach((element) => {
      element.classList.add("-active")
    })
        
    })
})

function saveChannel(channel) {
  saveChannelLocally(channel);
  renderChannels();
}

function renderChannels() {
  let channels = getSavedChannels();
  let irc_channelsHTML = "";
  let list_user_channelsHTML = "";
  let irc_channels = document.getElementById("irc-channels");
  let list_user_channels = document.getElementById("list-user-channels");
  for (let key in channels) {
    let channel = channels[key];
    irc_channelsHTML += `<li data-name="${channel}" class="channel irc">${channel}</li>`;
    list_user_channelsHTML += `<li data-name="${channel}" class="channel item">${channel}</li>`;
  }

  irc_channels.innerHTML = irc_channelsHTML;
  list_user_channels.innerHTML = list_user_channelsHTML;
}
function getSavedChannels() {
  let channels = localStorage.getItem("channels");
  if (channels == null) {
    localStorage.setItem("channels", JSON.stringify({}));
    channels = "{}";
  }
  return JSON.parse(channels);
}
function saveChannelLocally(channel) {
  let channels = getSavedChannels();
  channels[channel] = channel;
  localStorage.setItem("channels", JSON.stringify(channels));
}

