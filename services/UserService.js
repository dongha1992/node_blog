const prisma = require("../prisma");

const createUser = (fields) => {
  const { email, password } = fields;
  return prisma.users.create({
    data: {
      email,
      password, //field 자체가 객체이기 때문에 바로 넣어도 된다.
    },
  });
};

const findUser = (fields) => {
  const [uniqueKey] = Object.keys(fields);
  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(fields[uniqueKey]) : fields[uniqueKey];

  return prisma.users.findUnique({ where: { [uniqueKey]: value } });
};

module.exports = {
  createUser,
  findUser,
};
