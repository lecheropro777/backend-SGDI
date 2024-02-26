import { conn } from "./db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

conn();

// const sslOptions = {
//   key: fs.readFileSync('./server/server.key'),
//   cert: fs.readFileSync('./server/server.crt'),
// };

// const server = https.createServer(sslOptions, app);

app.listen(process.env.PORT);
console.log("Server on port", process.env.PORT);
