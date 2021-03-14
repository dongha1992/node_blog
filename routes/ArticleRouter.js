const express = require("express");
const router = express.Router();

const { ArticleController } = require("../controllers");

router.get("/", ArticleController.getArticles);
router.post("/:userId", ArticleController.createArticle);
router.get("/:articleId", ArticleController.getArticle);
router.delete("/:articleId", ArticleController.deleteArticle);
router.put("/:articleId", ArticleController.updateArticle);

router.post("/:articleId/comment", ArticleController.createComment);
router.delete("/comment/:commentId", ArticleController.deleteComment);
router.put("/:articleId/comment/:commentId", ArticleController.updateComment);

module.exports = router;
