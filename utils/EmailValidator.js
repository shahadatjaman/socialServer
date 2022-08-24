module.exports.emailSenderValidator = (email, subject, url) => {
  let errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (subject.trim() === "") {
    errors.subject = "Must provide an Subject!";
  }

  if (url.trim() === "") {
    errors.url = "Must provide an url!";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};
