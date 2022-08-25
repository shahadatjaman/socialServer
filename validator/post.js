const postValidaion = (data) => {
  const { body, imgURL } = data;

  const error = {};

  if (!body) {
    error.body = "Post body must not be empty!";
  }

  if (!imgURL) {
    error.imgURL = "imgURL must not be empty!";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = postValidaion;
