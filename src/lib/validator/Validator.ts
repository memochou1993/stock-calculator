class Validator {
  value: unknown;

  constructor(value: unknown) {
    this.value = value;
  }

  public isEmpty(): boolean {
    return !this.value;
  }

  public isBetween(min: number, max: number): boolean {
    return this.isEmpty() || (Number(this.value) >= min && Number(this.value) <= max);
  }
}

const validator = {
  create(value: unknown): Validator {
    return new Validator(value);
  },
};

export { validator };
