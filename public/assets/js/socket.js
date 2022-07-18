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

    //renderizar los mensajes que llegan
    console.log(event.data);
  });
}

function sentMenssage(data) {
  socket.send(JSON.stringify(data));
}

initSocket();
