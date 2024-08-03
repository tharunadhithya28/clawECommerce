const bcrypt = require('bcrypt');

const password = 'tharunTwentyEight'; // Replace with the actual password
const saltRounds = 10; // Adjust the number of salt rounds as needed

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed Password:', hash);
  }
});
