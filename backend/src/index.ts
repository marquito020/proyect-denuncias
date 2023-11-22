import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import { dbConnet, seeders } from "./config/mongoose.js";

import auth from "./routes/auth.routes.js";
import users from "./routes/user.routes.js";
import typesOfComplaint from "./routes/typeComplaint.routes.js";
import complaints from "./routes/complaint.routes.js";
import areas from "./routes/area.routes.js";
import officials from "./routes/official.routes.js";
import neighbors from "./routes/neighbor.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", auth);
app.use("/api", users);
app.use("/api", typesOfComplaint);
app.use("/api", complaints);
app.use("/api", areas);
app.use("/api", officials);
app.use("/api", neighbors);

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// MongoDB
console.log("Connecting to database");
try {
  await dbConnet();
  console.log("MongoDB connect");

  // solo debe ejecutar una sola vez esta funcion de seeders(),
  // seeders();
} catch (error) {
  console.log("Error MongoDB", error);
}

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);

  socket.on("hello from client", (arg) => {
    console.log("escuchando ", arg);
  });
  // console.log(socket.connected); // true
});

io.on("hello-from-client", (...args) => {
  console.log(args);
});

const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log(`Server on port ${PORT}`));
server.listen(3000, "192.168.0.202", () => console.log(`Server on port ${PORT}`));

//, "192.168.0.58"
// app.listen(PORT, () => console.log(`Server on port ${PORT}`));
