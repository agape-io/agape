import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';

const schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();

export const validatePassword = (password: string, details: boolean = false) => schema.validate(password, { details });

export const generateHash = (password: string, saltRounds: number = 10) => bcrypt.genSalt(saltRounds)
  .then((salt: string) => bcrypt.hash(password, salt));
