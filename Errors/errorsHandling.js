module.exports = {
  resourcError(res, message) {
    res.status(404).json({
      message: message,
    });
  },
  serverError(res, error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Occurred!",
      error: error,
    });
  },
};
