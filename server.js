import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Usuario conectado con ID:", socket.id);

    socket.on("disconnect", () => {
      console.log("Usuario desconectado con ID:", socket.id);
    });

    socket.on("friendRequest", (data) => {
      console.log(
        `${data.requester.name} ha enviado una solicitud de amistad a ${data.receiver.name}`
      );
      // Emitir a todos los clientes que un usuario ha enviado una solicitud de amistad
      io.emit("requestSent", data);
    });

    socket.on("cancelFriendRequest", (data) => {
      console.log(
        `${data.requester.name} ha cancelado la solicitud de amistad de ${data.receiver.name}`
      );
      // Emitir a todos los clientes que un usuario ha cancelado una solicitud de amistad
      io.emit("requestCanceled", data);
    });

    socket.on("acceptFriendRequest", (data) => {
      console.log(
        `${data.requester.name} ha aceptado la solicitud de amistad de ${data.receiver.name}`
      );
      // Emitir a todos los clientes que un usuario ha aceptado una solicitud de amistad
      io.emit("requestAccepted", data);
    });

    socket.on("rejectFriendRequest", (data) => {
      console.log(
        `${data.requester.name} ha rechazado la solicitud de amistad de ${data.receiver.name}`
      );
      // Emitir a todos los clientes que un usuario ha rechazado una solicitud de amistad
      io.emit("requestRejected", data);
    })

    socket.on("removeFriend", (data) => {
      console.log(
        `${data.requester.name} ha eliminado a ${data.receiver.name} de sus amigos`
      );
      // Emitir a todos los clientes que un usuario ha eliminado a otro de sus amigos
      io.emit("friendRemoved", data);
    });

    socket.on("inviteGame", (data) => {
      console.log(
        `${data.sender.name} ha invitado a ${data.receiver.name} a una partida`
      );
      // Emitir a todos los clientes que un usuario ha invitado a otro a una partida
      io.emit("gameInvited", data);
    });

    socket.on("createGame", (data) => {
      console.log(
        `${data.owner.name} ha creado una partida con el nombre ${data.name}`
      );
      // Emitir a todos los clientes que un usuario ha creado una partida
      io.emit("gameCreated", data);
    });

    socket.on("deleteGame", (data) => {
      console.log(
        `${data.owner.name} ha eliminado la partida con el nombre ${data.name}`
      );
      // Emitir a todos los clientes que un usuario ha eliminado una partida
      io.emit("gameDeleted", data);
    });

    socket.on("joinGame", (data) => {
      console.log(`${data.user.name} se ha unido a la partida ${data.gameId}`);
      // Emitir a todos los clientes que un usuario se ha unido a la partida
      io.emit("userJoined", data);
    });

    socket.on("leaveGame", (data) => {
      console.log(`${data.user.name} ha abandonado la partida ${data.gameId}`);
      // Emitir a todos los clientes que un usuario ha abandonado la partida
      io.emit("userLeft", data);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});