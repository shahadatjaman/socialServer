module.exports.validateRegisterInput = (
    firstName, 
    lastName,
    email, 
    password, 
    confirmPassword
    ) => {
     
    const errors = {};

    if(firstName.trim() === ''){
        errors.firstName = 'Must provide an firstName!'
    }
    if(lastName.trim() === ''){
      errors.lastName = 'Must provide an lastName!'
  }
    if (email.trim() === '') {
      errors.email = 'Email must not be empty';
    } else {
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = 'Email must be a valid email address';
      }
    }

     if(password === '') {
        errors.password = 'Password must not empty';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
      }

      return {
          errors,
          valid : Object.keys(errors).length < 1
      }
    
}

// Login validation

module.exports.validateLoginInput = (email, password, ) => {

  const errors = {};
  
  if(email.trim() === ""){
      errors.email = 'Must provide an Email!'
  }

   if(password === '') {
      errors.password = 'Password must not empty';
    }

    return {
        errors,
        valid : Object.keys(errors).length < 1
    }
  
}