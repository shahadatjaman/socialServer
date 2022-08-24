// sender, receiver, notiType, content, refId, isRead

const notificationValidaion = (data) => {
  const { sender, receiver, notiType, content, refId, isRead } = data;

  const error = {};

  if (!sender) {
    error.sender = "'sender' id must provide!";
  }

  if (!receiver) {
    error.receiver = "'receiver' id must provide!";
  }
  if (!notiType) {
    error.notiType = "'notiType' id must provide!";
  }
  if (!content) {
    error.content = "'content' id must provide!";
  }
  if (!refId) {
    error.refId = "'refId' id must provide!";
  }
  if (typeof isRead !== "boolean") {
    error.isRead = "'isRead' must be Boolean!";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = notificationValidaion;
