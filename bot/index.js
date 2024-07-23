import { connectDB } from "./utils/db.js";
import bot from "./utils/bot.js";

const dbConnected = await connectDB();

if (dbConnected) {
  bot();
}