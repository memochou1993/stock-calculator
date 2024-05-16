class Validator {
  public static isEmpty(value: number | null): boolean {
    return !value;
  }

  public static isBetween(value: number | null, min: number, max: number): boolean {
    return Validator.isEmpty(value) || (value! >= min && value! <= max);
  }
}

export default Validator;
