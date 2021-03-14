// app.js가 하는 일 =>
// 1. express가져옴,
// 2. log를 찍어주는 미들웨어를 가져옴
// 3. routes 가져와서 app.use()로 연결한다.
// 4. express의 body를 json 형태로 만들어 준다.

const express = require("express");
const routes = require("./routes");
const logger = require("morgan")("dev");

const app = express();

app.use(express.json());
app.use(logger);
app.use(routes); // Route 에 의존성을 가집니다.

//에러 핸들링 하는 부분

app.use((err, req, res, next) => {
  const { status, message } = err;
  console.log(err);
  res.status(status || 500).json({ message });
}); // 미들웨어의 약속, 인자가 4개 일 때 첫 번째 인자는 에러다

module.exports = app;
