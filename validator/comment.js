const commentValidaion = (user) => {
  const { postId, offset, limit } = user;

  const error = {};

  if (!postId) {
    error.postId = "Enter your Post Id";
  }

  if (!offset) {
    error.offset = "Enter  offset Value!";
  }
  if (!limit) {
    error.limit = "Enter  limit Value!";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = commentValidaion;
