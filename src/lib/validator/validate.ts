import Validator from './Validator';

const validate = (value: unknown): Validator => {
  return new Validator(value);
};

export default validate;
