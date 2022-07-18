// agregar manejo de eventos del socket aquí
const socket = new WebSocket(socketUrl());

function socketUrl() {
  return location.hostname == "localhost"
    ? "ws://localhost:3000"
    : `ws://${location.hostname}:${location.port}`;
}

function initSocket() {
  socket.addEventListener("open", () => {
    console.log("Connection open");
  });

  socket.addEventListener("close", () => {
    console.log("Connection closed");
  });

  socket.addEventListener("message", (event) => {
    // logic to receive messages here
    let message = JSON.parse(event.data);
    if (message.author != localStorage.getItem("user")) {
      createMessage(message);
    }
  });
}

function sentMenssage(data) {
  socket.send(JSON.stringify(data));
}

initSocket();
