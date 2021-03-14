const { errorGenerator, errorWrapper } = require("../errors");
const { ArticlesService, UserService } = require("../services");

const getArticles = errorWrapper(async (req, res) => {
  const foundArticles = await ArticlesService.findArticles(req.query);

  if (foundArticles === null) {
    errorGenerator({ message: "Not found", statusCode: 400 });
  }
  res.status(200).json({ foundArticles });
  res.json({ message: "success" });
});

const getArticle = errorWrapper(async (req, res) => {
  const { id } = req.params;

  const foundArticle = await ArticlesService.findArticle({ id });

  if (!foundArticle) {
    errorGenerator({ message: "not found article", statuscCode: 400 });
  }

  res.status(200).json({ foundArticle });
  res.json({ message: "success" });
});

const createArticle = errorWrapper(async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  if (!title || !body) {
    errorGenerator({ message: "not found", statusCode: 400 });
  }

  const foundUser = await UserService.findUser({ id });

  const createdArticle = await ArticlesService.makeArticle({
    title,
    body,
    id: foundUser.id,
  });

  if (!createdArticle) {
    errorGenerator({ message: "failed to create article", statuscCode: 400 });
  }

  res.status(200).json(createdArticle);
  res.json({ message: "success" });
});

const deleteArticle = errorWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedArticle = await ArticlesService.eraseArticle({ id });

  if (!deletedArticle) {
    errorGenerator({ message: "failed to delete article", statuscCode: 400 });
  }

  res.json({ message: "success" });
});

const updateArticle = errorWrapper(async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  const updatedArticle = await ArticlesService.editArticle({ id, title, body });

  if (!updatedArticle) {
    errorGenerator({ message: "failed to updated article", statuscCode: 400 });
  }

  res.json({ message: "success" });
});

const createComment = errorWrapper(async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const foundArticle = await ArticlesService.findArticle({ id });

  if (!foundArticle) {
    errorGenerator({ message: "failed to updated article", statuscCode: 400 });
  }

  const foundUser = await UserService.findUser({ id: foundArticle.user_id });

  if (!foundUser) {
    errorGenerator({ message: "failed to updated article", statuscCode: 400 });
  }
  const { id: articleId } = foundArticle;
  const { id: userId } = foundUser;
  const createdComment = await ArticlesService.addComment({
    articleId,
    userId,
    body,
  });

  if (!createdComment) {
    errorGenerator({ message: "failed to create a comment" });
  }

  res.json({ message: "successs" });
});
const deleteComment = errorWrapper(async (req, res) => {
  const { id } = req.params;

  const deletedComment = await ArticlesService.eraseComment({ id });
  if (!deletedComment) {
    errorGenerator({ message: "failed to delete a comment" });
  }

  res.json({ message: "success" });
});

const updateComment = errorWrapper(async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  const updatedComment = await ArticlesService.editComment({ id, body });
  if (!updatedComment) {
    errorGenerator({ message: "failed to update to comment! try again!" });
  }

  res.json({ message: "success" });
});

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
  createComment,
  deleteComment,
  updateComment,
};
