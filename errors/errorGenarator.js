const errorGenerator = ({ message, statusCode = 500 }) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

module.exports = errorGenerator;

// 인자를 받을 떄 객체로 받아야 순서 엇갈려도 괜찮다!
