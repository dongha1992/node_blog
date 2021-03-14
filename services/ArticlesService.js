const prisma = require("../prisma");
const queryOptionSet = require("../utils/queryOptionSet");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const findArticles = (query) => {
  const { offset, limit, filterOption = "AND", ...fields } = query;
  const where = queryOptionSet(fields, filterOption);

  return prisma.articles.findMany({
    where,
  });
};

const findArticle = ({ id }) => {
  return prisma.articles.findUnique({
    where: { id: Number(id) },
  });
};

const makeArticle = (fields) => {
  const { id, title, body } = fields;

  return prisma.articles.create({
    data: {
      title,
      body,
      status: "PUBLISHED",
      users: { connect: { id: Number(id) } },
    },
  });
};

const eraseArticle = ({ id }) => {
  return prisma.articles.update({
    where: { id: Number(id) },
    data: {
      status: "DELETED",
    },
  });
};

const editArticle = (field) => {
  const { id, title, body } = field;
  return prisma.articles.update({
    where: { id: Number(id) },
    data: {
      body,
      title,
      status: "PUBLISHED",
    },
  });
};

const addComment = (fields) => {
  const { articleId, userId, body } = fields;
  return prisma.comments.create({
    data: {
      body,
      users: { connect: { id: Number(userId) } },
      articles: { connect: { id: Number(articleId) } },
    },
  });
};

const eraseComment = ({ id }) => {
  return prisma.comments.delete({
    where: { id: Number(id) },
  });
};

const editComment = (fields) => {
  const { id, body } = fields;

  return prisma.comments.update({
    where: { id: Number(id) },
    data: { body },
  });
};

module.exports = {
  findArticles,
  findArticle,
  makeArticle,
  eraseArticle,
  editArticle,
  addComment,
  eraseComment,
  editComment,
};
