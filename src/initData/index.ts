import { conn, User } from "../db";
import { UserRol } from "../interfaces/UserTS";
import readline from "readline";

const bcrypt = require("bcrypt");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function initData() {
  rl.question(
    "Are you sure you want to run this function? This will delete the database and load backup (yes/no): ",
    async (answer: string) => {
      if (answer.toLowerCase() === "yes") {
        await loadData()
          .then(() => {
            console.log("Data loaded successfully!");
            rl.close();
          })
          .catch((error) => {
            console.error("Error al cargar datos iniciales:", error);
            rl.close();
          });
      } else {
        console.log("Initialization aborted by the user");
        rl.close();
      }
    }
  );
}

async function loadData(): Promise<void> {
  console.log("Creating tables...");

  await conn.sync({ force: true });

  // Get any Admin
  const adminUser = await User.findOne({ where: { rol: "ADMIN" } });

  // If admin dont exist create it
  if (!adminUser) {
    // User admin data
    const user = {
      name: "ADMIN",
      rol: UserRol.ADMIN,
      email: "admin@gmail.com",
      password: await bcrypt.hash("321654987", 10),
    };

    console.log("User loaded");

    // Create user
    await User.create(user).catch((error) => console.log(error));
  }
}
