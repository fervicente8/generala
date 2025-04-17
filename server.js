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
  const onlineUsers = new Map();

  io.on("connection", (socket) => {

    socket.on("userOnline", (user) => {
      onlineUsers.set(user.id, { name: user.name, socketId: socket.id });

      // Enviar la lista de usuarios al cliente recién conectado
      socket.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));

      // Notificar a todos los demás clientes
      io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("disconnect", () => {
      for (const [userId, userData] of onlineUsers.entries()) {
        if (userData.socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      // Emitir la lista actualizada de usuarios en línea
      io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("friendRequest", (data) => {
      const requesterSocketId = onlineUsers.get(data.requester.id)?.socketId;
      const receiverSocketId = onlineUsers.get(data.receiver.id)?.socketId;

      if (requesterSocketId) {
        io.to(requesterSocketId).emit("requestSent", data);
      }

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("requestSent", data);
      }
    });

    socket.on("cancelFriendRequest", (data) => {
      const requesterSocketId = onlineUsers.get(data.requester.id)?.socketId;
      const receiverSocketId = onlineUsers.get(data.receiver.id)?.socketId;

      if (requesterSocketId) {
        io.to(requesterSocketId).emit("requestCanceled", data);
      }

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("requestCanceled", data);
      }
    });

    socket.on("acceptFriendRequest", (data) => {
      const requesterSocketId = onlineUsers.get(data.requester.id)?.socketId;
      const receiverSocketId = onlineUsers.get(data.receiver.id)?.socketId;

      if (requesterSocketId) {
        io.to(requesterSocketId).emit("requestAccepted", data);
      }

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("requestAccepted", data);
      }
    });

    socket.on("rejectFriendRequest", (data) => {
      const requesterSocketId = onlineUsers.get(data.requester.id)?.socketId;
      const receiverSocketId = onlineUsers.get(data.receiver.id)?.socketId;

      if (requesterSocketId) {
        io.to(requesterSocketId).emit("requestRejected", data);
      }

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("requestRejected", data);
      }
    });

    socket.on("removeFriend", (data) => {
      // Emitir solo al solicitante y al receptor
      const requesterSocketId = onlineUsers.get(data.requester.id)?.socketId;
      const receiverSocketId = onlineUsers.get(data.receiver.id)?.socketId;

      if (requesterSocketId) {
        io.to(requesterSocketId).emit("friendRemoved", data);
      }

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("friendRemoved", data);
      }
    });

    socket.on("inviteGame", (data) => {
      // Emitir solo al receptor usando su socket ID
      const receiverData = onlineUsers.get(data.receiver.id);

      if (receiverData) {
        io.to(receiverData.socketId).emit("gameInvited", data);
      } else {
        console.log(`El usuario ${data.receiver.name} no está conectado`);
      }
    });

    socket.on("acceptGameInvitation", (data) => {
      const players = data.game.players;

      players.forEach((gameUser) => {
        const playerId = gameUser.user.id;

        const playerSocketId = onlineUsers.get(playerId)?.socketId;

        if (playerSocketId) {
          io.to(playerSocketId).emit("userJoined", data);
        } else {
          console.log(`El usuario ${gameUser.user.name} no está conectado`);
        }
      });
    });

    socket.on("createGame", (data) => {
      // Emitir a todos los clientes que un usuario ha creado una partida
      io.emit("gameCreated", data);
    });

    socket.on("deleteGame", (data) => {
      // Emitir a todos los clientes que un usuario ha eliminado una partida
      io.emit("gameDeleted", data);
    });

    socket.on("joinGame", (data) => {
      const players = data.game.players;

      players.forEach((gameUser) => {
        const playerId = gameUser.user.id;
        const playerSocketId = onlineUsers.get(playerId)?.socketId;

        if (playerSocketId) {
          io.to(playerSocketId).emit("userJoined", data);
        }
      });
    });

    socket.on("leaveGame", (data) => {
      const players = data.game.players;

      players.forEach((gameUser) => {
        const playerId = gameUser.user.id;
        const playerSocketId = onlineUsers.get(playerId)?.socketId;

        if (playerSocketId) {
          io.to(playerSocketId).emit("userLeft", data);
        }

        const leaverSocketId = onlineUsers.get(data.user.id)?.socketId;
        if (leaverSocketId) {
          io.to(leaverSocketId).emit("userLeft", data);
        }
      });
    });

    socket.on("kickPlayer", (data) => {
      const players = data.game.players;

      players.forEach((gameUser) => {
        const playerId = gameUser.user.id;
        const playerSocketId = onlineUsers.get(playerId)?.socketId;

        if (playerSocketId) {
          io.to(playerSocketId).emit("playerKicked", data);
        }

        const leaverSocketId = onlineUsers.get(data.kickedPlayerId)?.socketId;
        if (leaverSocketId) {
          io.to(leaverSocketId).emit("playerKicked", data);
        }
      });
    });

    socket.on("startGame", (data) => {
      const players = data.players;

      players.forEach((gameUser) => {
        const playerId = gameUser.user.id;
        const playerSocketId = onlineUsers.get(playerId)?.socketId;

        if (playerSocketId) {
          io.to(playerSocketId).emit("gameStarted", data.id);
        }
      });
    });

    socket.on("endGame", (data) => {
      const players = data.players;

      players.forEach((gameUser) => {
        const playerId = gameUser.user.id;
        const playerSocketId = onlineUsers.get(playerId)?.socketId;

        if (playerSocketId) {
          io.to(playerSocketId).emit("gameEnded", data.id);
        }
      });
    });

    socket.on("rollDice", (data) => {
      const players = data.players;

      players.forEach((gameUser) => {
        const playerId = gameUser.id;
        const playerSocketId = onlineUsers.get(playerId)?.socketId;

        if (playerSocketId) {
          io.to(playerSocketId).emit("diceRolled", { diceValues: data.diceValues, rollCount: data.rollCount, dicesToReroll: data.dicesToReroll });
        }
      });
    });

    socket.on("submitScore", (data) => {
      const players = data.players;

      players.forEach((gameUser) => {
        const playerId = gameUser.id;
        const playerSocketId = onlineUsers.get(playerId)?.socketId;

        if (playerSocketId) {
          io.to(playerSocketId).emit("scoreSubmitted", {
            currentTurnId: data.currentTurnId,
            updatedGameUserId: data.updatedGameUserId,
            updatedValues: data.updatedValues
          });
        }
      });
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