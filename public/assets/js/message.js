let publish = document.querySelector("#js-add-user-message");
let referenceDate = new Date();
publish.addEventListener("click", function (e) {
  let inputUserMessage = document.querySelector("#js-input-user-message");
  let content = inputUserMessage.value;
  let message = {};
  if (!content) return;
  message.content = content;
  message.channel = document.querySelector(".channel.-active").innerHTML;
  message.author = localStorage.getItem("user");
  message.date =(new Date()).toISOString();
  createMessage(message);
  sentMenssage(message);
  inputUserMessage.value = "";
});

function createMessage(message) {
  let channels = getSavedChannels();
  console.log(message);
  let actualChannel = channels.find(
    (channel) => channel.name == message.channel
  );
  actualChannel.messages.push(message);
  saveLocalStorage("channels", channels);
  renderMessages(actualChannel.name);
}

function saveLocalStorage(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

function renderMessages(channelName) {
  let { messages } = getChannel(channelName);
  let js_messages_view = document.querySelector("#js-messages-view");
  let js_messages_viewHTML = "";
  messages.forEach((message) => {
    let messageDate = new Date(message.date);
    if(messageDate < referenceDate){
    js_messages_viewHTML += `<li class="look-disabled message">[${formatDate(message.date)}] <span class="username">@${message.author}</span> ${message.content} </li>`;
    }
    else{
    js_messages_viewHTML += `<li class=" message">[${formatDate(message.date)}] <span class="username">@${message.author}</span> ${message.content} </li>`;
    }
  });
  js_messages_view.innerHTML = js_messages_viewHTML;
}
