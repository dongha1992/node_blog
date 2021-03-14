const express = require("express");
const router = express.Router(); // express 라우팅 기능을 사용하기 위해서 router 객체가 필요합니다.

const UserRouter = require("./UserRouter"); //'/users' 엔드포인트를 처리하기 위해 UserRouter 를 붙여줍니다.
const ArticleRouter = require("./ArticleRouter");

router.use("/users", UserRouter); // 이렇게 내보낸 router 는 express app 의 미들웨어로 사용됩니다.
router.use("/articles", ArticleRouter);

module.exports = router;
