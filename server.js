const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer(handle);

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`🔌 Usuario conectado: ${socket.id}`);

        socket.on("message", (msg) => {
            console.log(`📩 Mensaje recibido: ${msg}`);
            io.emit("message", msg);
        });

        socket.on("disconnect", () => {
            console.log(`❌ Usuario desconectado: ${socket.id}`);
        });
    });

    server.listen(3000, () => {
        console.log("🚀 Servidor corriendo en http://localhost:3000");
    });
});
