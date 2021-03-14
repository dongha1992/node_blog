require("dotenv").config();
const { PORT } = process.env;
const http = require("http");
const app = require("./app"); // express app
const server = http.createServer(app); // Server 는 express 앱에 의존성을 가집니다.
const prisma = require("./prisma"); // prisma 인스턴스를 생성해서 앱 내에서 사용 합니다.

const start = async () => {
  try {
    server.listen(PORT, console.log(`${PORT} on`));
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

start();
